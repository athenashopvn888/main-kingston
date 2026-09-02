import type { Metadata } from "next";
import DeliveryContent from "../delivery/DeliveryContent";
import menu from "../delivery/delivery-menu.json";
const canonical="https://www.mainkingstoncannabis.ca/weed-delivery-toronto";
export const metadata: Metadata={title:"Weed Delivery Toronto | Main Kingston cannabis",description:"Explore the Main Kingston cannabis Weed Delivery menu and contact its dispatcher to confirm current availability and delivery details.",alternates:{canonical}};
export default function WeedDeliveryTorontoPage(){const data={"@context":"https://schema.org","@type":"CollectionPage",name:"Main Kingston cannabis Weed Delivery",url:canonical,mainEntity:{"@type":"ItemList",numberOfItems:menu.products.length,itemListElement:menu.products.map((p,i)=>({"@type":"ListItem",position:i+1,name:p.name}))}};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/><DeliveryContent/></>}
