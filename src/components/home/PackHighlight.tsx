import Link from "next/link";
import { PackBuilder } from "@/components/product/PackBuilder";
import { ProductVisual } from "@/components/product/ProductVisual";
import { getBundleProducts, getBundleSeparatePrice, getDefaultVariant } from "@/lib/catalog/catalog-utils";
import { formatCOP } from "@/lib/utils/format";
import type { Product } from "@/types/product";

/** "El favorito de Joey!": the Pack x3 from JOEY's price sheet. */
export function PackHighlight({ pack, products }: { pack: Product; products: Product[] }) {
  const variant = getDefaultVariant(pack);
  if (!variant) return null;
  const contents = getBundleProducts(pack, products);
  const separatePrice = getBundleSeparatePrice(pack, products);
  const savings = separatePrice !== null ? separatePrice - variant.price : 0;

  return (
    <section id="pack" data-joey="pack" aria-labelledby="pack-title" className="grid lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-lavender-deep px-4 pt-10 pb-10 sm:px-8 sm:pt-14 lg:py-20 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
        <div className="bubble self-start bg-lavender px-5 py-2.5 text-cacao" style={{ borderColor: "#fcfafd" }}>
          <p className="font-display text-2xl font-semibold sm:text-3xl">El favorito de Joey!</p>
        </div>
        <Link href={`/productos/${pack.slug}`} className="mt-8 block overflow-hidden rounded-4xl" aria-label={`Ver ${pack.name}`}>
          <ProductVisual product={pack} sizes="(min-width: 1024px) 40vw, 92vw" aspect="aspect-[5/4]" />
        </Link>
      </div>

      <div className="flex flex-col justify-center bg-lavender px-4 py-14 sm:px-8 lg:py-20 lg:pr-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pl-14">
        <h2 id="pack-title" className="max-w-[16ch] text-4xl leading-[1.05] font-semibold sm:text-5xl">
          ¿Por qué elegir uno si puedes probar los 3?
        </h2>
        <p className="mt-6 text-lg text-cacao-soft">
          3 bolsas de Cookie Granola a precio de pack: una de cada sabor, dos de uno y una de otro, o las 3 de tu favorito.
        </p>

        <div className="mt-10 border-t border-dashed border-lavender-deep pt-8">
          <p className="font-display text-sm text-lavender-ink">Pack x3</p>
          <p className="font-display text-4xl leading-none font-semibold tabular-nums sm:text-6xl">{formatCOP(variant.price)}</p>
          {savings > 0 && separatePrice !== null && (
            <p className="mt-3 text-cacao-soft">
              Por separado <s className="tabular-nums">{formatCOP(separatePrice)}</s>. Ahorras{" "}
              <span className="font-medium text-cacao tabular-nums">{formatCOP(savings)}</span>.
            </p>
          )}
          <PackBuilder
            packName={pack.name}
            size={contents.reduce((sum, { quantity }) => sum + quantity, 0)}
            flavors={contents.map(({ product }) => product)}
            className="mt-7 max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
