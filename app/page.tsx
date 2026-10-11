import type { Metadata } from "next";
import HomePage from "./HomePage";
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
  const { flowers } = await getLiveMenu();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqPageJsonLd) }}
      />
      <HomePage initialFlowers={flowers} />
    </>
  );
}
