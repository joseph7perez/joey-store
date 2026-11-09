import { formatCOP } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { ProductVariant } from "@/types/product";

/** Price and presentation in the dashed bubble from JOEY's price sheet. */
export function PriceTag({
  variant,
  accent,
  className,
  size = "md",
}: {
  variant: ProductVariant;
  accent: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div
      className={cn("bubble inline-flex flex-col bg-milk text-cacao", size === "lg" ? "px-5 py-3" : "px-3.5 py-2", className)}
      style={{ borderColor: accent }}
    >
      <span className={cn("font-display leading-none font-semibold tabular-nums", size === "lg" ? "text-3xl" : "text-xl")}>
        {formatCOP(variant.price)}
      </span>
      <span className={cn("mt-1 leading-none text-cacao-soft", size === "lg" ? "text-base" : "text-sm")}>
        {variant.presentation.label}
      </span>
    </div>
  );
}
