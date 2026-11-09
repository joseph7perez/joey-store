import { ButtonLink } from "@/components/ui/Button";

const STEPS = [
  {
    title: "Elige tus sabores",
    text: "Agrega al carrito las bolsas que quieras, o el Pack x3 para probarlos todos.",
  },
  {
    title: "Completa tus datos",
    text: "Dinos a dónde enviamos tu pedido y cómo prefieres pagar: contraentrega o transferencia bancaria.",
  },
  {
    title: "Envíalo por WhatsApp",
    text: "Preparamos el mensaje con tu pedido. Lo envías desde tu WhatsApp y el equipo de JOEY lo confirma contigo en ese chat.",
  },
];

export function HowToBuy() {
  return (
    <section
      id="como-comprar"
      data-joey="como-comprar"
      aria-labelledby="como-comprar-title"
      className="mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 sm:pt-28 sm:pb-28 lg:px-10"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h2 id="como-comprar-title" className="text-4xl leading-[1.05] font-semibold sm:text-5xl">
            Cómo hacer tu pedido
          </h2>
          <p className="mt-4 max-w-sm text-lg text-cacao-soft">Tres pasos y tu cookie granola va en camino.</p>
          <ButtonLink href="#sabores" size="lg" className="mt-8">
            Empezar mi pedido
          </ButtonLink>
        </div>
        <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step, index) => (
            <li key={step.title} className="border-t-[1.5px] border-dashed border-cacao/40 pt-5">
              <span className="font-display text-4xl md:text-5xl font-semibold text-lavender-deep tabular-nums" aria-hidden>
                {index + 1}
              </span>
              <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-cacao-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
