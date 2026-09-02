import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),"utf8");
const config=read("next.config.ts"),products=read("app/lib/products.ts"),tiers=read("app/lib/tierSeoContent.ts"),sitemap=read("app/sitemap.ts"),nav=read("app/components/Navbar.tsx"),delivery=read("app/weed-delivery-toronto/page.tsx"),resources=read("app/resources/resourceData.ts"),home=read("app/page.tsx");
const migrations=[["/exotic","/exotic-weed"],["/premium","/premium-weed"],["/aaa","/aaa-weed"],["/aa","/aa-weed"],["/budget","/budget-weed"],["/delivery","/weed-delivery-toronto"],["/resources","/weed-resources"],["/resources/menu-guide","/resources/cannabis-menu-guide"],["/resources/flower-guide","/resources/weed-flower-guide"],["/resources/value-guide","/resources/weed-value-guide"],["/resources/kingston-road-east-toronto-visit-guide","/resources/kingston-road-east-toronto-weed-visit-guide"]];
test("direct V2 redirects",()=>{for(const [a,b] of migrations){assert.ok(config.includes(`source: "${a}", destination: "${b}", permanent: true`));}});
test("Tier-first Weed names and canonicals",()=>{for(const [n,s] of [["Exotic Weed","exotic-weed"],["Premium Weed","premium-weed"],["AAA+ Weed","aaa-weed"],["AA Weed","aa-weed"],["Budget Weed","budget-weed"]]){assert.ok(products.includes(`name: "${n}"`));assert.ok(products.includes(`slug: "${s}"`));assert.ok(nav.includes(`href: "/${s}", label: "${n}"`));assert.ok(tiers.includes(`${n} & Cannabis Flower Toronto`));}});
test("No reverse Weed tier names remain",()=>{for(const n of ["Weed Exotic","Weed Premium","Weed AAA","Weed AA","Weed Budget"]){for(const source of [products,nav,tiers,home])assert.ok(!source.toLowerCase().includes(n.toLowerCase()));}});
test("delivery and resources use new owners",()=>{assert.match(delivery,/Weed Delivery Toronto \| Main Kingston cannabis/);assert.match(sitemap,/weed-delivery-toronto/);assert.doesNotMatch(sitemap,/`\$\{BASE\}\/delivery`/);for(const s of ["cannabis-menu-guide","weed-flower-guide","weed-value-guide","kingston-road-east-toronto-weed-visit-guide"])assert.ok(resources.includes(`slug: "${s}"`));});

