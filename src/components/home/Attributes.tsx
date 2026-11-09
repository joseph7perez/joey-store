import { CacaoIcon, GlutenFreeIcon, NutIcon, StrawberryIcon, WheatIcon } from "./icons";

/** The five attributes from JOEY's price sheet, in its order. */
const ATTRIBUTES = [
  { label: "Rica en fibra", Icon: WheatIcon },
  { label: "Crema de nueces", Icon: NutIcon },
  { label: "100% fruta", Icon: StrawberryIcon },
  { label: "Gluten free", Icon: GlutenFreeIcon },
  { label: "70% cacao", Icon: CacaoIcon },
];

export function Attributes() {
  return (
    <section aria-label="Lo que hay en cada bolsa" className="border-b border-dashed border-line bg-milk">
      <ul className="mx-auto grid max-w-7xl grid-cols-3 gap-x-2 gap-y-6 px-4 py-9 sm:grid-cols-5 sm:px-6 lg:px-10">
        {ATTRIBUTES.map(({ label, Icon }) => (
          <li key={label} className="flex flex-col items-center gap-2.5 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-lavender text-lavender-ink">
              <Icon className="size-7" />
            </span>
            <span className="text-sm leading-tight sm:text-[0.95rem]">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
