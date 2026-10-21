import type { Metadata } from "next";
import ResourceView from "./ResourceView";
import { RESOURCE_ALIAS } from "./resourceData";
import { presentResourcePage } from "../lib/cigaretteGate";

const resourceAlias = presentResourcePage(RESOURCE_ALIAS);

export const metadata: Metadata = {
  title: { absolute: resourceAlias.seoTitle },
  description: resourceAlias.description,
  alternates: { canonical: "https://www.mainkingstoncannabis.ca/weed-resources" },
  robots: { index: true, follow: true },
};

export default function ResourcesPage() {
  return <ResourceView page={RESOURCE_ALIAS} />;
}
