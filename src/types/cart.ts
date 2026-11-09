import type { Money, Product, ProductVariant } from "./product";

/**
 * What the browser stores: only stable identifiers and quantities.
 * Names and prices are always resolved from the catalog, never trusted from storage.
 */
export interface CartItem {
  variantId: string;
  quantity: number;
}

/** A cart item joined with current catalog data, ready to render or price. */
export interface CartLine {
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
  unitPrice: Money;
  lineTotal: Money;
}
