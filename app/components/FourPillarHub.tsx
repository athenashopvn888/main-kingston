import Link from "next/link";
import { FOUR_PILLAR_HUBS } from "../lib/organicPaths";
import styles from "./FourPillarHub.module.css";

export function FourPillarHub({
  heading = "Kingston Road / Beach corridor hubs",
}: {
  heading?: string;
}) {
  return (
    <section className={styles.wrap} aria-labelledby="four-pillar-heading">
      <h2 id="four-pillar-heading" className={styles.heading}>
        {heading}
      </h2>
      <p className={styles.intro}>
        Four neighbourhood pages for this storefront at 615 Kingston Rd. Hours
        and what is sold stay true: 24-hour walk-in, weed delivery, Native
        cigarettes, and nicotine vapes. Adults 19+. The homepage remains the
        address, phone, and map hub.
      </p>
      <div className={styles.grid}>
        {FOUR_PILLAR_HUBS.map((hub) => (
          <Link key={hub.href} href={hub.href} className={styles.card}>
            <span className={styles.label}>{hub.label}</span>
            <span className={styles.blurb}>{hub.blurb}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
