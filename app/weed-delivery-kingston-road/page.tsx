import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StoreMeshNav } from "../components/StoreMeshNav";
import { JsonLd } from "../lib/jsonLd";
import {
  DELIVERY_LP_PATH,
  DELIVERY_LP_FAQS,
  HOURS_LP_PATH,
  PATHS,
  lpFaqPageJsonLd,
  pageUrl,
} from "../lib/organicPaths";
import { STORE_NAP } from "../lib/storeNap";
import styles from "../visit/visit.module.css";

const PAGE_URL = pageUrl(DELIVERY_LP_PATH);

export const metadata: Metadata = {
  title: { absolute: "Weed Delivery Kingston Road Upper Beaches | Main Kingston Cannabis" },
  description:
    "Weed delivery coordinated from Main Kingston Cannabis at 615 Kingston Rd on the Kingston Road / Upper Beaches / Beach corridor. $60 product minimum. Dispatcher confirms the destination. Adults 19+.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Weed Delivery Kingston Road Upper Beaches | Main Kingston Cannabis",
    description:
      "Delivery from the Kingston Road storefront at 615 Kingston Rd. Dispatcher confirms eligibility. Walk-in retail stays open 24 hours daily.",
    url: PAGE_URL,
  },
};

export default function WeedDeliveryKingstonRoadPage() {
  return (
    <>
      <JsonLd data={lpFaqPageJsonLd(DELIVERY_LP_FAQS, PAGE_URL)} />
      <main className={styles.main}>
        <Navbar />
        <article className={styles.content}>
          <p className={styles.kicker}>Kingston Road · Upper Beaches · Beach corridor</p>
          <h1 className={styles.pageTitle}>Weed delivery from Kingston Road at 615 Kingston Rd</h1>
          <p className={styles.lede}>
            This page is the neighbourhood owner for weed delivery from Main
            Kingston Cannabis. Orders are coordinated from the walk-in shop at 615
            Kingston Rd, where Kingston Road meets Main Street in the Upper
            Beaches. The city delivery menu remains the place to browse products
            and start LIVE ORDER. The homepage remains the name, address, phone,
            hours, and map hub.
          </p>

          <section className={styles.nap} aria-labelledby="delivery-nap-title">
            <h2 id="delivery-nap-title" className={styles.sectionTitle}>Same NAP as the homepage hub</h2>
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
                <dt>Walk-in hours</dt>
                <dd>{STORE_NAP.hoursLabel}</dd>
              </div>
              <div>
                <dt>Delivery minimum</dt>
                <dd>$60 product minimum</dd>
              </div>
            </dl>
            <div className={styles.actions}>
              <Link className={styles.primary} href={PATHS.deliveryCatalog}>
                Open the delivery menu
              </Link>
              <Link className={styles.secondary} href="/">
                Homepage visit hub
              </Link>
              <Link className={styles.secondary} href={HOURS_LP_PATH}>
                Open now · 24-hour Kingston Road
              </Link>
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>What this Kingston Road page states — and what it does not</h2>
            <p>
              Delivery ordering from this store uses the live delivery menu. That
              menu states a $60 product minimum. The dispatcher confirms
              availability, destination eligibility, and checkout details. New
              customers complete private selfie-with-ID verification in Web Chat.
              Adults 19+ only. A delivery text number is listed on the menu when
              you need to reach dispatch by SMS.
            </p>
            <p>
              This page does not invent a neighbourhood-only zone, a city-wide
              radius, a delivery clock, or extra fees. If a destination is unclear,
              ask the dispatcher before you rely on a drop-off time. Listings on
              the delivery menu can change.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Kingston Road walk-in versus delivery</h2>
            <p>
              The street-level door at 615 Kingston Rd stays open 24 hours daily
              for walk-in retail. Delivery is a separate path. Use the{" "}
              <Link href={HOURS_LP_PATH}>24-hour Kingston Road dispensary</Link>{" "}
              page when the question is open now or overnight. Use the{" "}
              <Link href="/visit">Kingston Road visit guide</Link> for Main Street
              Station, curb parking, and Beach corridor landmarks.
            </p>
            <p>
              Flower collections stay on Exotic, Premium, AAA+, AA, and Budget
              Weed. Native cigarettes and nicotine vapes are sold in store — use
              those Kingston Road pages, then the current category listings,
              rather than treating delivery as the only path.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>How to order from this Beach-corridor shop</h2>
            <p>
              Open the delivery menu, note product names and weights, then select
              LIVE ORDER to reach the Main Kingston Cannabis dispatcher. The
              dispatcher confirms the order before it is packed. Do not treat the
              city delivery URL as a second store — it is the ordering surface for
              this Kingston Road shop.
            </p>
          </section>

          <StoreMeshNav currentPath={DELIVERY_LP_PATH} />

          <section>
            <h2 className={styles.sectionTitle}>Kingston Road weed delivery questions</h2>
            {DELIVERY_LP_FAQS.map((faq) => (
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
