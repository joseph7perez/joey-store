"use client";

import { useInView } from "./useInView";

const WORDS = [
  { text: "Abre.", className: "bg-cacao text-milk" },
  { text: "Disfruta.", className: "bg-milk" },
  { text: "Repite.", className: "bg-cacao text-milk" },
];

/** "Abre. Disfruta. Repite." label: each block rises into place, one after another, when it scrolls into view. */
export function MomentsTagline() {
  const [ref, visible] = useInView<HTMLParagraphElement>();

  return (
    <p
      ref={ref}
      data-visible={visible}
      className="tagline mx-auto mt-8 md:mt-16 flex w-fit md:w-auto overflow-hidden rounded-lg font-display text-xl font-semibold sm:text-2xl"
      aria-label="Abre. Disfruta. Repite."
    >
      {WORDS.map(({ text, className }, i) => (
        <span key={text} aria-hidden className={`px-3.5 py-1.5 sm:px-4 sm:py-2 ${className}`} style={{ transitionDelay: `${i * 90}ms` }}>
          {text}
        </span>
      ))}
    </p>
  );
}
