import type { Metadata } from "next";
import Link from "next/link";
import { JoeyMascot } from "@/components/mascot/JoeyMascot";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/catalog/catalog";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Compra Joey! Cookie Granola: Choco chips, Frutos rojos, Choco maní y el Pack x3. Pagas contraentrega o por transferencia y confirmas tu pedido por WhatsApp.",
  alternates: { canonical: "/productos" },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16 lg:px-10">
      <h1 className="text-5xl font-semibold sm:text-6xl">Tienda</h1>
      <p className="mt-4 max-w-xl text-lg text-cacao-soft">
        Cookie granola en bolsas de 270 g. Elige tu sabor o lleva los tres en el Pack x3.
      </p>

      {products.length === 0 ? (
        <div className="mt-12 rounded-[2rem] bg-lavender p-10 text-center">
          <p className="font-display text-2xl">No hay productos disponibles en este momento.</p>
          <p className="mt-2 text-cacao-soft">
            Vuelve pronto o escríbenos desde la sección de{" "}
            <Link href="#contacto" className="underline underline-offset-4">
              contacto
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <JoeyMascot defaultStop="tienda" />
    </div>
  );
}
