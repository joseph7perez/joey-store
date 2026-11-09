import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/lib/catalog/products.data";
import { buildOrderDraft, createOrderReference, EmptyCartError } from "@/lib/orders/build-order";
import { submitOrder } from "@/lib/orders/submit-order";
import { getPackOffer, resolveCartLines } from "@/lib/pricing/pricing";
import type { CheckoutData } from "@/types/checkout";
import { buildWhatsAppUrl, normalizeWhatsAppPhone } from "./link";
import { formatOrderMessage } from "./message";

const checkout: CheckoutData = {
  fullName: "Ana María\n Gómez",
  phone: "3001234567",
  documentId: "1020304050",
  city: "Bogotá",
  address: "Calle 10 # 20-30",
  neighborhood: "Chapinero",
  notes: "Dejar en *portería*",
  paymentMethod: "bank_transfer",
};

const lines = resolveCartLines(
  [
    { variantId: "var_choco-chips_270g", quantity: 2 },
    { variantId: "var_pack-x3", quantity: 1 },
  ],
  PRODUCTS,
);

const draft = buildOrderDraft({
  lines,
  checkout,
  reference: "JOEY-TEST1",
  now: new Date("2026-11-01T12:00:00Z"),
});

describe("normalizeWhatsAppPhone", () => {
  it("keeps digits in international format", () => {
    expect(normalizeWhatsAppPhone("+57 300-123-4567")).toBe("573001234567");
  });
  it("rejects empty or too short values", () => {
    expect(normalizeWhatsAppPhone(undefined)).toBeNull();
    expect(normalizeWhatsAppPhone("")).toBeNull();
    expect(normalizeWhatsAppPhone("12345")).toBeNull();
  });
});

describe("buildOrderDraft", () => {
  it("snapshots lines and totals", () => {
    expect(draft.lines.map((l) => [l.sku, l.quantity, l.unitPrice, l.lineTotal])).toEqual([
      ["JOEY-CC-270", 2, 29900, 59800],
      ["JOEY-PACK3", 1, 82900, 82900],
    ]);
    expect(draft.totals).toMatchObject({ subtotal: 142700, total: 142700, totalIsFinal: false, units: 3 });
    expect(draft.customer.fullName).toBe("Ana María Gómez");
  });

  it("refuses an empty cart", () => {
    expect(() => buildOrderDraft({ lines: [], checkout })).toThrow(EmptyCartError);
  });

  it("creates readable references", () => {
    expect(createOrderReference()).toMatch(/^JOEY-[A-Z2-9]{5}$/);
  });
});

describe("formatOrderMessage", () => {
  const message = formatOrderMessage(draft);

  it("contains products, totals, customer, delivery and payment", () => {
    expect(message).toBe(
      [
        "¡Hola, JOEY! Quiero hacer este pedido:",
        "",
        "*Pedido JOEY-TEST1*",
        "",
        "*Productos*",
        "• 2 × Choco chips (270 g)",
        "   $29.900 c/u = $59.800",
        "• 1 × Pack x3 (3 bolsas de 270 g)",
        "   $82.900 c/u = $82.900",
        "",
        "*Resumen*",
        "Subtotal (3 unidades): $142.700",
        "Envío: Por confirmar en WhatsApp",
        "*Total: $142.700 + envío*",
        "",
        "*Mis datos*",
        "Nombre: Ana María Gómez",
        "Celular: 3001234567",
        "Cédula: 1020304050",
        "",
        "*Entrega*",
        "Ciudad: Bogotá",
        "Dirección: Calle 10 # 20-30",
        "Barrio: Chapinero",
        "Indicaciones: Dejar en portería",
        "",
        "*Pago*",
        "Método: Transferencia bancaria",
        "Por favor compártanme los datos bancarios para hacer la transferencia.",
        "",
        "Quedo pendiente de la confirmación de mi pedido.",
      ].join("\n"),
    );
  });

  it("shows the pack x3 discount in the summary", () => {
    const packMessage = formatOrderMessage(
      buildOrderDraft({
        lines: resolveCartLines(
          [
            { variantId: "var_choco-chips_270g", quantity: 2 },
            { variantId: "var_choco-mani_270g", quantity: 1 },
          ],
          PRODUCTS,
        ),
        checkout,
        packOffer: getPackOffer(PRODUCTS),
        reference: "JOEY-TEST3",
      }),
    );
    expect(packMessage).toContain(
      ["Subtotal (3 unidades): $89.700", "Descuento Pack x3 (×1): -$6.800", "Envío: Por confirmar en WhatsApp", "*Total: $82.900 + envío*"].join("\n"),
    );
  });

  it("identifies cash on delivery and omits empty optional fields", () => {
    const cod = formatOrderMessage(
      buildOrderDraft({
        lines,
        checkout: { ...checkout, paymentMethod: "cash_on_delivery", neighborhood: undefined, notes: undefined },
        reference: "JOEY-TEST2",
      }),
    );
    expect(cod).toContain("Método: Contraentrega");
    expect(cod).not.toContain("datos bancarios");
    expect(cod).not.toContain("Barrio:");
    expect(cod).not.toContain("Indicaciones:");
  });
});

describe("submitOrder", () => {
  it("builds an encoded wa.me link that decodes to the message", async () => {
    const result = await submitOrder(draft, "573001234567");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const url = new URL(result.url);
    expect(url.origin + url.pathname).toBe("https://wa.me/573001234567");
    expect(url.searchParams.get("text")).toBe(formatOrderMessage(draft));
    expect(buildWhatsAppUrl("573001234567", "a & b")).toBe("https://wa.me/573001234567?text=a%20%26%20b");
  });

  it("fails clearly when the WhatsApp number is not configured", async () => {
    expect(await submitOrder(draft, null)).toEqual({ ok: false, reason: "whatsapp-not-configured" });
  });
});
