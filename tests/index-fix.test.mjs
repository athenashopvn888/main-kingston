import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");

test("redirect-only URLs are omitted while their final URLs remain represented", () => {
  assert.doesNotMatch(sitemap, /`\$\{BASE\}\/resources`/);
  assert.match(sitemap, /`\$\{BASE\}\/weed-resources`/);
  assert.match(sitemap, /redirectedSeoPages[\s\S]*weed-store-near-main-street/);
  assert.match(sitemap, /redirectedSeoPages[\s\S]*dispensary-near-me-kingston-road/);
  assert.match(sitemap, /SEO_PAGES\.filter\(\(p\) => !redirectedSeoPages\.has\(p\.slug\)\)/);
});
