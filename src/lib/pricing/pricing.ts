import { CART_LIMITS } from "@/config/cart.config";
import { findVariant, getDefaultVariant, isPurchasable } from "@/lib/catalog/catalog-utils";
import type { CartItem, CartLine } from "@/types/cart";
import type { OrderTotals, ShippingQuote } from "@/types/order";
import type { Money, Product } from "@/types/product";

/**
 * Single place for every price calculation in the storefront.
 * When orders move to the backend, the server repeats these calculations with its
 * own catalog; these values are only a preview for the customer.
 */

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return CART_LIMITS.minQuantity;
  return Math.min(CART_LIMITS.maxQuantityPerLine, Math.max(CART_LIMITS.minQuantity, Math.floor(quantity)));
}

export function lineTotal(unitPrice: Money, quantity: number): Money {
  return unitPrice * quantity;
}

/**
 * Joins stored cart items with the current catalog. Items whose variant no longer
 * exists or is not purchasable are dropped, and quantities are clamped.
 */
export function resolveCartLines(items: CartItem[], products: Product[]): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of items) {
    if (!(item.quantity > 0)) continue;
    const match = findVariant(products, item.variantId);
    if (!match || !isPurchasable(match.product, match.variant)) continue;
    const quantity = clampQuantity(item.quantity);
    lines.push({
      variantId: item.variantId,
      quantity,
      product: match.product,
      variant: match.variant,
      unitPrice: match.variant.price,
      lineTotal: lineTotal(match.variant.price, quantity),
    });
  }
  return lines;
}

export function cartSubtotal(lines: CartLine[]): Money {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0);
}

export function cartUnits(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

/**
 * The pack deal: any `size` loose bags of the flavors the pack contains cost `price`.
 * Read from the pack product in the catalog, so its price is set in one place.
 */
export interface PackOffer {
  name: string;
  size: number;
  price: Money;
  /** Products whose bags count toward a pack. */
  productIds: string[];
}

export interface PackDiscount {
  packs: number;
  discount: Money;
  /** Loose bags still missing to complete one more pack (0 when none are pending). */
  bagsToNextPack: number;
}

const NO_PACK_DISCOUNT: PackDiscount = { packs: 0, discount: 0, bagsToNextPack: 0 };

export function getPackOffer(products: Product[]): PackOffer | null {
  for (const product of products) {
    if (!product.bundleItems?.length) continue;
    const variant = getDefaultVariant(product);
    if (!variant || !isPurchasable(product, variant)) continue;
    const size = product.bundleItems.reduce((sum, item) => sum + item.quantity, 0);
    if (size < 2) continue;
    return {
      name: product.name,
      size,
      price: variant.price,
      productIds: product.bundleItems.map((item) => item.productId),
    };
  }
  return null;
}

/**
 * Groups loose bags into packs. Mixing flavors is allowed (3 of one, 2 + 1, or one of each).
 * Pack lines already in the cart are priced as packs and never count again.
 * The most expensive bags are grouped first, so the customer always gets the best price.
 */
export function calculatePackDiscount(lines: CartLine[], offer: PackOffer | null): PackDiscount {
  if (!offer) return NO_PACK_DISCOUNT;
  const bagPrices = lines
    .filter((line) => !line.product.bundleItems?.length && offer.productIds.includes(line.product.id))
    .flatMap((line) => Array<Money>(line.quantity).fill(line.unitPrice))
    .sort((a, b) => b - a);

  // A pack that would not save anything is not offered.
  const fullPackPrice = bagPrices.slice(0, offer.size).reduce((sum, price) => sum + price, 0);
  if (bagPrices.length >= offer.size && fullPackPrice <= offer.price) return NO_PACK_DISCOUNT;

  const packs = Math.floor(bagPrices.length / offer.size);
  const leftover = bagPrices.length % offer.size;
  const grouped = bagPrices.slice(0, packs * offer.size).reduce((sum, price) => sum + price, 0);
  return {
    packs,
    discount: Math.max(0, grouped - packs * offer.price),
    bagsToNextPack: leftover === 0 ? 0 : offer.size - leftover,
  };
}

export function calculateTotals(
  lines: CartLine[],
  shipping: ShippingQuote,
  packOffer: PackOffer | null = null,
): OrderTotals {
  const subtotal = cartSubtotal(lines);
  const { packs, discount } = calculatePackDiscount(lines, packOffer);
  const shippingAmount = shipping.status === "fixed" ? shipping.amount : 0;
  return {
    subtotal,
    discount,
    packs,
    shipping,
    total: subtotal - discount + shippingAmount,
    totalIsFinal: shipping.status === "fixed",
    units: cartUnits(lines),
  };
}
