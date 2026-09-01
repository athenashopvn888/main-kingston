import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const landing = readFileSync("app/components/GBPLandingPage.tsx", "utf8");
const discovery = readFileSync("app/lib/weedDiscovery.ts", "utf8");
const home = readFileSync("app/page.tsx", "utf8");

test("protected owner renders exactly one H1 and approved content", () => {
  assert.equal((landing.match(/<h1>/g) || []).length, 1);
  assert.match(discovery, /Main Kingston Cannabis — Weed Dispensary in Toronto/);
  assert.match(landing, /Find Your Weed/);
  assert.match(landing, /Weed, Cannabis, Bud and Flower/);
});

test("homepage has one bounded Weed bridge", () => {
  assert.equal((home.match(/<WeedDiscoveryModule \/>/g) || []).length, 1);
});

test("unsafe implementation claims stay absent", () => {
  assert.doesNotMatch(discovery, /now in stock|sale price|free delivery/i);
  assert.doesNotMatch(discovery, /\/exotics(?:["/])/);
});
