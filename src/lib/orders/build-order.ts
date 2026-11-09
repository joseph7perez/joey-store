import { calculateTotals, type PackOffer } from "@/lib/pricing/pricing";
import { getShippingQuote } from "@/lib/shipping/shipping";
import type { CartLine } from "@/types/cart";
import type { CheckoutData } from "@/types/checkout";
import type { OrderDraft } from "@/types/order";

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O, 1/I

/** Short, human-friendly reference so the team can match the WhatsApp chat to the order. */
export function createOrderReference(randomValues?: Uint32Array): string {
  const values = randomValues ?? crypto.getRandomValues(new Uint32Array(5));
  const code = Array.from(values, (v) => REFERENCE_ALPHABET[v % REFERENCE_ALPHABET.length]).join("");
  return `JOEY-${code}`;
}

export class EmptyCartError extends Error {
  constructor() {
    super("El carrito está vacío.");
    this.name = "EmptyCartError";
  }
}

/** Single-line text: collapses line breaks and repeated spaces typed by the customer. */
function clean(value: string | undefined): string | undefined {
  const text = value?.replace(/\s+/g, " ").trim();
  return text ? text : undefined;
}

export function buildOrderDraft(params: {
  lines: CartLine[];
  checkout: CheckoutData;
  packOffer?: PackOffer | null;
  reference?: string;
  now?: Date;
}): OrderDraft {
  const { lines, checkout } = params;
  if (lines.length === 0) throw new EmptyCartError();

  const totals = calculateTotals(lines, getShippingQuote(checkout.city), params.packOffer ?? null);

  return {
    reference: params.reference ?? createOrderReference(),
    createdAt: (params.now ?? new Date()).toISOString(),
    lines: lines.map((line) => ({
      productId: line.product.id,
      variantId: line.variant.id,
      sku: line.variant.sku,
      name: line.product.name,
      presentation: line.variant.presentation.label,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      lineTotal: line.lineTotal,
    })),
    totals,
    customer: {
      fullName: clean(checkout.fullName) ?? "",
      phone: checkout.phone,
      documentId: checkout.documentId,
    },
    delivery: {
      city: clean(checkout.city) ?? "",
      address: clean(checkout.address) ?? "",
      neighborhood: clean(checkout.neighborhood),
      notes: clean(checkout.notes),
    },
    paymentMethod: checkout.paymentMethod,
  };
}
