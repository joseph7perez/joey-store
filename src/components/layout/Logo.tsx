import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * JOEY wordmark. `height` is the rendered height in CSS pixels, so the image
 * optimizer serves a file of the right size instead of the 860px original.
 * `eager` is for the header logo, which is above the fold and often the LCP.
 */
export function Logo({
  className,
  light = false,
  height = 36,
  eager = false,
}: {
  className?: string;
  light?: boolean;
  height?: number;
  eager?: boolean;
}) {
  const logo = light ? SITE.logoLight : SITE.logo;
  const width = Math.round((logo.width * height) / logo.height);
  return (
    <Link href="/" aria-label="Joey!, ir al inicio" className={cn("inline-block", className)}>
      <Image
        src={logo.src}
        alt="Joey!"
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-auto"
        // The optimized file's rounded pixel size skews `w-auto`; pin the source ratio.
        style={{ aspectRatio: `${logo.width} / ${logo.height}` }}
      />
    </Link>
  );
}
