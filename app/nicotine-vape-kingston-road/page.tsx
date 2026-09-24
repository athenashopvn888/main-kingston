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
    "Nicotine devices at 615 Kingston Rd, on Kingston Road in the Upper Beaches. The live list is /items/vapes, kept apart from THC disposables. Adults 19+. Nicotine is addictive.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Nicotine Vape Kingston Road near Main Street | Main Kingston Cannabis",
    description:
      "Upper Beaches nicotine list for the Kingston Road counter at 615. Open /items/vapes for today's rows. THC disposables stay on their own category.",
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
            Nicotine devices at Main Kingston Cannabis come off the same counter
            that faces Kingston Road at 615, in the Upper Beaches. This corridor
            page owns that neighbourhood intent. Open{" "}
            <Link href={PATHS.itemsVapes}>/items/vapes</Link> for whatever is
            posted today. Nothing here assigns a price or a draw-count promise to
            a device. Nicotine is addictive. Adults 19+.
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
            <h2 className={styles.sectionTitle}>Two vape lists, one civic address on Kingston Road</h2>
            <p>
              A nicotine device belongs on{" "}
              <Link href={PATHS.itemsVapes}>/items/vapes</Link>. A cannabis or THC
              disposable belongs on{" "}
              <Link href={PATHS.itemsThcVapes}>/items/vape-disposables</Link>. If
              you walked down Main Street for one of those lists, open the matching
              category before you assume the other shelf will do. The Upper
              Beaches storefront does not fold those two lists into one
              neighbourhood page. A shorter picture set also lives on{" "}
              <Link href="/info/nicotine-vapes-kingston-road">
                /info/nicotine-vapes-kingston-road
              </Link>
              .
            </p>
            <p>
              If a row name carries a number or says kit versus pod, use that
              wording only to keep the rows straight. Open the item page attached
              to that row for the details that belong to it. Do not paste one
              format onto a different device.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Main Street Station to the nicotine shelf</h2>
            <p>
              Walk south from Main Street Station along Main Street until Kingston
              Road. The shop is 615. Curb parking is on Kingston Road; read the
              posted signs on that Upper Beaches block. Kew Gardens and the
              Boardwalk are south of here, not the pin for this door. Adults 19+
              need government photo ID at every hour, including the overnight
              window this shop already publishes as Open 24 Hours. Nicotine is
              addictive.
            </p>
            <p>
              TTC and parking notes are on the{" "}
              <Link href="/visit">Kingston Road visit guide</Link>. Open-now
              questions use the{" "}
              <Link href={HOURS_LP_PATH}>24-hour Kingston Road dispensary</Link>{" "}
              page. Cigarettes are a different retail category on this same
              corner — see{" "}
              <Link href={CIGARETTES_LP_PATH}>Native cigarettes on Kingston Road</Link>.
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
