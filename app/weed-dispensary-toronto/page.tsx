import { Metadata } from "next";
import { GBPLandingPage } from "@/app/components/GBPLandingPage";
import { weedOwner } from "@/app/lib/weedDiscovery";

export const metadata: Metadata = {
  title: { absolute: weedOwner.seoTitle },
  description: weedOwner.metaDescription,
  alternates: {
    canonical: `https://${weedOwner.domain}${weedOwner.ownerPath}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <GBPLandingPage />;
}
