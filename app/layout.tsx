import CigaretteStateProvider from "./components/CigaretteStateProvider";
import FleetContentProvider from "./components/FleetContentProvider";
import FullNameNap from "./components/FullNameNap";
import PinnedNavClearance from "./components/PinnedNavClearance";
import { getCigaretteSnapshot, toPublicCigaretteState } from "./lib/cigaretteFeed";
import { getFleetContent } from "./lib/fleetContent";
import { CODED_NAP } from "./lib/fleet/config";
import { SHOW_CIGARETTES } from "./lib/siteConfig";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { cannabisStoreJsonLd, renderedDocumentTitle, STORE_NAP, toJsonLd } from "./lib/storeNap";

const HOME_DOCUMENT_TITLE = renderedDocumentTitle("Open 24 Hours on Kingston Rd");

export const revalidate = 60;

const ROOT_METADATA: Metadata = {
  metadataBase: new URL(STORE_NAP.homeUrl),
  title: {
    default: HOME_DOCUMENT_TITLE,
    template: `%s | ${STORE_NAP.name}`,
  },
  description:
    "Open 24 hours, 7 days a week. Visit Main Kingston Cannabis at 615 Kingston Rd in East Toronto, near Main Street and the Upper Beaches. Adults 19+.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: STORE_NAP.homeUrl,
    siteName: "Main Kingston Cannabis",
    title: "24 Hour Kingston Road Dispensary | Main Kingston Cannabis",
    description:
      "Main Kingston Cannabis is an East Toronto dispensary on Kingston Rd near Main St with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
    images: [
      {
        url: STORE_NAP.imageUrl,
        width: 1200,
        height: 630,
        alt: "Main Kingston Cannabis — Kingston Road dispensary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "24 Hour Kingston Road Dispensary | Main Kingston Cannabis",
    description:
      "Main Kingston Cannabis is an East Toronto dispensary on Kingston Rd near Main St with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
    images: [STORE_NAP.imageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: STORE_NAP.homeUrl,
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  if (!fleet.active) return ROOT_METADATA;
  const description = fleet.pages.Home?.metaDescription || "";
  if (!description || description === ROOT_METADATA.description) return ROOT_METADATA;
  return {
    ...ROOT_METADATA,
    description,
    openGraph: { ...ROOT_METADATA.openGraph, description },
    twitter: { ...ROOT_METADATA.twitter, description },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [fleet, cigaretteSnapshot] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  const cigarettes = toPublicCigaretteState(cigaretteSnapshot);
  const napChanged = fleet.active && (
    fleet.nap.schemaName !== CODED_NAP.schemaName
    || fleet.nap.name !== CODED_NAP.name
    || fleet.nap.street !== CODED_NAP.street
    || fleet.nap.city !== CODED_NAP.city
    || fleet.nap.province !== CODED_NAP.province
    || fleet.nap.postalCode !== CODED_NAP.postalCode
    || fleet.nap.phoneTel !== CODED_NAP.phoneTel
    || fleet.nap.lat !== CODED_NAP.lat
    || fleet.nap.lng !== CODED_NAP.lng
    || fleet.nap.mapsSearchUrl !== CODED_NAP.mapsSearchUrl
    || fleet.nap.website !== CODED_NAP.website
  );
  const storeJsonLd = napChanged
    ? {
        ...cannabisStoreJsonLd,
        "@graph": cannabisStoreJsonLd["@graph"].map((node) => node["@type"] === "CannabisStore"
          ? {
              ...node,
              name: fleet.nap.schemaName,
              telephone: fleet.nap.phoneTel,
              url: fleet.nap.website,
              hasMap: fleet.nap.mapsSearchUrl,
              address: {
                ...node.address,
                streetAddress: fleet.nap.street,
                addressLocality: fleet.nap.city,
                addressRegion: fleet.nap.province,
                postalCode: fleet.nap.postalCode,
              },
              geo: {
                ...node.geo,
                latitude: Number(fleet.nap.lat),
                longitude: Number(fleet.nap.lng),
              },
            }
          : node),
      }
    : cannabisStoreJsonLd;
  return (
    <html lang="en">
      <head>
        <meta name="fleet-content-version" content={fleet.version} />
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Upper Beaches, Toronto" />
        <meta name="geo.position" content="43.6786661;-79.298503" />
        <meta name="ICBM" content="43.6786661, -79.298503" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(storeJsonLd) }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YP3LRJP4CD"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YP3LRJP4CD');
            `,
          }}
        />
      </head>
      <body>
        <Link className="deliveryAnnouncement" href="/weed-delivery-toronto">
          EXPLORE WEED DELIVERY
        </Link>
        <FleetContentProvider value={{ active: fleet.active, version: fleet.version, nap: fleet.nap }}>
          <CigaretteStateProvider value={{ ...cigarettes, web: SHOW_CIGARETTES ? cigarettes.web : false }}>
            {children}
            <FullNameNap />
            <PinnedNavClearance />
          </CigaretteStateProvider>
        </FleetContentProvider>
      </body>
    </html>
  );
}
