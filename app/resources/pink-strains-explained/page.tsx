import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "./article.module.css";
import { ARTICLE_CANONICAL, ARTICLE_DESCRIPTION, ARTICLE_MARKDOWN, ARTICLE_TITLE } from "./body";

const PUBLISHED = "2026-11-18";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_TITLE,
  description: ARTICLE_DESCRIPTION,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": ARTICLE_CANONICAL,
    url: ARTICLE_CANONICAL,
  },
  url: ARTICLE_CANONICAL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { "@type": "Organization", name: "Main Kingston Cannabis" },
  publisher: { "@type": "Organization", name: "Main Kingston Cannabis" },
};

export const metadata: Metadata = {
  title: { absolute: ARTICLE_TITLE },
  description: ARTICLE_DESCRIPTION,
  alternates: { canonical: ARTICLE_CANONICAL },
  robots: "index,follow",
  openGraph: {
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    url: ARTICLE_CANONICAL,
    type: "article",
    siteName: "Main Kingston Cannabis",
  },
  twitter: {
    card: "summary",
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
  },
};

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return tokens.filter(Boolean).map((token, index) => {
    const strong = token.match(/^\*\*(.+)\*\*$/);
    if (strong) return <strong key={index}>{strong[1]}</strong>;
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2];
      if (href.startsWith("/") && !href.startsWith("//")) {
        return (
          <Link key={index} href={href}>
            {link[1]}
          </Link>
        );
      }
      return link[1];
    }
    return token;
  });
}

type Block =
  | { type: "h1" | "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

function splitTableRow(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let table: { headers: string[]; rows: string[][] } | null = null;
  const flush = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
    if (table) {
      blocks.push({ type: "table", ...table });
      table = null;
    }
  };

  for (const raw of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith("|")) {
      if (list) {
        blocks.push(list);
        list = null;
      }
      if (isTableSeparator(line)) continue;
      const cells = splitTableRow(line);
      if (!table) table = { headers: cells, rows: [] };
      else table.rows.push(cells);
      continue;
    }
    const heading = /^(#{1,2})\s+(.+)$/.exec(line);
    if (heading) {
      flush();
      blocks.push({ type: heading[1].length === 1 ? "h1" : "h2", text: heading[2] });
      continue;
    }
    const ordered = /^\d+\.\s+(.+)$/.exec(line);
    if (ordered) {
      if (table) {
        blocks.push({ type: "table", ...table });
        table = null;
      }
      if (!list || list.type !== "ol") {
        if (list) blocks.push(list);
        list = { type: "ol", items: [] };
      }
      list.items.push(ordered[1]);
      continue;
    }
    const bullet = /^-\s+(.+)$/.exec(line);
    if (bullet) {
      if (table) {
        blocks.push({ type: "table", ...table });
        table = null;
      }
      if (!list || list.type !== "ul") {
        if (list) blocks.push(list);
        list = { type: "ul", items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }
    flush();
    blocks.push({ type: "p", text: line });
  }
  flush();
  return blocks;
}

function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <>
      {parseBlocks(markdown).map((block, index) => {
        if (block.type === "h1") return <h1 key={index}>{block.text}</h1>;
        if (block.type === "h2") return <h2 key={index}>{renderInline(block.text)}</h2>;
        if (block.type === "ul" || block.type === "ol") {
          const List = block.type === "ul" ? "ul" : "ol";
          return (
            <List key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </List>
          );
        }
        if (block.type === "table") {
          return (
            <table key={index}>
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header} scope="col">
                      {renderInline(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{renderInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }
        if (block.type === "p") {
          const lastChecked = block.text.startsWith("Last checked:");
          return (
            <p key={index} {...(lastChecked ? { "data-last-checked": "true" } : {})}>
              {renderInline(block.text)}
            </p>
          );
        }
        return null;
      })}
    </>
  );
}

export default function PinkStrainsExplainedPage() {
  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <article className={styles.article}>
        <ArticleBody markdown={ARTICLE_MARKDOWN} />
      </article>
      <Footer />
    </main>
  );
}
