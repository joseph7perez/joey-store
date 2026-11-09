import type { PaymentMethodId } from "./checkout";
import type { Money } from "./product";

export type ShippingQuote =
  | { status: "fixed"; amount: Money; zoneLabel: string }
  | { status: "pending"; reason: string };

export interface OrderTotals {
  /** Every line at its full price, before discounts. */
  subtotal: Money;
  /** Pack x3 savings on loose bags (0 when no pack applies). */
  discount: Money;
  /** How many packs the discount covers. */
  packs: number;
  shipping: ShippingQuote;
  /** Subtotal − discount + shipping when shipping is known; otherwise without shipping. */
  total: Money;
  totalIsFinal: boolean;
  units: number;
}

/** Snapshot of a cart line at the moment the order is built. */
export interface OrderLine {
  productId: string;
  variantId: string;
  sku: string;
  name: string;
  presentation: string;
  quantity: number;
  unitPrice: Money;
  lineTotal: Money;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  documentId: string;
}

export interface OrderDelivery {
  city: string;
  address: string;
  neighborhood?: string;
  notes?: string;
}

/**
 * Everything needed to place an order. Today it becomes a WhatsApp message;
 * later the same object is the payload for `POST /orders`, where the server
 * recalculates prices and totals from its own catalog.
 */
export interface OrderDraft {
  reference: string;
  createdAt: string;
  lines: OrderLine[];
  totals: OrderTotals;
  customer: OrderCustomer;
  delivery: OrderDelivery;
  paymentMethod: PaymentMethodId;
}
