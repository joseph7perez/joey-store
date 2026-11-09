"use client";

import { Drawer } from "@/components/ui/Drawer";
import { ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatCOP, pluralize } from "@/lib/utils/format";
import { useCartStore } from "@/store/cart.store";
import { CartLineItem } from "./CartLineItem";
import { EmptyCart } from "./EmptyCart";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const { lines, subtotal, total, packOffer, packDiscount, units, isEmpty, setQuantity, remove } = useCart();
  const bagPrice = lines.find((line) => packOffer?.productIds.includes(line.product.id))?.unitPrice;
  const nextPackSavings =
    packOffer && bagPrice !== undefined ? bagPrice * packOffer.size - packOffer.price : 0;

  return (
    <Drawer open={isOpen} onClose={close} label="Carrito de compras">
      <div className="flex items-center justify-between border-b border-dashed border-line px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-2xl">Tu carrito</h2>
          {!isEmpty && <p className="text-sm text-cacao-soft">{pluralize(units, "producto", "productos")}</p>}
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar carrito"
          className="grid size-11 place-items-center rounded-full transition-colors hover:bg-cacao/8"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {isEmpty ? (
        <EmptyCart onNavigate={close} />
      ) : (
        <>
          <ul className="flex-1 divide-y divide-dashed divide-line overflow-y-auto overscroll-contain px-5 sm:px-6">
            {lines.map((line) => (
              <CartLineItem
                key={line.variantId}
                line={line}
                onQuantityChange={(quantity) => setQuantity(line.variantId, quantity)}
                onRemove={() => remove(line.variantId)}
                onNavigate={close}
              />
            ))}
          </ul>
          <div className="border-t border-dashed border-line bg-white/60 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
            {packDiscount.discount > 0 && packOffer && (
              <dl className="mb-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-cacao-soft">Productos</dt>
                  <dd className="tabular-nums">{formatCOP(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-cacao-soft">
                    Descuento {packOffer.name}
                    {packDiscount.packs > 1 ? ` (×${packDiscount.packs})` : ""}
                  </dt>
                  <dd className="font-medium text-cacao tabular-nums">-{formatCOP(packDiscount.discount)}</dd>
                </div>
              </dl>
            )}
            <div className="flex items-baseline justify-between">
              <span className="text-cacao-soft">Subtotal</span>
              <span className="text-xl font-medium tabular-nums">{formatCOP(total)}</span>
            </div>
            {packOffer && packDiscount.bagsToNextPack > 0 && nextPackSavings > 0 && (
              <p className="mt-2 rounded-xl bg-lavender px-3 py-2 text-sm">
                Agrega {pluralize(packDiscount.bagsToNextPack, "bolsa más", "bolsas más")} de cualquier sabor y ahorra{" "}
                <span className="font-medium tabular-nums">{formatCOP(nextPackSavings)}</span> con el {packOffer.name}.
              </p>
            )}
            <p className="mt-1 text-sm text-cacao-soft">El envío se calcula con tu ciudad en el siguiente paso.</p>
            <ButtonLink href="/checkout" onClick={close} size="lg" className="mt-4 w-full">
              Continuar con el pedido
            </ButtonLink>
          </div>
        </>
      )}
    </Drawer>
  );
}
