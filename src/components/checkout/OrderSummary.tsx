import Image from "next/image";
import { SHIPPING_PENDING_LABEL } from "@/config/shipping.config";
import { formatCOP, pluralize } from "@/lib/utils/format";
import type { CartLine } from "@/types/cart";
import type { OrderTotals } from "@/types/order";
import type { PaymentMethodConfig } from "@/config/payments.config";

export function OrderSummary({
  lines,
  totals,
  payment,
}: {
  lines: CartLine[];
  totals: OrderTotals;
  payment?: PaymentMethodConfig;
}) {
  return (
    <section aria-labelledby="resumen-title" className="rounded-[2rem] bg-lavender p-5 sm:p-7">
      <h2 id="resumen-title" className="text-2xl font-semibold">
        Resumen del pedido
      </h2>
      <ul className="mt-5 divide-y divide-dashed divide-lavender-deep/60">
        {lines.map((line) => (
          <li key={line.variantId} className="flex gap-3 py-3.5 first:pt-0">
            <span className="relative h-16 w-13 shrink-0 overflow-hidden rounded-xl" style={{ backgroundColor: line.product.theme.soft }}>
              {line.product.images[0] && (
                <Image src={line.product.images[0].src} alt="" fill sizes="52px" className="object-cover" />
              )}
              <span className="absolute -top-0 -right-0 grid min-w-5 place-items-center rounded-bl-lg bg-cacao px-1 text-[0.7rem] leading-5 font-semibold text-milk tabular-nums">
                {line.quantity}
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-tight">{line.product.name}</p>
              <p className="text-sm text-cacao-soft">
                {line.variant.presentation.label} · {line.quantity} × {formatCOP(line.unitPrice)}
              </p>
            </div>
            <p className="font-medium tabular-nums">{formatCOP(line.lineTotal)}</p>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2 border-t border-dashed border-lavender-deep pt-4">
        <div className="flex justify-between gap-4">
          <dt className="text-cacao-soft">Subtotal ({pluralize(totals.units, "unidad", "unidades")})</dt>
          <dd className="tabular-nums">{formatCOP(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between gap-4">
            <dt className="text-cacao-soft">
              Descuento Pack x3{totals.packs > 1 ? ` (×${totals.packs})` : ""}
            </dt>
            <dd className="font-medium tabular-nums">-{formatCOP(totals.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <dt className="text-cacao-soft">Envío</dt>
          <dd className="text-right tabular-nums">
            {totals.shipping.status === "fixed" ? formatCOP(totals.shipping.amount) : SHIPPING_PENDING_LABEL}
          </dd>
        </div>
        {payment && (
          <div className="flex justify-between gap-4">
            <dt className="text-cacao-soft">Pago</dt>
            <dd className="text-right">{payment.label}</dd>
          </div>
        )}
        <div className="flex items-baseline justify-between gap-4 border-t border-dashed border-lavender-deep pt-3">
          <dt className="font-medium">{totals.totalIsFinal ? "Total" : "Total sin envío"}</dt>
          <dd className="font-display text-3xl font-semibold tabular-nums">{formatCOP(totals.total)}</dd>
        </div>
      </dl>
      {!totals.totalIsFinal && (
        <p className="mt-3 text-sm leading-snug text-cacao-soft">
          El costo de envío a tu ciudad te lo confirmamos por WhatsApp antes de despachar.
        </p>
      )}
    </section>
  );
}
