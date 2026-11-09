"use client";

import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart.store";

export function CartButton() {
  const { units, hasHydrated } = useCart();
  const open = useCartStore((s) => s.open);
  const count = hasHydrated ? units : 0;

  return (
    <button
      type="button"
      onClick={open}
      className="relative inline-flex h-11 items-center gap-2 rounded-full bg-cacao pr-4 pl-3.5 text-[0.95rem] font-medium text-milk transition-[background-color,transform] hover:bg-[#3b2b20] active:scale-[0.97]"
      aria-label={count > 0 ? `Abrir carrito, ${count} ${count === 1 ? "producto" : "productos"}` : "Abrir carrito"}
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" strokeLinejoin="round" />
        <path d="M9 10V7a3 3 0 0 1 6 0v3" strokeLinecap="round" />
      </svg>
      <span className="hidden sm:inline">Carrito</span>
      <span
        aria-hidden
        className="grid min-w-6 place-items-center rounded-full bg-milk px-1.5 text-xs leading-6 font-semibold text-cacao tabular-nums"
      >
        {count}
      </span>
    </button>
  );
}
