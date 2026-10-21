import Link from "next/link";
import { CIGARETTES_LP_PATH, FOUR_PILLAR_HUBS, HOURS_LP_PATH } from "../lib/organicPaths";
import { storeClaimsOpen24Hours } from "../lib/storeNap";
import { SHOW_CIGARETTES } from "../lib/siteConfig";
import styles from "./FourPillarHub.module.css";

export function FourPillarHub({
  heading = "Kingston Road / Beach corridor hubs",
}: {
  heading?: string;
}) {
  const cards = FOUR_PILLAR_HUBS.filter(
    (hub) => (hub.href !== HOURS_LP_PATH || storeClaimsOpen24Hours()) && (SHOW_CIGARETTES || hub.href !== CIGARETTES_LP_PATH),
  );

  return (
    <section className={styles.wrap} aria-labelledby="four-pillar-heading">
      <h2 id="four-pillar-heading" className={styles.heading}>
        {heading}
      </h2>
      <p className={styles.intro}>
        {SHOW_CIGARETTES ? (
          <>
        Five neighbourhood pages plus the Kingston Road visit guide for this
        storefront at 615 Kingston Rd. Hours and what is sold stay true:
        24-hour walk-in, weed delivery, Native cigarettes, nicotine vapes,
        and the Kingston Road weed dispensary owner. The visit card covers
        parking and the walk from Main Street Station. Adults 19+.
          </>
        ) : (
          <>
        Neighbourhood pages plus the Kingston Road visit guide for this
        storefront at 615 Kingston Rd. Hours and what is sold stay true:
        24-hour walk-in, weed delivery, nicotine vapes,
        and the Kingston Road weed dispensary owner. The visit card covers
        parking and the walk from Main Street Station. Adults 19+.
          </>
        )}
      </p>
      <div className={styles.grid}>
        {cards.map((hub) => (
          <Link key={hub.href} href={hub.href} className={styles.card}>
            <span className={styles.label}>{hub.label}</span>
            <span className={styles.blurb}>{hub.blurb}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
