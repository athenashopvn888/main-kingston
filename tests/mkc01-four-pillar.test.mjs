import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  HOME_FAQS,
} from "../app/lib/storeNap.ts";
import {
  HOURS_LP_FAQS,
  DELIVERY_LP_FAQS,
  CIGARETTES_LP_FAQS,
  VAPE_LP_FAQS,
  HOURS_LP_PATH,
  DELIVERY_LP_PATH,
  CIGARETTES_LP_PATH,
  VAPE_LP_PATH,
  FOUR_PILLAR_HUBS,
  lpFaqPageJsonLd,
} from "../app/lib/organicPaths.ts";

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const PILLAR_PAGES = [
  {
    path: "app/24-hour-kingston-road-dispensary/page.tsx",
    href: HOURS_LP_PATH,
    h1: "24-hour dispensary on Kingston Road at 615 Kingston Rd — open now",
    title: "24-Hour Dispensary Open Now on Kingston Road | Main Kingston Cannabis",
    faqs: HOURS_LP_FAQS,
  },
  {
    path: "app/weed-delivery-kingston-road/page.tsx",
    href: DELIVERY_LP_PATH,
    h1: "Weed delivery from Kingston Road at 615 Kingston Rd",
    title: "Weed Delivery Kingston Road Upper Beaches | Main Kingston Cannabis",
    faqs: DELIVERY_LP_FAQS,
  },
  {
    path: "app/native-cigarettes-kingston-road/page.tsx",
    href: CIGARETTES_LP_PATH,
    h1: "Native cigarettes at Main Kingston Cannabis on Kingston Road",
    title: "Native Cigarettes on the Kingston Road Beach Corridor | Main Kingston Cannabis",
    faqs: CIGARETTES_LP_FAQS,
  },
  {
    path: "app/nicotine-vape-kingston-road/page.tsx",
    href: VAPE_LP_PATH,
    h1: "Nicotine vapes on the Kingston Road Beach corridor",
    title: "Nicotine Vape Kingston Road near Main Street | Main Kingston Cannabis",
    faqs: VAPE_LP_FAQS,
  },
];

const MENU_SWIMLANE = [
  "app/lib/flowers.json",
  "app/lib/items.json",
  "scripts/prebuild-stock.js",
];

test("four-pillar neighbourhood LPs have unique H1, title, and FAQ schema", () => {
  const headings = new Set();
  const titles = new Set();
  const questions = new Set(HOME_FAQS.map((faq) => faq.q));

  assert.equal(FOUR_PILLAR_HUBS.length, 4);
  for (const page of PILLAR_PAGES) {
    const source = read(page.path);
    assert.match(source, new RegExp(page.h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(source, new RegExp(page.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(source, /canonical: PAGE_URL/);
    assert.match(source, /19\+/);
    assert.equal(headings.has(page.h1), false, `duplicate H1: ${page.h1}`);
    assert.equal(titles.has(page.title), false, `duplicate title: ${page.title}`);
    headings.add(page.h1);
    titles.add(page.title);

    const json = lpFaqPageJsonLd(page.faqs, `https://www.mainkingstoncannabis.ca${page.href}`);
    assert.equal(json["@type"], "FAQPage");
    assert.equal(json.mainEntity.length, page.faqs.length);
    for (const faq of page.faqs) {
      assert.equal(questions.has(faq.q), false, `duplicate FAQ: ${faq.q}`);
      questions.add(faq.q);
      assert.ok(source.includes("lpFaqPageJsonLd"));
    }
  }
});

test("homepage hub cards point at the four sold/true pillars", () => {
  const home = read("app/HomePage.tsx");
  assert.match(home, /FourPillarHub/);
  assert.match(home, /href=\{HOURS_LP_PATH\}/);
  assert.match(home, /href=\{DELIVERY_LP_PATH\}/);
  assert.match(home, /href=\{CIGARETTES_LP_PATH\}/);
  assert.match(home, /href=\{VAPE_LP_PATH\}/);
  for (const href of [HOURS_LP_PATH, DELIVERY_LP_PATH, CIGARETTES_LP_PATH, VAPE_LP_PATH]) {
    assert.ok(FOUR_PILLAR_HUBS.some((hub) => hub.href === href));
  }
});

test("city delivery catalog meshes to the Kingston Road delivery owner", () => {
  const catalog = read("app/delivery/DeliveryContent.tsx");
  const cityPage = read("app/weed-delivery-toronto/page.tsx");
  assert.match(catalog, /<h1>Weed Delivery from Kingston Road<\/h1>/);
  assert.match(catalog, /weed-delivery-kingston-road/);
  assert.match(cityPage, /mainkingstoncannabis\.ca\/weed-delivery-toronto/);
  assert.match(read("app/weed-delivery-kingston-road/page.tsx"), /href=\{PATHS\.deliveryCatalog\}/);
  assert.match(read("app/weed-delivery-kingston-road/page.tsx"), /\$60 product minimum/);
  assert.doesNotMatch(read("app/weed-delivery-kingston-road/page.tsx"), /\$10 delivery fee|10:00 a\.m\. to 10:00 p\.m\./);
  assert.doesNotMatch(read("app/weed-delivery-kingston-road/page.tsx"), /Etobicoke|Mississauga|Vaughan|Brampton|50 km/);
});

test("cigarette and nicotine vape LPs point at live categories, not invented SKUs", () => {
  const cigarettes = read("app/native-cigarettes-kingston-road/page.tsx");
  const vapes = read("app/nicotine-vape-kingston-road/page.tsx");
  const category = read("app/items/[category]/page.tsx");
  assert.match(cigarettes, /href=\{PATHS\.itemsCigarettes\}/);
  assert.match(vapes, /href=\{PATHS\.itemsVapes\}/);
  assert.match(vapes, /href=\{PATHS\.itemsThcVapes\}/);
  assert.match(vapes, /Nicotine is addictive/);
  assert.doesNotMatch(cigarettes, /Geek Promax|OVNS|NEXA PIX|SKU \d{3,}/);
  assert.doesNotMatch(vapes, /Geek Promax|OVNS|NEXA PIX|SKU \d{3,}/);
  assert.match(category, /href="\/native-cigarettes-kingston-road"/);
  assert.match(category, /href="\/nicotine-vape-kingston-road"/);
});

test("24h LP stays the open-now owner and does not add a second city 24h page", () => {
  const hours = read("app/24-hour-kingston-road-dispensary/page.tsx");
  assert.match(hours, /24-hour dispensary on Kingston Road at 615 Kingston Rd — open now/);
  assert.match(hours, /24-Hour Dispensary Open Now on Kingston Road/);
  assert.match(hours, /24-hour dispensary near me/);
  assert.match(hours, /open now near Kingston Road,\s+Main Street, the Upper Beaches/);
  assert.match(hours, /first-class overnight/);
  assert.doesNotMatch(read("app/sitemap.ts"), /24-hour-toronto-dispensary|24-hour-danforth-dispensary/);
  assert.equal(fs.existsSync(new URL("../app/24-hour-toronto-dispensary/page.tsx", import.meta.url)), false);
});

test("four pillars stay 19+ retail voice, Kingston Rd / Beach corridor only, and skip the menu swimlane", () => {
  const publicCopy = [
    "app/24-hour-kingston-road-dispensary/page.tsx",
    "app/weed-delivery-kingston-road/page.tsx",
    "app/native-cigarettes-kingston-road/page.tsx",
    "app/nicotine-vape-kingston-road/page.tsx",
    "app/lib/organicPaths.ts",
    "app/components/FourPillarHub.tsx",
  ].map(read).join("\n");
  assert.match(publicCopy, /Adults 19\+/);
  assert.doesNotMatch(publicCopy, /sister stores|our other locations|Jane Finch|Planets 59|Athena|the fleet|chain of|Ottawa|Gatineau|ByWard|Dalhousie/i);
  assert.doesNotMatch(publicCopy, /medical marijuana|treats |cures |#1|best dispensary|best weed/i);
  assert.doesNotMatch(publicCopy, /Mississauga|Etobicoke|Vaughan|North York|Scarborough Town Centre/);
  for (const path of MENU_SWIMLANE) {
    assert.match(read(path), /./);
  }
});

test("sitemap, footer, and FAQ mesh the four neighbourhood owners", () => {
  const sitemap = read("app/sitemap.ts");
  const footer = read("app/components/Footer.tsx");
  const faq = read("app/faq/page.tsx");
  for (const href of [HOURS_LP_PATH, DELIVERY_LP_PATH, CIGARETTES_LP_PATH, VAPE_LP_PATH]) {
    assert.match(sitemap, new RegExp(href.replaceAll("/", "\\/")));
    assert.match(footer, new RegExp(href.replaceAll("/", "\\/")));
    assert.match(faq, new RegExp(href.replaceAll("/", "\\/")));
  }
});
