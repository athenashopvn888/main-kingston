import type { Metadata } from "next";
import HomePage from "./HomePage";
import { CODED_BANNERS } from "./lib/fleet/config";
import { getFleetContent } from "./lib/fleetContent";
import { getLiveMenu } from "./lib/liveMenu";
import { HOME_DOC_TITLE } from "./lib/homeDelivery";
import { faqPageJsonLd, toJsonLd } from "./lib/storeNap";

export const metadata: Metadata = {
  title: { absolute: HOME_DOC_TITLE },
  openGraph: { title: HOME_DOC_TITLE },
  twitter: { card: "summary_large_image", title: HOME_DOC_TITLE },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const [{ flowers }, fleet] = await Promise.all([getLiveMenu(), getFleetContent()]);
  const contentBanners = fleet.active && fleet.banners.some((banner, index) => banner !== CODED_BANNERS[index]) ? fleet.banners : undefined;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqPageJsonLd) }}
      />
      <HomePage initialFlowers={flowers} contentBanners={contentBanners} />
    </>
  );
}
