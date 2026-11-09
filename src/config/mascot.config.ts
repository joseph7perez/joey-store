import type { JoeyPose } from "@/components/mascot/JoeySvg";

export interface MascotStop {
  pose: JoeyPose;
  message: string;
}

/**
 * What Joey says in each home section (matched by `data-joey="<id>"`).
 * Messages reuse JOEY's own phrases from the packaging and price sheet.
 */
export const MASCOT_STOPS: Record<string, MascotStop> = {
  hero: { pose: "wave", message: "¡Hola! Soy Joey. Nací para acompañarte donde estés." },
  sabores: { pose: "point", message: "¿Por qué elegir uno si puedes probar los 3?" },
  pack: { pose: "point", message: "Este es mi favorito: un sabor de cada uno." },
  historia: { pose: "peek", message: "Los joeys viajamos seguros en el bolsillo de mamá." },
  momentos: { pose: "idle", message: "Abre. Disfruta. Repite." },
  "como-comprar": { pose: "point", message: "Tu pedido termina en WhatsApp. Allá lo confirmamos contigo." },
  mayoristas: { pose: "point", message: "¿Tienes un negocio? Llévame a tus estantes." },
  // Shop and product pages.
  tienda: { pose: "wave", message: "¿Cuál te llevas hoy? Yo no puedo elegir solo uno." },
  producto: { pose: "point", message: "Buena elección. Agrégalo y sigue mirando." },
  ingredientes: { pose: "peek", message: "Ingredientes reales, nada raro escondido." },
  otros: { pose: "point", message: "¿Y si pruebas otro sabor también?" },
};

export const MASCOT_ADDED: MascotStop = { pose: "wave", message: "¡Al carrito! Disfruta el momento." };

export const MASCOT_TIMING = {
  /** How long a message stays visible before the bubble folds away. */
  bubbleMs: 5200,
  dismissStorageKey: "joey-mascot-hidden",
} as const;
