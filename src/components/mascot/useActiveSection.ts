"use client";

import { useEffect, useState } from "react";

/**
 * Returns the `data-joey` id of the section crossing the middle of the viewport.
 */
export function useActiveSection(attribute = "data-joey"): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(`[${attribute}]`));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[visible.length - 1].target.getAttribute(attribute));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [attribute]);

  return active;
}
