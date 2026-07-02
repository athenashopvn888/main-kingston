"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./blog.module.css";
import { STATIC_POSTS } from "./staticPosts";

export default function BlogContent() {
  return (
    <main className={styles.main}>
      <Navbar />

      <section style={{ width: "100%", overflow: "hidden", marginTop: "92px" }}>
        <Image
          src="/banners/blog_banner.webp"
          alt="Main Kingston Cannabis Blog"
          width={1920}
          height={640}
          priority
          sizes="100vw"
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
        />
      </section>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroH1}>
            Main Kingston Cannabis <span className={styles.heroAccent}>Blog</span>
          </h1>
          <p className={styles.heroSub}>
            Adult 19+ store guides, local visit-planning notes, and safe menu-category context.
          </p>
        </div>
      </section>

      <section className={styles.postsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Guides &amp; Resources</h2>
          <div className={styles.postsGrid}>
            {STATIC_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
                <div className={styles.postEmoji}>Guide</div>
                <div className={styles.postMeta}>
                  <span className={styles.postCategory}>{post.category}</span>
                  <span className={styles.postDot}>-</span>
                  <span className={styles.postTime}>{post.readTime}</span>
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <div className={styles.postDate}>
                  {new Date(post.date).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Plan Your Visit</h2>
          <p className={styles.ctaSub}>
            Review store details and menu categories before visiting as an adult 19+ shopper.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/weed-dispensary-toronto" className={styles.ctaBtn}>
              Store Page
            </Link>
            <Link href="/faq" className={styles.ctaBtnSecondary}>
              FAQ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
