"use client";

import { useId } from "react";
import { JOEY_COLORS, JoeyHead } from "@/components/mascot/JoeySvg";
import { cn } from "@/lib/utils/cn";
import { useInView } from "./useInView";

/**
 * Mother kangaroo with her joey in the pouch, in the mascot's line style.
 * When it scrolls into view the joey rises out of the pouch, then every few
 * seconds ducks back in and pops out again.
 */
export function KangarooWithJoey({ className }: { className?: string }) {
  const [ref, visible] = useInView<SVGSVGElement>(0.4);
  // useId output can contain characters that break `url(#…)` references.
  const clipId = `kangaroo-pouch-${useId().replace(/[^\w-]/g, "")}`;
  const { ink, fur, belly } = JOEY_COLORS;

  return (
    <svg
      ref={ref}
      viewBox="0 0 180 226"
      data-visible={visible}
      className={cn("joey kangaroo overflow-visible", className)}
      role="img"
      aria-label="Mamá canguro con su joey asomándose del bolsillo"
    >
      <defs>
        {/* The joey is only drawn above the pouch's bottom edge. */}
        <clipPath id={clipId}>
          <rect x="80" y="0" width="100" height="184" />
        </clipPath>
      </defs>
      <g strokeLinejoin="round" strokeLinecap="round" stroke={ink} strokeWidth="3">
        {/* tail */}
        <path d="M76 192 C 56 202, 28 210, 8 214 C 3 220, 14 224, 28 222 C 50 219, 70 210, 86 200 Z" fill={fur} />
        {/* body */}
        <path d="M108 78 C 84 82, 70 120, 72 160 C 74 195, 92 214, 118 214 C 146 214, 160 192, 156 160 C 152 124, 136 80, 108 78 Z" fill={fur} />
        <path
          d="M120 106 C 106 108, 100 136, 101 164 C 103 192, 114 204, 128 203 C 144 202, 150 184, 147 160 C 144 134, 134 106, 120 106 Z"
          fill={belly}
          strokeWidth="0"
        />
        {/* haunch and big foot */}
        <path d="M84 172 C 80 152, 100 142, 110 158 C 116 170, 112 190, 100 198" fill={fur} />
        <path d="M92 206 C 110 200, 150 202, 172 210 C 176 216, 166 220, 150 220 L 98 220 C 86 220, 84 212, 92 206 Z" fill={fur} />
        <path d="M160 213 L 162 217 M 166 212 L 168 216" strokeWidth="2" />
        {/* mother's head */}
        <g transform="translate(40 0) scale(1.1)">
          <JoeyHead delay="-2.4s" />
        </g>
        {/* joey: rises on entry (outer), then plays peekaboo (inner) */}
        <g clipPath={`url(#${clipId})`}>
          <g className="kangaroo-joey-enter">
            <g className="kangaroo-joey-peek">
              <g transform="translate(91 113) scale(0.55)" strokeWidth="4.5">
                <JoeyHead fur="#e4c4a3" />
              </g>
            </g>
          </g>
        </g>
        {/* pouch front, drawn over the joey */}
        <path d="M100 155 C 112 162, 138 162, 150 153 C 152 172, 146 192, 126 196 C 108 196, 100 178, 100 155 Z" fill={belly} />
        {/* mother's paw resting above the pouch */}
        <path d="M146 100 C 156 104, 162 114, 158 122 C 155 127, 149 125, 148 119 C 146 112, 140 106, 146 100 Z" fill={fur} />
      </g>
    </svg>
  );
}
