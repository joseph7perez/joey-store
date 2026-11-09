"use client";

import { useState } from "react";
import { JoeySvg } from "@/components/mascot/JoeySvg";
import { Button, ButtonLink, buttonClasses } from "@/components/ui/Button";

interface WhatsAppHandoffProps {
  reference: string;
  whatsappUrl: string;
  onSent: () => void;
  onEdit: () => void;
}

/**
 * Shown after the customer is sent to WhatsApp. The order is NOT confirmed yet:
 * the customer still has to send the message and JOEY confirms it in the chat.
 */
export function WhatsAppHandoff({ reference, whatsappUrl, onSent, onEdit }: WhatsAppHandoffProps) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <JoeySvg pose="wave" className="mx-auto h-36 w-auto" />
        <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">¡Gracias!</h1>
        <p className="mt-4 text-lg text-cacao-soft">
          El equipo de JOEY revisará tu pedido <strong className="font-medium text-cacao">{reference}</strong> y te
          responderá por WhatsApp para confirmarlo.
        </p>
        <ButtonLink href="/" className="mt-8">
          Volver al inicio
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-6">
      <div className="rounded-[2rem] bg-lavender p-6 sm:p-10">
        <p className="text-sm text-lavender-ink">
          Pedido <span className="font-medium tabular-nums">{reference}</span>
        </p>
        <h1 className="mt-2 text-4xl leading-[1.05] font-semibold sm:text-5xl">Envía tu pedido en WhatsApp</h1>
        <p className="mt-4 text-lg leading-relaxed">
          Tu pedido <strong className="font-semibold">aún no está confirmado</strong>. Abrimos WhatsApp con el mensaje
          listo: envíalo sin cambios y el equipo de JOEY lo confirmará contigo en ese chat.
        </p>
        <ol className="mt-6 space-y-2 text-cacao-soft">
          <li>1. Revisa el mensaje en WhatsApp.</li>
          <li>2. Toca enviar.</li>
          <li>3. Espera la confirmación de JOEY, con el envío y el pago.</li>
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "lg")}>
            Abrir WhatsApp
          </a>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              onSent();
              setSent(true);
            }}
          >
            Ya envié mi pedido
          </Button>
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="mt-6 text-cacao-soft underline underline-offset-4 hover:text-cacao"
      >
        Volver y editar mis datos
      </button>
    </div>
  );
}
