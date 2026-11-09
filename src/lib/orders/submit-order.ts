import { WHATSAPP_PHONE } from "@/config/whatsapp.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp/link";
import { formatOrderMessage } from "@/lib/whatsapp/message";
import type { OrderDraft } from "@/types/order";

export type SubmitOrderResult =
  | { ok: true; channel: "whatsapp"; reference: string; url: string }
  | { ok: false; reason: "whatsapp-not-configured" };

/**
 * Order submission boundary. Today the order travels as a WhatsApp message the
 * customer sends manually, so nothing is confirmed here. When the backend exists,
 * this becomes `POST /orders` (the server recalculates prices) and the UI keeps
 * calling the same function.
 */
export async function submitOrder(
  order: OrderDraft,
  phone: string | null = WHATSAPP_PHONE,
): Promise<SubmitOrderResult> {
  if (!phone) return { ok: false, reason: "whatsapp-not-configured" };
  return {
    ok: true,
    channel: "whatsapp",
    reference: order.reference,
    url: buildWhatsAppUrl(phone, formatOrderMessage(order)),
  };
}
