import { cn } from "@/lib/utils/cn";

export type JoeyPose = "idle" | "wave" | "point" | "peek";

/**
 * Original illustration of Joey, a baby kangaroo, drawn in the brand's cacao
 * line style. Parts are split into groups (`data-part`) so CSS can animate them.
 * Replace this file to swap in an official illustration later.
 */
export const JOEY_COLORS = {
  ink: "#4a3729",
  fur: "#d9b38f",
  belly: "#f6e8da",
  blush: "#e6b8c5",
};

/**
 * Joey's head (ears, face, eye) in the 120×140 mascot coordinate space, facing
 * right. Shared so other illustrations keep the same face. Must sit inside a
 * stroked group like the one in `JoeySvg`.
 */
export function JoeyHead({ fur = JOEY_COLORS.fur, delay }: { fur?: string; delay?: string }) {
  const { ink, belly, blush } = JOEY_COLORS;
  const offset = delay ? { animationDelay: delay } : undefined;
  return (
    <>
      {/* back ear */}
      <g data-part="ear-back">
        <path d="M55 40 C 47 27, 45 12, 51 4 C 59 8, 64 24, 63 39 Z" fill={fur} />
      </g>
      {/* front ear */}
      <g data-part="ear-front" style={offset}>
        <path d="M64 38 C 65 23, 71 9, 80 5 C 84 14, 79 29, 71 41 Z" fill={fur} />
        <path d="M68 33 C 69 24, 73 15, 78 11 C 79 18, 76 26, 71 34 Z" fill={blush} strokeWidth="0" />
      </g>
      <path
        d="M49 46 C 50 33, 67 28, 79 35 C 86 39, 93 46, 96 53 C 98 59, 93 63, 87 64 C 83 71, 72 75, 62 73 C 50 71, 46 59, 49 46 Z"
        fill={fur}
      />
      <path d="M76 59 C 80 54, 90 52, 95 55 C 96 60, 92 63, 86 64 C 82 66, 77 64, 76 59 Z" fill={belly} strokeWidth="0" />
      <ellipse cx="95" cy="53.5" rx="3.6" ry="2.8" fill={ink} strokeWidth="0" />
      <g data-part="eye" style={offset}>
        <ellipse cx="79" cy="47" rx="3.4" ry="4.2" fill={ink} strokeWidth="0" />
        <circle cx="80.3" cy="45.4" r="1.2" fill="white" strokeWidth="0" />
      </g>
      <ellipse cx="72" cy="58" rx="4.2" ry="2.6" fill={blush} strokeWidth="0" opacity="0.9" />
      <path d="M89 61 C 87 63.5, 84 63.5, 82 62" fill="none" strokeWidth="2.2" />
    </>
  );
}

export function JoeySvg({ pose = "idle", className }: { pose?: JoeyPose; className?: string }) {
  const { ink, fur, belly } = JOEY_COLORS;

  return (
    <svg viewBox="0 0 120 140" className={cn("joey overflow-visible", className)} data-pose={pose} aria-hidden>
      <g strokeLinejoin="round" strokeLinecap="round" stroke={ink} strokeWidth="3">
        {/* tail */}
        <path
          data-part="tail"
          d="M46 113 C 32 119, 17 124, 6 125 C 4 129, 12 132, 22 131 C 34 130, 44 126, 52 121 Z"
          fill={fur}
        />
        {/* body */}
        <g data-part="body">
          <path
            d="M62 70 C 45 72, 38 95, 41 113 C 43 125, 54 131, 66 130 C 80 129, 87 117, 85 101 C 83 85, 77 70, 62 70 Z"
            fill={fur}
          />
          <path
            d="M67 89 C 58 90, 55 101, 56 111 C 57 121, 63 125, 70 124 C 78 123, 80 113, 78 104 C 76 95, 73 89, 67 89 Z"
            fill={belly}
            strokeWidth="0"
          />
          {/* back leg and big foot */}
          <path d="M48 112 C 46 102, 54 98, 60 104 C 64 109, 62 118, 56 121" fill={fur} />
          <path
            d="M50 124 C 60 119, 84 121, 96 126 C 99 130, 92 133, 80 133 L 54 133 C 47 133, 45 127, 50 124 Z"
            fill={fur}
          />
          <path d="M86 128 L 88 131 M 91 127 L 93 130" strokeWidth="2" />
        </g>
        {/* arm */}
        <path
          data-part="arm"
          d="M70 84 C 77 87, 82 94, 81 101 C 80 106, 74 106, 72 101 C 70 95, 66 90, 70 84 Z"
          fill={fur}
        />
        {/* head */}
        <g data-part="head">
          <JoeyHead fur={fur} />
        </g>
      </g>
    </svg>
  );
}
