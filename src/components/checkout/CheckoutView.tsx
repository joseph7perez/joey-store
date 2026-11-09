"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { Button } from "@/components/ui/Button";
import { PAYMENT_METHODS } from "@/config/payments.config";
import { PRIVACY_POLICY_PATH, SOCIAL_LINKS } from "@/config/site";
import { WHATSAPP_PHONE } from "@/config/whatsapp.config";
import { useCart } from "@/hooks/useCart";
import { buildOrderDraft } from "@/lib/orders/build-order";
import { submitOrder } from "@/lib/orders/submit-order";
import { calculateTotals } from "@/lib/pricing/pricing";
import { getShippingQuote } from "@/lib/shipping/shipping";
import { checkoutSchema, type CheckoutFormInput, type CheckoutFormOutput } from "@/lib/validation/checkout.schema";
import { CustomerFields } from "./CustomerFields";
import { DeliveryFields } from "./DeliveryFields";
import { OrderSummary } from "./OrderSummary";
import { PaymentMethodField } from "./PaymentMethodField";
import { WhatsAppHandoff } from "./WhatsAppHandoff";

const EMPTY_FORM: CheckoutFormInput = {
  fullName: "",
  phone: "",
  documentId: "",
  city: "",
  address: "",
  neighborhood: "",
  notes: "",
  paymentMethod: undefined as unknown as CheckoutFormInput["paymentMethod"],
};

function CheckoutHeader() {
  return (
    <header>
      <h1 className="text-5xl font-semibold sm:text-6xl">Tu pedido</h1>
      <p className="mt-3 max-w-xl text-lg text-cacao-soft">
        Completa tus datos y te llevamos a WhatsApp con el pedido listo para enviar.
      </p>
    </header>
  );
}

export function CheckoutView() {
  const { lines, packOffer, hasHydrated, isEmpty, clear } = useCart();
  const [handoff, setHandoff] = useState<{ reference: string; url: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<CheckoutFormInput, unknown, CheckoutFormOutput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: EMPTY_FORM,
    mode: "onTouched",
  });
 
  const [city, paymentMethod] = useWatch({ control: form.control, name: ["city", "paymentMethod"] });
  const totals = calculateTotals(lines, getShippingQuote(city), packOffer);

  const canSubmit = !isEmpty && WHATSAPP_PHONE !== null;

  const onSubmit = async (data: CheckoutFormOutput) => {
    setSubmitError(null);
    if (isEmpty) {
      setSubmitError("Tu carrito está vacío. Agrega al menos un producto.");
      return;
    }
    const result = await submitOrder(buildOrderDraft({ lines, checkout: data, packOffer }));
    if (!result.ok) {
      setSubmitError("No pudimos abrir WhatsApp porque el número de JOEY no está configurado.");
      return;
    }
    setHandoff({ reference: result.reference, url: result.url });
    window.scrollTo({ top: 0 });
    // A "noopener" window.open always returns null, so detach the opener manually.
    const opened = window.open(result.url, "_blank");
    if (opened) opened.opener = null;
    else window.location.assign(result.url); // Pop-up blocked: continue in this tab.
  };

  if (!hasHydrated) {
    return (
      <>
        <CheckoutHeader />
        <div aria-busy="true" aria-live="polite" className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <span className="sr-only">Cargando tu carrito…</span>
          <div className="h-[32rem] animate-pulse rounded-[2rem] bg-lavender/60" />
          <div className="h-72 animate-pulse rounded-[2rem] bg-lavender/60" />
        </div>
      </>
    );
  }

  if (handoff) {
    return (
      <WhatsAppHandoff
        reference={handoff.reference}
        whatsappUrl={handoff.url}
        onSent={() => {
          clear();
          form.reset(EMPTY_FORM);
        }}
        onEdit={() => setHandoff(null)}
      />
    );
  }

  if (isEmpty) {
    return (
      <>
        <CheckoutHeader />
        <div className="mt-10 rounded-[2rem] bg-lavender">
          <EmptyCart />
        </div>
      </>
    );
  }

  return (
    <FormProvider {...form}>
      <CheckoutHeader />
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 grid items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14"
      >
        <div className="space-y-8">
          <CustomerFields />
          <DeliveryFields />
          <PaymentMethodField />
        </div>

        <div className="space-y-5 lg:sticky lg:top-24">
          <OrderSummary lines={lines} totals={totals} payment={paymentMethod ? PAYMENT_METHODS[paymentMethod] : undefined} />

          {WHATSAPP_PHONE === null && (
            <p role="alert" className="rounded-2xl border-[1.5px] border-danger/40 bg-white p-4 text-sm text-danger">
              En este momento no podemos recibir pedidos desde la web. Escríbenos por Instagram{" "}
              {SOCIAL_LINKS[0]?.handle ?? ""} para hacer tu pedido.
            </p>
          )}
          {submitError && (
            <p role="alert" className="rounded-2xl border-[1.5px] border-danger/40 bg-white p-4 text-sm text-danger">
              {submitError}
            </p>
          )}
          {form.formState.submitCount > 0 && Object.keys(form.formState.errors).length > 0 && (
            <p role="alert" className="text-sm text-danger">
              Revisa los campos marcados para continuar.
            </p>
          )}

          <Button type="submit" size="lg" className="w-full cursor-pointer" disabled={!canSubmit || form.formState.isSubmitting}>
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.7-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
            </svg>
            Finalizar pedido en WhatsApp
          </Button>
          <p className="text-center text-sm leading-snug text-cacao-soft">
            Te llevaremos a WhatsApp con tu pedido listo. Lo envías tú y JOEY lo confirma por ese chat.
          </p>
          <p className="text-center text-xs leading-snug text-cacao-soft">
            Al enviar tu pedido autorizas el tratamiento de tus datos según nuestra{" "}
            <Link
              href={PRIVACY_POLICY_PATH}
              target="_blank"
              className="font-medium text-cacao underline underline-offset-2 hover:text-cacao-soft"
            >
              política de tratamiento de datos
            </Link>
            .
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
