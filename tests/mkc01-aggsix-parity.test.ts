import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  renderedDocumentTitle,
  storeClaimsOpen24Hours,
} from "../app/lib/storeNap.ts";

const read = (relativePath: string) =>
  fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

const CORRIDOR = /Kingston Road|Kingston Rd|Upper Beaches|Main Street/;
const WEIGHT_FAIL = /(?<![0-9.])(?:3\.5|7)\s?g\b/i;
const BRAND = "Main Kingston Cannabis";

const SHARED_SENTENCE_DENYLIST = [
  "Use the cigarette category as a current snapshot. Compare brand, variety, pack or carton unit, quantity, and the posted price on the same line.",
  "A carton is a different sales unit from a pack — do not compare a pack price with a carton price as if they were the same item.",
  "There is no appointment desk. Staff can help you read the current cigarette shelf the same way they help with flower, vapes, and other in-store categories.",
  "Use the current cigarette menu for brand, variety, pack or carton unit, and posted price.",
  "A pack and a carton are different sales units. Read the listed unit beside the posted price, then compare the same unit, brand, and variety.",
  "It does not replace the current menu or lock in a brand, pack count, or price.",
  "No. Nicotine vapes are listed under /items/vapes. THC or cannabis vapes are a separate category under /items/vape-disposables.",
  "This page does not invent SKUs or prices.",
  "Open the cigarette category for the listed selection.",
  "When a listing name includes a puff count or a kit versus pod label, use that text only to tell products apart.",
  "Check the current cigarette category for brand, unit, and posted price.",
  "Compare pack or carton listings on the current menu.",
  "These cards are a limited evidence set, not a complete selection.",
  "Brand preview only",
];

function brandCount(title: string) {
  return title.split(BRAND).length - 1;
}

function words(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function ngrams(text: string, n = 8) {
  const tokens = words(text);
  const set = new Set<string>();
  for (let i = 0; i <= tokens.length - n; i += 1) {
    set.add(tokens.slice(i, i + n).join(" "));
  }
  return set;
}

function jaccard(a: Set<string>, b: Set<string>) {
  let inter = 0;
  for (const gram of a) if (b.has(gram)) inter += 1;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

/** Visible copy only. Shared imports and JSX scaffolding are not body text. */
function prose(source: string) {
  return source
    .replace(/import[\s\S]*?from\s+"[^"]+";/g, " ")
    .replace(/export const metadata[\s\S]*?^};/m, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ");
}

test("G1 corridor tokens are in every flower tier title and H1", () => {
  const tiers = read("app/lib/tierSeoContent.ts");
  const titles = [...tiers.matchAll(/seoTitle: "([^"]+)"/g)].map((match) => match[1]);
  const h1s = [...tiers.matchAll(/\bh1: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(titles.length, 5);
  assert.equal(h1s.length, 5);
  for (const title of titles) {
    assert.match(title, CORRIDOR, title);
    assert.doesNotMatch(title, /\bToronto\b/, title);
    assert.equal(brandCount(title), 1, title);
  }
  for (const h1 of h1s) {
    assert.match(h1, CORRIDOR, h1);
    assert.doesNotMatch(h1, /\bToronto\b/, h1);
  }

  const cig = read("app/native-cigarettes-kingston-road/page.tsx");
  const vape = read("app/nicotine-vape-kingston-road/page.tsx");
  assert.match(cig, /Native Cigarettes on the Kingston Road Beach Corridor \| Main Kingston Cannabis/);
  assert.match(cig, /Native cigarettes at Main Kingston Cannabis on Kingston Road/);
  assert.match(vape, /Nicotine Vape Kingston Road near Main Street \| Main Kingston Cannabis/);
  assert.match(vape, /Nicotine vapes on the Kingston Road Beach corridor/);
  assert.doesNotMatch(cig, /<h1[^>]*>\s*Native [Cc]igarettes\s*</);
  assert.doesNotMatch(vape, /<h1[^>]*>\s*Nicotine Vape\s*</);
  assert.match(read("app/[tier]/page.tsx"), /corridorH1/);
});

test("G2 every tier route builds CollectionPage and a stocked ItemList plus FAQ", () => {
  const tierPage = read("app/[tier]/page.tsx");
  assert.match(tierPage, /"@type": "CollectionPage"/);
  assert.match(tierPage, /"@type": "ItemList"/);
  assert.match(tierPage, /itemListElement: flowers\.map/);
  assert.match(tierPage, /numberOfItems: flowers\.length/);
  assert.match(tierPage, /lpFaqPageJsonLd\(seo\.faqs, pageUrl\)/);
  assert.match(tierPage, /about: \{ "@id": `\$\{STORE_NAP\.homeUrl\}\/#store` \}/);
  assert.match(read("app/lib/storeNap.ts"), /"@type": "CannabisStore"/);
  const faqs = read("app/lib/tierSeoContent.ts");
  assert.ok((faqs.match(/q: "/g) || []).length >= 15);
});

test("G3 homepage hub cards follow the site's own 24-hour claim", () => {
  const home = read("app/HomePage.tsx");
  const hub = read("app/components/FourPillarHub.tsx");
  const hoursPage = read("app/24-hour-kingston-road-dispensary/page.tsx");
  const organic = read("app/lib/organicPaths.ts");
  assert.equal(storeClaimsOpen24Hours(), true);
  assert.match(home, /FourPillarHub/);
  for (const token of [
    "HOURS_LP_PATH",
    "DISPENSARY_LP_PATH",
    "DELIVERY_LP_PATH",
    "CIGARETTES_LP_PATH",
    "VAPE_LP_PATH",
    "PATHS.visit",
  ]) {
    assert.match(organic, new RegExp(token.replace(".", "\\.")));
  }
  assert.match(hub, /storeClaimsOpen24Hours\(\)/);
  assert.match(hub, /hub\.href !== HOURS_LP_PATH/);
  assert.match(hoursPage, /if \(!storeClaimsOpen24Hours\(\)\) notFound\(\)/);
  assert.match(organic, /24-hour Kingston Road dispensary/);
  assert.match(organic, /Visit Kingston Road/);
});

test("G4 Kingston Road cig and vape copy does not reuse the template sentence cluster", () => {
  const cig = read("app/native-cigarettes-kingston-road/page.tsx");
  const vape = read("app/nicotine-vape-kingston-road/page.tsx");
  const faqs = read("app/lib/organicPaths.ts");
  const corpus = `${cig}\n${vape}\n${faqs}`;
  const hits = SHARED_SENTENCE_DENYLIST.filter((sentence) => corpus.includes(sentence));
  assert.deepEqual(hits, []);
  assert.ok(SHARED_SENTENCE_DENYLIST.filter((sentence) => sentence.length >= 60).length >= 4);
  const cigFaqs = faqs.split("export const CIGARETTES_LP_FAQS")[1].split("export const DISPENSARY_LP_FAQS")[0];
  const vapeFaqs = faqs.split("export const VAPE_LP_FAQS")[1].split("export function lpFaqPageJsonLd")[0];
  const score = jaccard(ngrams(`${prose(cig)}\n${cigFaqs}`), ngrams(`${prose(vape)}\n${vapeFaqs}`));
  assert.ok(score < 0.05, `cig/vape 8-gram Jaccard ${score}`);
  assert.match(cig, /Main Street Station/);
  assert.match(cig, /Woodbine\s+Beach/);
  assert.match(vape, /Boardwalk/);
  assert.match(vape, /\/items\/vape-disposables/);
  assert.doesNotMatch(corpus, /Queen West|Parkdale|Torbram|Unit 59|The Junction|Dundas St W|Queen Lansdowne|PLANETS 59|Gas Junction/i);
});

test("G5 document title guard keeps the brand to one occurrence", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /template: `%s \| \$\{STORE_NAP\.name\}`/);
  assert.match(layout, /renderedDocumentTitle\(/);

  const samples = [
    "FAQ Main Kingston Cannabis | Toronto Dispensary Questions",
    "Contact Us — Main Kingston Cannabis | 615 Kingston Rd, Toronto",
    "How to Visit Main Kingston Cannabis on Kingston Road",
    "Pink Joker | Premium Weed | Main Kingston Cannabis",
    "Native Cigarettes on Kingston Road | Main Kingston Cannabis",
    "Foo | Main Kingston Cannabis | Main Kingston Cannabis",
    "Main Kingston Cannabis | Main Kingston Cannabis",
  ];
  for (const sample of samples) {
    const rendered = renderedDocumentTitle(sample);
    assert.equal(brandCount(rendered), 1, rendered);
  }
  assert.equal(
    renderedDocumentTitle("Application Review"),
    "Application Review | Main Kingston Cannabis",
  );

  for (const file of [
    "app/faq/page.tsx",
    "app/contact/page.tsx",
    "app/visit/page.tsx",
    "app/flower/[slug]/page.tsx",
    "app/item/[slug]/page.tsx",
    "app/items/[category]/page.tsx",
    "app/info/[seoPage]/page.tsx",
    "app/delivery/page.tsx",
    "app/weed-delivery-toronto/page.tsx",
    "app/games/page.tsx",
  ]) {
    assert.match(read(file), /resolveDocumentTitle\(/, file);
  }
});

test("G6 mobile age gate stays inside the viewport and the menu has a hamburger label", () => {
  const ageCss = read("app/components/AgeGate.module.css");
  const ageGate = read("app/components/AgeGate.tsx");
  const nav = read("app/components/Navbar.tsx");
  assert.match(ageCss, /max-width:\s*100vw/);
  assert.match(ageCss, /max-height:\s*calc\(100dvh - 32px\)/);
  assert.match(ageCss, /overscroll-behavior:\s*contain/);
  assert.match(ageCss, /\.btnRow > \*/);
  assert.match(ageGate, /document\.body\.style\.overflow = "hidden"/);
  assert.match(nav, /aria-label=\{menuOpen \? "Close menu" : "Open menu"\}/);
  assert.match(nav, /aria-controls="mobile-store-menu"/);
  assert.match(nav, /aria-label="Site menu"/);
  assert.match(nav, /d="M4 6h16M4 12h16M4 18h16"/);
});

test("G7 flower copy does not use 3.5g or 7g", () => {
  const root = new URL("../app", import.meta.url);
  const files: string[] = [];
  const walk = (directory: string) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (!/\.(tsx|ts)$/.test(entry.name)) continue;
      if (/flowers\.json|items\.json|delivery-menu\.json/.test(entry.name)) continue;
      files.push(fullPath);
    }
  };
  walk(root.pathname);
  assert.ok(files.length > 20);
  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    assert.equal(WEIGHT_FAIL.test(source), false, file);
  }
});

test("G8 apex redirects to www and visit canonical plus NAP stay on the current hours", () => {
  const config = read("next.config.ts");
  const visit = read("app/visit/page.tsx");
  const visitContent = read("app/visit/VisitContent.tsx");
  const footer = read("app/components/Footer.tsx");
  const layout = read("app/layout.tsx");
  const nap = read("app/lib/storeNap.ts");
  assert.match(config, /type: "host", value: "mainkingstoncannabis\.ca"/);
  assert.match(config, /destination: "https:\/\/www\.mainkingstoncannabis\.ca\/:path\*"/);
  assert.match(layout, /canonical: STORE_NAP\.homeUrl/);
  assert.match(visit, /canonical: VISIT_URL/);
  assert.match(visit, /\$\{STORE_NAP\.homeUrl\}\/visit/);
  assert.match(visitContent, /Main Street Station/);
  assert.match(visitContent, /Street parking lines Kingston Road/);
  assert.match(visitContent, /64 Main/);
  assert.match(footer, /\+1 289 460 0130|phoneDisplay/);
  assert.match(footer, /615 Kingston Rd|streetAddress/);
  assert.match(footer, /Open 24 Hours/);
  assert.match(nap, /streetAddress: "615 Kingston Rd"/);
  assert.match(nap, /postalCode: "M4E 1R3"/);
  assert.match(nap, /phoneDisplay: "\+1 289 460 0130"/);
  assert.match(nap, /hoursLabel: "Open 24 Hours"/);
  assert.match(nap, /opens: "00:00"/);
  assert.match(nap, /closes: "23:59"/);
  assert.equal(storeClaimsOpen24Hours(), true);
});

test("G9 generic Toronto dispensary URL is noindex with a canonical away from itself", () => {
  const city = read("app/weed-dispensary-toronto/page.tsx");
  const robots = read("app/robots.ts");
  const sitemap = read("app/sitemap.ts");
  assert.match(city, /index:\s*false/);
  assert.match(city, /follow:\s*true/);
  assert.match(city, /canonical: STORE_NAP\.homeUrl/);
  assert.doesNotMatch(city, /canonical: STORE_NAP\.homeUrl \+ "\/weed-dispensary-toronto"/);
  assert.match(robots, /allow: "\/"/);
  assert.match(robots, /disallow: \["\/api\/", "\/staff-photo", "\/staff-photo\/"\]/);
  assert.match(robots, /sitemap: "https:\/\/www\.mainkingstoncannabis\.ca\/sitemap\.xml"/);
  assert.match(sitemap, /mainkingstoncannabis\.ca/);
  assert.doesNotMatch(sitemap, /weed-dispensary-toronto/);
});

test("public pages do not use sister-store, fleet, Athena, or invented Nation language", () => {
  const publicFiles = [
    "app/HomePage.tsx",
    "app/page.tsx",
    "app/visit/page.tsx",
    "app/visit/VisitContent.tsx",
    "app/components/Footer.tsx",
    "app/components/Navbar.tsx",
    "app/components/FourPillarHub.tsx",
    "app/native-cigarettes-kingston-road/page.tsx",
    "app/nicotine-vape-kingston-road/page.tsx",
    "app/weed-dispensary-kingston-road/page.tsx",
    "app/24-hour-kingston-road-dispensary/page.tsx",
    "app/lib/storeNap.ts",
    "app/lib/organicPaths.ts",
    "app/lib/tierSeoContent.ts",
  ];
  const banned = /Athena|sister store|our other locations|fleet of stores|\bthe fleet\b|Green Pentagon|Kensington Green|Gas Junction|King Rock|Queen Lansdowne|PLANETS 59|Planet X|First Nation|on reserve|healing ceremony|medical marijuana|prescription/i;
  for (const file of publicFiles) {
    assert.doesNotMatch(read(file), banned, file);
  }
});
