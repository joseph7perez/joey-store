"use client";

import Image from "next/image";
import Link from "next/link";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatCOP } from "@/lib/utils/format";
import type { CartLine } from "@/types/cart";

interface CartLineItemProps {
  line: CartLine;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onNavigate?: () => void;
}

export function CartLineItem({ line, onQuantityChange, onRemove, onNavigate }: CartLineItemProps) {
  const { product, variant } = line;
  const image = product.images[0];

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/productos/${product.slug}`}
        onClick={onNavigate}
        className="relative block h-24 w-20 shrink-0 overflow-hidden rounded-2xl"
        style={{ backgroundColor: product.theme.soft }}
        tabIndex={-1}
        aria-hidden
      >
        {image && <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/productos/${product.slug}`}
              onClick={onNavigate}
              className="font-display text-lg leading-tight hover:underline"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-sm text-cacao-soft">
              {product.line} · {variant.presentation.label}
            </p>
          </div>
          <p className="shrink-0 font-medium tabular-nums">{formatCOP(line.lineTotal)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <QuantityStepper
            size="sm"
            value={line.quantity}
            onChange={onQuantityChange}
            label={`Cantidad de ${product.name}`}
            allowZero
          />
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-cacao-soft underline-offset-4 hover:text-cacao hover:underline"
          >
            Quitar<span className="sr-only"> {product.name}</span>
          </button>
        </div>
        {line.quantity > 1 && (
          <p className="mt-1.5 text-xs text-cacao-faint tabular-nums">{formatCOP(line.unitPrice)} c/u</p>
        )}
      </div>
    </li>
  );
}
