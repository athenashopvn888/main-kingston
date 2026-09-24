import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import { cannabisStoreJsonLd, renderedDocumentTitle, STORE_NAP, toJsonLd } from "./lib/storeNap";

const HOME_DOCUMENT_TITLE = renderedDocumentTitle("24 Hour Kingston Road Dispensary");

export const metadata: Metadata = {
  metadataBase: new URL(STORE_NAP.homeUrl),
  title: {
    default: HOME_DOCUMENT_TITLE,
    template: `%s | ${STORE_NAP.name}`,
  },
  description:
    "Main Kingston Cannabis is an East Toronto dispensary on Kingston Rd near Main St with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
          dangerouslySetInnerHTML={{ __html: toJsonLd(cannabisStoreJsonLd) }}
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
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
