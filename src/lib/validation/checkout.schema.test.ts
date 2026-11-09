import { describe, expect, it } from "vitest";
import { checkoutSchema, type CheckoutFormInput } from "./checkout.schema";

const valid: CheckoutFormInput = {
  fullName: "  Ana María Gómez ",
  phone: "+57 300 123 4567",
  documentId: "1.020.304.050",
  city: "Bogotá",
  address: "Calle 10 # 20-30, apto 401",
  neighborhood: "",
  notes: "",
  paymentMethod: "bank_transfer",
};

const errorsFor = (input: Partial<CheckoutFormInput>) => {
  const result = checkoutSchema.safeParse({ ...valid, ...input });
  return result.success ? {} : Object.fromEntries(result.error.issues.map((i) => [i.path.join("."), i.message]));
};

describe("checkoutSchema", () => {
  it("normalizes valid input", () => {
    expect(checkoutSchema.parse(valid)).toEqual({
      fullName: "Ana María Gómez",
      phone: "3001234567",
      documentId: "1020304050",
      city: "Bogotá",
      address: "Calle 10 # 20-30, apto 401",
      neighborhood: undefined,
      notes: undefined,
      paymentMethod: "bank_transfer",
    });
  });

  it("rejects missing required fields", () => {
    const errors = errorsFor({ fullName: " ", city: "", address: "" });
    expect(Object.keys(errors).sort()).toEqual(["address", "city", "fullName"]);
  });

  it("rejects phones that are not Colombian mobiles", () => {
    expect(errorsFor({ phone: "6011234567" })).toHaveProperty("phone");
    expect(errorsFor({ phone: "300123" })).toHaveProperty("phone");
    expect(errorsFor({ phone: "300 123 4567" })).toEqual({});
  });

  it("rejects invalid document numbers", () => {
    expect(errorsFor({ documentId: "123" })).toHaveProperty("documentId");
    expect(errorsFor({ documentId: "12345678901" })).toHaveProperty("documentId");
  });

  it("requires a known payment method", () => {
    expect(errorsFor({ paymentMethod: "crypto" as never })).toHaveProperty("paymentMethod");
    expect(errorsFor({ paymentMethod: undefined as never })).toHaveProperty("paymentMethod");
  });
});
