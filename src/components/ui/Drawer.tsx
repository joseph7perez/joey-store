"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  label: string;
  children: ReactNode;
  className?: string;
}

const noopSubscribe = () => () => {};

/**
 * Side panel that stays mounted and slides with a transform, so opening and
 * closing animate the same way every time. Rendered in <body> through a portal:
 * ancestors with filters or transforms (like the blurred header) would otherwise
 * trap a `fixed` overlay inside them. Closed panels are `inert`.
 */
export function Drawer({ open, onClose, side = "right", label, children, className }: DrawerProps) {
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const panelRef = useRef<HTMLDivElement>(null);
  const isLeft = side === "left";

  // Lock page scroll while open, compensating the scrollbar width so the layout does not shift.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.paddingRight;
    };
  }, [open]);

  // Escape closes; focus moves into the panel and returns to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!isClient) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-60 transition-opacity duration-200",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      inert={!open}
    >
      <div
        aria-hidden
        onClick={onClose}
        className={cn("absolute inset-0 bg-cacao/40 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "absolute top-0 flex h-full w-[85%] max-w-md flex-col overflow-hidden bg-milk shadow-xl outline-none",
          "transform transition-transform duration-300 ease-out",
          isLeft ? "left-0 rounded-r-2xl" : "right-0 rounded-l-2xl",
          open ? "translate-x-0" : isLeft ? "-translate-x-full" : "translate-x-full",
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
