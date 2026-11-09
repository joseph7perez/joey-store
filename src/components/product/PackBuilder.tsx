"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/hooks/useCart";
import { getDefaultVariant } from "@/lib/catalog/catalog-utils";
import { cn } from "@/lib/utils/cn";
import { pluralize } from "@/lib/utils/format";
import type { Product } from "@/types/product";

interface PackBuilderProps {
  packName: string;
  /** Bags per pack (3 for the Pack x3). */
  size: number;
  /** Flavors the customer can combine. */
  flavors: Product[];
  className?: string;
}

/**
 * "Arma tu pack": the customer picks any mix of flavors that adds up to the pack size
 * (3 of one, 2 + 1, or one of each). The bags go into the cart as loose bags and the
 * pack discount is applied by the pricing rule, so there is a single source of truth.
 */
export function PackBuilder({ packName, size, flavors, className }: PackBuilderProps) {
  const { addMany } = useCart();
  const choices = flavors.flatMap((product) => {
    const variant = getDefaultVariant(product);
    return variant ? [{ product, variant }] : [];
  });

  // Starts with one of each flavor, as the original pack.
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(choices.map(({ variant }, i) => [variant.id, i < size ? 1 : 0])),
  );
  const [status, setStatus] = useState<"idle" | "added" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 1800);
    return () => clearTimeout(timer);
  }, [status]);

  const chosen = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const missing = size - chosen;
  const isComplete = missing === 0;

  const handleAdd = () => {
    const additions = Object.entries(counts)
      .filter(([, quantity]) => quantity > 0)
      .map(([variantId, quantity]) => ({ variantId, quantity }));
    setStatus(isComplete && addMany(additions) ? "added" : "error");
  };

  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="font-sans text-base font-semibold">Arma tu pack</legend>
      <p className="mt-1 text-sm text-cacao-soft">
        Elige {size} bolsas: combina sabores o lleva {size} del mismo.
      </p>

      <ul className="mt-3 divide-y divide-dashed divide-line border-y border-dashed border-line">
        {choices.map(({ product, variant }) => {
          const value = counts[variant.id] ?? 0;
          return (
            <li key={product.id} className="flex items-center gap-4 py-3">
              <span
                className="relative block h-16 w-13 shrink-0 overflow-hidden rounded-xl"
                style={{ backgroundColor: product.theme.soft }}
              >
                {product.images[0] && <Image src={product.images[0].src} alt="" fill sizes="52px" className="object-cover" />}
              </span>
              <span className="min-w-0 flex-1">
                <Link href={`/productos/${product.slug}`} className="font-display text-xl hover:underline">
                  {product.name}
                </Link>
                <span className="block text-sm text-cacao-soft">{variant.presentation.label}</span>
              </span>
              <QuantityStepper
                size="sm"
                allowZero
                value={value}
                // Each flavor can grow only while the pack still has room.
                max={value + Math.max(0, missing)}
                onChange={(next) => setCounts((prev) => ({ ...prev, [variant.id]: next }))}
                label={`Bolsas de ${product.name} en el ${packName}`}
              />
            </li>
          );
        })}
      </ul>

      <p aria-live="polite" className={cn("mt-3 text-sm tabular-nums", isComplete ? "text-cacao" : "text-cacao-soft")}>
        {isComplete
          ? `Listo: ${size} bolsas, precio de ${packName}.`
          : `Llevas ${chosen} de ${size}. Elige ${pluralize(missing, "bolsa más", "bolsas más")}.`}
      </p>

      <Button
        size="lg"
        className="relative mt-4 w-full"
        disabled={!isComplete}
        onClick={handleAdd}
        aria-label={`Agregar ${packName} al carrito`}
      >
        <span className={cn("transition-opacity", status === "added" && "opacity-0")}>Agregar pack al carrito</span>
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-1.5 transition-opacity",
            status === "added" ? "opacity-100" : "opacity-0",
          )}
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Agregado
        </span>
      </Button>
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm text-danger">
          Este pack no está disponible en este momento.
        </p>
      )}
    </fieldset>
  );
}
