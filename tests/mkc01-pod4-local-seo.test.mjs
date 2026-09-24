import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const nap = readFileSync("app/lib/storeNap.ts", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");
const home = readFileSync("app/HomePage.tsx", "utf8");
const homePage = readFileSync("app/page.tsx", "utf8");
const visit = readFileSync("app/visit/page.tsx", "utf8");
const visitContent = readFileSync("app/visit/VisitContent.tsx", "utf8");
const city = readFileSync("app/weed-dispensary-toronto/page.tsx", "utf8");
const sitemap = readFileSync("app/sitemap.ts", "utf8");
const delivery = readFileSync("app/weed-delivery-toronto/page.tsx", "utf8");
const deliveryContent = readFileSync("app/delivery/DeliveryContent.tsx", "utf8");

const publicCopy = [
  layout,
  home,
  homePage,
  visit,
  visitContent,
  city,
  readFileSync("app/components/Footer.tsx", "utf8"),
  readFileSync("app/components/Navbar.tsx", "utf8"),
].join("\n");

test("NAP source keeps FMD phone, Kingston Road address, and existing 24h hours", () => {
  assert.match(nap, /phoneIntl: "\+12894600130"/);
  assert.match(nap, /phoneDisplay: "\+1 289 460 0130"/);
  assert.match(nap, /streetAddress: "615 Kingston Rd"/);
  assert.match(nap, /postalCode: "M4E 1R3"/);
  assert.match(nap, /hoursLabel: "Open 24 Hours"/);
  assert.match(nap, /gbpWebsite: "https:\/\/www\.mainkingstoncannabis\.ca\/"/);
});

test("homepage schema is CannabisStore with FAQPage and a unique local image", () => {
  assert.match(layout, /cannabisStoreJsonLd/);
  assert.match(nap, /"@type": "CannabisStore"/);
  assert.match(homePage, /faqPageJsonLd/);
  assert.match(nap, /"@type": "FAQPage"/);
  assert.match(nap, /imageUrl: "https:\/\/www\.mainkingstoncannabis\.ca\/banners\/welcome_banner\.webp"/);
  assert.doesNotMatch(layout, /7Clmh\.jpg|46Oi5\.jpg/);
  assert.doesNotMatch(home, /7Clmh\.jpg|46Oi5\.jpg/);
});

test("/visit is a supporting reach page with a self-canonical", () => {
  assert.match(visit, /VISIT_URL = `\$\{STORE_NAP\.homeUrl\}\/visit`/);
  assert.match(visit, /canonical: VISIT_URL/);
  assert.match(visit, /openGraph:[\s\S]*url: VISIT_URL/);
  assert.match(visitContent, /Main Street Station/);
  assert.match(visitContent, /Street parking lines Kingston Road/);
  assert.match(visitContent, /615 Kingston Rd/);
  assert.match(visitContent, /Toronto, ON M4E 1R3/);
  assert.match(visitContent, /STORE_NAP\.phoneDisplay/);
  assert.match(visitContent, /STORE_NAP\.hoursLabel/);
});

test("city weed-dispensary URL is noindexed and canonicalized to the homepage", () => {
  assert.match(city, /index: false/);
  assert.match(city, /canonical: STORE_NAP\.homeUrl/);
  assert.match(sitemap, /\$\{BASE\}\/visit/);
  assert.doesNotMatch(sitemap, /weed-dispensary-toronto/);
});

test("homepage is the visit hub with Kingston Road copy", () => {
  assert.match(home, /id="visit-hub"/);
  assert.match(home, /href="\/visit"/);
  assert.match(home, /Kingston Road walk-in dispensary/);
  assert.match(home, /HOME_FAQS\.map/);
});

test("delivery stays on its URL with a Kingston Road neighbourhood H1", () => {
  assert.match(delivery, /Kingston Road Weed Delivery \| Main Kingston Cannabis/);
  assert.match(deliveryContent, /<h1>Weed Delivery from Kingston Road<\/h1>/);
  assert.doesNotMatch(deliveryContent, /467-0615/);
});

test("public copy stays standalone", () => {
  assert.doesNotMatch(
    publicCopy,
    /Pleasant Cannabis|Planet X|Native Medicine Garden|Athena|sister store|our other locations|Inspired Cannabis|Fogtown|Jane St/i,
  );
});
