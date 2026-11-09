import Link from "next/link";
import { NAV_LINKS, PRIVACY_POLICY_PATH, SITE, SOCIAL_LINKS } from "@/config/site";
import { WHATSAPP_PHONE } from "@/config/whatsapp.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="contacto" className="bg-cacao text-milk">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-28 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div className="max-w-sm">
          <Logo light height={44} className="h-11" />
          <p className="mt-6 text-milk/80">
            Joey nació para acompañarte donde estés. <span className="text-milk">Disfruta el momento.</span>
          </p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="font-sans text-sm font-medium text-milk/60">Explora</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/productos" className="underline-offset-4 hover:underline">
                Tienda
              </Link>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="underline-offset-4 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-medium text-milk/60">Hablemos</h2>
          <ul className="mt-4 space-y-2.5">
            {WHATSAPP_PHONE && (
              <li>
                <a
                  href={buildWhatsAppUrl(WHATSAPP_PHONE, "¡Hola, JOEY! Tengo una pregunta.")}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {SOCIAL_LINKS.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  {social.label} <span className="text-milk/70">{social.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-milk/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 text-sm text-milk/60 sm:px-6 lg:px-10">
          <p>© {SITE.title}. Empaque ecoamigable.</p>
          <Link href={PRIVACY_POLICY_PATH} className="underline-offset-4 hover:text-milk hover:underline">
            Tratamiento de datos personales
          </Link>
        </div>
      </div>
    </footer>
  );
}
