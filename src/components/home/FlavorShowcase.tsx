import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

export function FlavorShowcase({ products }: { products: Product[] }) {
  const flavors = products.filter((p) => !p.bundleItems?.length);

  return (
    <section id="sabores" data-joey="sabores" aria-labelledby="sabores-title" className="mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 sm:pt-28 sm:pb-28 lg:px-10">
      <div className="max-w-2xl">
        <h2 id="sabores-title" className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
          El sabor de una cookie en granola.
        </h2>
        <p className="mt-4 text-lg text-cacao-soft">
          Tres sabores en bolsas de 270 g. Hechos con ingredientes reales y con mantequilla de nueces real.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {flavors.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
