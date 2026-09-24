import { Metadata } from "next";
import { GBPLandingPage } from "@/app/components/GBPLandingPage";
import { weedOwner } from "@/app/lib/weedDiscovery";
import { STORE_NAP } from "@/app/lib/storeNap";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: weedOwner.seoTitle },
  description: weedOwner.metaDescription,
  alternates: {
    canonical: `${STORE_NAP.homeUrl}/weed-dispensary-toronto`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Page() {
  return <>
    <GBPLandingPage />
    <section style={{ maxWidth: 980, margin: "0 auto", padding: "36px 24px 24px" }}>
      <h2>Learn Before You Browse</h2>
      <p>New to Main Kingston Cannabis or want a clearer way to read the menu? Start with the Kingston Road visit hub on the homepage, the how-to-reach page, Cannabis 101 or the Weed &amp; Flower Quality Guide.</p>
      <p>
        <Link href="/#visit-hub">Homepage visit hub</Link>{" · "}
        <Link href="/weed-dispensary-kingston-road">Kingston Road / Beach corridor dispensary owner</Link>{" · "}
        <Link href="/visit">How to reach Kingston Road</Link>{" · "}
        <Link href="/resources/kingston-road-east-toronto-weed-visit-guide">Kingston Road visit guide</Link>{" · "}
        <Link href="/resources/cannabis-101">Cannabis 101</Link>{" · "}
        <Link href="/resources/weed-flower-guide">Weed &amp; Flower Quality Guide</Link>{" · "}
        <Link href="/weed-resources">Weed &amp; Cannabis Resources</Link>
      </p>
    </section>
    <section
      aria-labelledby="mkc-city-door-notes"
      style={{ maxWidth: 980, margin: "0 auto", padding: "8px 24px 64px", lineHeight: 1.55 }}
    >
      <h2 id="mkc-city-door-notes">Upper Beaches door on Kingston Road</h2>
      <p>
        Main Kingston Cannabis is the east-end walk-in at{" "}
        <strong>{STORE_NAP.addressLine}</strong>, near the{" "}
        {STORE_NAP.intersection} crossing in the Upper Beaches / Kingston Road
        corridor — not a west-end or midtown counter. Adults 19+. Call{" "}
        <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>.
      </p>
      <h3>Hours</h3>
      <p>
        {STORE_NAP.hoursLabel} · {STORE_NAP.hoursDetail}. Confirm the weekly
        board on <Link href="/hours">/hours</Link>.
      </p>
      <h3>How people arrive</h3>
      <p>
        Most walk-ins come along Kingston Road toward Main Street in the Upper
        Beaches. Street-level parking and TTC notes for this frontage live on{" "}
        <Link href="/visit">/visit</Link>; the neighbourhood owner page is{" "}
        <Link href="/weed-dispensary-kingston-road">/weed-dispensary-kingston-road</Link>.
      </p>
      <h3>Areas this shop actually covers</h3>
      <p>
        Kingston Road, Upper Beaches, and nearby Beach-side approaches along
        this east Toronto stretch. Use the corridor page for neighbourhood
        search intent; keep this city URL for the Toronto-level path that
        points at the same door.
      </p>
      <p>
        <Link href="/weed-dispensary-kingston-road">Kingston Road corridor</Link>
        {" · "}
        <Link href="/visit">Visit / directions</Link>
        {" · "}
        <Link href="/hours">Hours</Link>
        {" · "}
        <Link href="/">Homepage</Link>
      </p>
    </section>
  </>;
}