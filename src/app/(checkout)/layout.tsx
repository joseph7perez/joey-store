import { CheckoutSiteHeader } from "@/components/layout/CheckoutSiteHeader";

/** Focused checkout frame: centered logo, no footer, no cart drawer. */
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CheckoutSiteHeader />
      <main id="contenido" className="flex-1">
        {children}
      </main>
    </>
  );
}
