"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Product } from "@/types/product";

const CatalogContext = createContext<Product[] | null>(null);

/**
 * Makes the catalog loaded on the server available to client components
 * (cart, checkout). The data source stays in `lib/catalog/catalog.ts`.
 */
export function CatalogProvider({ products, children }: { products: Product[]; children: ReactNode }) {
  return <CatalogContext.Provider value={products}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): Product[] {
  const products = useContext(CatalogContext);
  if (!products) throw new Error("useCatalog must be used inside <CatalogProvider>.");
  return products;
}
