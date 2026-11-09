import { StoreChrome } from "@/components/layout/StoreChrome";

/** Store frame for every page except checkout: header, footer, cart. */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <StoreChrome>{children}</StoreChrome>;
}
