import { ButtonLink } from "@/components/ui/Button";
import { JoeySvg } from "@/components/mascot/JoeySvg";

export function EmptyCart({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center">
      <JoeySvg pose="peek" className="h-28 w-auto" />
      <p className="mt-5 font-display text-2xl">Tu carrito está vacío</p>
      <p className="mt-2 max-w-xs text-cacao-soft">Elige tus sabores y aquí verás tu pedido antes de enviarlo.</p>
      <ButtonLink href="/productos" onClick={onNavigate} className="mt-6">
        Ver los sabores
      </ButtonLink>
    </div>
  );
}
