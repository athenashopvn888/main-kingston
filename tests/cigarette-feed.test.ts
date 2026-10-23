import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import {
  CIG_WORDING_FALLBACK,
  cigarettePublicHeaders,
  decideCigaretteGuide,
  decideCigaretteSurface,
  readCigaretteTvHeader,
  publicWebsiteCigaretteFlag,
  reconcileSurfaceItems,
  resolveCigWording,
  resolveSurfaceFlag,
  visibleTvCigaretteItems,
} from "../app/lib/cigDecision.ts";
import { isRealCigaretteItem } from "../app/lib/cigMarkers.ts";
import { SHOW_CIGARETTES } from "../app/lib/siteConfig.ts";

const carton = { category: "CIGARETTES", name: "BB FULL CARTON", slug: "bb-full-carton" };
const grabba = { category: "CIGARETTES", name: "GRABBA", slug: "grabba" };
const backwoods = { category: "CIGARETTES", name: "BACKWOODS ASSORTED FLAVORS $20-$25", slug: "backwoods-assorted-flavors-20-25" };
const pouch = { category: "CIGARETTES", name: "NICOTINE POUCHES , VELO, PABLO, KILLA", slug: "nicotine-pouches-velo-pablo-killa" };
const vape = { category: "VAPE PENS", name: "Mango Ice", slug: "mango-ice" };

const wording = {
  bannerText: "FEED BANNER",
  promoBrands: "FEED BRANDS",
  tv2BoardTitle: "FEED BOARD",
  wrapsTitle: "🍂 WRAPS & POUCHES",
  tickerLine1: "FEED TICKER",
  priceTwoPack: "$5",
  priceCarton: "$25",
  priceBelmont: "$10",
  priceBB2Pack: "$5",
};

function cig(extra: Record<string, unknown> = {}) {
  return { on: false, tvOn: false, webOn: false, webFollowsTv: true, wording, ...extra };
}

test("website follows webOn and TV follows tvOn, with on as the fallback", () => {
  const items = [carton, backwoods];
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "web" }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "tv" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "web" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "tv" }).show, true);
  assert.equal(resolveSurfaceFlag({ on: true }, "web"), true);
  assert.equal(resolveSurfaceFlag({ on: true }, "tv"), true);
  assert.equal(resolveSurfaceFlag(cig({ on: true, webOn: false }), "web"), false);
  assert.equal(resolveSurfaceFlag(cig({ on: false, tvOn: true, webFollowsTv: true }), "tv"), true);
  assert.equal(resolveSurfaceFlag(cig({ on: true, webOn: false, webFollowsTv: true }), "web"), false);
});

test("only an explicit false flag, no real items, or the env override hides cigarettes", () => {
  const items = [carton, grabba, backwoods];
  const missing = decideCigaretteSurface({ cig: null, items, surface: "web" });
  assert.equal(missing.reason, "missing");
  assert.equal(missing.show, true);
  assert.equal(decideCigaretteSurface({ cig: cig(), items, surface: "tv" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items: [backwoods, pouch], surface: "web" }).reason, "no-items");
  const errored = decideCigaretteSurface({ cig: cig({ on: true, webOn: false, tvOn: false }), items, surface: "web", errored: true });
  assert.equal(errored.reason, "error");
  assert.equal(errored.show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "tv", envRaw: "false" }).reason, "env");
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "web", envRaw: "true" }).show, true);
});

test("wording uses the feed and falls back to the current copy field by field", () => {
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  ", wrapsTitle: "" }).bannerText, "FEED BANNER");
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  " }).wrapsTitle, CIG_WORDING_FALLBACK.wrapsTitle);
  assert.equal(resolveCigWording(undefined).tickerLine1, CIG_WORDING_FALLBACK.tickerLine1);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false }), items: [backwoods], surface: "web" }).wording.wrapsTitle, "🍂 WRAPS & POUCHES");
  assert.equal(decideCigaretteSurface({ cig: null, items: [], surface: "tv" }).wording.bannerText, CIG_WORDING_FALLBACK.bannerText);
});

test("null flags with real cigarettes stay open and an explicit false still hides", () => {
  const open = decideCigaretteSurface({ cig: { on: null, webOn: null, tvOn: null, wording }, items: [carton], surface: "web" });
  assert.equal(open.show, true);
  assert.equal(open.reason, "on");
  assert.equal(decideCigaretteSurface({ cig: { on: false }, items: [carton], surface: "tv" }).reason, "off");
  assert.equal(decideCigaretteGuide({ cig: { master: null, on: null }, items: [carton] }).show, true);
});

test("guide pages follow the master switch and a feed error stays open", () => {
  const items = [carton];
  assert.equal(decideCigaretteGuide({ cig: cig({ on: false, master: false, webOn: true }), items }).show, false);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true, webOn: false }), items }).show, true);
  assert.equal(decideCigaretteGuide({ cig: null, items, errored: true }).show, true);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true }), items, envRaw: "off" }).reason, "env");
});

test("each surface hides real cigarettes itself and always keeps wraps and pouches", () => {
  const menu = [vape, carton, grabba, backwoods, pouch];
  const hidden = reconcileSurfaceItems(menu, menu, false);
  assert.deepEqual(hidden.map((item) => item.slug), [vape.slug, backwoods.slug, pouch.slug]);
  const shown = reconcileSurfaceItems([vape, backwoods], [carton, backwoods], true);
  assert.deepEqual(shown.map((item) => item.slug), [vape.slug, backwoods.slug, carton.slug]);
});

test("TV flag on shows the cigarette card items and the website stays hidden", () => {
  const menu = [vape, carton, grabba, backwoods, pouch];
  const block = cig({ on: true, webOn: false, tvOn: true, master: true });
  const web = decideCigaretteSurface({ cig: block, items: menu, surface: "web" });
  const tv = decideCigaretteSurface({ cig: block, items: menu, surface: "tv" });
  assert.equal(web.show, false);
  assert.equal(web.reason, "off");
  assert.equal(tv.show, true);
  assert.equal(tv.reason, "on");
  assert.deepEqual(visibleTvCigaretteItems(menu, true).map((item) => item.slug), menu.map((item) => item.slug));
  assert.deepEqual(
    reconcileSurfaceItems(menu, menu, false).map((item) => item.slug),
    [vape.slug, backwoods.slug, pouch.slug],
  );
  const header = readCigaretteTvHeader({ get: (name) => cigarettePublicHeaders({ web: false, tv: true, wording: CIG_WORDING_FALLBACK })[name] ?? null });
  assert.equal(header.show, true);
  const hiddenHeader = readCigaretteTvHeader({ get: (name) => cigarettePublicHeaders({ web: false, tv: false, wording: CIG_WORDING_FALLBACK })[name] ?? null });
  assert.equal(hiddenHeader.show, false);
  assert.deepEqual(visibleTvCigaretteItems(menu, false).map((item) => item.slug), [vape.slug, backwoods.slug, pouch.slug]);
});

test("wraps, papers, pouches, and the named kept shelf stay on the TV card when cigarettes are off", () => {
  const kept = [
    { category: "CIGARETTES", name: "BACKWOODS ASSORTED", slug: "backwoods-assorted" },
    { category: "CIGARETTES", name: "GRAPE CIGARILLO", slug: "grape-cigarillo" },
    { category: "CIGARETTES", name: "RAW PAPER KING SIZE", slug: "raw-paper" },
    { category: "CIGARETTES", name: "NICOTINE POUCHES", slug: "nicotine-pouches" },
    { category: "CIGARETTES", name: "ZYN NICOTINE POUCHES", slug: "zyn-nicotine-pouches" },
    { category: "CIGARETTES", name: "VELO POUCH", slug: "velo-pouch" },
    { category: "CIGARETTES", name: "HEMP WRAP", slug: "hemp-wrap" },
  ];
  for (const item of kept) assert.equal(isRealCigaretteItem(item), false, item.name);
  assert.equal(isRealCigaretteItem(carton), true);
  const shelf = visibleTvCigaretteItems([...kept, carton], false);
  assert.deepEqual(shelf.map((item) => item.slug), kept.map((item) => item.slug));
  assert.equal(visibleTvCigaretteItems([...kept, carton], true).length, kept.length + 1);
});

test("TV hides on a feed error or a missing cig block, and follows tvOn on a successful feed", () => {
  const items = [carton, backwoods, pouch];
  const errored = decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "tv", errored: true });
  assert.equal(errored.reason, "error");
  assert.equal(errored.show, false);
  const missing = decideCigaretteSurface({ cig: null, items, surface: "tv" });
  assert.equal(missing.reason, "missing");
  assert.equal(missing.show, false);
  const liveMissing = decideCigaretteSurface({ cig: null, items, surface: "tv", errored: false });
  assert.equal(liveMissing.show, false);
  assert.equal(liveMissing.reason, "missing");
  const shown = decideCigaretteSurface({ cig: cig({ on: false, tvOn: true }), items, surface: "tv" });
  assert.equal(shown.show, true);
  assert.equal(shown.reason, "on");
  const hidden = decideCigaretteSurface({ cig: cig({ on: true, tvOn: false }), items, surface: "tv" });
  assert.equal(hidden.show, false);
  assert.equal(hidden.reason, "off");
  // A saved last-good block is not an error, so it still follows tvOn.
  assert.equal(decideCigaretteSurface({ cig: cig({ tvOn: true }), items, surface: "tv", errored: false }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ tvOn: false }), items, surface: "tv", errored: false }).show, false);
  assert.deepEqual(
    visibleTvCigaretteItems([...items, carton], errored.show).map((item) => item.slug),
    [backwoods.slug, pouch.slug],
  );
});

test("website flag stays false whenever the static gate is off, and on a feed error or missing block", () => {
  const items = [carton, backwoods];
  const explicitOn = decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true }), items, surface: "web" });
  const explicitOff = decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "web" });
  const errored = decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true }), items, surface: "web", errored: true });
  const missing = decideCigaretteSurface({ cig: null, items, surface: "web" });
  assert.equal(explicitOn.show, true);
  assert.equal(errored.show, true);
  assert.equal(missing.show, true);
  assert.equal(publicWebsiteCigaretteFlag(explicitOn, false), false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOff, false), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, false), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, false), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, true), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, true), false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOff, true), false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOn, true), true);
  assert.equal(SHOW_CIGARETTES, false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOn, SHOW_CIGARETTES), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, SHOW_CIGARETTES), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, SHOW_CIGARETTES), false);
});

test("TV pages read the live header and website surfaces keep the static gate", () => {
  const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
  const route = readFileSync(new URL("../app/api/tv-data/route.ts", import.meta.url), "utf8");
  const feed = readFileSync(new URL("../app/lib/cigaretteFeed.ts", import.meta.url), "utf8");
  assert.match(tv2, /readCigaretteTvHeader/);
  assert.match(tv2, /visibleTvCigaretteItems/);
  assert.match(tv2, /setInterval\(loadData, 5\*60\*1000\)/);
  assert.doesNotMatch(tv2, /SHOW_CIGARETTES/);
  assert.match(tv, /readCigaretteTvHeader/);
  assert.match(tv, /setInterval\(loadData, 5\*60\*1000\)/);
  assert.doesNotMatch(tv, /SHOW_CIGARETTES/);
  assert.match(route, /reconcileSurfaceItems/);
  assert.match(route, /snap\.tv\.show/);
  assert.match(route, /snapshotHeaders/);
  assert.doesNotMatch(route, /SHOW_CIGARETTES/);
  assert.match(feed, /!live && !cig/);
  assert.match(feed, /publicWebsiteCigaretteFlag/);
  assert.match(readFileSync(new URL("../app/components/Navbar.tsx", import.meta.url), "utf8"), /SHOW_CIGARETTES/);
  assert.match(readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8"), /SHOW_CIGARETTES/);
  assert.match(readFileSync(new URL("../app/faq/page.tsx", import.meta.url), "utf8"), /SHOW_CIGARETTES/);
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /web: SHOW_CIGARETTES \? cigarettes\.web : false/);
});
