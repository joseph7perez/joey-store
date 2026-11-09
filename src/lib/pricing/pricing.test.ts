import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/lib/catalog/products.data";
import { getBundleSeparatePrice } from "@/lib/catalog/catalog-utils";
import { calculatePackDiscount, calculateTotals, clampQuantity, getPackOffer, resolveCartLines } from "./pricing";

describe("resolveCartLines", () => {
  it("prices lines from the catalog, not from stored data", () => {
    const lines = resolveCartLines(
      [
        { variantId: "var_choco-chips_270g", quantity: 2 },
        { variantId: "var_pack-x3", quantity: 1 },
      ],
      PRODUCTS,
    );
    expect(lines.map((l) => [l.product.name, l.unitPrice, l.lineTotal])).toEqual([
      ["Choco chips", 29900, 59800],
      ["Pack x3", 82900, 82900],
    ]);
  });

  it("drops unknown variants and non-positive quantities", () => {
    const lines = resolveCartLines(
      [
        { variantId: "var_does-not-exist", quantity: 1 },
        { variantId: "var_choco-mani_270g", quantity: 0 },
        { variantId: "var_frutos-rojos_270g", quantity: -3 },
        { variantId: "var_frutos-rojos_270g", quantity: Number.NaN },
      ],
      PRODUCTS,
    );
    expect(lines).toEqual([]);
  });

  it("drops inactive variants", () => {
    const catalog = PRODUCTS.map((p) =>
      p.slug === "choco-mani" ? { ...p, variants: p.variants.map((v) => ({ ...v, isActive: false })) } : p,
    );
    expect(resolveCartLines([{ variantId: "var_choco-mani_270g", quantity: 1 }], catalog)).toEqual([]);
  });

  it("clamps quantities to the allowed range", () => {
    expect(clampQuantity(500)).toBe(99);
    expect(clampQuantity(2.7)).toBe(2);
    expect(clampQuantity(0)).toBe(1);
  });
});

describe("calculateTotals", () => {
  const offer = getPackOffer(PRODUCTS);
  const lines = resolveCartLines(
    [
      { variantId: "var_choco-chips_270g", quantity: 2 },
      { variantId: "var_frutos-rojos_270g", quantity: 1 },
    ],
    PRODUCTS,
  );

  it("adds a fixed shipping fee to the total", () => {
    const totals = calculateTotals(lines, { status: "fixed", amount: 8000, zoneLabel: "Local" });
    expect(totals).toMatchObject({ subtotal: 89700, discount: 0, total: 97700, totalIsFinal: true, units: 3 });
  });

  it("keeps the total equal to the subtotal while shipping is pending", () => {
    const totals = calculateTotals(lines, { status: "pending", reason: "policy-not-configured" });
    expect(totals).toMatchObject({ subtotal: 89700, total: 89700, totalIsFinal: false, units: 3 });
  });

  it("subtracts the pack discount before adding shipping", () => {
    const totals = calculateTotals(lines, { status: "fixed", amount: 8000, zoneLabel: "Local" }, offer);
    expect(totals).toMatchObject({ subtotal: 89700, discount: 6800, packs: 1, total: 90900, units: 3 });
  });
});

describe("pack x3 discount", () => {
  const offer = getPackOffer(PRODUCTS)!;
  const discountFor = (items: Array<[string, number]>) =>
    calculatePackDiscount(
      resolveCartLines(
        items.map(([variantId, quantity]) => ({ variantId, quantity })),
        PRODUCTS,
      ),
      offer,
    );

  it("reads the pack size and price from the catalog", () => {
    expect(offer).toMatchObject({ size: 3, price: 82900, name: "Pack x3" });
  });

  it("applies to 3 bags of the same flavor", () => {
    expect(discountFor([["var_choco-mani_270g", 3]])).toEqual({ packs: 1, discount: 6800, bagsToNextPack: 0 });
  });

  it("applies to 2 of one flavor and 1 of another", () => {
    expect(discountFor([["var_choco-chips_270g", 2], ["var_frutos-rojos_270g", 1]])).toMatchObject({
      packs: 1,
      discount: 6800,
    });
  });

  it("applies to one bag of each flavor", () => {
    expect(
      discountFor([["var_choco-chips_270g", 1], ["var_frutos-rojos_270g", 1], ["var_choco-mani_270g", 1]]),
    ).toMatchObject({ packs: 1, discount: 6800 });
  });

  it("charges leftover bags at full price and says how many complete the next pack", () => {
    expect(discountFor([["var_choco-chips_270g", 4]])).toEqual({ packs: 1, discount: 6800, bagsToNextPack: 2 });
    expect(discountFor([["var_choco-chips_270g", 5]])).toEqual({ packs: 1, discount: 6800, bagsToNextPack: 1 });
    expect(discountFor([["var_choco-chips_270g", 2]])).toEqual({ packs: 0, discount: 0, bagsToNextPack: 1 });
  });

  it("makes as many packs as there are groups of 3", () => {
    expect(discountFor([["var_choco-chips_270g", 4], ["var_choco-mani_270g", 2]])).toEqual({
      packs: 2,
      discount: 13600,
      bagsToNextPack: 0,
    });
  });

  it("does not count a pack line toward new packs", () => {
    expect(discountFor([["var_pack-x3", 1], ["var_choco-chips_270g", 2]])).toEqual({
      packs: 0,
      discount: 0,
      bagsToNextPack: 1,
    });
  });

  it("has no offer when the pack is not purchasable", () => {
    const catalog = PRODUCTS.map((p) => (p.slug === "pack-x3" ? { ...p, isActive: false } : p));
    expect(getPackOffer(catalog)).toBeNull();
    expect(calculatePackDiscount(resolveCartLines([{ variantId: "var_choco-chips_270g", quantity: 3 }], catalog), null))
      .toEqual({ packs: 0, discount: 0, bagsToNextPack: 0 });
  });
});

describe("bundle pricing", () => {
  it("computes what the pack contents cost separately", () => {
    const pack = PRODUCTS.find((p) => p.slug === "pack-x3")!;
    expect(getBundleSeparatePrice(pack, PRODUCTS)).toBe(89700);
  });
});
