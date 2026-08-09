import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";
import menu from "./delivery-menu.json";

export const metadata: Metadata = {
  title: "Delivery Menu | Main Kingston Cannabis",
  description: "Browse the Main Kingston Cannabis delivery product catalog and compare flower tiers and prices.",
  alternates: { canonical: "https://www.mainkingstoncannabis.ca/delivery" },
};

export default function DeliveryPage() {
  const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Main Kingston Cannabis Delivery Menu", url: "https://www.mainkingstoncannabis.ca/delivery", mainEntity: { "@type": "ItemList", numberOfItems: menu.products.length, itemListElement: menu.products.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><DeliveryContent /></>;
}
