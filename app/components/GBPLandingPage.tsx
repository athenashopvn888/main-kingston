import Link from "next/link";
import styles from "./GBPLandingPage.module.css";
import { gbpLocation } from "../lib/gbp-location";

// Dictionary mapping category names to their respective paths
const categoryLinks: { [key: string]: string } = {
  "Flower": "/",
  "Pre-rolls": "/items/prerolls",
  "Edibles": "/items/edibles",
  "THC vapes": "/items/vape-disposables",
  "Concentrates": "/items/concentrates",
  "Shatter": "/items/concentrates",
  "CBD oils": "/items/concentrates",
  "Accessories": "/items/add-ons"
};


type StoreSchemaMarkup = {
  "@context": "https://schema.org";
  "@type": "Store";
  name: string;
  url: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  priceRange: string;
  openingHours?: string[];
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
};
export function GBPLandingPage() {
  const landmarkList = gbpLocation.localLandmarks.join(", ");
  const nearbyAreaList = gbpLocation.nearbyAreas.slice(0, 5).join(", ");

  // Generate schema.org markup dynamically
  const schemaMarkup: StoreSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": gbpLocation.storeName,
    "url": `https://${gbpLocation.domain}/${gbpLocation.slug}/`,
    "telephone": gbpLocation.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": gbpLocation.streetAddress,
      "addressLocality": gbpLocation.city,
      "addressRegion": gbpLocation.province,
      "postalCode": gbpLocation.postalCode,
      "addressCountry": gbpLocation.country
    },
    "priceRange": "$$"
  };

  // Inject real opening hours and coordinates if they exist
  if (gbpLocation.hours && gbpLocation.hours.length > 0) {
    schemaMarkup.openingHours = gbpLocation.hours;
  }

  if (gbpLocation.latitude && gbpLocation.longitude) {
    schemaMarkup.geo = {
      "@type": "GeoCoordinates",
      "latitude": Number(gbpLocation.latitude),
      "longitude": Number(gbpLocation.longitude)
    };
  }

  return (
    <div className={styles.container}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Hero Header */}
      <header className={styles.hero}>
        <h1 className={styles.h1}>{gbpLocation.storeName} — Weed Dispensary in {gbpLocation.city}</h1>
        <p className={styles.heroTagline}>Serving {gbpLocation.city} & Nearby Neighborhoods</p>
      </header>

      {/* Call to Actions */}
      <div className={styles.btnRow}>
        <a href={gbpLocation.menuUrl} className={`${styles.btn} ${styles.btnPrimary}`}>
          View Menu
        </a>
        <a href={`tel:${gbpLocation.phoneIntl}`} className={`${styles.btn} ${styles.btnSecondary}`}>
          Call Store
        </a>
      </div>

      {/* Intro Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>A Local Weed Dispensary</h2>
        <p className={styles.introText}>{gbpLocation.introVariant}</p>
      </section>

      {/* Local Visit Planning Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Plan a Visit Near {gbpLocation.neighborhood}</h2>
        <p className={styles.infoText}>
          Use this local page to confirm the store location, review menu categories, and plan a visit around {landmarkList}. {gbpLocation.transitNote} {gbpLocation.parkingNote}.
        </p>
        <p className={styles.infoText}>
          Adult 19+ shoppers can use the category links below to orient themselves before visiting {gbpLocation.storeName}. For store-specific questions, call the store directly or review the menu categories on this site.
        </p>
        <div className={styles.btnRow}>
          <Link href={gbpLocation.menuUrl} className={`${styles.btn} ${styles.btnPrimary}`}>
            Review Menu Categories
          </Link>
          <a href={`tel:${gbpLocation.phoneIntl}`} className={`${styles.btn} ${styles.btnSecondary}`}>
            Call Store
          </a>
        </div>
      </section>

      {/* Product Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Weed and Cannabis Menu Categories</h2>
        <p className={styles.infoText}>
          At {gbpLocation.storeName}, the menu is organized into adult-use cannabis categories for 19+ shoppers in {gbpLocation.city}. Use the links below to browse category pages before you visit:
        </p>
        <div className={styles.productGrid}>
          {gbpLocation.products.map((p) => {
            const href = categoryLinks[p] || "/";
            return (
              <Link key={p} href={href} className={styles.productCard} aria-label={`Browse ${p} at ${gbpLocation.storeName}`}>
                {p}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Location & NAP Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Visit {gbpLocation.storeName} in {gbpLocation.city}</h2>
        <div className={styles.napGrid}>
          <div className={styles.napDetails}>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Store Name</span>
              <strong>{gbpLocation.storeName}</strong>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Address</span>
              <span>{gbpLocation.address}</span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Phone</span>
              <span><a href={`tel:${gbpLocation.phoneIntl}`} style={{ color: "inherit" }}>{gbpLocation.phone}</a></span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Website</span>
              <span><a href={`https://${gbpLocation.domain}/`} style={{ color: "inherit" }}>https://{gbpLocation.domain}/</a></span>
            </div>
            {gbpLocation.hours && gbpLocation.hours.length > 0 && (
              <div className={styles.napItem}>
                <span className={styles.napLabel}>Store Hours</span>
                {gbpLocation.hours.map((line) => (
                  <span key={line} style={{ fontSize: "0.95rem" }}>{line}</span>
                ))}
              </div>
            )}
            <div className={styles.napItem} style={{ marginTop: "10px" }}>
              <p className={styles.infoBlock} style={{ fontSize: "0.9rem", fontStyle: "italic", margin: 0 }}>
                * {gbpLocation.parkingNote}.
              </p>
            </div>
          </div>
          <div className={styles.mapWrapper}>
            {gbpLocation.mapEmbedUrl ? (
              <iframe
                title={`Map of ${gbpLocation.storeName}`}
                src={gbpLocation.mapEmbedUrl}
                className={styles.mapIframe}
                allowFullScreen={true}
                loading="lazy"
              />
            ) : (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                Map preview not available.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nearby Areas Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>{gbpLocation.sectionTitle}</h2>
        <p className={styles.infoText}>
          {gbpLocation.neighborhoodDescription} {gbpLocation.transitNote}. We proudly welcome customers from:
        </p>
        <div className={styles.areaList}>
          {gbpLocation.nearbyAreas.map((area) => (
            <span key={area} className={styles.areaTag}>
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* Store-Specific Guidance Section */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Helpful Local Shopper Notes</h2>
        <p className={styles.infoText}>
          {gbpLocation.storeName} serves adult 19+ shoppers near {nearbyAreaList}. Before heading over, review the address, store hours shown on this page, and the category links that match the type of visit you are planning.
        </p>
        <p className={styles.infoText}>
          This local page is meant to help shoppers connect the store location with nearby transit, parking, and menu-category information without changing any business name, address, phone, or hour details.
        </p>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.section}>
        <h2 className={styles.h2}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Where is {gbpLocation.storeName} located?</h3>
            <p className={styles.faqAnswer}>{gbpLocation.storeName} is located at {gbpLocation.address}.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Is {gbpLocation.storeName} a weed dispensary in {gbpLocation.city}?</h3>
            <p className={styles.faqAnswer}>
              Yes, {gbpLocation.storeName} is a fully licensed local weed dispensary in {gbpLocation.city} serving cannabis customers aged 19 and older with valid identification.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What products does {gbpLocation.storeName} carry?</h3>
            <p className={styles.faqAnswer}>
              Menu categories include flower, pre-rolls, THC edibles, concentrates, shatter, THC vape cartridges, CBD oils, and accessories. Selection can change.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Do I need to be 19+ to shop at {gbpLocation.storeName}?</h3>
            <p className={styles.faqAnswer}>
              Yes, to visit our cannabis store or order from our menu, you must be at least 19 years of age. Valid government-issued photo ID is required for verification.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What should I check before visiting {gbpLocation.storeName}?</h3>
            <p className={styles.faqAnswer}>
              Review the address, store hours shown on this page, and the menu category links before you visit. If you have a store-specific question, call {gbpLocation.storeName} directly.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Can I browse category pages before visiting?</h3>
            <p className={styles.faqAnswer}>
              Yes. Use the category links on this page to browse flower, pre-rolls, edibles, THC vapes, concentrates, shatter, CBD oils, and accessories before planning your visit.
            </p>
          </div>
          {gbpLocation.neighborhood && (
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Is {gbpLocation.storeName} near {gbpLocation.neighborhood}?</h3>
              <p className={styles.faqAnswer}>
                Yes, {gbpLocation.storeName} is located near {gbpLocation.neighborhood} and serves customers from nearby landmarks like {gbpLocation.localLandmarks.join(", ")}.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
