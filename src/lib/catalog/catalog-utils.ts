import type { Money, Product, ProductVariant } from "@/types/product";

/** Pure helpers over an already-loaded catalog. Safe to use on server and client. */

export function getActiveVariants(product: Product): ProductVariant[] {
  return product.variants.filter((variant) => variant.isActive);
}

export function getDefaultVariant(product: Product): ProductVariant | null {
  return getActiveVariants(product)[0] ?? null;
}

export function findVariant(
  products: Product[],
  variantId: string,
): { product: Product; variant: ProductVariant } | null {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}

export function isPurchasable(product: Product, variant: ProductVariant): boolean {
  return product.isActive && variant.isActive && variant.price > 0;
}

/** Products contained in a pack, resolved from the catalog. */
export function getBundleProducts(bundle: Product, products: Product[]): Array<{ product: Product; quantity: number }> {
  return (bundle.bundleItems ?? []).flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
}

/** What the pack contents cost when bought separately, or null if it cannot be computed. */
export function getBundleSeparatePrice(bundle: Product, products: Product[]): Money | null {
  const contents = getBundleProducts(bundle, products);
  if (!bundle.bundleItems?.length || contents.length !== bundle.bundleItems.length) return null;
  let total = 0;
  for (const { product, quantity } of contents) {
    const variant = getDefaultVariant(product);
    if (!variant) return null;
    total += variant.price * quantity;
  }
  return total;
}
