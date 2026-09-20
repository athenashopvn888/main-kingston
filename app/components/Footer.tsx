import Link from "next/link";
import styles from "./Footer.module.css";
import { STORE_NAP } from "../lib/storeNap";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Column 1 — Store Description */}
          <div className={styles.col}>
            <div className={styles.brand}>MAIN KINGSTON CANNABIS</div>
            <p className={styles.desc}>
              Your Local Cannabis Dispensary At 615 Kingston Rd, Toronto. Visit
              Main Kingston Cannabis For Premium Flower, Edibles, Vapes &amp;
              More. Open 24 Hours.
            </p>
            <div className={styles.buttons}>
              <a href={`tel:${STORE_NAP.phoneIntl}`} className={styles.btnPrimary}>
                Call Now
              </a>
            </div>
          </div>

          {/* Column 2 — Contact Info */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact Info</h3>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address:</span>
              <span>{STORE_NAP.streetAddress}</span>
              <span>Toronto, ON {STORE_NAP.postalCode}</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span>
                <a href={`tel:${STORE_NAP.phoneIntl}`} style={{ color: "inherit" }}>
                  {STORE_NAP.phoneDisplay}
                </a>
              </span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>Open 24 Hours</span>
            </div>
          </div>

          {/* Column 3 — Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/exotic-weed">Exotic Weed</Link>
              <Link href="/premium-weed">Premium Weed</Link>
              <Link href="/aaa-weed">AAA+ Weed</Link>
              <Link href="/aa-weed">AA Weed</Link>
              <Link href="/budget-weed">Budget Weed</Link>
              <Link href="/items/edibles">Edibles</Link>
              <Link href="/items/cigarettes">Cigarettes</Link>
<Link href="/items/vapes">Nicotine Vapes</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/visit">Visit Kingston Road</Link>
              <Link href="/24-hour-kingston-road-dispensary">
                24-Hour Kingston Road Dispensary
              </Link>
              <Link href="/weed-dispensary-kingston-road">
                Weed Dispensary Kingston Road
              </Link>
              <Link href="/info/kingston-road-weed-dispensary">
                Kingston Road Dispensary
              </Link>
              <Link href="/weed-delivery-kingston-road">Weed Delivery Kingston Road</Link>
              <Link href="/weed-delivery-toronto">WEED DELIVERY</Link>
              <Link href="/info/cheap-weed-kingston-road">
                Cheap Weed Kingston Road
              </Link>
              <Link href="/native-cigarettes-kingston-road">
                Native Cigarettes Kingston Road
              </Link>
              <Link href="/nicotine-vape-kingston-road">Nicotine Vape Kingston Road</Link>
              <Link href="/info/native-cigarettes-kingston-road">
                Native Cigarettes Menu Preview
              </Link>
              <Link href="/info/nicotine-vapes-kingston-road">Nicotine Vapes Menu Preview</Link>
              <Link href="/weed-dispensary-toronto/">
                Main Kingston Cannabis Weed Dispensary in Toronto
              </Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/weed-resources">Weed Resources</Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            (c) {new Date().getFullYear()} Main Kingston Cannabis. Must be 19+
            to enter. Please follow applicable laws and product labels.
          </p>
        </div>
      </div>
    </footer>
  );
}
