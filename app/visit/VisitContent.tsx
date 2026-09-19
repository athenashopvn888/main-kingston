import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { STORE_NAP } from "../lib/storeNap";
import styles from "./visit.module.css";

export default function VisitPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Supporting how-to-reach · Adults 19+</p>
        <h1 className={styles.title}>How to reach Main Kingston Cannabis on Kingston Road</h1>
        <p className={styles.lede}>
          Main Kingston Cannabis is the walk-in dispensary at{" "}
          <strong>{STORE_NAP.addressLine}</strong>. Address, hours, and the map
          live on the homepage visit hub. This page is the extra detail for TTC,
          parking, and Upper Beaches landmarks.
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href={STORE_NAP.mapsSearchUrl}>
            Open Google Maps
          </a>
          <Link className={styles.secondary} href="/#visit-hub">
            Homepage visit hub
          </Link>
          <Link className={styles.secondary} href="/24-hour-kingston-road-dispensary">
            Open now · 24-hour Kingston Road
          </Link>
          <a className={styles.secondary} href={`tel:${STORE_NAP.phoneIntl}`}>
            Call {STORE_NAP.phoneDisplay}
          </a>
        </div>
      </section>

      <section className={styles.nap} aria-label="Store name, address, and phone">
        <article>
          <h2>Main Kingston Cannabis</h2>
          <address>
            615 Kingston Rd
            <br />
            Toronto, ON M4E 1R3
          </address>
          <p>
            Phone:{" "}
            <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>
          </p>
          <p>
            Hours: {STORE_NAP.hoursLabel} · {STORE_NAP.hoursDetail}
          </p>
          <p>Nearest intersection: {STORE_NAP.intersection}</p>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>TTC to Kingston Road &amp; Main Street</h2>
          <p>
            The shop sits on Kingston Road in the Upper Beaches, where Main
            Street crosses the corridor. Line 2 (Bloor–Danforth) at Main Street Station
            is the closest subway. Walk south on Main Street past
            Gerrard and you hit Kingston Road at 615.
          </p>
          <p>
            The 64 Main bus follows Main Street between the Danforth and Queen.
            The 503 Kingston Rd streetcar runs along Kingston Road itself when
            it is in service. Further south, the 501 Queen streetcar meets
            Kingston Road near the lake if you are coming from the Boardwalk
            side.
          </p>
        </article>
        <article className={styles.card}>
          <h2>Parking on Kingston Road</h2>
          <p>
            Street parking lines Kingston Road around the Upper Beaches
            storefront. Posted signs change by block and time of day — read them
            on the curb around 615 Kingston Rd before you leave the car. Do not
            assume evening rules match daytime rules on this stretch of the
            East End.
          </p>
        </article>
        <article className={styles.card}>
          <h2>Upper Beaches landmarks</h2>
          <p>
            Pin Kingston Road and Main Street. That is the Upper Beaches retail
            strip, west of Victoria Park and north of Woodbine Beach. Kew
            Gardens and the Boardwalk sit a few blocks south toward Queen. The
            Danforth is north. Birch Cliff continues east along Kingston Road
            into Scarborough Southwest. If a maps app offers “Main and
            Kingston,” you are on the correct corner for 615.
          </p>
        </article>
        <article className={styles.card}>
          <h2>Walk-in, 19+</h2>
          <p>
            No appointment. Bring government photo ID. Main Kingston Cannabis is{" "}
            {STORE_NAP.hoursLabel}, so late Line 2 rides and early East End
            shifts still end at the same counter. Call {STORE_NAP.phoneDisplay}{" "}
            if you want the budtender to confirm a specific item before you walk
            south from the Danforth.
          </p>
          <p>
            Neighbourhood pages for this corridor:{" "}
            <Link href="/24-hour-kingston-road-dispensary">24-hour Kingston Road</Link>
            {", "}
            <Link href="/weed-delivery-kingston-road">weed delivery</Link>
            {", "}
            <Link href="/native-cigarettes-kingston-road">Native cigarettes</Link>
            {", and "}
            <Link href="/nicotine-vape-kingston-road">nicotine vape</Link>.
          </p>
        </article>
      </section>

      <section className={styles.mapBlock}>
        <h2>Map to 615 Kingston Rd</h2>
        <div className={styles.mapWrap}>
          <iframe
            title="Map to Main Kingston Cannabis at 615 Kingston Rd, Toronto"
            src={STORE_NAP.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
