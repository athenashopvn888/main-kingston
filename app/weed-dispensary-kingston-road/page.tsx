import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StoreMeshNav } from "../components/StoreMeshNav";
import { JsonLd } from "../lib/jsonLd";
import {
  CIGARETTES_LP_PATH,
  DELIVERY_LP_PATH,
  DISPENSARY_LP_FAQS,
  DISPENSARY_LP_PATH,
  HOURS_LP_PATH,
  VAPE_LP_PATH,
  lpFaqPageJsonLd,
  pageUrl,
} from "../lib/organicPaths";
import { STORE_NAP } from "../lib/storeNap";
import styles from "../visit/visit.module.css";

const PAGE_URL = pageUrl(DISPENSARY_LP_PATH);

export const metadata: Metadata = {
  title: { absolute: "Weed Dispensary on Kingston Road at the Beach | Main Kingston Cannabis" },
  description:
    "Weed dispensary at Main Kingston Cannabis, 615 Kingston Rd on Kingston Road at Main Street in the Upper Beaches. Walk-in cannabis on the Beach corridor. Adults 19+.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Weed Dispensary on Kingston Road at the Beach | Main Kingston Cannabis",
    description:
      "Neighbourhood weed-dispensary owner for 615 Kingston Rd on the Kingston Road / Beach corridor. Homepage stays the address, phone, and map hub.",
    url: PAGE_URL,
  },
};

export default function WeedDispensaryKingstonRoadPage() {
  return (
    <>
      <JsonLd data={lpFaqPageJsonLd(DISPENSARY_LP_FAQS, PAGE_URL)} />
      <main className={styles.main}>
        <Navbar />
        <article className={styles.content}>
          <p className={styles.kicker}>Kingston Road · Beach corridor · Adults 19+</p>
          <h1 className={styles.pageTitle}>
            Weed dispensary on Kingston Road at Main Street in the Upper Beaches
          </h1>
          <p className={styles.lede}>
            This page is the neighbourhood owner for the walk-in weed dispensary at
            Main Kingston Cannabis. The door is at 615 Kingston Rd, where Kingston
            Road meets Main Street in the Upper Beaches, on the Beach corridor
            toward Woodbine Beach and Kew Gardens. The homepage remains the name,
            address, phone, hours, and map hub. Flower collections stay on their
            tier pages. This is one Kingston Road shop, not a city-wide dispensary
            list.
          </p>

          <section className={styles.nap} aria-labelledby="dispensary-nap-title">
            <h2 id="dispensary-nap-title" className={styles.sectionTitle}>Same NAP as the homepage hub</h2>
            <dl className={styles.napList}>
              <div>
                <dt>Store</dt>
                <dd>{STORE_NAP.name}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>{STORE_NAP.addressLine}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>{STORE_NAP.hoursLabel}</dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd>
                  <Link href="/">{STORE_NAP.homeUrl}/</Link>
                </dd>
              </div>
            </dl>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/">
                Homepage visit hub
              </Link>
              <Link className={styles.secondary} href="/visit">
                Kingston Road visit guide
              </Link>
              <Link className={styles.secondary} href={HOURS_LP_PATH}>
                Open now · 24-hour Kingston Road
              </Link>
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>What this Kingston Road page owns</h2>
            <p>
              Use this URL when the question is which weed dispensary sits on
              Kingston Road at the Beach corridor. Adults 19+ walk in with
              government-issued photo ID. Staff can help you compare the current
              flower, pre-roll, edible, vape, and concentrate listings in store.
              Listings can change, so treat the website as information rather than
              a stock promise.
            </p>
            <p>
              Open-now and overnight questions live on the{" "}
              <Link href={HOURS_LP_PATH}>24-hour Kingston Road dispensary</Link>{" "}
              page. Weed delivery from this store is a separate path — use{" "}
              <Link href={DELIVERY_LP_PATH}>weed delivery Kingston Road</Link>,
              then the live delivery menu.{" "}
              <Link href={CIGARETTES_LP_PATH}>Native cigarettes</Link> and{" "}
              <Link href={VAPE_LP_PATH}>nicotine vapes</Link> have their own
              Kingston Road pages.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>One shop on the Beach corridor — not a city directory</h2>
            <p>
              Main Kingston Cannabis is the walk-in counter at civic number 615
              on Kingston Road. The strip is the Upper Beaches retail block, a
              short walk south of Main Street Station and north of Woodbine Beach.
              This page does not list other Toronto neighbourhoods and it does not
              invent a second store behind a city URL.
            </p>
            <p>
              Flower is grouped as Exotic, Premium, AAA+, AA, and Budget Weed.
              Confirm a specific item in store or call{" "}
              <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>{" "}
              before you travel for one listing. A supporting information page
              also lives at{" "}
              <Link href="/info/kingston-road-weed-dispensary">
                /info/kingston-road-weed-dispensary
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>How to reach 615 Kingston Rd</h2>
            <p>
              Line 2 at Main Street Station, then south on Main Street to Kingston
              Road, is the usual daytime route. The 64 Main bus follows Main
              Street. The 503 Kingston Rd streetcar serves the corridor when it is
              in service. Arrival notes, curb parking, and Beach corridor
              landmarks live on the <Link href="/visit">visit guide</Link>.
            </p>
          </section>

          <StoreMeshNav currentPath={DISPENSARY_LP_PATH} />

          <section>
            <h2 className={styles.sectionTitle}>Kingston Road weed dispensary questions</h2>
            {DISPENSARY_LP_FAQS.map((faq) => (
              <details key={faq.q} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{faq.q}</summary>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </details>
            ))}
          </section>
        </article>
        <Footer />
      </main>
    </>
  );
}
