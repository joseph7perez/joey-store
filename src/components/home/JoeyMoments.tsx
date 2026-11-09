import { BagIcon, BowlIcon, IceCreamIcon, MilkIcon, PancakeIcon, StrawberryIcon } from "./icons";
import { MomentsTagline } from "./MomentsTagline";

/** "Tu momento Joey!": serving ideas printed on the back of the bag. */
const MOMENTS = [
  { name: "El clásico", how: "Con yogurt", Icon: BowlIcon },
  { name: "El fresco", how: "Con yogurt", Icon: StrawberryIcon },
  { name: "El suave", how: "Con leche", Icon: MilkIcon },
  { name: "El especial", how: "Con pancakes", Icon: PancakeIcon },
  { name: "El antojo", how: "Con helado", Icon: IceCreamIcon },
  { name: "El más Joey", how: "Directo desde la bolsa", Icon: BagIcon },
];

export function JoeyMoments() {
  return (
    <section id="momentos" data-joey="momentos" aria-labelledby="momentos-title" className="bg-[#dcc2bd]/45">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 sm:pt-28 sm:pb-28 lg:px-10">
        <h2 id="momentos-title" className="text-4xl font-semibold sm:text-5xl lg:text-6xl">
          Tu momento Joey!
        </h2>
        <ul className="mt-12 grid grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-6">
          {MOMENTS.map(({ name, how, Icon }) => (
            <li key={name} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <span className="grid size-12 place-items-center rounded-full border-[1.5px] border-cacao/70 text-cacao sm:size-14">
                <Icon className="size-6 sm:size-7" />
              </span>
              <p className="mt-3 font-display text-base font-semibold leading-tight sm:mt-4 sm:text-lg">{name}</p>
              <p className="mt-0.5 text-sm text-cacao-soft sm:text-base">{how}</p>
            </li>
          ))}
        </ul>
        <MomentsTagline />
      </div>
    </section>
  );
}
