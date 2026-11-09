import { z } from "zod";
import { PAYMENT_METHOD_IDS } from "@/config/payments.config";

const digitsOnly = (value: string) => value.replace(/\D/g, "");

/** Accepts "300 123 4567", "+57 300-123-4567"… and keeps the 10-digit mobile number. */
const colombianMobile = z
  .string()
  .transform((value) => {
    const digits = digitsOnly(value);
    return digits.length === 12 && digits.startsWith("57") ? digits.slice(2) : digits;
  })
  .pipe(z.string().regex(/^3\d{9}$/, "Escribe un celular de 10 dígitos que empiece por 3."));

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .transform((value) => (value ? value : undefined))
    .optional();

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Escribe tu nombre completo.")
    .max(80, "El nombre puede tener hasta 80 caracteres."),
  phone: colombianMobile,
  documentId: z
    .string()
    .transform(digitsOnly)
    .pipe(z.string().regex(/^\d{6,10}$/, "Escribe tu número de cédula, entre 6 y 10 dígitos.")),
  city: z
    .string()
    .trim()
    .min(2, "Escribe la ciudad de entrega.")
    .max(60, "La ciudad puede tener hasta 60 caracteres."),
  address: z
    .string()
    .trim()
    .min(5, "Escribe la dirección de entrega.")
    .max(120, "La dirección puede tener hasta 120 caracteres."),
  neighborhood: optionalText(60, "El barrio puede tener hasta 60 caracteres."),
  notes: optionalText(300, "Las indicaciones pueden tener hasta 300 caracteres."),
  paymentMethod: z.enum(PAYMENT_METHOD_IDS, { error: "Elige cómo quieres pagar." }),
});

export type CheckoutFormInput = z.input<typeof checkoutSchema>;
export type CheckoutFormOutput = z.output<typeof checkoutSchema>;
