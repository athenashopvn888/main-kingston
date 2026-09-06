import type { Metadata } from "next";
import ResourceView from "../resources/ResourceView";
import { RESOURCE_HOME } from "../resources/resourceData";
export const metadata: Metadata = { title: { absolute: RESOURCE_HOME.seoTitle }, description: RESOURCE_HOME.description, alternates: { canonical: "https://www.mainkingstoncannabis.ca/weed-resources" }, robots: { index: true, follow: true } };
export default function WeedResourcesPage(){ return <ResourceView page={RESOURCE_HOME}/>; }
