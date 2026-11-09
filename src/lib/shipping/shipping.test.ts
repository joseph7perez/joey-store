import { describe, expect, it } from "vitest";
import { getShippingQuote } from "./shipping";

const zones = [
  { id: "local", label: "Envío local", cities: ["Bogotá"], fee: 8000 },
  { id: "nacional", label: "Envío nacional", cities: ["Medellín"], fee: 15000 },
];

describe("getShippingQuote", () => {
  it("matches cities ignoring accents, casing and extra spaces", () => {
    expect(getShippingQuote("  bogota ", zones)).toEqual({ status: "fixed", amount: 8000, zoneLabel: "Envío local" });
    expect(getShippingQuote("MEDELLÍN", zones)).toMatchObject({ status: "fixed", amount: 15000 });
  });

  it("returns pending for cities without a configured fee", () => {
    expect(getShippingQuote("Pasto", zones)).toEqual({ status: "pending", reason: "city-not-covered" });
  });

  it("returns pending when no shipping policy is configured", () => {
    expect(getShippingQuote("Bogotá", [])).toEqual({ status: "pending", reason: "policy-not-configured" });
  });

  it("returns pending when the city is empty", () => {
    expect(getShippingQuote("", zones)).toEqual({ status: "pending", reason: "city-missing" });
  });
});
