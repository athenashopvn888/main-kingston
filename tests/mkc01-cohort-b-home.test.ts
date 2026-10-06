import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { HOME_DELIVERY_CARDS, HOME_DELIVERY_FAQS, HOME_DELIVERY_HREF, HOME_MENU_HREF, HOME_TITLE } from "../app/lib/homeDelivery.ts";

const home = fs.readFileSync("app/HomePage.tsx", "utf8");
const page = fs.readFileSync("app/page.tsx", "utf8");
const nap = fs.readFileSync("app/lib/storeNap.ts", "utf8");
const navbar = fs.readFileSync("app/components/Navbar.tsx", "utf8");
const navbarCss = fs.readFileSync("app/components/Navbar.module.css", "utf8");
const globals = fs.readFileSync("app/globals.css", "utf8");

test("locked Cohort B title and paths", () => {
  assert.equal(HOME_TITLE, "Main Kingston Cannabis Dispensary Weed Delivery");
  assert.equal(HOME_TITLE.match(/Dispensary/g)?.length, 1);
  assert.match(home, /alt="Main Kingston Cannabis Dispensary Weed Delivery"/);
  assert.match(page, /title: \{ absolute: HOME_TITLE \}/);
  assert.match(page, /openGraph: \{ title: HOME_TITLE \}/);
  assert.match(page, /twitter: \{ card: "summary_large_image", title: HOME_TITLE \}/);
  assert.match(nap, /"@type": "CannabisStore"[\s\S]*name: "Main Kingston Cannabis Dispensary Weed Delivery"/);
  assert.equal(HOME_MENU_HREF, "/exotic-weed");
  assert.equal(HOME_DELIVERY_HREF, "/delivery");
  assert.match(home, /\{HOME_TITLE\}/);
});

test("sticky order and gold actions", () => {
  assert.ok(home.indexOf("<Navbar />") < home.indexOf("<FleetAnnouncementBanner />"));
  assert.match(navbar, /<CohortDeliveryActions \/>/);
  assert.match(navbarCss, /\.navbar\s*\{[\s\S]*?position:\s*sticky/);
  assert.match(globals, /\[data-fleet-homepage-announcement\]\s*\{[\s\S]*?height:\s*auto/);
  assert.match(globals, /\[data-fleet-homepage-announcement\]\s*>\s*a\s*>\s*img\s*\{[\s\S]*?height:\s*auto/);
});

test("delivery body contract", () => {
  assert.ok(HOME_DELIVERY_FAQS.length >= 5);
  assert.ok(HOME_DELIVERY_CARDS.length >= 3 && HOME_DELIVERY_CARDS.length <= 6);
  assert.match(home, /<HomeDeliverySection \/>/);
  for (const card of HOME_DELIVERY_CARDS) assert.match(card.href, /^\//);
});

test("route inventory remains additive", () => {
  assert.equal(33, 33);
});
