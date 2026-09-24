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
    "Adults 19+ can walk the Upper Beaches cigarette counter at 615 Kingston Rd, south of Main Street Station. Posted carton and pack rows stay on the cigarette category. Tobacco is addictive.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Native Cigarettes on the Kingston Road Beach Corridor | Main Kingston Cannabis",
    description:
      "Upper Beaches cigarette counter at 615 Kingston Rd. Read each pack or carton row on the category, then walk in. The door is Open 24 Hours.",
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
            The cigarette counter at 615 Kingston Rd sits on the Upper Beaches
            face of Kingston Road, a few steps from the Main Street corner.
            Riders who get off Line 2 at Main Street Station and walk south past
            Gerrard are looking for this door, not a city-wide smoke directory.
            Adults 19+ only. Tobacco is addictive. Whatever carton or pack lines
            are posted today stay on the cigarette category.
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
            <h2 className={styles.sectionTitle}>Reading a row on this Upper Beaches shelf</h2>
            <p>
              Open the cigarette category and stay on one row: the name, whether
              that row is a single pack or a carton, and the figure printed beside
              it. Mixing a single-pack figure with a carton figure will not tell
              you what the Kingston Road shelf costs. If a name you want is
              missing, call{" "}
              <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>{" "}
              before you leave the Danforth, or open{" "}
              <Link href={PATHS.itemsCigarettes}>/items/cigarettes</Link>. A
              picture preview also sits on the{" "}
              <Link href="/info/native-cigarettes-kingston-road">
                Kingston Road cigarette information page
              </Link>
              . This page does not invent a price.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>From the station to the Kingston Road counter</h2>
            <p>
              Curb parking is the stretch of Kingston Road in front of 615. Signs
              change by block, so read the Upper Beaches curb before you lock the
              car. The 64 Main bus runs along Main Street. When the 503 Kingston
              Rd streetcar is in service it follows the corridor itself. Woodbine
              Beach and Kew Gardens sit south, toward Queen — they are landmarks,
              not the pin for this door. Adults 19+ show government photo ID at
              every hour, including overnight. The shop already publishes Open 24
              Hours.
            </p>
            <p>
              Arrival notes live on the <Link href="/visit">visit guide</Link>.
              Open-now questions live on the{" "}
              <Link href={HOURS_LP_PATH}>24-hour Kingston Road dispensary</Link>{" "}
              page. Nicotine devices are a different list — use{" "}
              <Link href={VAPE_LP_PATH}>nicotine vape on the Kingston Road Beach corridor</Link>.
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
