import type { Metadata } from "next";
import { DATA_CONTROLLER, PRIVACY_POLICY_PATH, SITE, SOCIAL_LINKS } from "@/config/site";
import { WHATSAPP_PHONE } from "@/config/whatsapp.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp/link";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales",
  description: `Cómo ${SITE.title} recolecta, usa y protege los datos personales de sus clientes, y cómo ejercer tus derechos.`,
  alternates: { canonical: PRIVACY_POLICY_PATH },
};

const linkClass = "font-medium underline underline-offset-4 hover:text-cacao-soft";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-dashed border-line pt-8">
      <h2 id={id} className="text-2xl font-semibold sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

function ContactChannels() {
  const instagram = SOCIAL_LINKS.find((s) => s.id === "instagram");
  return (
    <ul>
      {WHATSAPP_PHONE && (
        <li>
          WhatsApp:{" "}
          <a
            href={buildWhatsAppUrl(WHATSAPP_PHONE, "Hola, JOEY. Quiero hacer una consulta sobre mis datos personales.")}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            escríbenos aquí
          </a>
        </li>
      )}
      {DATA_CONTROLLER.email && (
        <li>
          Correo:{" "}
          <a href={`mailto:${DATA_CONTROLLER.email}`} className={linkClass}>
            {DATA_CONTROLLER.email}
          </a>
        </li>
      )}
      {instagram && (
        <li>
          Instagram:{" "}
          <a href={instagram.href} target="_blank" rel="noreferrer" className={linkClass}>
            {instagram.handle}
          </a>
        </li>
      )}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  const c = DATA_CONTROLLER;
  return (
    <article className="mx-auto max-w-3xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16">
      <h1 className="text-4xl leading-[1.05] font-semibold sm:text-5xl">Política de tratamiento de datos personales</h1>
      <p className="mt-5 text-lg text-cacao-soft">
        En {SITE.title} cuidamos los datos que nos compartes para hacer tu pedido. Aquí te contamos qué datos pedimos, para
        qué los usamos y cómo puedes ejercer tus derechos, de acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013.
      </p>
      <p className="mt-3 text-sm text-cacao-soft">Vigente desde el {c.effectiveDate}.</p>

      <div className="mt-12 space-y-10">
        <Section id="responsable" title="Quién es el responsable">
          <p>
            El responsable del tratamiento de tus datos es {c.legalName ?? SITE.name}
            {c.legalName ? ` (marca ${SITE.title})` : `, marca ${SITE.title}`}.
          </p>
          {(c.taxId || c.address) && (
            <ul>
              {c.taxId && <li>NIT: {c.taxId}</li>}
              {c.address && <li>Dirección: {c.address}</li>}
            </ul>
          )}
          <p>Puedes contactarnos por estos canales:</p>
          <ContactChannels />
        </Section>

        <Section id="datos" title="Qué datos pedimos">
          <p>Cuando haces un pedido en nuestra tienda te pedimos:</p>
          <ul>
            <li>Nombre completo.</li>
            <li>Número de celular.</li>
            <li>Número de cédula.</li>
            <li>Ciudad, dirección y, si quieres, barrio e indicaciones para la entrega.</li>
            <li>El método de pago que eliges (contraentrega o transferencia).</li>
          </ul>
          <p>
            No pedimos datos sensibles, como información de salud, y no pedimos datos de tarjetas ni cuentas bancarias en el
            sitio web.
          </p>
        </Section>

        <Section id="como" title="Cómo los recibimos">
          <p>
            Nuestro sitio web no guarda tus datos personales. Cuando finalizas tu pedido, el sitio arma un mensaje con tus datos
            y te lleva a WhatsApp. Tú decides si lo envías. Solo cuando lo envías, recibimos tus datos en nuestro chat de
            WhatsApp.
          </p>
          <p>
            Tu carrito se guarda en tu propio navegador, y solo contiene los productos y las cantidades, nunca tus datos
            personales.
          </p>
          <p>
            WhatsApp es un servicio de Meta, que trata la información de los mensajes según sus propias políticas de
            privacidad.
          </p>
        </Section>

        <Section id="finalidades" title="Para qué los usamos">
          <ul>
            <li>Confirmar tu pedido y comunicarnos contigo sobre él.</li>
            <li>Coordinar el pago y la entrega en la dirección que nos indicas.</li>
            <li>Cumplir obligaciones legales, contables y tributarias, como la facturación.</li>
            <li>Atender tus preguntas, peticiones, quejas y reclamos.</li>
          </ul>
          <p>No vendemos ni compartimos tus datos con terceros para fines publicitarios.</p>
          <p>
            Solo compartimos los datos necesarios con quien haga la entrega de tu pedido, para que pueda llevártelo.
          </p>
        </Section>

        <Section id="derechos" title="Tus derechos">
          <p>Como titular de tus datos tienes derecho a:</p>
          <ul>
            <li>Conocer, actualizar y rectificar tus datos.</li>
            <li>Pedir prueba de la autorización que nos diste.</li>
            <li>Saber cómo hemos usado tus datos.</li>
            <li>Revocar tu autorización o pedir que eliminemos tus datos, cuando no exista un deber legal de conservarlos.</li>
            <li>Consultar tus datos de forma gratuita.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
          </ul>
        </Section>

        <Section id="solicitudes" title="Cómo ejercer tus derechos">
          <p>Escríbenos por cualquiera de los canales de contacto e indícanos tu nombre, tu cédula y lo que necesitas.</p>
          <ul>
            <li>
              <strong className="font-semibold">Consultas:</strong> te respondemos en máximo 10 días hábiles. Si necesitamos
              más tiempo, te avisamos y te respondemos en máximo 5 días hábiles adicionales.
            </li>
            <li>
              <strong className="font-semibold">Reclamos</strong> (corregir, actualizar o eliminar datos, o revocar la
              autorización): te respondemos en máximo 15 días hábiles. Si necesitamos más tiempo, te avisamos y te respondemos
              en máximo 8 días hábiles adicionales.
            </li>
          </ul>
        </Section>

        <Section id="autorizacion" title="Autorización">
          <p>
            Al enviar tu pedido nos autorizas a tratar tus datos para las finalidades descritas en esta política. Conservamos
            tus datos solo mientras sea necesario para esas finalidades y para cumplir nuestras obligaciones legales, y los
            protegemos con medidas razonables para evitar su pérdida, uso o acceso no autorizado.
          </p>
        </Section>

        <Section id="cambios" title="Cambios a esta política">
          <p>
            Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de vigencia. Si el cambio
            afecta las finalidades del tratamiento, te lo informaremos antes de aplicarlo.
          </p>
        </Section>
      </div>
    </article>
  );
}
