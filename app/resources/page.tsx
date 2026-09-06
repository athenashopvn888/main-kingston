import type { Metadata } from "next";
import ResourceView from "./ResourceView";
import { RESOURCE_ALIAS } from "./resourceData";

export const metadata: Metadata = {
  title: { absolute: RESOURCE_ALIAS.seoTitle },
  description: RESOURCE_ALIAS.description,
  alternates: { canonical: "https://www.mainkingstoncannabis.ca/weed-resources" },
  robots: { index: true, follow: true },
};

export default function ResourcesPage() {
  return <ResourceView page={RESOURCE_ALIAS} />;
}
