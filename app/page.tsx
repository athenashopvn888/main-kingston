import type { Metadata } from "next";
import HomePage from "./HomePage";
import FleetAnnouncementBanner from "./components/FleetAnnouncementBanner";
import { HOME_TITLE } from "./lib/homeDelivery";
import { faqPageJsonLd, toJsonLd } from "./lib/storeNap";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  openGraph: { title: HOME_TITLE },
  twitter: { card: "summary_large_image", title: HOME_TITLE },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqPageJsonLd) }}
      />
      <FleetAnnouncementBanner holidayOnly />
      <HomePage />
    </>
  );
}
