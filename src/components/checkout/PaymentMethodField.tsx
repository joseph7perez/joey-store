"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { PAYMENT_METHODS } from "@/config/payments.config";
import type { CheckoutFormInput } from "@/lib/validation/checkout.schema";
import { cn } from "@/lib/utils/cn";

export function PaymentMethodField() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CheckoutFormInput>();
  const selected = useWatch({ control, name: "paymentMethod" });
  const error = errors.paymentMethod?.message;

  return (
    <fieldset aria-describedby={error ? "payment-error" : undefined}>
      <legend className="font-display text-2xl font-semibold">Pago</legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {Object.values(PAYMENT_METHODS).map((method) => (
          <label
            key={method.id}
            className={cn(
              "relative flex cursor-pointer gap-3 rounded-2xl border-[1.5px] bg-white p-4 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-cacao",
              selected === method.id ? "border-cacao" : "border-cacao/20 hover:border-cacao/45",
              error && "border-danger",
            )}
          >
            <input type="radio" value={method.id} {...register("paymentMethod")} className="peer sr-only" />
            <span
              aria-hidden
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] border-cacao",
                selected === method.id && "bg-cacao",
              )}
            >
              {selected === method.id && <span className="size-2 rounded-full bg-milk" />}
            </span>
            <span>
              <span className="block font-medium">{method.label}</span>
              <span className="mt-1 block text-sm leading-snug text-cacao-soft">{method.description}</span>
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id="payment-error" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
