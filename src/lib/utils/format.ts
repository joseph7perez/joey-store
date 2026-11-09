import type { Money } from "@/types/product";

const copNumber = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

/** Formats pesos the way JOEY prints them: "$29.900". */
export function formatCOP(amount: Money): string {
  return `$${copNumber.format(amount)}`;
}

const spanishList = new Intl.ListFormat("es", { style: "long", type: "conjunction" });

/** "a, b y c", as written on the packaging. */
export function formatList(items: string[]): string {
  return spanishList.format(items);
}

export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
