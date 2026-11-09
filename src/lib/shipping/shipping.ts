import { SHIPPING_ZONES, type ShippingZone } from "@/config/shipping.config";
import type { ShippingQuote } from "@/types/order";

export function normalizeCityName(city: string): string {
  return city
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Shipping fee for a city. Unknown cities, an empty city, or an empty zone list
 * return a "pending" quote: the fee is then agreed on WhatsApp.
 */
export function getShippingQuote(city: string | undefined, zones: ShippingZone[] = SHIPPING_ZONES): ShippingQuote {
  const normalized = city ? normalizeCityName(city) : "";
  if (!normalized) return { status: "pending", reason: "city-missing" };

  const zone = zones.find((z) => z.cities.some((c) => normalizeCityName(c) === normalized));
  if (!zone) return { status: "pending", reason: zones.length ? "city-not-covered" : "policy-not-configured" };

  return { status: "fixed", amount: zone.fee, zoneLabel: zone.label };
}

/** City names with a configured fee, for input suggestions. */
export function getConfiguredCities(zones: ShippingZone[] = SHIPPING_ZONES): string[] {
  return zones.flatMap((zone) => zone.cities);
}
