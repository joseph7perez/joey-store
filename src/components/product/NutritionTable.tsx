import { cn } from "@/lib/utils/cn";
import type { NutritionFacts } from "@/types/product";

/** Nutrition facts exactly as printed on the bag. */
export function NutritionTable({ nutrition }: { nutrition: NutritionFacts }) {
  return (
    <div className="rounded-2xl border-[1.5px] border-cacao bg-white p-5 sm:p-6">
      <h3 className="font-sans text-lg font-bold tracking-tight">Información nutricional</h3>
      <dl className="mt-3 space-y-0.5 border-b-4 border-cacao pb-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt>Tamaño de porción</dt>
          <dd>{nutrition.servingSize}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Porciones por envase</dt>
          <dd>{nutrition.servingsPerPackage}</dd>
        </div>
      </dl>
      <div className="flex items-end justify-between gap-4 border-b-2 border-cacao py-2">
        <span className="font-semibold">Calorías (energía) por porción</span>
        <span className="text-right font-bold">{nutrition.energy}</span>
      </div>
      <table className="w-full text-sm">
        <caption className="sr-only">Cantidad por porción y porcentaje de valor diario</caption>
        <thead>
          <tr className="border-b border-cacao/30 text-xs text-cacao-soft">
            <th scope="col" className="py-1.5 text-left font-normal">
              Cantidad por porción
            </th>
            <th scope="col" className="py-1.5 text-right font-normal">
              % Valor Diario*
            </th>
          </tr>
        </thead>
        <tbody>
          {nutrition.rows.map((row) => (
            <tr key={row.label} className="border-b border-cacao/15 last:border-0">
              <th
                scope="row"
                className={cn(
                  "py-1.5 text-left",
                  !row.level ? "font-semibold" : "font-normal",
                  row.level === 1 && "pl-4",
                  row.level === 2 && "pl-8",
                )}
              >
                {row.label} <span className="font-normal">{row.amount}</span>
              </th>
              <td className="py-1.5 text-right font-medium tabular-nums">{row.dailyValue ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {nutrition.footnote && <p className="mt-3 text-xs leading-relaxed text-cacao-soft">*{nutrition.footnote}</p>}
    </div>
  );
}
