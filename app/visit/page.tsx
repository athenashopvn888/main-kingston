import type { Metadata } from "next";
import VisitContent from "./VisitContent";
import { STORE_NAP } from "../lib/storeNap";

/**
 * Supporting how-to-reach page only.
 * Schema, canonical, and Open Graph stay on the homepage visit hub.
 * GBP Website remains https://www.mainkingstoncannabis.ca/ — never this path.
 */
export const metadata: Metadata = {
  title: "How to Visit Main Kingston Cannabis on Kingston Road",
  description:
    "TTC, parking, and landmarks for Main Kingston Cannabis at 615 Kingston Rd, Toronto, ON M4E 1R3. Open 24 Hours. Call +1 289 460 0130.",
  alternates: {
    canonical: STORE_NAP.homeUrl,
  },
  openGraph: {
    url: STORE_NAP.homeUrl,
    title: "24 Hour Kingston Road Dispensary | Main Kingston Cannabis",
    description:
      "Main Kingston Cannabis is an East Toronto dispensary on Kingston Rd near Main St with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
    images: [
      {
        url: STORE_NAP.imageUrl,
        width: 1200,
        height: 630,
        alt: "Main Kingston Cannabis — Kingston Road dispensary",
      },
    ],
  },
};

export default function VisitPage() {
  return <VisitContent />;
}
