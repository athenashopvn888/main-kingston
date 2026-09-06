import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./resources.module.css";
import type { ResourcePage } from "./resourceData";

type ResourceViewProps = {
  page: ResourcePage;
};

export default function ResourceView({ page }: ResourceViewProps) {
  const canonical = page.slug
    ? `https://www.mainkingstoncannabis.ca/resources/${page.slug}`
    : "https://www.mainkingstoncannabis.ca/weed-resources";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": page.slug ? "Article" : "CollectionPage",
    headline: page.title,
    description: page.description,
    url: canonical,
    ...(page.datePublished ? { datePublished: page.datePublished, dateModified: page.datePublished } : {}),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mainkingstoncannabis.ca" },
      { "@type": "ListItem", position: 2, name: "Weed & Cannabis Resources", item: "https://www.mainkingstoncannabis.ca/weed-resources" },
      ...(page.slug ? [{ "@type": "ListItem", position: 3, name: page.title, item: canonical }] : []),
    ],
  };
  const faqSchema = page.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  } : null;
  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className={styles.intro}>{page.intro}</p>
        </div>
      </section>

      {page.cards.length > 0 && (
        <section className={styles.cardsSection}>
          <div className={styles.grid}>
            {page.cards.map((card) => (
              <Link key={card.href} href={card.href} className={styles.card}>
                <span>{card.title}</span>
                <p>{card.text}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.body}>
        {page.sections.map((section) => (
          <article key={section.heading} className={styles.section}>
            <h2>{section.heading}</h2>
            {section.body && <p>{section.body}</p>}
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.subsections?.map((subsection) => (
              <div key={subsection.heading} className={styles.subsection}>
                <h3>{subsection.heading}</h3>
                {subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {subsection.bullets && <ul>{subsection.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              </div>
            ))}
          </article>
        ))}
        {page.faqs && page.faqs.length > 0 && (
          <article className={styles.section}>
            <h2>Frequently Asked Questions</h2>
            {page.faqs.map((faq) => <div key={faq.question} className={styles.subsection}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}
          </article>
        )}
      </section>
      <Footer />
    </main>
  );
}
