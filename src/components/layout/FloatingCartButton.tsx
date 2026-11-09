"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils/cn";
import { useCartStore } from "@/store/cart.store";

/**
 * Mobile-only cart button, bottom right within thumb reach (Joey sits bottom left).
 * Bounces when something is added, since adding no longer opens the drawer.
 * Hidden while the drawer is open. Not mounted on checkout: it lives in the (tienda) frame.
 */
export function FloatingCartButton() {
  const { units, hasHydrated } = useCart();
  const open = useCartStore((s) => s.open);
  const isOpen = useCartStore((s) => s.isOpen);
  const addCount = useCartStore((s) => s.addCount);
  const count = hasHydrated ? units : 0;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const bouncedFor = useRef(addCount);
  useEffect(() => {
    if (addCount === bouncedFor.current) return;
    bouncedFor.current = addCount;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    buttonRef.current?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.14)", offset: 0.35 }, { transform: "scale(1)" }],
      { duration: 420, easing: "cubic-bezier(0.33, 0, 0.2, 1)" },
    );
    badgeRef.current?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.35)", offset: 0.4 }, { transform: "scale(1)" }],
      { duration: 420, delay: 80, easing: "cubic-bezier(0.33, 0, 0.2, 1)" },
    );
  }, [addCount]);

  return (
    <div
      className={cn(
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 transition-[opacity,translate] duration-300 md:hidden",
        isOpen ? "pointer-events-none translate-y-6 opacity-0" : "opacity-100",
      )}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={open}
        tabIndex={isOpen ? -1 : undefined}
        aria-label={count > 0 ? `Abrir carrito, ${count} ${count === 1 ? "producto" : "productos"}` : "Abrir carrito"}
        className="relative grid size-14 place-items-center rounded-full bg-cacao text-milk shadow-[0_10px_24px_rgb(74_55_41/0.28)] transition-[background-color,scale] hover:bg-[#3b2b20] active:scale-[0.95]"
      >
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" strokeLinejoin="round" />
          <path d="M9 10V7a3 3 0 0 1 6 0v3" strokeLinecap="round" />
        </svg>
        <span
          ref={badgeRef}
          aria-hidden
          className="absolute -top-1 -right-1 grid min-w-6 place-items-center rounded-full border-2 border-cacao bg-milk px-1.5 text-xs leading-5 font-semibold text-cacao tabular-nums"
        >
          {count}
        </span>
      </button>
    </div>
  );
}
