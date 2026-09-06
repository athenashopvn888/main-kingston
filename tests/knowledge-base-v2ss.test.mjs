import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const content = JSON.parse(fs.readFileSync("app/resources/pinkyResourceContent.json", "utf8"));
const tiers = JSON.parse(fs.readFileSync("app/lib/pinkyTierAdditions.json", "utf8"));
const route = fs.readFileSync("app/resources/[...slug]/page.tsx", "utf8");
const resources = fs.readFileSync("app/resources/page.tsx", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");

const protectedRoutes = ["exotic", "premium", "aaa", "aa", "budget"].map((tier) => `/${tier}-weed`);
const requiredNew = [
  "cannabis-dispensary-vs-weed-dispensary", "cannabis-101",
  "flower-guides/what-does-good-weed-mean", "flower-guides/top-shelf-mids-quads",
  "flower-guides/thc-vs-weed-quality", "flower-guides/bag-appeal",
  "flower-guides/trichomes-frosty-weed", "flower-guides/terpenes-gas-loud-aroma",
  "flower-guides/drying-curing-freshness", "flower-guides/smalls-vs-big-buds",
  "flower-guides/bc-grown-indoor-hydro-outdoor", "flower-guides/craft-vs-commercial-cannabis",
  "cannabis-101/indica-sativa-hybrid", "cannabis-101/strain-vs-cultivar",
  "cannabis-101/landrace-vs-hybrid", "cannabis-101/weed-slang-glossary",
];

test("PINKY packet maps all resources and all 16 new subjects", () => {
  assert.equal(content.pages.length, 24);
  assert.deepEqual(content.pages.filter((page) => page.action === "NEW").map((page) => page.slug), requiredNew);
  for (const page of content.pages) {
    assert.ok(page.title && page.seoTitle && page.description && page.intro !== undefined);
    assert.ok(page.sections.length > 0);
  }
});

test("new resources use real first-publish date and expanded resources do not invent one", () => {
  for (const page of content.pages) {
    if (page.action === "NEW") assert.equal(page.datePublished, "2026-09-06");
    else assert.equal(page.datePublished, undefined);
  }
});

test("public generated content has no Markdown or internal-process leakage", () => {
  const publicText = JSON.stringify({ content, tiers });
  for (const forbidden of [
    "---", "**", "##", "PINKY", "Cody", "Agent X", "keyword strategy", "source truth", "content gate", "canonical evidence",
    "supplied local evidence", "internal local context", "Do not invent extra neighbourhoods", "evergreen educational guide",
    "evergreen informational guide", "evergreen guide", "current product surface", "retail/search phrase", "everyday search language",
    "Native-smokes search language", "Brand Names Need Evidence", "separate evidence", "This educational section should not freeze",
    "stale price claims",
  ]) {
    assert.equal(publicText.includes(forbidden), false, forbidden);
  }
  for (const malformed of ["Cannabis” is", "Weed” is", "Near me” adds", "Good weed” sounds", "Strain” is", "Pure” is", "Native cigarettes” is"]) {
    const escaped = malformed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.doesNotMatch(publicText, new RegExp(`(?<!“|\\w)${escaped}`), malformed);
  }
});

test("Native cigarettes guide includes the exact bounded health sentence once", () => {
  const page = content.pages.find((item) => item.slug === "native-smokes/native-cigarettes-guide");
  const sentence = "Commercial cigarette smoking is addictive and causes serious health risks, including cancer, heart disease and lung disease.";
  assert.equal(JSON.stringify(page).split(sentence).length - 1, 1);
});

test("protected Weed routes remain exact and receive bounded education only", () => {
  assert.deepEqual(Object.keys(tiers), ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"]);
  for (const sections of Object.values(tiers)) assert.ok(sections.length >= 3);
  const allSource = fs.readFileSync("app/lib/products.ts", "utf8") + fs.readFileSync("app/lib/tierSeoContent.ts", "utf8");
  for (const protectedRoute of protectedRoutes) assert.ok(allSource.includes(protectedRoute.slice(1)));
});

test("canonical and indexability contracts are explicit", () => {
  assert.match(resources, /canonical: "https:\/\/www\.mainkingstoncannabis\.ca\/weed-resources"/);
  assert.match(resources, /robots: \{ index: true, follow: true \}/);
  assert.match(route, /robots: \{ index: true, follow: true \}/);
  assert.match(sitemap, /`\$\{BASE\}\/resources`/);
});

test("canonical hub exposes the complete grouped guide set", () => {
  assert.equal(content.hub.cards.length, 23);
  for (const slug of requiredNew) assert.ok(content.hub.cards.some((card) => card.href === `/resources/${slug}`));
});
