import type { Metadata, Viewport } from "next";
import { Lexend, Literata } from "next/font/google";
import { CartHydrator } from "@/components/providers/CartHydrator";
import { CatalogProvider } from "@/components/providers/CatalogProvider";
import { SITE } from "@/config/site";
import { getProducts } from "@/lib/catalog/catalog";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-literata",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.title} | Clusters crujientes con ingredientes reales`,
    template: `%s | ${SITE.title}`,
  },
  description: SITE.description,
  applicationName: SITE.title,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.title,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage.src, width: SITE.ogImage.width, height: SITE.ogImage.height, alt: "Joey! Cookie Granola" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage.src],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#fcfafd",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const products = await getProducts();

  return (
    // data-scroll-behavior lets Next.js turn off the CSS smooth scroll during route changes.
    <html lang="es-CO" data-scroll-behavior="smooth" className={`${literata.variable} ${lexend.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#contenido"
          className="sr-only z-50 rounded-full bg-cacao px-4 py-2 text-milk focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <CatalogProvider products={products}>
          <CartHydrator />
          {/* Each route group brings its own frame: (tienda) or (checkout). */}
          {children}
        </CatalogProvider>
      </body>
    </html>
  );
}
