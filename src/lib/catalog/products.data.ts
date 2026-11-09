import type { Product, ProductBadge } from "@/types/product";

/**
 * Local catalog source. Every text here comes from JOEY's own materials:
 * packaging (front and back), the "Hablador" price sheet and the product photos.
 *
 * Do not add ingredients, nutrition facts or claims that are not printed by the brand.
 * Missing today: ingredients and nutrition facts for Choco chips and Frutos rojos.
 *
 * SKUs follow the ERP lot prefixes (CC, FR, CM). Confirm them against `Item.sku`
 * in api-erp-joeys before connecting the storefront to the backend.
 */

const BAG_IMAGE = { width: 1080, height: 1350 } as const;

const PACKAGING_HIGHLIGHTS = [
  "Rica en fibra.",
  "Con mantequilla de nueces real.",
  "El sabor de una cookie en granola.",
  "Hecho con ingredientes reales.",
];

const badge = {
  glutenFree: { id: "gluten-free", label: "Gluten free" },
  cacao70: { id: "cacao-70", label: "70% cacao" },
  realFruit: { id: "real-fruit", label: "Con fruta real" },
} satisfies Record<string, ProductBadge>;

export const PRODUCTS: Product[] = [
  {
    id: "prod_choco-chips",
    slug: "choco-chips",
    name: "Choco chips",
    line: "Cookie granola",
    shortDescription:
      "El sabor de la clásica galleta de chispas de chocolate, con chocolate 70% cacao.",
    description:
      "El sabor de la clásica galleta de chispas de chocolate, con chocolate 70% cacao. Clusters crujientes y trozos irresistibles, hechos con ingredientes reales.",
    images: [
      {
        src: "/images/products/choco-chips.png",
        alt: "Bolsa de Joey! Cookie granola sabor Choco chips de 270 g, etiqueta azul con granola y trozos de chocolate.",
        ...BAG_IMAGE,
      },
    ],
    variants: [
      {
        id: "var_choco-chips_270g",
        sku: "JOEY-CC-270",
        presentation: { label: "270 g", weightGrams: 270 },
        price: 29900,
        isActive: true,
      },
    ],
    highlights: PACKAGING_HIGHLIGHTS,
    badges: [badge.glutenFree, badge.cacao70],
    theme: { accent: "#B7D7E2", soft: "#E5EFF4" },
    isActive: true,
    featured: true,
    sortOrder: 1,
  },
  {
    id: "prod_frutos-rojos",
    slug: "frutos-rojos",
    name: "Frutos rojos",
    line: "Cookie granola",
    shortDescription: "Fresa y arándanos deshidratados para un toque frutal.",
    description:
      "Fresa y arándanos deshidratados para un toque frutal. Clusters crujientes y trozos irresistibles, hechos con ingredientes reales.",
    images: [
      {
        src: "/images/products/frutos-rojos.png",
        alt: "Bolsa de Joey! Cookie granola sabor Frutos rojos de 270 g, etiqueta rosada con granola, fresas y arándanos.",
        ...BAG_IMAGE,
      },
    ],
    variants: [
      {
        id: "var_frutos-rojos_270g",
        sku: "JOEY-FR-270",
        presentation: { label: "270 g", weightGrams: 270 },
        price: 29900,
        isActive: true,
      },
    ],
    highlights: PACKAGING_HIGHLIGHTS,
    badges: [badge.glutenFree, badge.realFruit],
    theme: { accent: "#E6B8C5", soft: "#F7E7EB" },
    isActive: true,
    featured: true,
    sortOrder: 2,
  },
  {
    id: "prod_choco-mani",
    slug: "choco-mani",
    name: "Choco maní",
    line: "Cookie granola",
    shortDescription: "La combinación de cacao, chocolate 70% cacao y maní en cada bocado.",
    description:
      "La combinación de cacao, chocolate 70% cacao y maní en cada bocado. Clusters crujientes y trozos irresistibles, hechos con ingredientes reales.",
    images: [
      {
        src: "/images/products/choco-mani.png",
        alt: "Bolsa de Joey! Cookie granola sabor Choco maní de 270 g, etiqueta café con granola de cacao y maní.",
        ...BAG_IMAGE,
      },
    ],
    variants: [
      {
        id: "var_choco-mani_270g",
        sku: "JOEY-CM-270",
        presentation: { label: "270 g", weightGrams: 270 },
        price: 29900,
        isActive: true,
      },
    ],
    highlights: PACKAGING_HIGHLIGHTS,
    badges: [badge.glutenFree, badge.cacao70],
    ingredients: [
      "Avena sin gluten",
      "harina de avena sin gluten",
      "miel de agave",
      "crema de almendra",
      "maní picado",
      "fibra de achicoria (inulina)",
      "chocolate 70%",
      "crema de maní",
      "azúcar de coco",
      "cocoa alcalina",
      "harina de coco",
      "aceite de coco",
      "semilla de chía",
      "saborizante artificial de vainilla",
      "sal marina",
      "café",
      "canela",
    ],
    nutrition: {
      servingSize: "30 g (1/4 taza)",
      servingsPerPackage: "aprox. 9",
      energy: "137 kcal (573 kJ)",
      rows: [
        { label: "Grasa total", amount: "5,0 g", dailyValue: "8%" },
        { label: "Grasa saturada", amount: "1,4 g", dailyValue: "7%", level: 1 },
        { label: "Grasas trans", amount: "0 mg", dailyValue: "0%", level: 1 },
        { label: "Carbohidratos totales", amount: "20,1 g", dailyValue: "7%" },
        { label: "Fibra dietaria", amount: "4,5 g", dailyValue: "16%", level: 1 },
        { label: "Azúcares totales", amount: "2,8 g", level: 1 },
        { label: "Azúcares añadidos", amount: "2,3 g", dailyValue: "5%", level: 2 },
        { label: "Proteína", amount: "5,1 g", dailyValue: "10%" },
        { label: "Sodio", amount: "45 mg", dailyValue: "2%" },
        { label: "Vitamina D", amount: "0 mcg", dailyValue: "0%" },
        { label: "Calcio", amount: "20 mg", dailyValue: "2%" },
        { label: "Hierro", amount: "1,1 mg", dailyValue: "6%" },
        { label: "Potasio", amount: "95 mg", dailyValue: "2%" },
      ],
      footnote:
        "El % Valor Diario (VD) indica cuánto contribuye un nutriente en una porción de alimento a la dieta diaria. 2.000 calorías al día se usan para asesoramiento general de nutrición.",
    },
    theme: { accent: "#B68E87", soft: "#DCC2BD" },
    isActive: true,
    featured: true,
    sortOrder: 3,
  },
  {
    id: "prod_pack-x3",
    slug: "pack-x3",
    name: "Pack x3",
    line: "Cookie granola",
    shortDescription: "Arma tu pack con 3 bolsas de Cookie Granola: combina sabores o lleva 3 de tu favorito.",
    description:
      "¿Por qué elegir uno si puedes probar los 3? Arma tu pack con 3 bolsas de Cookie Granola: una de cada sabor, dos de uno y una de otro, o las 3 de tu favorito.",
    images: [
      {
        src: "/images/products/choco-chips.png",
        alt: "Bolsa de Joey! Cookie granola Choco chips incluida en el Pack x3.",
        ...BAG_IMAGE,
      },
      {
        src: "/images/products/frutos-rojos.png",
        alt: "Bolsa de Joey! Cookie granola Frutos rojos incluida en el Pack x3.",
        ...BAG_IMAGE,
      },
      {
        src: "/images/products/choco-mani.png",
        alt: "Bolsa de Joey! Cookie granola Choco maní incluida en el Pack x3.",
        ...BAG_IMAGE,
      },
    ],
    variants: [
      {
        id: "var_pack-x3",
        sku: "JOEY-PACK3",
        presentation: { label: "3 bolsas de 270 g" },
        price: 82900,
        isActive: true,
      },
    ],
    highlights: PACKAGING_HIGHLIGHTS,
    badges: [badge.glutenFree],
    bundleItems: [
      { productId: "prod_choco-chips", quantity: 1 },
      { productId: "prod_frutos-rojos", quantity: 1 },
      { productId: "prod_choco-mani", quantity: 1 },
    ],
    theme: { accent: "#AB94B8", soft: "#EEE7F4" },
    isActive: true,
    featured: true,
    sortOrder: 4,
  },
];
