import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { getDefaultVariant } from "@/lib/catalog/catalog-utils";
import { formatCOP } from "@/lib/utils/format";
import type { Product } from "@/types/product";

/** Opening section: the brand's own manifesto over the lavender split of its price sheet. */
export function Hero({ products }: { products: Product[] }) {
  const flavors = products.filter((p) => !p.bundleItems?.length).slice(0, 3);
  const prices = flavors.map((p) => getDefaultVariant(p)?.price ?? 0).filter((price) => price > 0);
  const fromPrice = prices.length ? Math.min(...prices) : null;
  const [left, center, right] = [flavors[1], flavors[0], flavors[2]];

  return (
    <section data-joey="hero" aria-labelledby="hero-title" className="grid lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col justify-center bg-lavender px-4 pt-12 pb-14 sm:px-8 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
        {/* <p className="font-display text-xl text-lavender-ink sm:text-2xl" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
          Cookie Granola
        </p> */}
        <h1
          id="hero-title"
          className="mt-4 max-w-[17ch] text-[2.5rem] leading-[1.04] font-semibold sm:text-[3.4rem] lg:text-[3.6rem] xl:text-[4.1rem]"
        >
          Transformamos el mundo de las cookies, y la convertimos en granola.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-cacao-soft sm:mt-6 sm:text-lg">
          Clusters crujientes, trozos irresistibles e ingredientes seleccionados
          <span className="sm:hidden">.</span>
          <span className="hidden sm:inline">
            : avena sin gluten, chía, fibra de achicoria, miel de agave, azúcar de coco, cremas de frutos secos,
            chocolate 70% cacao y frutas deshidratadas.
          </span>
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
          <ButtonLink href="#sabores" size="lg" className="px-5 sm:px-7">
            Elegir mi sabor
          </ButtonLink>
          <ButtonLink href="#pack" size="lg" variant="secondary" className="px-5 sm:px-7">
            Ver el Pack x3
          </ButtonLink>
        </div>
        {fromPrice !== null && (
          <p className="mt-5 text-sm text-cacao-soft">Bolsas de 270 g desde {formatCOP(fromPrice)}</p>
        )}
      </div>

      <div className="relative flex items-center justify-center overflow-hidden bg-lavender-deep px-4 py-14 sm:py-20 lg:py-0">
        <div className="relative aspect-[5/4] w-full max-w-[34rem]">
          {left && (
            <div className="absolute top-[14%] left-0 w-[40%] -rotate-[7deg] overflow-hidden rounded-[1.4rem] shadow-[0_24px_50px_rgb(74_55_41/0.28)]">
              <Image src={left.images[0].src} alt={left.images[0].alt} width={540} height={675} sizes="(min-width: 1024px) 220px, 40vw" />
            </div>
          )}
          {right && (
            <div className="absolute top-[14%] right-0 w-[40%] rotate-[7deg] overflow-hidden rounded-[1.4rem] shadow-[0_24px_50px_rgb(74_55_41/0.28)]">
              <Image src={right.images[0].src} alt={right.images[0].alt} width={540} height={675} sizes="(min-width: 1024px) 220px, 40vw" />
            </div>
          )}
          {center && (
            <div className="absolute top-0 left-1/2 z-10 w-[48%] -translate-x-1/2 overflow-hidden rounded-[1.6rem] shadow-[0_30px_60px_rgb(74_55_41/0.32)]">
              <Image
                src={center.images[0].src}
                alt={center.images[0].alt}
                width={540}
                height={675}
                sizes="(min-width: 1024px) 270px, 48vw"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
