import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Finalizar pedido",
  description: "Completa tus datos de entrega y envía tu pedido de Joey! Cookie Granola por WhatsApp.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14 lg:px-10">
      <CheckoutView />
    </div>
  );
}
