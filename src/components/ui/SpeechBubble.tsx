import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Tail = "bottom-left" | "bottom-right" | "left" | "none";

/**
 * The dashed speech bubble from JOEY's price sheet ("Hablador").
 * Used sparingly: prices, Joey's messages and short notes.
 */
export function SpeechBubble({
  children,
  tail = "bottom-left",
  className,
}: {
  children: ReactNode;
  tail?: Tail;
  className?: string;
}) {
  return (
    <div className={cn("bubble bg-white/90 px-4 py-2.5", className)}>
      {children}
      {tail !== "none" && (
        <svg
          aria-hidden
          viewBox="0 0 22 16"
          className={cn(
            "absolute h-4 w-5.5",
            tail === "bottom-left" && "-bottom-[14px] left-6",
            tail === "bottom-right" && "right-6 -bottom-[14px] -scale-x-100",
            tail === "left" && "top-1/2 -left-[16px] -translate-y-1/2 rotate-90",
          )}
        >
          <path d="M1 0.5 L1 15 L16 0.5" fill="white" fillOpacity="0.9" />
          <path
            d="M1 0.5 L1 15 L16 0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 2.5"
          />
          <rect x="1.75" y="0" width="13.5" height="1.6" fill="white" />
        </svg>
      )}
    </div>
  );
}
