"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./blogpost.module.css";
import { getStaticPost } from "../staticPosts";

function renderContent(raw: string) {
  return raw.split("\n\n").map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return <h2 key={i} className={styles.contentH2}>{trimmed.replace("## ", "")}</h2>;
    }
    if (trimmed.startsWith("### ")) {
      return <h3 key={i} className={styles.contentH3}>{trimmed.replace("### ", "")}</h3>;
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((line) => line.trim().startsWith("- "));
      return (
        <ul key={i} className={styles.contentList}>
          {items.map((item, j) => <li key={j}>{item.replace(/^-\s*/, "")}</li>)}
        </ul>
      );
    }

    const html = trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    return <p key={i} className={styles.contentP} dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

export default function PostContent() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getStaticPost(slug);

  if (!post) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.notFound}>
            <h1>Post Not Found</h1>
            <p>This blog post does not exist or has been removed.</p>
            <Link href="/blog" className={styles.backLink}>Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Navbar />
      <article className={styles.content}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/blog">Blog</Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{post.title}</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span>{post.author}</span>
            <span>-</span>
            <span>{new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </header>

        <div className={styles.body}>{renderContent(post.content)}</div>

        <section className={styles.relatedLinks}>
          <h2 className={styles.contentH2}>Helpful next steps</h2>
          <ul className={styles.relatedList}>
            {post.relatedLinks.map((link) => (
              <li key={link.url}>
                <a href={link.url}>{link.title}</a>
                <p>{link.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.cta}>
          <p><strong>Main Kingston Cannabis</strong> - use the store page for current store details before visiting.</p>
          <Link href="/weed-dispensary-toronto" className={styles.ctaBtn}>Store Page</Link>
        </div>

        <Link href="/blog" className={styles.backLink}>Back to Blog</Link>
      </article>
      <Footer />
    </main>
  );
}
