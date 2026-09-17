/**
 * Main Kingston Cannabis NAP source of truth (MKC01).
 * Hours copied from the existing site — do not invent new hours.
 * GBP Website stays the homepage root, never /visit.
 */
export const STORE_NAP = {
  name: "Main Kingston Cannabis",
  streetAddress: "615 Kingston Rd",
  addressLocality: "Toronto",
  addressRegion: "ON",
  postalCode: "M4E 1R3",
  addressCountry: "CA",
  /** FMD / public NAP line */
  addressLine: "615 Kingston Rd, Toronto, ON M4E 1R3",
  phoneDisplay: "+1 289 460 0130",
  phoneIntl: "+12894600130",
  hoursLabel: "Open 24 Hours",
  hoursDetail: "Open 7 Days a Week",
  opens: "00:00",
  closes: "23:59",
  neighborhood: "Upper Beaches",
  corridor: "Kingston Road",
  intersection: "Kingston Rd & Main St",
  latitude: 43.6786661,
  longitude: -79.298503,
  domain: "www.mainkingstoncannabis.ca",
  homeUrl: "https://www.mainkingstoncannabis.ca",
  visitPath: "/visit",
  /** Local unique asset — replaces shared /wp-content/ 7Clmh.jpg and 46Oi5.jpg */
  imagePath: "/banners/welcome_banner.webp",
  imageUrl: "https://www.mainkingstoncannabis.ca/banners/welcome_banner.webp",
  mapsCidUrl: "https://www.google.com/maps?cid=11938862976826082638",
  mapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Main+Kingston+Cannabis%2C+615+Kingston+Rd%2C+Toronto%2C+ON+M4E+1R3",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=615+Kingston+Rd,+Toronto,+ON+M4E+1R3&hl=en&z=16&output=embed",
  /** Ops lock: GBP Website field must remain homepage root. */
  gbpWebsite: "https://www.mainkingstoncannabis.ca/",
} as const;

export const HOME_FAQS = [
  {
    q: "What are the hours for Main Kingston Cannabis?",
    a: "Main Kingston Cannabis at 615 Kingston Rd, Toronto is Open 24 Hours a day, 7 days a week. Walk in anytime — no appointment needed.",
  },
  {
    q: "Where is Main Kingston Cannabis on Kingston Road?",
    a: "We are at 615 Kingston Rd, Toronto, ON M4E 1R3, on the Upper Beaches strip where Kingston Road meets Main Street. Call +1 289 460 0130 if you need a pin before you leave.",
  },
  {
    q: "Is there parking at Main Kingston Cannabis?",
    a: "Street parking lines Kingston Road around the shop. Posted signs change by block and time of day, so read the curb around 615 Kingston Rd before you leave the car.",
  },
  {
    q: "How do I get to Main Kingston Cannabis on the TTC?",
    a: "Ride Line 2 to Main Street Station, then walk south on Main Street to Kingston Road. The 64 Main bus follows Main Street, and the 503 Kingston Rd streetcar runs the corridor when it is in service.",
  },
  {
    q: "Do I need an appointment or ID?",
    a: "Walk-ins are welcome. You must be 19+ with government photo ID to enter Main Kingston Cannabis.",
  },
  {
    q: "How is cannabis flower organized at Main Kingston Cannabis?",
    a: "Main Kingston Cannabis uses five dedicated flower tiers: Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed. Each collection is a focused way to browse Cannabis Flower before you walk in.",
  },
] as const;

export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const cannabisStoreJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CannabisStore",
      "@id": `${STORE_NAP.homeUrl}/#store`,
      name: STORE_NAP.name,
      description:
        "Walk-in cannabis dispensary at 615 Kingston Rd in the Upper Beaches. Flower, pre-rolls, vapes, edibles, and accessories on Kingston Road at Main Street. Open 24 Hours.",
      url: STORE_NAP.homeUrl,
      telephone: STORE_NAP.phoneIntl,
      image: STORE_NAP.imageUrl,
      priceRange: "$3 - $12/g",
      address: {
        "@type": "PostalAddress",
        streetAddress: STORE_NAP.streetAddress,
        addressLocality: STORE_NAP.addressLocality,
        addressRegion: STORE_NAP.addressRegion,
        postalCode: STORE_NAP.postalCode,
        addressCountry: STORE_NAP.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: STORE_NAP.latitude,
        longitude: STORE_NAP.longitude,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: STORE_NAP.opens,
          closes: STORE_NAP.closes,
        },
      ],
      sameAs: [STORE_NAP.mapsCidUrl],
      hasMap: STORE_NAP.mapsCidUrl,
      areaServed: [
        { "@type": "Neighborhood", name: "Upper Beaches" },
        { "@type": "Neighborhood", name: "Kingston Road" },
        { "@type": "City", name: "Toronto" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${STORE_NAP.homeUrl}/#website`,
      url: `${STORE_NAP.homeUrl}/`,
      name: STORE_NAP.name,
      publisher: { "@id": `${STORE_NAP.homeUrl}/#store` },
    },
  ],
} as const;

export const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${STORE_NAP.homeUrl}/#faq`,
  url: STORE_NAP.homeUrl,
  isPartOf: { "@id": `${STORE_NAP.homeUrl}/#website` },
  mainEntity: HOME_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
} as const;
