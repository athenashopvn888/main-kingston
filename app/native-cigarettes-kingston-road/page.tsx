import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StoreMeshNav } from "../components/StoreMeshNav";
import { JsonLd } from "../lib/jsonLd";
import {
  CIGARETTES_LP_PATH,
  CIGARETTES_LP_FAQS,
  HOURS_LP_PATH,
  VAPE_LP_PATH,
  PATHS,
  lpFaqPageJsonLd,
  pageUrl,
} from "../lib/organicPaths";
import { STORE_NAP } from "../lib/storeNap";
import styles from "../visit/visit.module.css";

const PAGE_URL = pageUrl(CIGARETTES_LP_PATH);

export const metadata: Metadata = {
  title: { absolute: "Native Cigarettes on the Kingston Road Beach Corridor | Main Kingston Cannabis" },
  description:
    "Native cigarettes at Main Kingston Cannabis, 615 Kingston Rd on Kingston Road at Main Street in the Upper Beaches. Check the current cigarette category for brand, unit, and posted price. Adults 19+.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Native Cigarettes on the Kingston Road Beach Corridor | Main Kingston Cannabis",
    description:
      "Retail cigarette category at 615 Kingston Rd. Compare pack or carton listings on the current menu. Walk-in open 24 hours daily.",
    url: PAGE_URL,
  },
};

export default function NativeCigarettesKingstonRoadPage() {
  return (
    <>
      <JsonLd data={lpFaqPageJsonLd(CIGARETTES_LP_FAQS, PAGE_URL)} />
      <main className={styles.main}>
        <Navbar />
        <article className={styles.content}>
          <p className={styles.kicker}>Kingston Road · Retail cigarettes · Adults 19+</p>
          <h1 className={styles.pageTitle}>Native cigarettes at Main Kingston Cannabis on Kingston Road</h1>
          <p className={styles.lede}>
            Main Kingston Cannabis sells Native cigarettes at the walk-in shop on
            Kingston Road at 615, where Main Street meets the Upper Beaches strip.
            This page is the neighbourhood owner for that category. The current
            listed brands, pack or carton units, and posted prices live on the
            cigarette menu. The homepage remains the name, address, phone, hours,
            and map hub.
          </p>

          <section className={styles.nap} aria-labelledby="cigarettes-nap-title">
            <h2 id="cigarettes-nap-title" className={styles.sectionTitle}>Same NAP as the homepage hub</h2>
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
            </dl>
            <div className={styles.actions}>
              <Link className={styles.primary} href={PATHS.itemsCigarettes}>
                Open the cigarette category
              </Link>
              <Link className={styles.secondary} href="/visit">
                Kingston Road visit guide
              </Link>
              <Link className={styles.secondary} href="/">
                Homepage visit hub
              </Link>
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>How to read the Kingston Road cigarette listings</h2>
            <p>
              Use the cigarette category as a current snapshot. Compare brand,
              variety, pack or carton unit, quantity, and the posted price on the
              same line. A carton is a different sales unit from a pack — do not
              compare a pack price with a carton price as if they were the same
              item.
            </p>
            <p>
              This page does not name a locked-in brand list or invent a price. If
              one brand or unit matters, check{" "}
              <Link href={PATHS.itemsCigarettes}>/items/cigarettes</Link> or call{" "}
              <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>{" "}
              before you leave. Listings can change. A product-style preview also
              lives on the{" "}
              <Link href="/info/native-cigarettes-kingston-road">
                Kingston Road cigarette information page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Walk in on the Beach corridor</h2>
            <p>
              Adults 19+ show government-issued photo ID at the Kingston Road door.
              The shop is open 24 hours daily, including overnight. There is no
              appointment desk. Staff can help you read the current cigarette shelf
              the same way they help with flower, vapes, and other in-store
              categories.
            </p>
            <p>
              Arrival notes — Main Street Station, the 64 Main bus, curb parking,
              and Woodbine Beach / Kew Gardens landmarks — live on the{" "}
              <Link href="/visit">visit guide</Link>. Open-now questions live on
              the <Link href={HOURS_LP_PATH}>24-hour Kingston Road dispensary</Link>{" "}
              page. Nicotine vapes are a separate category — use{" "}
              <Link href={VAPE_LP_PATH}>nicotine vape Kingston Road</Link>.
            </p>
          </section>

          <StoreMeshNav currentPath={CIGARETTES_LP_PATH} />

          <section>
            <h2 className={styles.sectionTitle}>Kingston Road cigarette questions</h2>
            {CIGARETTES_LP_FAQS.map((faq) => (
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
