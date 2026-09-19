import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StoreMeshNav } from "../components/StoreMeshNav";
import { JsonLd } from "../lib/jsonLd";
import {
  VAPE_LP_PATH,
  VAPE_LP_FAQS,
  HOURS_LP_PATH,
  CIGARETTES_LP_PATH,
  PATHS,
  lpFaqPageJsonLd,
  pageUrl,
} from "../lib/organicPaths";
import { STORE_NAP } from "../lib/storeNap";
import styles from "../visit/visit.module.css";

const PAGE_URL = pageUrl(VAPE_LP_PATH);

export const metadata: Metadata = {
  title: { absolute: "Nicotine Vape Kingston Road near Main Street | Main Kingston Cannabis" },
  description:
    "Nicotine vapes at Main Kingston Cannabis, 615 Kingston Rd on Kingston Road at Main Street in the Upper Beaches. Check /items/vapes for the current category. Adults 19+. Nicotine is addictive.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Nicotine Vape Kingston Road near Main Street | Main Kingston Cannabis",
    description:
      "Neighbourhood nicotine vape page for 615 Kingston Rd. Current listings live on /items/vapes. THC vapes are a separate category.",
    url: PAGE_URL,
  },
};

export default function NicotineVapeKingstonRoadPage() {
  return (
    <>
      <JsonLd data={lpFaqPageJsonLd(VAPE_LP_FAQS, PAGE_URL)} />
      <main className={styles.main}>
        <Navbar />
        <article className={styles.content}>
          <p className={styles.kicker}>Kingston Road · Nicotine vapes · Adults 19+</p>
          <h1 className={styles.pageTitle}>Nicotine vapes on the Kingston Road Beach corridor</h1>
          <p className={styles.lede}>
            Main Kingston Cannabis lists nicotine vapes at 615 Kingston Rd, the
            walk-in shop on Kingston Road at Main Street in the Upper Beaches. This
            page is the neighbourhood owner for that category. Current devices,
            pods, and posted details live on{" "}
            <Link href={PATHS.itemsVapes}>/items/vapes</Link>. This page does not
            invent SKUs or prices. Nicotine is addictive.
          </p>

          <section className={styles.nap} aria-labelledby="vape-nap-title">
            <h2 id="vape-nap-title" className={styles.sectionTitle}>Same NAP as the homepage hub</h2>
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
              <Link className={styles.primary} href={PATHS.itemsVapes}>
                Open the nicotine vape category
              </Link>
              <Link className={styles.secondary} href={PATHS.itemsThcVapes}>
                THC vape category
              </Link>
              <Link className={styles.secondary} href="/">
                Homepage visit hub
              </Link>
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Keep nicotine and cannabis vape routes separate</h2>
            <p>
              The nicotine vape category is <Link href={PATHS.itemsVapes}>/items/vapes</Link>.
              THC or cannabis vapes are listed under{" "}
              <Link href={PATHS.itemsThcVapes}>/items/vape-disposables</Link>. A
              Kingston Road information page also exists for nicotine vapes; this
              Beach-corridor URL is the neighbourhood owner for the same
              storefront.
            </p>
            <p>
              When a listing name includes a puff count or a kit versus pod label,
              use that text only to tell products apart. Open the individual item
              page for the details attached to that listing. Do not copy one format
              onto another item.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Visit 615 Kingston Rd for the current shelf</h2>
            <p>
              Adults 19+ walk in with government-issued photo ID. The Kingston Road
              door is open 24 hours daily. Staff can help you compare the current
              nicotine vape category in store. For TTC, parking, and Beach corridor
              landmarks, use the <Link href="/visit">Kingston Road visit guide</Link>.
              For open-now questions, use the{" "}
              <Link href={HOURS_LP_PATH}>24-hour Kingston Road dispensary</Link>{" "}
              page.
            </p>
            <p>
              Weed delivery from this store is a separate path confirmed by the
              dispatcher. Native cigarettes are a separate retail category on this
              same Kingston Road block — see{" "}
              <Link href={CIGARETTES_LP_PATH}>Native cigarettes Kingston Road</Link>.
              A product-style preview also lives on{" "}
              <Link href="/info/nicotine-vapes-kingston-road">
                /info/nicotine-vapes-kingston-road
              </Link>
              .
            </p>
          </section>

          <p>Adults 19+. Nicotine is addictive.</p>

          <StoreMeshNav currentPath={VAPE_LP_PATH} />

          <section>
            <h2 className={styles.sectionTitle}>Kingston Road nicotine vape questions</h2>
            {VAPE_LP_FAQS.map((faq) => (
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
