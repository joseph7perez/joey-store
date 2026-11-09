import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JoeyMascot } from "@/components/mascot/JoeyMascot";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { NutritionTable } from "@/components/product/NutritionTable";
import { PackBuilder } from "@/components/product/PackBuilder";
import { PriceTag } from "@/components/product/PriceTag";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductVisual } from "@/components/product/ProductVisual";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";
import { getProductBySlug, getProducts } from "@/lib/catalog/catalog";
import {
  getActiveVariants,
  getBundleProducts,
  getBundleSeparatePrice,
  getDefaultVariant,
} from "@/lib/catalog/catalog-utils";
import { formatCOP, formatList } from "@/lib/utils/format";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/productos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  const image = product.images[0];
  const title = `${product.name}, ${product.line}`;
  return {
    title,
    description: product.shortDescription,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: {
      title: `${title} | ${SITE.title}`,
      description: product.shortDescription,
      url: `/productos/${product.slug}`,
      images: image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined,
    },
  };
}

type ProductParams = PageProps<"/productos/[slug]">["params"];

// `params` is URL data: reading it outside <Suspense> blocks client navigations,
// even with generateStaticParams. The page shell stays static and the
// slug-dependent content streams in (prerendered slugs resolve immediately).
export default function ProductPage({ params }: PageProps<"/productos/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

function ProductSkeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando producto">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-10">
        <div className="h-5 w-48 animate-pulse rounded-full bg-lavender" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pt-10">
        <div className="aspect-[4/5] animate-pulse rounded-[2.25rem] bg-lavender" />
        <div className="space-y-5 lg:py-4">
          <div className="h-6 w-32 animate-pulse rounded-full bg-lavender" />
          <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-lavender" />
          <div className="h-10 w-40 animate-pulse rounded-full bg-lavender" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-lavender" />
          <div className="h-14 w-full animate-pulse rounded-full bg-lavender" />
        </div>
      </div>
    </div>
  );
}

async function ProductContent({ params }: { params: ProductParams }) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getProductBySlug(slug), getProducts()]);
  if (!product) notFound();

  const variants = getActiveVariants(product);
  const variant = getDefaultVariant(product);
  if (!variant) notFound();

  const bundleContents = getBundleProducts(product, products);
  const separatePrice = getBundleSeparatePrice(product, products);
  const others = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${product.name} ${product.line}`,
          description: product.description,
          image: product.images.map((img) => `${SITE.url}${img.src}`),
          sku: variant.sku,
          brand: { "@type": "Brand", name: SITE.title },
          offers: variants.map((v) => ({
            "@type": "Offer",
            sku: v.sku,
            price: v.price,
            priceCurrency: "COP",
            availability: "https://schema.org/InStock",
            url: `${SITE.url}/productos/${product.slug}`,
          })),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-10">
        <nav aria-label="Ruta de navegación" className="text-sm text-cacao-soft">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-cacao hover:underline">
                Inicio
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/productos" className="hover:text-cacao hover:underline">
                Tienda
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-cacao">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <article data-joey="producto" className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pt-10">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className="split-panel rounded-[2.25rem] p-4 sm:p-8"
            style={{ ["--split-a" as string]: product.theme.accent, ["--split-b" as string]: product.theme.soft }}
          >
            <ProductVisual
              product={product}
              eager
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="rounded-[1.6rem] shadow-[0_24px_50px_rgb(74_55_41/0.18)]"
            />
          </div>
        </div>

        <div className="lg:py-4">
          <p className="font-display text-xl text-cacao-soft">{product.line}</p>
          <h1 className="mt-1 text-5xl leading-[1] font-semibold sm:text-6xl">{product.name}</h1>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <PriceTag variant={variant} accent={product.theme.accent} size="lg" />
            {separatePrice !== null && separatePrice > variant.price && (
              <p className="text-cacao-soft">
                Por separado <s className="tabular-nums">{formatCOP(separatePrice)}</s>
                <br />
                Ahorras <span className="font-medium text-cacao tabular-nums">{formatCOP(separatePrice - variant.price)}</span>
              </p>
            )}
          </div>
          <p className="mt-7 max-w-[56ch] text-lg leading-relaxed">{product.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Atributos">
            {product.badges.map((b) => (
              <li key={b.id} className="rounded-full px-3 py-1.5 text-sm font-medium" style={{ backgroundColor: product.theme.soft }}>
                {b.label}
              </li>
            ))}
          </ul>

          {bundleContents.length > 0 ? (
            <PackBuilder
              packName={product.name}
              size={bundleContents.reduce((sum, { quantity }) => sum + quantity, 0)}
              flavors={bundleContents.map(({ product: item }) => item)}
              className="mt-8"
            />
          ) : (
            <div className="mt-9">
              <AddToCartForm productName={product.name} variants={variants} />
            </div>
          )}
          <p className="mt-4 text-sm text-cacao-soft">
            Pagas contraentrega o por transferencia. Tu pedido se confirma por WhatsApp.
          </p>

          <ul className="mt-10 border-t border-dashed border-line" aria-label="En el empaque">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-3 border-b border-dashed border-line py-3.5">
                <span aria-hidden className="size-1.5 rounded-full bg-cacao" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </article>

      {(product.ingredients?.length || product.nutrition) && (
        <section aria-labelledby="ingredientes-title" data-joey="ingredientes" className="bg-lavender">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-10">
            <div>
              <h2 id="ingredientes-title" className="text-4xl font-semibold sm:text-5xl">
                Hecho con ingredientes reales
              </h2>
              {product.ingredients?.length ? (
                <>
                  <h3 className="mt-8 font-sans text-base font-semibold">Ingredientes</h3>
                  <p className="mt-2 max-w-[60ch] text-lg leading-relaxed">{formatList(product.ingredients)}.</p>
                </>
              ) : null}
            </div>
            {product.nutrition && <NutritionTable nutrition={product.nutrition} />}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section aria-labelledby="otros-title" data-joey="otros" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
          <h2 id="otros-title" className="text-4xl font-semibold sm:text-5xl">
            {product.bundleItems?.length ? "Cada sabor por separado" : "Prueba también"}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {others.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
      {/* Mounted with the content so Joey finds the product's data-joey sections. */}
      <JoeyMascot defaultStop="producto" />
    </>
  );
}
