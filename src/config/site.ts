/** Brand and site-wide settings. Copy here is taken from JOEY's own materials. */
export const SITE = {
  name: "JOEY",
  displayName: "Joey!",
  tagline: "Cookie Granola",
  title: "Joey! Cookie Granola",
  description:
    "Cookie granola con clusters crujientes, trozos irresistibles e ingredientes seleccionados. Choco chips, Frutos rojos y Choco maní en bolsas de 270 g.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "es_CO",
  ogImage: { src: "/images/brand/og-joey.jpg", width: 1200, height: 630 },
  logo: { src: "/images/brand/logo-joey.png", width: 860, height: 360 },
  logoLight: { src: "/images/brand/logo-joey-light.png", width: 860, height: 360 },
} as const;

/**
 * Data controller details for the personal data policy (Ley 1581 de 2012).
 * PENDING: the brand has not provided its legal name, NIT, address or email yet.
 * Fill these in; the policy page shows each field only once it has a value.
 */
export const DATA_CONTROLLER = {
  legalName: null as string | null,
  taxId: null as string | null,
  address: null as string | null,
  email: null as string | null,
  city: "Colombia",
  /** Date the current policy text takes effect. */
  effectiveDate: "2 de noviembre de 2026",
};

export const PRIVACY_POLICY_PATH = "/tratamiento-de-datos";

export interface SocialLink {
  id: "instagram" | "facebook" | "tiktok";
  label: string;
  handle: string;
  href: string;
}

/**
 * Only accounts confirmed by the brand. The packaging also shows Facebook and TikTok
 * icons, but their URLs were not provided yet: add them here when available.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@joeysnacksco",
    href: "https://www.instagram.com/joeysnacksco/",
  },
];

export const NAV_LINKS = [
  { href: "/#sabores", label: "Sabores" },
  { href: "/#historia", label: "Nuestra historia" },
  { href: "/#momentos", label: "Tu momento Joey" },
  { href: "/#como-comprar", label: "Cómo comprar" },
  { href: "/#mayoristas", label: "Mayoristas" },
] as const;
