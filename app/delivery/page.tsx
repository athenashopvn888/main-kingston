import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Coming Soon Main Kingston Cannabis | Toronto",
  description:
    "Get notified when Main Kingston Cannabis prepares delivery updates for Kingston Road and Main Street, East Toronto, and nearby local areas.",
  alternates: {
    canonical: "https://mainkingstoncannabis.ca/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}
