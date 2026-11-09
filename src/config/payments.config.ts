import type { PaymentMethodId } from "@/types/checkout";

export interface PaymentMethodConfig {
  id: PaymentMethodId;
  label: string;
  description: string;
  /** Line added to the WhatsApp message for this method. */
  whatsappNote?: string;
}

export const PAYMENT_METHODS: Record<PaymentMethodId, PaymentMethodConfig> = {
  cash_on_delivery: {
    id: "cash_on_delivery",
    label: "Contraentrega",
    description: "Pagas cuando recibes tu pedido.",
  },
  bank_transfer: {
    id: "bank_transfer",
    label: "Transferencia bancaria",
    description: "Te compartimos los datos bancarios por WhatsApp para que hagas la transferencia.",
    whatsappNote: "Por favor compártanme los datos bancarios para hacer la transferencia.",
  },
};

export const PAYMENT_METHOD_IDS = Object.keys(PAYMENT_METHODS) as [PaymentMethodId, ...PaymentMethodId[]];
