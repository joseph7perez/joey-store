import { Attributes } from "@/components/home/Attributes";
import { BrandStory } from "@/components/home/BrandStory";
import { FlavorShowcase } from "@/components/home/FlavorShowcase";
import { Hero } from "@/components/home/Hero";
import { HowToBuy } from "@/components/home/HowToBuy";
import { JoeyMoments } from "@/components/home/JoeyMoments";
import { PackHighlight } from "@/components/home/PackHighlight";
import { Wholesale } from "@/components/home/Wholesale";
import { JoeyMascot } from "@/components/mascot/JoeyMascot";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE, SOCIAL_LINKS } from "@/config/site";
import { getProducts } from "@/lib/catalog/catalog";

export default async function HomePage() {
  const products = await getProducts();
  const pack = products.find((p) => p.bundleItems?.length);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.title,
          url: SITE.url,
          logo: `${SITE.url}${SITE.logo.src}`,
          sameAs: SOCIAL_LINKS.map((s) => s.href),
        }}
      />
      <Hero products={products} />
      <Attributes />
      <FlavorShowcase products={products} />
      {pack && <PackHighlight pack={pack} products={products} />}
      <BrandStory />
      <JoeyMoments />
      <HowToBuy />
      <Wholesale />
      <JoeyMascot />
    </>
  );
}
