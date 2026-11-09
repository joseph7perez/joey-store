import type { ReactNode } from "react";

/** Simple line icons echoing the round icons printed on JOEY's packaging. */
function Icon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

type P = { className?: string };

export const WheatIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M16 29V9" />
    <path d="M16 13c-3-1-4.5-3.5-4.5-6 3 .5 4.5 3 4.5 6Zm0 0c3-1 4.5-3.5 4.5-6-3 .5-4.5 3-4.5 6Z" />
    <path d="M16 19c-3-1-4.5-3.5-4.5-6 3 .5 4.5 3 4.5 6Zm0 0c3-1 4.5-3.5 4.5-6-3 .5-4.5 3-4.5 6Z" />
    <path d="M16 25c-3-1-4.5-3.5-4.5-6 3 .5 4.5 3 4.5 6Zm0 0c3-1 4.5-3.5 4.5-6-3 .5-4.5 3-4.5 6Z" />
    <path d="M16 9V4" />
  </Icon>
);

export const NutIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M12 5c-4 0-6 3-5.5 6.5.3 2-1.5 3.5-1.5 6C5 21 8 24 12 24s7-3 7-6.5c0-2.5-1.8-4-1.5-6C18 8 16 5 12 5Z" />
    <path d="M10 12h.01M13.5 16h.01M10 19h.01" strokeWidth="2.4" />
    <path d="M21 14c3.5 0 6 2.5 6 6s-2.5 7-6 7c-1.5 0-2.8-.5-3.8-1.4" />
  </Icon>
);

export const StrawberryIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M16 10c-6 0-9 3-9 7 0 5 5 11 9 11s9-6 9-11c0-4-3-7-9-7Z" />
    <path d="M11 8.5 16 10l5-1.5M16 10V5m0 5-3-4m3 4 3-4" />
    <path d="M12 16h.01M16 18h.01M20 16h.01M14 22h.01M18 22h.01" strokeWidth="2.4" />
  </Icon>
);

export const GlutenFreeIcon = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="16" cy="16" r="12" />
    <path d="M7.5 7.5l17 17" />
    <path d="M16 24V12m0 4c-2-.6-3-2.3-3-4 2 .3 3 2 3 4Zm0 0c2-.6 3-2.3 3-4-2 .3-3 2-3 4Zm0 4c-2-.6-3-2.3-3-4 2 .3 3 2 3 4Zm0 0c2-.6 3-2.3 3-4-2 .3-3 2-3 4Z" />
  </Icon>
);

export const CacaoIcon = ({ className }: P) => (
  <Icon className={className}>
    <rect x="5" y="9" width="22" height="14" rx="2" />
    <path d="M12.3 9v14M19.7 9v14M5 16h22" />
    <path d="M23 9l4 4" />
  </Icon>
);

export const BowlIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M4 15h24c0 6-5 10-12 10S4 21 4 15Z" />
    <path d="M9 15c0-2 1.5-3.5 3.5-3.5S16 13 16 15m0 0c0-2 1.5-3.5 3.5-3.5S23 13 23 15" />
    <path d="M22 4l-4 9" />
  </Icon>
);

export const MilkIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M12 4h8v4l3 4v15a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V12l3-4V4Z" />
    <path d="M9 17h14" />
  </Icon>
);

export const PancakeIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M5 24h22M6 20h20M7 16h18" />
    <path d="M9 12c0-2 3-4 7-4s7 2 7 4" />
    <path d="M16 8v3m0 0c1.5 0 2 1 2 2" />
  </Icon>
);

export const IceCreamIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M10 15l6 14 6-14" />
    <path d="M9 15a7 7 0 1 1 14 0Z" />
    <path d="M12 21h8M13.5 25h5" />
  </Icon>
);

export const BagIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M8 6h16l1 22H7L8 6Z" />
    <path d="M8 10h16M13 16h6M12 20h8" />
  </Icon>
);
