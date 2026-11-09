export type PaymentMethodId = "cash_on_delivery" | "bank_transfer";

/** The checkout form values, after validation. Never persisted in the browser. */
export interface CheckoutData {
  fullName: string;
  phone: string;
  documentId: string;
  city: string;
  address: string;
  neighborhood?: string;
  notes?: string;
  paymentMethod: PaymentMethodId;
}
