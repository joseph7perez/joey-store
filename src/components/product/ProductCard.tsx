import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { getDefaultVariant } from "@/lib/catalog/catalog-utils";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./AddToCartButton";
import { PriceTag } from "./PriceTag";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const variant = getDefaultVariant(product);
  if (!variant) return null;
  const href = `/productos/${product.slug}`;

  return (
    <article
      className={cn("group flex flex-col rounded-[2rem] p-2.5 pb-4 sm:p-3 sm:pb-5", className)}
      style={{ backgroundColor: product.theme.soft }}
    >
      <Link href={href} className="relative block overflow-hidden rounded-[1.6rem]" tabIndex={-1} aria-hidden>
        <ProductVisual
          product={product}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          aspect="aspect-[5/6]"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        />
      </Link>
      <div className="relative flex flex-1 flex-col px-2.5 pt-4 sm:px-3">
        <PriceTag variant={variant} accent={product.theme.accent} className="absolute -top-14 right-3" />
        {/* <p className="text-sm text-cacao-soft">{product.line}</p> */}
        <h3 className="mt-0.5 text-[1.7rem] leading-[1.05]">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none sm:hover:underline sm:decoration-1 sm:underline-offset-4">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 max-w-[34ch] text-[0.95rem] leading-relaxed text-cacao-soft">{product.shortDescription}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Atributos">
          {product.badges.map((b) => (
            <li key={b.id} className="rounded-full bg-milk/80 px-2.5 py-1 text-xs font-medium">
              {b.label}
            </li>
          ))}
        </ul>
        <div className="relative z-10 mt-auto flex items-center gap-3 pt-5">
          {product.bundleItems?.length ? (
            // Packs are built flavor by flavor on their page.
            <ButtonLink href={href} className="flex-1">
              Arma tu pack
            </ButtonLink>
          ) : (
            <>
              <AddToCartButton variantId={variant.id} productName={product.name} className="flex-1" />
              <Link
                href={href}
                className="rounded-full px-3 py-2 text-[0.95rem] font-medium underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                Ver detalles<span className="sr-only"> de {product.name}</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
