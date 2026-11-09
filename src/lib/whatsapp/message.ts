import { PAYMENT_METHODS } from "@/config/payments.config";
import { SHIPPING_PENDING_LABEL } from "@/config/shipping.config";
import { formatCOP } from "@/lib/utils/format";
import type { OrderDraft } from "@/types/order";

/** Removes WhatsApp formatting characters from customer-typed text. */
function plain(value: string): string {
  return value.replace(/[*_~`]/g, "");
}

/**
 * Builds the order message the customer sends to JOEY on WhatsApp.
 * Uses WhatsApp's *bold* syntax for section titles and stays readable as plain text.
 */
export function formatOrderMessage(order: OrderDraft): string {
  const { totals, customer, delivery } = order;
  const payment = PAYMENT_METHODS[order.paymentMethod];

  const products = order.lines.map(
    (line) =>
      `• ${line.quantity} × ${line.name} (${line.presentation})\n   ${formatCOP(line.unitPrice)} c/u = ${formatCOP(line.lineTotal)}`,
  );

  const shippingLine =
    totals.shipping.status === "fixed"
      ? `Envío: ${formatCOP(totals.shipping.amount)}`
      : `Envío: ${SHIPPING_PENDING_LABEL}`;

  const totalLine = totals.totalIsFinal
    ? `*Total: ${formatCOP(totals.total)}*`
    : `*Total: ${formatCOP(totals.total)} + envío*`;

  const deliveryLines = [
    `Ciudad: ${plain(delivery.city)}`,
    `Dirección: ${plain(delivery.address)}`,
    delivery.neighborhood ? `Barrio: ${plain(delivery.neighborhood)}` : null,
    delivery.notes ? `Indicaciones: ${plain(delivery.notes)}` : null,
  ].filter((line): line is string => line !== null);

  const paymentLines = [`Método: ${payment.label}`, payment.whatsappNote ?? null].filter(
    (line): line is string => line !== null,
  );

  return [
    "¡Hola, JOEY! Quiero hacer este pedido:",
    "",
    `*Pedido ${order.reference}*`,
    "",
    "*Productos*",
    ...products,
    "",
    "*Resumen*",
    `Subtotal (${totals.units} ${totals.units === 1 ? "unidad" : "unidades"}): ${formatCOP(totals.subtotal)}`,
    ...(totals.discount > 0 ? [`Descuento Pack x3 (×${totals.packs}): -${formatCOP(totals.discount)}`] : []),
    shippingLine,
    totalLine,
    "",
    "*Mis datos*",
    `Nombre: ${plain(customer.fullName)}`,
    `Celular: ${customer.phone}`,
    `Cédula: ${customer.documentId}`,
    "",
    "*Entrega*",
    ...deliveryLines,
    "",
    "*Pago*",
    ...paymentLines,
    "",
    "Quedo pendiente de la confirmación de mi pedido.",
  ].join("\n");
}
