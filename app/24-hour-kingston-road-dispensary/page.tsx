import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StoreMeshNav } from "../components/StoreMeshNav";
import { JsonLd } from "../lib/jsonLd";
import {
  HOURS_LP_PATH,
  HOURS_LP_FAQS,
  DELIVERY_LP_PATH,
  DISPENSARY_LP_PATH,
  CIGARETTES_LP_PATH,
  VAPE_LP_PATH,
  lpFaqPageJsonLd,
  pageUrl,
} from "../lib/organicPaths";
import { STORE_NAP } from "../lib/storeNap";
import styles from "../visit/visit.module.css";

const PAGE_URL = pageUrl(HOURS_LP_PATH);

export const metadata: Metadata = {
  title: { absolute: "24-Hour Dispensary Open Now on Kingston Road | Main Kingston Cannabis" },
  description:
    "Open now: Main Kingston Cannabis at 615 Kingston Rd is a 24-hour dispensary on Kingston Road at Main Street in the Upper Beaches. Walk in any hour. Adults 19+. Phone +1 289 460 0130.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "24-Hour Dispensary Open Now on Kingston Road | Main Kingston Cannabis",
    description:
      "24-hour / open-now walk-in cannabis at 615 Kingston Rd on the Kingston Road / Beach corridor. Adults 19+.",
    url: PAGE_URL,
  },
};

export default function TwentyFourHourKingstonRoadPage() {
  return (
    <>
      <JsonLd data={lpFaqPageJsonLd(HOURS_LP_FAQS, PAGE_URL)} />
      <main className={styles.main}>
        <Navbar />
        <article className={styles.content}>
          <p className={styles.kicker}>Open now · 24 hours daily · Kingston Road / Upper Beaches</p>
          <h1 className={styles.pageTitle}>24-hour dispensary on Kingston Road at 615 Kingston Rd — open now</h1>
          <p className={styles.lede}>
            Searching for a 24-hour dispensary near me on Kingston Road, the Upper
            Beaches, or the Beach corridor? Main Kingston Cannabis at 615 Kingston Rd
            is open now — the door stays open around the clock, every day. This page
            is the first-class overnight / open-now owner for this storefront, not a
            side note beside delivery or tobacco pages. The homepage remains the
            name, address, phone, hours, and map hub. Use the visit guide for TTC,
            parking, and Upper Beaches landmarks.
          </p>

          <section className={styles.nap} aria-labelledby="hours-nap-title">
            <h2 id="hours-nap-title" className={styles.sectionTitle}>Same NAP as the homepage hub</h2>
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
              <a className={styles.secondary} href={`tel:${STORE_NAP.phoneIntl}`}>
                Call the store
              </a>
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Walk in any hour on Kingston Road</h2>
            <p>
              The retail bay at 615 Kingston Rd does not close for a night shift.
              Adults 19+ can walk in after work, after a late Line 2 ride, or after
              midnight when the Upper Beaches strip is quieter. There is no
              appointment desk. Bring government-issued photo ID at every hour,
              including overnight. Staff can help you compare the current flower,
              pre-roll, edible, vape, and concentrate listings in store.
            </p>
            <p>
              Open 24 hours is the in-store retail schedule. Weed delivery from this
              store is a separate path. The dispatcher confirms destination
              eligibility and timing. Do not treat this page as a delivery-hours
              claim.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Overnight arrival on the Beach corridor</h2>
            <p>
              Daytime visitors typically use Line 2 at Main Street Station, then
              walk south on Main Street to Kingston Road. The 64 Main bus follows
              Main Street; the 503 Kingston Rd streetcar serves the corridor when it
              is in service. Overnight transit changes — check a current TTC trip
              planner rather than using this page as a timetable. The shop door
              stays open regardless of whether a streetcar is running.
            </p>
            <p>
              Rideshare drop-off is on Kingston Road at civic number 615. Ask the
              driver to stop on Kingston Road, not on a parallel side street, so the
              storefront is in view when you step out. Street parking is posted and
              changes by time of day; read the curb signs at 615 before you leave
              the car.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Open now on Kingston Road, the Upper Beaches, and the Beach corridor</h2>
            <p>
              If you are searching for a dispensary open now near Kingston Road,
              Main Street, the Upper Beaches, or the Beach corridor toward Woodbine
              Beach and Kew Gardens, this storefront at 615 Kingston Rd is the
              walk-in answer for this block. The door stays open 24 hours daily.
              This is not a second city-wide hours page — it is the same Kingston
              Road shop, written for overnight and open-now questions.
            </p>
            <p>
              Weed delivery from this store is a separate path. Use the{" "}
              <Link href={DELIVERY_LP_PATH}>Kingston Road weed delivery</Link> page
              for ordering context, then the delivery menu to start LIVE ORDER.{" "}
              <Link href={CIGARETTES_LP_PATH}>Native cigarettes</Link> and{" "}
              <Link href={VAPE_LP_PATH}>nicotine vapes</Link> are sold in store on
              this same corridor.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>What this page owns — and what it does not</h2>
            <p>
              Use this URL when the question is whether the Kingston Road shop is
              open now, open late, or open all night. Use the{" "}
              <Link href={DISPENSARY_LP_PATH}>
                weed dispensary Kingston Road
              </Link>{" "}
              page when the question is which storefront sits on this Beach
              corridor. Use the visit guide when the question is which stop, which
              door, or where to park. Use the homepage when you need the NAP
              block, the map, and the menu hubs in one place. Flower is grouped as
              Exotic, Premium, AAA+, AA, and Budget Weed on dedicated collection
              pages. This page does not invent inventory.
            </p>
          </section>

          <div className={styles.mapWrap}>
            <iframe
              title="Map of Main Kingston Cannabis at 615 Kingston Rd"
              src={STORE_NAP.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <StoreMeshNav currentPath={HOURS_LP_PATH} />

          <section>
            <h2 className={styles.sectionTitle}>24-hour Kingston Road questions</h2>
            {HOURS_LP_FAQS.map((faq) => (
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
