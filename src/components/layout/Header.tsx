import Link from "next/link";
import { NAV_LINKS } from "@/config/site";
import { CartButton } from "./CartButton";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/** Links that only fit in the desktop bar from a wider breakpoint (they stay in the mobile menu and footer). */
const DESKTOP_ONLY_FROM: Record<string, string> = {
  "/#momentos": "hidden lg:block",
  "/#mayoristas": "hidden xl:block",
};

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-cacao/8 bg-milk/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:h-[4.5rem] sm:px-6 lg:px-10">
        <Logo eager className="h-8 sm:h-9" />
        <nav aria-label="Principal" className="ml-10 hidden md:block">
          <ul className="flex items-center gap-1 text-[0.95rem]">
            <li>
              <Link href="/productos" className="rounded-full px-3.5 py-2 transition-colors hover:bg-cacao/7">
                Tienda
              </Link>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href} className={DESKTOP_ONLY_FROM[link.href]}>
                <Link href={link.href} className="rounded-full px-3.5 py-2 transition-colors hover:bg-cacao/7">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {/* On mobile the cart lives in FloatingCartButton, within thumb reach. */}
          <div className="hidden md:block">
            <CartButton />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
