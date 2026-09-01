import Link from "next/link";
import styles from "./WeedDiscoveryModule.module.css";
import { weedOwner as store } from "../lib/weedDiscovery";

export function WeedDiscoveryModule() {
  return (
    <section className={styles.section} aria-labelledby="weed-discovery-title">
      <div className={styles.inner}>
        <p className={styles.kicker}>{store.hoursLabel ? `${store.hoursLabel} · Adults 19+` : "Adults 19+"}</p>
        <h2 id="weed-discovery-title">{store.home.title}</h2>
        <p>{store.home.text}</p>
        <div className={styles.actions}>
          <Link href={store.ownerPath} className={styles.primary}>{store.home.primaryLabel}</Link>
          <Link href={store.home.secondaryHref} className={styles.secondary}>{store.home.secondaryLabel}</Link>
        </div>
      </div>
    </section>
  );
}

