import { buttonClasses } from "@/components/ui/Button";
import { WHATSAPP_PHONE } from "@/config/whatsapp.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp/link";

const WHOLESALE_MESSAGE = "¡Hola, JOEY! Tengo un negocio y me interesa comprar Joey! al por mayor.";

/** Invites stores and businesses to talk to JOEY directly about wholesale orders. */
export function Wholesale() {
  // Without a commercial number there is no way to reach JOEY, so the section stays hidden.
  if (!WHATSAPP_PHONE) return null;

  return (
    <section
      id="mayoristas"
      data-joey="mayoristas"
      aria-labelledby="mayoristas-title"
      className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-10"
    >
      <div className="grid gap-8 rounded-[2rem] bg-lavender px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:px-16">
        <div>
          {/* <p className="font-display text-sm text-lavender-ink">Clientes mayoristas</p> */}
          <h2 id="mayoristas-title" className="mt-2 max-w-[18ch] text-4xl leading-[1.05] font-semibold sm:text-5xl">
            ¿Quieres tener Joey! en tu negocio?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cacao-soft">
            Si tienes una tienda, cafetería, minimercado o cualquier negocio y quieres vender nuestra cookie granola,
            escríbenos. Te contamos los precios por volumen, las cantidades y cómo hacemos los envíos.
          </p>
        </div>
        <a
          href={buildWhatsAppUrl(WHATSAPP_PHONE, WHOLESALE_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("primary", "lg", "justify-self-start")}
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
}
