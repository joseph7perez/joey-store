/**
 * Normalizes a WhatsApp number to international format, digits only (e.g. 573001234567).
 * Returns null when the value cannot be a valid international number.
 */
export function normalizeWhatsAppPhone(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

export function buildWhatsAppUrl(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
