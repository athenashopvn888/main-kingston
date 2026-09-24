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
  {
    href: PATHS.visit,
    label: "Visit Kingston Road",
    blurb: "Parking on Kingston Road, the 64 Main bus, and the walk south from Main Street Station to 615 Kingston Rd.",
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
    q: "Is the Native cigarette shelf at 615 Kingston Rd a separate shop from the flower counter?",
    a: "No. It is the same Upper Beaches walk-in at 615 Kingston Rd. Flower tiers and the cigarette category share one door where Kingston Road meets Main Street. Adults 19+.",
  },
  {
    q: "How do I tell a Kingston Road pack row from a carton row?",
    a: "On the cigarette category, read the unit written beside that row's price. A carton row and a single-pack row are different purchases. Match the unit before you compare two numbers from the Upper Beaches shelf.",
  },
  {
    q: "Will this page freeze tonight's cigarette brands for the Upper Beaches shop?",
    a: "No. The category is a live list for 615 Kingston Rd. Call +1 289 460 0130 if one variety matters before you leave the Danforth. This page does not publish a locked roster or a made-up price.",
  },
  {
    q: "Can I stop for cigarettes after the 503 Kingston Rd streetcar has stopped running?",
    a: "The door at 615 Kingston Rd stays open 24 hours. The streetcar timetable is not the store clock. Line 2 to Main Street Station, then a walk south on Main Street, still reaches the corner. Bring government photo ID. Adults 19+.",
  },
  {
    q: "Where do nicotine devices sit relative to this Kingston Road cigarette page?",
    a: "Nicotine vapes have their own Upper Beaches page and the /items/vapes list. This page is only the retail cigarette category at the Kingston Road storefront. Tobacco and nicotine products are addictive.",
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
    q: "Which URL is the nicotine list for the Upper Beaches shop?",
    a: "Use /items/vapes. This Kingston Road page explains the storefront at 615 Kingston Rd, a short walk south of Main Street Station. It is not a second inventory and it does not quote device prices. Nicotine is addictive.",
  },
  {
    q: "If I want a cannabis vape on Kingston Road, is this the right page?",
    a: "No. Cannabis and THC disposables live under /items/vape-disposables. Stay on this Upper Beaches page only when the product is a nicotine vape.",
  },
  {
    q: "Does a puff number in a product name mean the Upper Beaches shop guarantees that many draws?",
    a: "No. A number in a name is a label you can use to tell two rows apart on the Kingston Road nicotine list. It is not a lifespan, strength, or quality claim from this page.",
  },
  {
    q: "Who can purchase a nicotine vape at 615 Kingston Rd?",
    a: "Adults 19 and older with government photo ID. The walk-in hours already published for this shop are Open 24 Hours, including after the 64 Main bus thins out. Nicotine is addictive.",
  },
  {
    q: "Is weed delivery the way to get a nicotine vape from this Kingston Road door?",
    a: "Delivery is a separate dispatcher path. This page does not describe a nicotine-vape service area or a drop-off map. For a device in hand, use the walk-in at 615 Kingston Rd or ask the dispatcher before you assume a run down to the Beach corridor.",
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
