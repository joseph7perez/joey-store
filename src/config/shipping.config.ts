import type { Money } from "@/types/product";

export interface ShippingZone {
  id: string;
  label: string;
  /** City names as customers write them. Matching ignores accents and casing. */
  cities: string[];
  fee: Money;
}

/**
 * Shipping by city.
 *
 * PENDING: JOEY has not defined its cities and fees yet. While `zones` is empty,
 * every order shows "Envío por confirmar" and the team quotes it on WhatsApp.
 *
 * Example once the policy exists:
 *   { id: "local", label: "Envío local", cities: ["Bogotá"], fee: 8000 },
 *   { id: "nacional", label: "Envío nacional", cities: ["Medellín", "Cali"], fee: 15000 },
 */
export const SHIPPING_ZONES: ShippingZone[] = [];

/** Text shown when the customer's city has no configured fee. */
export const SHIPPING_PENDING_LABEL = "Por confirmar en WhatsApp";
