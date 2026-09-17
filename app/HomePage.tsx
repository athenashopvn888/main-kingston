"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import FleetAnnouncementBanner from "./components/FleetAnnouncementBanner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FlowerCard from "./components/FlowerCard";
import { WeedDiscoveryModule } from "./components/WeedDiscoveryModule";
import SmokePilotSpotlight from "./components/SmokePilotSpotlight";
import { allFlowers } from "./lib/products";
import { HOME_FAQS, STORE_NAP } from "./lib/storeNap";
import Papa from "papaparse";

/* -- Bento Mosaic Config -- */
const BENTO_TIERS = [
  {
    name: "EXOTIC WEED",
    slug: "exotic-weed",
    price: "Explore collection",
    banner: "/banners/exotics_banner.webp",
    className: styles.bentoExotic,
  },
  {
    name: "PREMIUM WEED",
    slug: "premium-weed",
    price: "Explore collection",
    banner: "/banners/premium_banner.webp",
    className: styles.bentoPremium,
  },
  {
    name: "AAA+ WEED",
    slug: "aaa-weed",
    price: "Explore collection",
    banner: "/banners/aaa_plus_banner.webp",
    className: styles.bentoTile,
  },
  {
    name: "AA WEED",
    slug: "aa-weed",
    price: "Explore collection",
    banner: "/banners/aa_banner.webp",
    className: styles.bentoTile,
  },
  {
    name: "BUDGET WEED",
    slug: "budget-weed",
    price: "Explore collection",
    banner: "/banners/budget_banner.webp",
    className: styles.bentoTile,
  },
  {
    name: "EDIBLES - PREROLLS - MORE",
    slug: "items/edibles",
    price: "Shop Tiers",
    banner: "/banners/edibles_prerolls_more_banner.webp",
    className: styles.bentoEdibles,
  },
];

/* -- Explore Categories Config (New Banners) -- */
const EXPLORE_CATEGORIES = [
  { name: "Nicotine Vapes", slug: "items/vapes", banner: "/banners/01_Vape_Pens.webp" },
  { name: "THC Vapes", slug: "items/vape-disposables", banner: "/banners/02_Vape_Disposable.webp" },
  { name: "Concentrates", slug: "items/concentrates", banner: "/banners/03_Concentrates.webp" },
  { name: "Pre-Rolls", slug: "items/prerolls", banner: "/banners/04_Pre_Rolls.webp" },
  { name: "Accessories", slug: "items/add-ons", banner: "/banners/05_Accessories.webp" },
  { name: "Magic Stuff", slug: "items/magic", banner: "/banners/09_Magic_Stuff.webp" },
];

interface Review {
  name: string;
  comment: string;
  date: string;
}

interface ReviewStats {
  total: number;
  avg: number;
}

export default function HomePage() {
  const [featuredStrains, setFeaturedStrains] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsStats, setReviewsStats] = useState<ReviewStats | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  /* -- 1. Fetch Client-Side Google Reviews -- */
  useEffect(() => {
    const STORE_KEY = "MKC01";
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSu6iy9W3YKRzBYo_r96rXcbJsAOzlkzn5Rw9QMFnE0NbYSBgPxKX8kPRZNC9QcffZYj57155esmnqH/pub?gid=1555782756&single=true&output=csv";

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Review feed returned ${r.status}`);
        return r.text();
      })
      .then((raw) => {
        const rows = Papa.parse<Record<string, string>>(raw, {
          header: true,
          skipEmptyLines: true,
        }).data;

        const reviewsPool: Review[] = [];
        let totalVal: number | null = null;
        let avgVal: number | null = null;
        let hasStats = false;

        rows.forEach((row) => {
          if (row.StoreKey !== STORE_KEY) return;

          const rn = row.ReviewerName || "";
          if (rn === "__STATS__") {
            const parsedTotal = parseInt(row.Comment || "", 10);
            const parsedAvg = parseFloat(row.CreateTime || "");
            if (Number.isFinite(parsedTotal) && Number.isFinite(parsedAvg)) {
              totalVal = parsedTotal;
              avgVal = parsedAvg;
              hasStats = true;
            }
            return;
          }

          const comment = row.Comment || "";
          if (!comment || comment.length < 10) return;
          const name = rn || "Customer";
          const dateStr = row.CreateTime || "";
          reviewsPool.push({ name, comment, date: dateStr });
        });

        setReviews(reviewsPool.slice(0, 6));
        if (hasStats && totalVal !== null && avgVal !== null) {
          setReviewsStats({ total: totalVal, avg: avgVal });
        }
        setReviewsLoading(false);
      })
      .catch((err) => {
        console.warn("Reviews fetch failed:", err);
        setReviewsLoading(false);
      });
  }, []);

  /* -- 2. Build Featured Strains -- */
  useEffect(() => {
    const pool = [...allFlowers].filter((f) => f.image);
    // Shuffle pool securely
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const picked: typeof pool = [];
    const tierCounts: Record<string, number> = {};

    for (const f of pool) {
      if (picked.length >= 8) break;
      const tc = tierCounts[f.tier] || 0;
      if (tc >= 2) continue; // max 2 per tier
      if (picked.some((p) => p.name === f.name)) continue; // avoid exact duplicates
      picked.push(f);
      tierCounts[f.tier] = tc + 1;
    }

    setFeaturedStrains(picked);
  }, []);

  return (
    <main className={styles.main}>
      <FleetAnnouncementBanner />
      {/* -- NAVBAR -- */}
      <Navbar />

      {/* -- WELCOME BANNER -- */}
      <section className={styles.welcomeBannerSection}>
        <div className={styles.welcomeBannerContainer}>
          <img
            src="/banners/welcome_banner.webp"
            alt="Welcome to Main Kingston Cannabis - Premium Toronto Cannabis Dispensary"
            className={styles.welcomeBannerImg}
          />
        </div>
      </section>

      {/* -- BENTO MOSAIC HERO -- */}


      <section className={styles.hiringCallout} aria-label="Hiring at Main Kingston Cannabis">
        <div className={styles.hiringCalloutInner}>
          <div>
            <span className={styles.hiringEyebrow}>Budtenders / Managers Wanted</span>
            <h2>Join Main Kingston</h2>
            <p>Main Kingston is taking online applications for budtender and manager roles. We are looking for motivated, reliable people who can keep good energy on busy and late shifts. Online applications only. Please do not call the store about hiring.</p>
          </div>
          <Link href="/careers/budtender" className={styles.hiringButton}>Apply Online</Link>
        </div>
      </section>

<section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroStars} />

        <div className={styles.heroContent}>
          {/* Brand branding */}
          <div className={styles.brandBlock}>
            <img src="/storeFavicon.webp" alt="Main Kingston Cannabis Icon" style={{ height: "60px", width: "60px", objectFit: "contain", borderRadius: "8px", marginBottom: "8px" }} />
            <h1 className={styles.brandTitle}>MAIN KINGSTON CANNABIS</h1>
            <p className={styles.brandSub}>Kingston Road &amp; Main Street · Upper Beaches</p>
            <div className={styles.brandBadge}>Open 24 Hours</div>
          </div>

          {/* Bento Grid */}
          <div className={styles.bentoGrid}>
            {BENTO_TIERS.map((tier) => (
              <Link
                key={tier.slug}
                href={`/${tier.slug}`}
                className={`${styles.bentoTile} ${tier.className}`}
              >
                <div
                  className={styles.bentoTileBg}
                  style={{ backgroundImage: `url('${tier.banner}')` }}
                />
                <div className={styles.bentoTileOverlay} />
                <div className={styles.bentoTileContent}>
                  <span className={styles.bentoLabel}>{tier.name}</span>
                  <span className={styles.bentoPrice}>{tier.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -- EXPLORE CATEGORIES -- */}
      <section className={styles.categoriesSection} id="menu">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore Categories</h2>
            <p className={styles.sectionSubtitle}>
              From custom disposable vapes and concentrates to accessories and cigarettes.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {EXPLORE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={styles.categoryCard}
              >
                <div
                  className={styles.categoryCardBg}
                  style={{ backgroundImage: `url('${cat.banner}')` }}
                />
                <div className={styles.categoryCardOverlay} />
                <div className={styles.categoryCardContent}>
                  <h3 className={styles.categoryCardName}>
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SmokePilotSpotlight
        storeName="Main Kingston Cannabis"
        locationLabel="Kingston Road near Main Street"
        cigaretteHref="/info/native-cigarettes-kingston-road"
        nicotineHref="/info/nicotine-vapes-kingston-road"
      />

      <WeedDiscoveryModule />

      {/* -- FEATURED PRODUCTS -- */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Strains</h2>
            <p className={styles.sectionSubtitle}>
              A rotating sample from the current flower menu.
            </p>
          </div>

          <div className={styles.featuredScroll}>
            {featuredStrains.map((strain, i) => (
              <div key={`${strain.sku}-${i}`} className={styles.scrollItem}>
                <FlowerCard flower={strain} tierKey={strain.tier} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- SEO PANEL WRITE-UP -- */}
      <section className={styles.seoSection}>
        <div className={styles.container}>
          <div className={styles.seoPanel}>
            <h2 className={styles.seoPanelTitle}>Kingston Road walk-in dispensary at 615 Kingston Rd — Open 24 Hours</h2>
            <p className={styles.seoPanelText}>
              <strong>Main Kingston Cannabis</strong> is the East End walk-in shop where Kingston Road meets Main Street in the Upper Beaches, at 615 Kingston Rd. Flower is sorted into Exotic, Premium, AAA+, AA, and Budget collections so you can compare the counter without treating the whole city as the search.
            </p>
            <p className={styles.seoPanelText}>
              The storefront faces Kingston Road, a short walk south of Main Street Station on Line 2. Ride the 64 Main bus, take the 503 Kingston Rd streetcar when it is running, or park on the street and read the signs. Main Kingston Cannabis is Open 24 Hours — late subway rides and early Upper Beaches errands still land at the same door.
            </p>
            <p className={styles.seoPanelText}>
              Bring government photo ID if you are 19+. Call {STORE_NAP.phoneDisplay} for a pin to {STORE_NAP.addressLine}, or use the{" "}
              <Link href="/visit">Kingston Road how-to-reach page</Link> for TTC, parking, and landmark notes. The homepage is the visit hub for address, hours, and directions.
            </p>
          </div>
        </div>
      </section>

      {/* -- CLIENT-SIDE GOOGLE REVIEWS SHOWCASE -- */}
      <section className={styles.reviewsSection}>
        <div className={styles.container}>
          <div className={styles.reviewsHeader}>
            <h2 className={styles.sectionTitle}>Customer Feedback</h2>
            {reviewsStats && (
              <div className={styles.reviewsStarsSummary}>
                <span className={styles.reviewsStars}>{"\u2605\u2605\u2605\u2605\u2605"}</span>
                <span className={styles.reviewsAvg}>
                  {reviewsStats.avg.toFixed(1)}
                </span>
                <span className={styles.reviewsCount}>
                  ({reviewsStats.total} reviews)
                </span>
              </div>
            )}
          </div>

          <div className={styles.reviewsGrid}>
            {reviewsLoading ? (
              <div className={styles.reviewsLoading}>Loading customer feedback...</div>
            ) : reviews.length === 0 ? (
              <div className={styles.reviewsLoading}>
                Customer feedback is unavailable right now.
              </div>
            ) : (
              reviews.map((rv, idx) => (
                <div key={idx} className={styles.rvCard}>
                  <div className={styles.rvTop}>
                    <div className={styles.rvAvatar}>
                      {rv.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.rvMeta}>
                      <span className={styles.rvName}>{rv.name}</span>
                      {rv.date && (
                        <span className={styles.rvDate}>
                          {new Date(rv.date).toLocaleDateString("en-CA", {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                      )}
                    </div>
                    <span className={styles.rvStars}>*****</span>
                  </div>
                  <p className={styles.rvText}>
                    {rv.comment.length > 180 ? `${rv.comment.substring(0, 177)}...` : rv.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className={styles.reviewCtaRow}>
          </div>
        </div>
      </section>

      {/* -- FAQS SECTION -- */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "32px" }}>
            Frequently Asked Questions
          </h2>
          {HOME_FAQS.map((faq) => (
            <details key={faq.q} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* -- HOMEPAGE VISIT HUB (NAP / hours / map / directions) -- */}
      <section className={styles.storeSection} id="visit-hub">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Visit Main Kingston Cannabis on Kingston Road</h2>
            <p className={styles.sectionSubtitle}>
              Address, hours, map, and directions live here.{" "}
              <Link href="/visit" className={styles.storeLink}>
                TTC, parking, and landmark notes
              </Link>{" "}
              are on the supporting how-to-reach page.
            </p>
          </div>
          <div className={styles.storeGrid} id="contact">
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Location</h3>
              <p className={styles.storeCardText}>
                Main Kingston Cannabis
                <br />
                615 Kingston Rd
                <br />
                Toronto, ON M4E 1R3
                <br />
                <span className={styles.storeHighlight}>{STORE_NAP.intersection}</span>
              </p>
            </div>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Hours</h3>
              <p className={styles.storeCardText}>
                {STORE_NAP.hoursDetail}
                <br />
                <span className={styles.storeHighlight}>{STORE_NAP.hoursLabel}</span>
              </p>
            </div>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Phone</h3>
              <p className={styles.storeCardText}>
                <a className={styles.storeLink} href={`tel:${STORE_NAP.phoneIntl}`}>
                  {STORE_NAP.phoneDisplay}
                </a>
                <br />
                Adults 19+ · walk-in
              </p>
            </div>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Walk In</h3>
              <p className={styles.storeCardText}>
                No appointment needed
                <br />
                <span className={styles.storeHighlight}>Kingston Road / Upper Beaches</span>
              </p>
            </div>
          </div>

          <p className={styles.visitHubNotes}>
            Street parking lines Kingston Road in the Upper Beaches — check posted signs on the block. Line 2 at Main Street Station is the closest subway, then south on Main Street to Kingston Road. The 64 Main bus and the 503 Kingston Rd streetcar serve the corridor.
          </p>
          <div className={styles.visitHubActions}>
            <a className={styles.visitHubPrimary} href={STORE_NAP.mapsSearchUrl}>
              Directions to 615 Kingston Rd
            </a>
            <Link className={styles.visitHubSecondary} href="/visit">
              How to get here
            </Link>
          </div>

          <div className={styles.mapWrap}>
            <iframe
              title="Map to Main Kingston Cannabis at 615 Kingston Rd, Toronto"
              src={STORE_NAP.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.mapFrame}
            />
          </div>
        </div>
      </section>

      {/* -- FOOTER -- */}
      <Footer />
    </main>
  );
}
