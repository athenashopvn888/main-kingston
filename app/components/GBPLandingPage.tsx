import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./GBPLandingPage.module.css";
import { weedOwner as store } from "../lib/weedDiscovery";

const storeSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": `https://${store.domain}${store.ownerPath}`,
  name: store.storeName,
  url: `https://${store.domain}${store.ownerPath}`,
  telephone: store.phoneIntl,
  address: { "@type": "PostalAddress", streetAddress: store.streetAddress, addressLocality: store.city, addressRegion: "ON", postalCode: store.postalCode, addressCountry: "CA" },
  ...(store.openingHours ? { openingHours: store.openingHours } : {}),
};

export function GBPLandingPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }} />
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{store.hoursLabel ? `${store.hoursLabel} · Adults 19+` : "Adults 19+"}</p>
          <h1>{store.h1}</h1>
          <p className={styles.heroAddress}>{store.streetAddress}, {store.city}, ON {store.postalCode}</p>
          <div className={styles.actions}><Link href="#find-your-weed" className={styles.primaryAction}>Find Your Weed</Link><Link href="#visit" className={styles.secondaryAction}>Visit {store.storeName}</Link></div>
        </section>

        <section className={styles.section}>
          <h2>{store.introTitle}</h2>
          {store.intro.map((text) => <p key={text}>{text}</p>)}
        </section>

        <section className={styles.section} id="find-your-weed">
          <p className={styles.kicker}>{store.findTitle}</p>
          <h2>Explore Verified Starting Points</h2>
          <div className={styles.cardGrid}>{store.discoveryLinks.map((item) => <Link href={item.href} className={styles.card} key={item.href}><span>{item.label}</span><small>{item.description}</small></Link>)}</div>
          <p className={styles.note}>These links do not confirm current stock, pricing, deals or promotions. Call <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> before making a special trip for one specific item.</p>
        </section>

        <section className={styles.section}>
          <h2>Weed, Cannabis, Bud and Flower</h2>
          <p>Different shoppers use different words for cannabis. The terms overlap, but product format is usually the more useful distinction.</p>
          <div className={styles.termGrid}>
            <article><h3>Weed</h3><p>Weed is common everyday language for cannabis.</p></article>
            <article><h3>Cannabis</h3><p>Cannabis is the broader term covering flower and other retail formats.</p></article>
            <article><h3>Flower</h3><p>Flower refers specifically to dried cannabis flower.</p></article>
            <article><h3>Bud</h3><p>Bud is a common informal term for cannabis flower.</p></article>
          </div>
          <p>Choosing the cannabis format you want to explore is more useful than worrying about which of these words you use.</p>
        </section>

        <section className={styles.visitSection} id="visit">
          <div><p className={styles.kicker}>{store.hoursLabel || "Adults 19+"}</p><h2>{store.storeName}</h2><address>{store.streetAddress}<br />{store.city}, ON {store.postalCode}</address></div>
          <div className={styles.visitFacts}>{store.hoursLabel && <strong>{store.hoursLabel}</strong>}<a href={`tel:${store.phoneIntl}`}>Phone: {store.phoneDisplay}</a><span>Adults 19+</span></div>
          <p>Call ahead if one particular product is the reason for your trip. This page does not make a current inventory claim.</p>
        </section>

        <section className={styles.section}>
          <h2>Helpful {store.storeName} Guides</h2>
          <div className={styles.guideGrid}>{store.guides.map((guide) => <article className={styles.guideCard} key={guide.href}><h3>{guide.label}</h3><p>{guide.description}</p><Link href={guide.href}>Explore {guide.label}</Link></article>)}</div>
        </section>

        <section className={styles.section} id="faq"><h2>Frequently Asked Questions</h2><div className={styles.faqList}>{store.faq.map((item) => <article className={styles.faqItem} key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section>
      </main>
      <Footer />
    </>
  );
}
