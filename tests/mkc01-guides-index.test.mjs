import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("MKC01 guides index is registry-driven and indexable", async () => {
  const [page, registry] = await Promise.all([read("app/guides/page.tsx"), read("app/lib/guideRegistry.ts")]);
  const entries = registry.match(/\{ slug: "[^"]+", lane: "(?:strain|native_cig|nic_vape|thc_vape)"/g) ?? [];
  assert.equal(entries.length, 32);
  assert.match(registry, /export function getGuidesByLane\(\)/);
  assert.match(page, /title: \{ absolute: "Guides \| Main Kingston Cannabis" \}/);
  assert.match(page, /alternates: \{ canonical: CANONICAL \}/);
  assert.match(page, /robots: \{ index: true, follow: true \}/);
  assert.match(page, /"@type": "WebPage"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /getGuidesByLane\(\)/);
  assert.doesNotMatch(page, /"@type": "(?:Product|Offer)"|price/i);
});

test("MKC01 discovery surfaces and sitemap retain all guide routes", async () => {
  const [nav, footer, resources, sitemap] = await Promise.all([read("app/components/Navbar.tsx"), read("app/components/Footer.tsx"), read("app/resources/resourceData.ts"), read("app/sitemap.ts")]);
  assert.ok(nav.indexOf('{ href: "/weed-resources", label: "Weed Resources" }') < nav.indexOf('{ href: "/guides", label: "Guides" }'));
  assert.match(footer, /<Link href="\/guides">Guides<\/Link>/);
  assert.match(resources, /const NAME_GUIDES_CARD/);
  assert.match(resources, /cards: \[NAME_GUIDES_CARD,/);
  assert.match(sitemap, /`\$\{BASE\}\/guides`/);
  assert.match(sitemap, /GUIDE_REGISTRY\.map/);
});
