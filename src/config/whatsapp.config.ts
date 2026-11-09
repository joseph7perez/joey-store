import { normalizeWhatsAppPhone } from "@/lib/whatsapp/link";

/**
 * JOEY's commercial WhatsApp number, from NEXT_PUBLIC_WHATSAPP_PHONE
 * (international format, digits only, e.g. 573001234567).
 * `null` when missing or invalid: checkout then blocks order submission.
 */
export const WHATSAPP_PHONE = normalizeWhatsAppPhone(process.env.NEXT_PUBLIC_WHATSAPP_PHONE);
