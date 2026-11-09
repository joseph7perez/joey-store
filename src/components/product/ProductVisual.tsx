import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";

/**
 * Product photo in its frame. Packs show their bags fanned out, built from the
 * real photos of each flavor.
 */
export function ProductVisual({
  product,
  sizes,
  eager = false,
  aspect = "aspect-[4/5]",
  className,
}: {
  product: Product;
  sizes: string;
  eager?: boolean;
  /** Tailwind aspect-ratio class for the frame. */
  aspect?: string;
  className?: string;
}) {
  const loading = eager ? "eager" : "lazy";

  if (product.bundleItems?.length && product.images.length > 1) {
    const [first, second, third] = product.images;
    const bags = [
      { image: first, className: "left-[4%] top-[14%] w-[46%] -rotate-6" },
      { image: third, className: "right-[4%] top-[14%] w-[46%] rotate-6" },
      { image: second, className: "left-1/2 top-[6%] w-[52%] -translate-x-1/2 z-10" },
    ].filter((bag) => bag.image);

    return (
      <div
        className={cn("relative overflow-hidden", aspect, className)}
        style={{ backgroundColor: product.theme.soft }}
      >
        {bags.map(({ image, className: position }) => (
          <div
            key={image.src}
            className={cn(
              "absolute aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_14px_30px_rgb(74_55_41/0.18)]",
              position,
            )}
          >
            <Image src={image.src} alt={image.alt} fill sizes={sizes} loading={loading} className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  const image = product.images[0];
  if (!image) return null;
  return (
    <div className={cn("relative overflow-hidden", aspect, className)} style={{ backgroundColor: product.theme.soft }}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} loading={loading} className="object-cover" />
    </div>
  );
}
