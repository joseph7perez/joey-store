import type { MetadataRoute } from "next";
import { PRIVACY_POLICY_PATH, SITE } from "@/config/site";
import { getProducts } from "@/lib/catalog/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/productos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}${PRIVACY_POLICY_PATH}`, changeFrequency: "yearly", priority: 0.2 },
    ...products.map((product) => ({
      url: `${SITE.url}/productos/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
