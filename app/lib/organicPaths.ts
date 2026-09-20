import { STORE_NAP } from "./storeNap";

export type StoreFaq = { q: string; a: string };

/** MKC01 neighbourhood owners. Kingston Rd / Beach corridor only. */
export const PATHS = {
  home: "/",
  visit: "/visit",
  twentyFour: "/24-hour-kingston-road-dispensary",
  weedDispensaryLp: "/weed-dispensary-kingston-road",
  deliveryLp: "/weed-delivery-kingston-road",
  nativeCigarettesLp: "/native-cigarettes-kingston-road",
  nicotineVapeLp: "/nicotine-vape-kingston-road",
  deliveryCatalog: "/weed-delivery-toronto",
  itemsVapes: "/items/vapes",
  itemsCigarettes: "/items/cigarettes",
  itemsThcVapes: "/items/vape-disposables",
} as const;

export const HOURS_LP_PATH = PATHS.twentyFour;
export const DISPENSARY_LP_PATH = PATHS.weedDispensaryLp;
export const DELIVERY_LP_PATH = PATHS.deliveryLp;
export const CIGARETTES_LP_PATH = PATHS.nativeCigarettesLp;
export const VAPE_LP_PATH = PATHS.nicotineVapeLp;

export const FOUR_PILLAR_HUBS = [
  {
    href: HOURS_LP_PATH,
    label: "24-hour Kingston Road dispensary",
    blurb: "Open now at 615 Kingston Rd. Walk-in retail stays open 24 hours daily. Adults 19+.",
  },
  {
    href: DELIVERY_LP_PATH,
    label: "Weed delivery Kingston Road",
    blurb: "Delivery from the Upper Beaches / Beach corridor shop. Dispatcher confirms the destination. $60 product minimum.",
  },
  {
    href: CIGARETTES_LP_PATH,
    label: "Native cigarettes Kingston Road",
    blurb: "Retail cigarette category at the Kingston Road walk-in. Current brands stay on the cigarette menu.",
  },
  {
    href: VAPE_LP_PATH,
    label: "Nicotine vape Kingston Road",
    blurb: "Nicotine vapes at 615 Kingston Rd. Current listings live on /items/vapes. Nicotine is addictive.",
  },
  {
    href: DISPENSARY_LP_PATH,
    label: "Weed dispensary Kingston Road",
    blurb: "The walk-in cannabis shop at 615 Kingston Rd on the Kingston Road / Beach corridor. Flower stays on the tier pages. Adults 19+.",
  },
] as const;

export const MESH_HUB_LINKS = [
  { label: "Homepage visit hub", href: PATHS.home },
  { label: "Kingston Road visit guide", href: PATHS.visit },
  { label: "Open now · 24-hour Kingston Road", href: HOURS_LP_PATH },
] as const;

export const VERTICAL_MESH_LINKS = [
  { label: "Weed dispensary Kingston Road", href: DISPENSARY_LP_PATH },
  { label: "Weed delivery Kingston Road", href: DELIVERY_LP_PATH },
  { label: "Native cigarettes Kingston Road", href: CIGARETTES_LP_PATH },
  { label: "Nicotine vape Kingston Road", href: VAPE_LP_PATH },
] as const;

export const TIER_MESH_LINKS = [
  { label: "Exotic Weed", href: "/exotic-weed" },
  { label: "Premium Weed", href: "/premium-weed" },
  { label: "AAA+ Weed", href: "/aaa-weed" },
  { label: "AA Weed", href: "/aa-weed" },
  { label: "Budget Weed", href: "/budget-weed" },
] as const;

export const HOURS_LP_FAQS: StoreFaq[] = [
  {
    q: "Is Main Kingston Cannabis a 24-hour dispensary on Kingston Road?",
    a: "Yes. Main Kingston Cannabis at 615 Kingston Rd is open 24 hours a day, seven days a week. Adults 19+ can walk in any hour — there is no appointment window. The homepage remains the name, address, phone, and hours hub.",
  },
  {
    q: "Can I walk in after midnight at 615 Kingston Rd?",
    a: "Yes. The Kingston Road door stays open overnight. Bring government-issued photo ID. Staff can help you compare the current in-store menu. Listings can change, so treat the website as information rather than a stock promise.",
  },
  {
    q: "Is Main Kingston Cannabis open now near Kingston Road and the Upper Beaches?",
    a: "Yes, if you mean this walk-in shop. Main Kingston Cannabis at 615 Kingston Rd stays open 24 hours daily on Kingston Road at Main Street in the Upper Beaches. Use this page for open-now and overnight questions.",
  },
  {
    q: "Is there a 24-hour dispensary near me on the Beach corridor?",
    a: "This storefront is the 24-hour walk-in shop at 615 Kingston Rd, on the Kingston Road / Upper Beaches / Beach corridor. It is one Kingston Road door, not a city-wide hours listing. Bring government-issued photo ID. Adults 19+ only.",
  },
  {
    q: "Is weed delivery from this store also 24 hours?",
    a: "No. Walk-in retail at 615 Kingston Rd is open 24 hours daily. Delivery is a separate path. The dispatcher confirms whether a destination is eligible and when a drop-off can run. Do not treat this page as a delivery-hours claim.",
  },
  {
    q: "Do late-night visits still require photo ID?",
    a: "Yes. The store serves adults 19+ at every hour, including overnight. Government-issued photo ID is required before purchase, the same as during the day.",
  },
];

export const DELIVERY_LP_FAQS: StoreFaq[] = [
  {
    q: "Does Main Kingston Cannabis deliver from the Kingston Road storefront?",
    a: "Yes. Weed delivery is coordinated from Main Kingston Cannabis at 615 Kingston Rd in the Upper Beaches. The dispatcher confirms whether your address is eligible. This page does not publish a city-wide zone map.",
  },
  {
    q: "How do I start a weed delivery order from 615 Kingston Rd?",
    a: "Open the delivery menu, note product names and weights, then use LIVE ORDER to reach the dispatcher. New customers complete private selfie-with-ID verification in Web Chat. Adults 19+ only.",
  },
  {
    q: "Is there a delivery minimum from this Upper Beaches shop?",
    a: "The live delivery menu states a $60 product minimum. The dispatcher confirms current order details before checkout. This page does not invent extra fees or a locked delivery clock.",
  },
  {
    q: "Can I assume delivery covers every Toronto neighbourhood?",
    a: "No. This page is for the Kingston Road / Upper Beaches / Beach corridor storefront. Eligibility is confirmed when you place the order. Do not treat a city URL as a guaranteed radius.",
  },
  {
    q: "Are walk-in hours the same as delivery hours?",
    a: "No. The Kingston Road door is open 24 hours daily for walk-in retail. Delivery is a separate path confirmed by the dispatcher. Use the 24-hour Kingston Road page for open-now questions.",
  },
];

export const CIGARETTES_LP_FAQS: StoreFaq[] = [
  {
    q: "Does the Kingston Road shop sell Native cigarettes?",
    a: "Yes. Main Kingston Cannabis lists Native cigarettes in the in-store cigarette category at 615 Kingston Rd. Use the current cigarette menu for brand, variety, pack or carton unit, and posted price. Selection can change.",
  },
  {
    q: "Where do I check current cigarette brands at 615 Kingston Rd?",
    a: "Open the cigarette category for the listed selection. This Kingston Road page explains the storefront. It does not replace the current menu or lock in a brand, pack count, or price.",
  },
  {
    q: "What should I compare on a pack versus a carton listing?",
    a: "A pack and a carton are different sales units. Read the listed unit beside the posted price, then compare the same unit, brand, and variety. Ask staff in store if the unit is unclear.",
  },
  {
    q: "Do I need ID to buy cigarettes on Kingston Road?",
    a: "Yes. The store serves adults 19+ only. Government-issued photo ID is required before purchase, including overnight walk-ins.",
  },
  {
    q: "Can I buy Native cigarettes after midnight at this Upper Beaches shop?",
    a: "Walk-in retail is open 24 hours daily. Bring photo ID. Treat the website category as current information rather than a promise that one brand will still be on the shelf when you arrive.",
  },
];

export const DISPENSARY_LP_FAQS: StoreFaq[] = [
  {
    q: "Is Main Kingston Cannabis a weed dispensary on Kingston Road at the Beach corridor?",
    a: "Yes. The walk-in shop is at 615 Kingston Rd, where Kingston Road meets Main Street in the Upper Beaches. This page is the neighbourhood owner for that storefront. The homepage remains the name, address, phone, hours, and map hub.",
  },
  {
    q: "Does this Kingston Road page list every Toronto dispensary?",
    a: "No. It is one shop on the Kingston Road / Beach corridor. It is not a city-wide directory and it does not speak for other neighbourhoods.",
  },
  {
    q: "Where do I browse flower from this Upper Beaches dispensary?",
    a: "Flower is grouped as Exotic, Premium, AAA+, AA, and Budget Weed on dedicated collection pages. Confirm listings in store. This page does not invent inventory or prices.",
  },
  {
    q: "How is the Kingston Road weed-dispensary page different from the 24-hour page?",
    a: "Use this page when the question is which storefront sits on Kingston Road at the Beach corridor. Use the 24-hour Kingston Road page for open-now and overnight questions. Walk-in retail stays open 24 hours daily. Adults 19+.",
  },
  {
    q: "Can I treat the city weed-dispensary URL as a second shop?",
    a: "No. The city URL is not a second store. This Kingston Road page is the neighbourhood owner for 615 Kingston Rd. Delivery, Native cigarettes, and nicotine vapes have their own Kingston Road pages.",
  },
];

export const VAPE_LP_FAQS: StoreFaq[] = [
  {
    q: "Where is the current nicotine vape menu for Main Kingston Cannabis?",
    a: "Use the nicotine vape category at /items/vapes. This Kingston Road page is neighbourhood context. It does not list SKUs or prices, and it does not promise that a named device is in stock.",
  },
  {
    q: "Are nicotine vapes the same as THC vapes at this Kingston Road shop?",
    a: "No. Nicotine vapes are listed under /items/vapes. THC or cannabis vapes are a separate category under /items/vape-disposables. Read the category label before you travel for one format.",
  },
  {
    q: "Does this Kingston Road page publish nicotine vape prices?",
    a: "No. Open the current nicotine vape category, then the individual item page for posted details. Confirm the listing in store. Nicotine is addictive.",
  },
  {
    q: "Who can buy a nicotine vape at 615 Kingston Rd?",
    a: "Adults 19+ with government-issued photo ID. The walk-in shop is open 24 hours daily. Delivery, when used, is a separate path confirmed by the dispatcher.",
  },
  {
    q: "Should I treat puff counts on a listing as a performance promise?",
    a: "No. When a product name includes a puff count, use it only to tell listings apart. This page does not present puff counts as lifespan, strength, or superiority claims.",
  },
];

export function lpFaqPageJsonLd(faqs: StoreFaq[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    isPartOf: { "@id": `${STORE_NAP.homeUrl}/#website` },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function pageUrl(path: string) {
  return `${STORE_NAP.homeUrl}${path}`;
}
