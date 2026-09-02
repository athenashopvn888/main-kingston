import type { Metadata } from "next";
import ResourceView from "../resources/ResourceView";
import { RESOURCE_HOME } from "../resources/resourceData";
export const metadata: Metadata = { title: { absolute: "Main Kingston cannabis Weed Resources | Toronto Cannabis Guides" }, description: "Explore Main Kingston cannabis Weed resources for flower collections, menu categories, value browsing and Toronto visit information.", alternates: { canonical: "https://www.mainkingstoncannabis.ca/weed-resources" } };
export default function WeedResourcesPage(){ return <ResourceView page={{...RESOURCE_HOME,title:"Weed & Cannabis Resources from Main Kingston cannabis"}}/>; }
