"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MASCOT_ADDED, MASCOT_STOPS, MASCOT_TIMING, type MascotStop } from "@/config/mascot.config";
import { cn } from "@/lib/utils/cn";
import { useCartStore } from "@/store/cart.store";
import { JoeySvg } from "./JoeySvg";
import { useActiveSection } from "./useActiveSection";

// Session-level "hide Joey" preference, read without a hydration mismatch.
const dismissListeners = new Set<() => void>();
function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(MASCOT_TIMING.dismissStorageKey) === "1";
  } catch {
    return false;
  }
}
function writeDismissed() {
  try {
    sessionStorage.setItem(MASCOT_TIMING.dismissStorageKey, "1");
  } catch {
    // Storage blocked: Joey stays hidden until the next page load.
  }
  dismissListeners.forEach((listener) => listener());
}
let dismissedInMemory = false;
function subscribeDismissed(listener: () => void) {
  dismissListeners.add(listener);
  return () => dismissListeners.delete(listener);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Joey, the baby kangaroo, keeps the visitor company on the home and shop pages.
 * Changes pose and message per `data-joey` section and hops when something is added to the cart.
 * `defaultStop` is the MASCOT_STOPS key used before any section is reached.
 * Purely decorative: it never blocks navigation and can be hidden for the session.
 */
export function JoeyMascot({ defaultStop = "hero" }: { defaultStop?: keyof typeof MASCOT_STOPS }) {
  const dismissed = useSyncExternalStore(
    subscribeDismissed,
    () => dismissedInMemory || readDismissed(),
    () => true,
  );
  const active = useActiveSection();
  const addCount = useCartStore((s) => s.addCount);
  const cartOpen = useCartStore((s) => s.isOpen);

  // "Added to cart" reaction: visible until the timer settles the latest add.
  const [settledAddCount, setSettledAddCount] = useState(addCount);
  const recentlyAdded = addCount !== settledAddCount;
  useEffect(() => {
    // Wait until the cart drawer closes, so the reaction is actually seen.
    if (addCount === settledAddCount || cartOpen) return;
    const timer = setTimeout(() => setSettledAddCount(addCount), 2800);
    return () => clearTimeout(timer);
  }, [addCount, settledAddCount, cartOpen]);

  const fallback: MascotStop = MASCOT_STOPS[defaultStop] ?? MASCOT_STOPS.hero;
  const stop = recentlyAdded ? MASCOT_ADDED : (active && MASCOT_STOPS[active]) || fallback;
  const messageKey = recentlyAdded ? `added-${addCount}` : (active ?? defaultStop);

  // The bubble shows on every new message and folds away after a while.
  const [foldedKey, setFoldedKey] = useState<string | null>(null);
  const bubbleOpen = foldedKey !== messageKey;
  useEffect(() => {
    const timer = setTimeout(() => setFoldedKey(messageKey), MASCOT_TIMING.bubbleMs);
    return () => clearTimeout(timer);
  }, [messageKey]);

  // Hop on add to cart, once the drawer is out of the way.
  const hopRef = useRef<HTMLDivElement>(null);
  const hoppedFor = useRef(0);
  useEffect(() => {
    if (cartOpen || addCount === 0 || hoppedFor.current === addCount || !hopRef.current) return;
    hoppedFor.current = addCount;
    if (prefersReducedMotion()) return;
    hopRef.current.animate(
      [
        { transform: "translateY(0) scale(1, 1)" },
        { transform: "translateY(2px) scale(1.06, 0.92)", offset: 0.15 },
        { transform: "translateY(-30px) scale(0.96, 1.05)", offset: 0.5 },
        { transform: "translateY(0) scale(1.05, 0.94)", offset: 0.82 },
        { transform: "translateY(0) scale(1, 1)" },
      ],
      { duration: 620, delay: 180, easing: "cubic-bezier(0.33, 0, 0.2, 1)" },
    );
  }, [addCount, cartOpen]);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 z-40 flex items-end gap-1 transition-[opacity,translate] duration-300 sm:left-6",
        cartOpen ? "translate-y-6 opacity-0" : "opacity-100",
      )}
    >
      <div className="pointer-events-auto relative">
        <button
          type="button"
          onClick={() => setFoldedKey(bubbleOpen ? messageKey : null)}
          aria-label={bubbleOpen ? "Ocultar el mensaje de Joey" : "Ver el mensaje de Joey"}
          className="block rounded-full"
        >
          <div ref={hopRef} className="origin-bottom">
            <JoeySvg pose={stop.pose} className="h-[4.5rem] w-auto drop-shadow-[0_6px_10px_rgb(74_55_41/0.18)] sm:h-28" />
          </div>
        </button>
        <button
          type="button"
          onClick={() => {
            dismissedInMemory = true;
            writeDismissed();
          }}
          aria-label="Ocultar a Joey"
          className="absolute -top-1 -left-1 grid size-6 place-items-center rounded-full border border-cacao/20 bg-milk text-cacao/70 shadow-sm transition-colors hover:text-cacao"
        >
          <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "bubble mb-[3.9rem] max-w-[13.5rem] bg-white px-3.5 py-2.5 text-[0.85rem] leading-snug text-cacao shadow-[0_8px_24px_rgb(74_55_41/0.12)] transition-[opacity,scale] duration-300 ease-[var(--ease-out-soft)] origin-bottom-left sm:mb-24 sm:max-w-[16rem] sm:text-[0.95rem]",
          bubbleOpen ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
        aria-hidden
      >
        <p key={messageKey}>{stop.message}</p>
      </div>
    </div>
  );
}
