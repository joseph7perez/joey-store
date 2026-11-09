import { Logo } from "./Logo";

/**
 * Checkout header: only the centered logo, linking home. No navigation or cart,
 * so nothing pulls the customer away from finishing the order.
 */
export function CheckoutSiteHeader() {
  return (
    <header className="border-b border-cacao/8 bg-milk">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-4 sm:h-[4.5rem]">
        <Logo eager className="h-8 sm:h-9" />
      </div>
    </header>
  );
}
