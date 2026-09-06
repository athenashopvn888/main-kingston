import { Metadata } from "next";
import { GBPLandingPage } from "@/app/components/GBPLandingPage";
import { weedOwner } from "@/app/lib/weedDiscovery";
import Link from "next/link";

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
  return <>
    <GBPLandingPage />
    <section style={{ maxWidth: 980, margin: "0 auto", padding: "36px 24px 64px" }}>
      <h2>Learn Before You Browse</h2>
      <p>New to Main Kingston Cannabis or want a clearer way to read the menu? Start with the Kingston Road visit guide, Cannabis 101 or the Weed &amp; Flower Quality Guide.</p>
      <p>
        <Link href="/resources/kingston-road-east-toronto-weed-visit-guide">Kingston Road visit guide</Link>{" · "}
        <Link href="/resources/cannabis-101">Cannabis 101</Link>{" · "}
        <Link href="/resources/weed-flower-guide">Weed &amp; Flower Quality Guide</Link>{" · "}
        <Link href="/weed-resources">Weed &amp; Cannabis Resources</Link>
      </p>
    </section>
  </>;
}
