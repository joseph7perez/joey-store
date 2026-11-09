import type { Product } from "@/types/product";
import { PRODUCTS } from "./products.data";

/**
 * Catalog access for Server Components.
 *
 * This is the only module that knows where products come from. Today it reads the
 * local data file; when the NestJS API exists, replace the body of `getProducts`
 * with a `fetch` to `/products` and keep the same return type.
 */
export async function getProducts(): Promise<Product[]> {
  "use cache";
  return PRODUCTS.filter((product) => product.isActive && product.variants.some((v) => v.isActive)).sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.featured);
}
