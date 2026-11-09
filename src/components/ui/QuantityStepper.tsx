"use client";

import { CART_LIMITS } from "@/config/cart.config";
import { cn } from "@/lib/utils/cn";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  /** Allow going below the minimum (used in the cart, where 0 removes the line). */
  allowZero?: boolean;
  /** Upper bound; defaults to the cart's per-line limit. */
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  label,
  allowZero,
  max = CART_LIMITS.maxQuantityPerLine,
  size = "md",
  className,
}: QuantityStepperProps) {
  const min = allowZero ? 0 : CART_LIMITS.minQuantity;
  const btn = cn(
    "grid place-items-center rounded-full text-cacao transition-colors hover:bg-cacao/10 disabled:opacity-30 disabled:hover:bg-transparent",
    size === "sm" ? "size-8" : "size-10",
  );

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-full border-[1.5px] border-cacao/25 bg-white/70",
        size === "sm" ? "p-0.5" : "p-1",
        className,
      )}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Quitar una unidad"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
          <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <output
        aria-live="polite"
        className={cn("min-w-8 text-center font-medium tabular-nums", size === "sm" ? "text-sm" : "text-base")}
      >
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Agregar una unidad"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
          <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
