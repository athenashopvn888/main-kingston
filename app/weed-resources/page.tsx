import type { Metadata } from "next";
import ResourceView from "../resources/ResourceView";
import { RESOURCE_HOME } from "../resources/resourceData";
import { presentResourcePage } from "../lib/cigaretteGate";
const resourceHome = presentResourcePage(RESOURCE_HOME);
export const metadata: Metadata = { title: { absolute: resourceHome.seoTitle }, description: resourceHome.description, alternates: { canonical: "https://www.mainkingstoncannabis.ca/weed-resources" }, robots: { index: true, follow: true } };
export default function WeedResourcesPage(){ return <ResourceView page={RESOURCE_HOME}/>; }
