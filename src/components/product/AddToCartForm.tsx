"use client";

import { useState } from "react";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatCOP } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { ProductVariant } from "@/types/product";
import { AddToCartButton } from "./AddToCartButton";

/** Presentation (only when there is more than one), quantity and add to cart. */
export function AddToCartForm({ productName, variants }: { productName: string; variants: ProductVariant[] }) {
  const [variantId, setVariantId] = useState(variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const selected = variants.find((v) => v.id === variantId) ?? variants[0];
  if (!selected) return null;

  return (
    <div className="space-y-5">
      {variants.length > 1 && (
        <fieldset>
          <legend className="text-sm font-medium">Presentación</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {variants.map((variant) => (
              <label
                key={variant.id}
                className={cn(
                  "cursor-pointer rounded-full border-[1.5px] px-4 py-2 text-sm transition-colors has-focus-visible:outline-2",
                  variant.id === selected.id ? "border-cacao bg-cacao text-milk" : "border-cacao/25 hover:border-cacao",
                )}
              >
                <input
                  type="radio"
                  name="presentation"
                  value={variant.id}
                  checked={variant.id === selected.id}
                  onChange={() => setVariantId(variant.id)}
                  className="sr-only"
                />
                {variant.presentation.label} · {formatCOP(variant.price)}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} label={`Cantidad de ${productName}`} />
        <div className="min-w-[13rem] flex-1">
          <AddToCartButton
            variantId={selected.id}
            productName={productName}
            quantity={quantity}
            size="lg"
            className="w-full"
          />
        </div>
      </div>
      {quantity > 1 && (
        <p className="text-sm text-cacao-soft tabular-nums">
          {quantity} × {formatCOP(selected.price)} = {formatCOP(selected.price * quantity)}
        </p>
      )}
    </div>
  );
}
