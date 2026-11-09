"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CART_STORAGE_KEY } from "@/config/cart.config";
import { clampQuantity } from "@/lib/pricing/pricing";
import type { CartItem } from "@/types/cart";

/** No-op storage while rendering on the server. */
const serverStorage = { getItem: () => null, setItem: () => undefined, removeItem: () => undefined };

/**
 * Cart state. Stores only variant ids and quantities; it knows nothing about
 * prices, checkout or WhatsApp. Catalog validation happens in `useCart`.
 */
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  /** Increments on every add, so decorative UI (the Joey mascot) can react. */
  addCount: number;
  addItem: (variantId: string, quantity?: number) => void;
  /** Adds several items as a single action (e.g. the bags of a pack). */
  addItems: (items: CartItem[]) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      addCount: 0,
      addItem: (variantId, quantity = 1) => get().addItems([{ variantId, quantity }]),
      addItems: (additions) =>
        set((state) => {
          let items = state.items;
          for (const { variantId, quantity } of additions) {
            if (!(quantity > 0)) continue;
            const existing = items.find((item) => item.variantId === variantId);
            items = existing
              ? items.map((item) =>
                  item.variantId === variantId ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item,
                )
              : [...items, { variantId, quantity: clampQuantity(quantity) }];
          }
          // One add, one mascot hop, even when several bags go in together.
          return { items, addCount: state.addCount + 1 };
        }),
      setQuantity: (variantId, quantity) =>
        set((state) => ({
          items:
            quantity < 1
              ? state.items.filter((item) => item.variantId !== variantId)
              : state.items.map((item) =>
                  item.variantId === variantId ? { ...item, quantity: clampQuantity(quantity) } : item,
                ),
        })),
      removeItem: (variantId) =>
        set((state) => ({ items: state.items.filter((item) => item.variantId !== variantId) })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => (typeof window === "undefined" ? serverStorage : window.localStorage)),
      // Only identifiers and quantities are persisted. No prices, no personal data.
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => {
        const raw = (persisted as { items?: unknown } | undefined)?.items;
        const items = Array.isArray(raw)
          ? raw.filter(
              (item): item is CartItem =>
                typeof item === "object" &&
                item !== null &&
                typeof (item as CartItem).variantId === "string" &&
                typeof (item as CartItem).quantity === "number" &&
                (item as CartItem).quantity > 0,
            )
          : [];
        return { ...current, items };
      },
      // Rehydrated on mount by <CartHydrator/> to keep server and client HTML identical.
      skipHydration: true,
      onRehydrateStorage: () => () => {
        useCartStore.setState({ hasHydrated: true });
      },
    },
  ),
);
