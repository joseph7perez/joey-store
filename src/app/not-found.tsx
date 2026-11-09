import { StoreChrome } from "@/components/layout/StoreChrome";
import { JoeySvg } from "@/components/mascot/JoeySvg";
import { ButtonLink } from "@/components/ui/Button";

// Rendered by the root layout, outside the route groups, so it brings the store frame itself.
export default function NotFound() {
  return (
    <StoreChrome>
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <JoeySvg pose="peek" className="h-36 w-auto" />
        <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">No encontramos esta página</h1>
        <p className="mt-4 text-lg text-cacao-soft">Puede que el enlace esté mal escrito o que el producto ya no esté disponible.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/productos">Ver la tienda</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Ir al inicio
          </ButtonLink>
        </div>
      </div>
    </StoreChrome>
  );
}
