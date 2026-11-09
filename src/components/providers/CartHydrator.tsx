"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart.store";

/** Loads the saved cart after the first render, so server and client markup match. */
export function CartHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
  return null;
}
