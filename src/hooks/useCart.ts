"use client";

import { useCallback, useMemo } from "react";
import { useCatalog } from "@/components/providers/CatalogProvider";
import { findVariant, isPurchasable } from "@/lib/catalog/catalog-utils";
import { calculatePackDiscount, cartSubtotal, cartUnits, getPackOffer, resolveCartLines } from "@/lib/pricing/pricing";
import { useCartStore } from "@/store/cart.store";
import type { CartItem } from "@/types/cart";

/** Cart lines joined with the catalog, plus actions that validate against it. */
export function useCart() {
  const products = useCatalog();
  const items = useCartStore((s) => s.items);
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const addItems = useCartStore((s) => s.addItems);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const open = useCartStore((s) => s.open);

  const lines = useMemo(() => resolveCartLines(items, products), [items, products]);
  const packOffer = useMemo(() => getPackOffer(products), [products]);
  const packDiscount = useMemo(() => calculatePackDiscount(lines, packOffer), [lines, packOffer]);

  /** Adds every item, or none if any of them is not purchasable. */
  const addMany = useCallback(
    (additions: CartItem[], options: { openCart?: boolean } = {}) => {
      const valid = additions.every(({ variantId }) => {
        const match = findVariant(products, variantId);
        return match !== null && isPurchasable(match.product, match.variant);
      });
      if (!valid || additions.length === 0) return false;
      addItems(additions);
      // The drawer stays closed by default: Joey's hop and the button's check confirm the add.
      if (options.openCart) open();
      return true;
    },
    [products, addItems, open],
  );

  const add = useCallback(
    (variantId: string, quantity = 1, options: { openCart?: boolean } = {}) =>
      addMany([{ variantId, quantity }], options),
    [addMany],
  );

  const subtotal = cartSubtotal(lines);

  return {
    lines,
    hasHydrated,
    subtotal,
    packOffer,
    packDiscount,
    total: subtotal - packDiscount.discount,
    units: cartUnits(lines),
    isEmpty: lines.length === 0,
    add,
    addMany,
    setQuantity,
    remove: removeItem,
    clear,
  };
}
