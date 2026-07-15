export interface TierSeoData {
  seoTitle: string;
  seoIntro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: {
    seoTitle: "Exotic Cannabis Flower Toronto | Main Kingston Cannabis",
    seoIntro:
      "Browse the Exotic flower category at Main Kingston Cannabis near Kingston Road and Main Street. Check the current menu for listed names, prices, and package details before visiting.",
    sections: [
      {
        heading: "Exotic Flower At Main Kingston Cannabis",
        body: "Main Kingston Cannabis lists Exotic flower as part of its tiered cannabis menu. Use this page for category context, then check the current menu for exact strain listings, THC details, and package pricing.",
      },
      {
        heading: "Pricing Context From $20/g",
        body: "The Exotic tier is presented with clear menu pricing and deal context where listed. Prices and stock can change, so confirm the current menu or ask in store before purchase.",
      },
      {
        heading: "Local Store Context",
        body: "Main Kingston Cannabis is located at 615 Kingston Rd, Toronto, ON M4E 1R3, serving shoppers around Main Street, Kingston Road, East Toronto, Upper Beaches, Danforth, Victoria Park, Birch Cliff, Scarborough Southwest.",
      },
    ],
    faqs: [
      {
        q: "What is Exotic flower?",
        a: "Exotic is one of the flower tiers shown on the Main Kingston Cannabis menu. It helps shoppers compare category and price context before visiting.",
      },
      {
        q: "Does this page guarantee current Exotic stock?",
        a: "No. Use the current menu or ask in store for exact listings.",
      },
      { q: "Where is the store?", a: "615 Kingston Rd, Toronto, ON M4E 1R3" },
    ],
  },

  PREMIUM: {
    seoTitle: "Premium Cannabis Flower Toronto | Main Kingston Cannabis",
    seoIntro:
      "Browse premium flower category browsing at Main Kingston Cannabis near Kingston Road and Main Street. Confirm current strains, prices, and listings before visiting.",
    sections: [
      {
        heading: "Premium Flower At Main Kingston Cannabis",
        body: "Main Kingston Cannabis lists Premium flower as part of its tiered cannabis menu. Use this page for category context, then check the current menu for exact strain listings, THC details, and package pricing.",
      },
      {
        heading: "Pricing Context From $15/g",
        body: "The Premium tier is presented with clear menu pricing and deal context where listed. Prices and stock can change, so confirm the current menu or ask in store before purchase.",
      },
      {
        heading: "Local Store Context",
        body: "Main Kingston Cannabis is located at 615 Kingston Rd, Toronto, ON M4E 1R3, serving shoppers around Main Street, Kingston Road, East Toronto, Upper Beaches, Danforth, Victoria Park, Birch Cliff, Scarborough Southwest.",
      },
    ],
    faqs: [
      {
        q: "What is Premium flower?",
        a: "Premium is one of the flower tiers shown on the Main Kingston Cannabis menu. It helps shoppers compare category and price context before visiting.",
      },
      {
        q: "Does this page guarantee current Premium stock?",
        a: "No. Use the current menu or ask in store for exact listings.",
      },
      { q: "Where is the store?", a: "615 Kingston Rd, Toronto, ON M4E 1R3" },
    ],
  },

  "AAA+": {
    seoTitle: "AAA+ Cannabis Flower Toronto | Main Kingston Cannabis",
    seoIntro:
      "Browse the AAA+ flower tier at Main Kingston Cannabis near Kingston Road and Main Street. Check current menu items and prices before visiting.",
    sections: [
      {
        heading: "AAA+ Flower At Main Kingston Cannabis",
        body: "Main Kingston Cannabis lists AAA+ flower as part of its tiered cannabis menu. Use this page for category context, then check the current menu for exact strain listings, THC details, and package pricing.",
      },
      {
        heading: "Pricing Context From $10/g",
        body: "The AAA+ tier is presented with clear menu pricing and deal context where listed. Prices and stock can change, so confirm the current menu or ask in store before purchase.",
      },
      {
        heading: "Local Store Context",
        body: "Main Kingston Cannabis is located at 615 Kingston Rd, Toronto, ON M4E 1R3, serving shoppers around Main Street, Kingston Road, East Toronto, Upper Beaches, Danforth, Victoria Park, Birch Cliff, Scarborough Southwest.",
      },
    ],
    faqs: [
      {
        q: "What is AAA+ flower?",
        a: "AAA+ is one of the flower tiers shown on the Main Kingston Cannabis menu. It helps shoppers compare category and price context before visiting.",
      },
      {
        q: "Does this page guarantee current AAA+ stock?",
        a: "No. Use the current menu or ask in store for exact listings.",
      },
      { q: "Where is the store?", a: "615 Kingston Rd, Toronto, ON M4E 1R3" },
    ],
  },

  AA: {
    seoTitle: "AA Cannabis Flower Toronto | Main Kingston Cannabis",
    seoIntro:
      "Browse daily-driver flower category browsing at Main Kingston Cannabis near Kingston Road and Main Street. Confirm current strains, prices, and listings before visiting.",
    sections: [
      {
        heading: "AA Flower At Main Kingston Cannabis",
        body: "Main Kingston Cannabis lists AA flower as part of its tiered cannabis menu. Use this page for category context, then check the current menu for exact strain listings, THC details, and package pricing.",
      },
      {
        heading: "Pricing Context From $4/g",
        body: "The AA tier is presented with clear menu pricing and deal context where listed. Prices and stock can change, so confirm the current menu or ask in store before purchase.",
      },
      {
        heading: "Local Store Context",
        body: "Main Kingston Cannabis is located at 615 Kingston Rd, Toronto, ON M4E 1R3, serving shoppers around Main Street, Kingston Road, East Toronto, Upper Beaches, Danforth, Victoria Park, Birch Cliff, Scarborough Southwest.",
      },
    ],
    faqs: [
      {
        q: "What is AA flower?",
        a: "AA is one of the flower tiers shown on the Main Kingston Cannabis menu. It helps shoppers compare category and price context before visiting.",
      },
      {
        q: "Does this page guarantee current AA stock?",
        a: "No. Use the current menu or ask in store for exact listings.",
      },
      { q: "Where is the store?", a: "615 Kingston Rd, Toronto, ON M4E 1R3" },
    ],
  },

  BUDGET: {
    seoTitle: "Budget Cannabis Toronto | Main Kingston Cannabis",
    seoIntro:
      "Browse value flower category browsing at Main Kingston Cannabis near Kingston Road and Main Street. Confirm current strains, prices, and listings before visiting.",
    sections: [
      {
        heading: "Budget Flower At Main Kingston Cannabis",
        body: "Main Kingston Cannabis lists Budget flower as part of its tiered cannabis menu. Use this page for category context, then check the current menu for exact strain listings, THC details, and package pricing.",
      },
      {
        heading: "Pricing Context From $3/g",
        body: "The Budget tier is presented with clear menu pricing and deal context where listed. Prices and stock can change, so confirm the current menu or ask in store before purchase.",
      },
      {
        heading: "Local Store Context",
        body: "Main Kingston Cannabis is located at 615 Kingston Rd, Toronto, ON M4E 1R3, serving shoppers around Main Street, Kingston Road, East Toronto, Upper Beaches, Danforth, Victoria Park, Birch Cliff, Scarborough Southwest.",
      },
    ],
    faqs: [
      {
        q: "What is Budget flower?",
        a: "Budget is one of the flower tiers shown on the Main Kingston Cannabis menu. It helps shoppers compare category and price context before visiting.",
      },
      {
        q: "Does this page guarantee current Budget stock?",
        a: "No. Use the current menu or ask in store for exact listings.",
      },
      { q: "Where is the store?", a: "615 Kingston Rd, Toronto, ON M4E 1R3" },
    ],
  },
};
