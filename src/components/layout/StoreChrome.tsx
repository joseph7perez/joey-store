import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingCartButton } from "./FloatingCartButton";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Store frame: header, footer and cart. Shared by the (tienda) layout and the
 * root not-found page, which renders outside the route groups.
 */
export function StoreChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingCartButton />
      <CartDrawer />
    </>
  );
}
