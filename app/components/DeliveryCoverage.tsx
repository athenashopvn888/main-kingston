import Link from "next/link";

const areas = ["Upper Beaches", "East Toronto", "The Beaches", "East York", "Scarborough Southwest"];

export function DeliveryCoverage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.mainkingstoncannabis.ca/weed-delivery-toronto#delivery-service",
    name: "Main Kingston Cannabis delivery coverage",
    serviceType: "Cannabis delivery information",
    provider: { "@id": "https://www.mainkingstoncannabis.ca/#store" },
    url: "https://www.mainkingstoncannabis.ca/weed-delivery-toronto",
    areaServed: [
      { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 43.6786661, longitude: -79.298503 }, geoRadius: 15000 },
      ...areas.map((name) => ({ "@type": "City", name })),
    ],
  };

  return <section style={{ maxWidth: 1040, margin: "0 auto", padding: "24px 24px 64px" }}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <h2>Delivery Coverage from Kingston Road</h2>
    <p>Delivery is coordinated from 615 Kingston Rd for the Upper Beaches, East Toronto, and nearby East End streets. A practical planning area includes the Beaches, East York, and Scarborough Southwest when a driver can reach the destination.</p>
    <p>Coverage is confirmed when an order is placed. Longer trips outside the East End are not guaranteed, so confirm the destination and timing with the dispatcher before relying on delivery.</p>
    <p><Link href="/weed-delivery-toronto">Check current Kingston Road delivery information</Link></p>
  </section>;
}
