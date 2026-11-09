import { KangarooWithJoey } from "./KangarooWithJoey";

/** Brand story, word for word from the back of the bag. */
export function BrandStory() {
  return (
    <section
      id="historia"
      data-joey="historia"
      aria-labelledby="historia-title"
      className="mx-auto grid max-w-7xl gap-10 px-4 pt-14 pb-24 sm:px-6 sm:pt-32 sm:pb-32 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16 lg:px-10"
    >
      <div>
        <h2 id="historia-title" className="sr-only">
          Nuestra historia
        </h2>
        <p className="font-display text-[2.1rem] leading-[1.12] font-medium sm:text-5xl lg:text-[3.6rem]">
          Los joeys son las crías de canguro que viajan seguras en el bolsillo de su madre.
        </p>
      </div>
      <div className="lg:pb-3">
        {/* <KangarooWithJoey className="mb-8 h-auto w-40 sm:w-48 lg:w-56" />
        <svg viewBox="0 0 120 40" className="mb-5 h-8 w-24 text-lavender-deep" aria-hidden>
          <path d="M4 8c20 26 60 30 100 18" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
          <path d="M96 18l10 7-11 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg> */}
        <p className="text-xl leading-relaxed sm:text-2xl">
          <strong className="font-semibold">Joey nació para acompañarte donde estés.</strong>
        </p>
        <p className="mt-3 text-xl text-cacao-soft sm:text-2xl">Disfruta el momento.</p>
      </div>
    </section>
  );
}
