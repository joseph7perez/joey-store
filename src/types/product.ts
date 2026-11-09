/**
 * Catalog domain types.
 *
 * Shaped after what the storefront needs today, while staying close to the ERP
 * (`api-erp-joeys`): every sellable unit is a variant with a stable `id` and `sku`,
 * so a future API can return the same shape and the UI keeps working.
 */

export type Money = number; // Colombian pesos (COP), integer values only.

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductPresentation {
  /** Human label shown in the UI, e.g. "270 g" or "3 bolsas de 270 g". */
  label: string;
  /** Net weight per sellable unit, when it applies. */
  weightGrams?: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  presentation: ProductPresentation;
  price: Money;
  isActive: boolean;
}

/** A short attribute printed on the packaging (e.g. "Gluten free"). */
export interface ProductBadge {
  id: "gluten-free" | "cacao-70" | "real-fruit" | "fiber" | "nut-butter";
  label: string;
}

export interface NutritionRow {
  label: string;
  amount: string;
  dailyValue?: string;
  /** Indented rows (e.g. "Grasa saturada" under "Grasa total"). */
  level?: 0 | 1 | 2;
}

export interface NutritionFacts {
  servingSize: string;
  servingsPerPackage: string;
  energy: string;
  rows: NutritionRow[];
  footnote?: string;
}

export interface BundleItem {
  productId: string;
  quantity: number;
}

/** Flavor colors, taken from each bag's split label. */
export interface ProductTheme {
  /** Saturated half of the label. */
  accent: string;
  /** Light half of the label. */
  soft: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Product line printed on the bag, e.g. "Cookie granola". */
  line: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  /** Claims printed on the packaging. Only real brand copy goes here. */
  highlights: string[];
  badges: ProductBadge[];
  ingredients?: string[];
  nutrition?: NutritionFacts;
  /** Present when the product is a pack of other products. */
  bundleItems?: BundleItem[];
  theme: ProductTheme;
  isActive: boolean;
  featured: boolean;
  sortOrder: number;
}
