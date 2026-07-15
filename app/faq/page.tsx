import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ Main Kingston Cannabis | Toronto Dispensary Questions",
  description:
    "Frequently asked questions about Main Kingston Cannabis at 615 Kingston Rd, Toronto, ON M4E 1R3. Hours, location, products, category browsing, and visit planning.",
  alternates: {
    canonical: "https://www.mainkingstoncannabis.ca/faq",
  },
};

const FAQ_CATEGORIES = [
  {
    title: "Location And Hours",
    faqs: [
      {
        q: "Where is Main Kingston Cannabis located?",
        a: "Main Kingston Cannabis is located at 615 Kingston Rd, Toronto, ON M4E 1R3, near Kingston Road and Main Street.",
      },
      {
        q: "What are your hours?",
        a: "Main Kingston Cannabis is open 24 hours. Check the site or call (905) 467-0615 if you need current visit details.",
      },
      {
        q: "Is there parking nearby?",
        a: "Parking details vary by block and time of day. Check local signs before parking near 615 Kingston Rd.",
      },
      {
        q: "What local areas does this store focus on?",
        a: "Main Kingston Cannabis is centered on Main Street, Kingston Road, East Toronto, Upper Beaches, Danforth, Victoria Park, Birch Cliff, Scarborough Southwest.",
      },
      {
        q: "What is the best way to get there?",
        a: "Use 615 Kingston Rd as the address anchor, then choose the transit, walking, or driving route that fits your visit.",
      },
    ],
  },
  {
    title: "Products And Menu",
    faqs: [
      {
        q: "What products can shoppers browse?",
        a: "The site includes flower tiers, pre-rolls, edibles, vapes, concentrates, cigarettes, and accessories for adult 19+ shoppers.",
      },
      {
        q: "Does the online page guarantee current inventory?",
        a: "No. Category pages support browsing. Confirm current product availability on the live menu or in store.",
      },
      {
        q: "What are the flower tiers?",
        a: "Flower is organized into clear tiers such as Exotic, Premium, AAA+, AA, and Budget so shoppers can compare category information before visiting.",
      },
      {
        q: "Do you sell edibles and vapes?",
        a: "Yes, the site has category guides for edibles, vape pens, disposable vapes, and related menu items when listed.",
      },
      {
        q: "Do you list cigarette information?",
        a: "Yes. Cigarette category information is available, but current brands and pricing should be confirmed in store.",
      },
    ],
  },
  {
    title: "Shopping And Delivery",
    faqs: [
      {
        q: "Do I need an appointment?",
        a: "The site is built for browsing before visiting. Check current store details if you need a specific shopping requirement.",
      },
      {
        q: "Can I order online?",
        a: "Use the menu to browse current categories before visiting. Ordering and pickup details may vary by store process.",
      },
      {
        q: "Do you offer delivery?",
        a: "Delivery is marked coming soon unless the store announces that service is live. Use the delivery page to sign up for launch updates.",
      },
      {
        q: "Can staff help me choose a strain?",
        a: "Ask in store for help comparing tiers, product types, and current menu options.",
      },
    ],
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <Navbar />
        <section
          style={{ width: "100%", overflow: "hidden", marginTop: "92px" }}
        >
          <img
            src="/banners/07_FAQ.webp"
            alt="Main Kingston Cannabis FAQ"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
        </section>

        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>
            Answers for Main Kingston Cannabis shoppers near Kingston Road and
            Main Street.
          </p>

          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.title} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.title}</h2>
              {cat.faqs.map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          ))}

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Still have questions?</h2>
            <p className={styles.ctaText}>
              Call us at <strong>(905) 467-0615</strong> or visit us at 615
              Kingston Rd, Toronto.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
