import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SmokePilotLanding } from "../../components/SmokePilot";
import { getItemsByCategory } from "../../lib/products";

export const metadata: Metadata = {
  title: { absolute: "Nicotine Vapes Kingston Road | Main Kingston Cannabis" },
  description: "Browse nicotine vape devices, flavours, formats, and listed prices at Main Kingston Cannabis, 615 Kingston Rd, Toronto. Open 24 Hours.",
  alternates: { canonical: "https://www.mainkingstoncannabis.ca/info/nicotine-vapes-kingston-road" },
};

export default function NicotineVapesPage() {
  const items = getItemsByCategory("VAPE PENS");
  return (
    <>
      <Navbar />
      <SmokePilotLanding
        canonicalUrl="https://www.mainkingstoncannabis.ca/info/nicotine-vapes-kingston-road"
        storeName="Main Kingston Cannabis"
        locationLabel="Kingston Road"
        eyebrow="Nicotine Vapes · Kingston Road"
        title="Nicotine Vapes on Kingston Road"
        intro="Shop nicotine vape devices from Elf Bar, OVNS, NEXA, Level X and other listed names at Main Kingston Cannabis near Kingston Road and Main Street. Compare formats, flavours, puff counts and prices."
        items={items}
        menuHref="/items/vapes"
        menuLabel="Shop the nicotine vape menu"
        menuHeading="Nicotine Vape Devices & Prices"
        menuIntro="Compare nicotine vape devices, formats and listed prices from Main Kingston Cannabis in East Toronto."
        crossLink={{ href: "/info/native-cigarettes-kingston-road", eyebrow: "Also at Main Kingston Cannabis", title: "Need Native cigarettes instead?", body: "Shop full, light and menthol cigarette styles alongside Backwoods, grabba and other smoke-shop essentials at Main Kingston Cannabis.", label: "Shop Native cigarettes" }}
        sections={[
          { heading: "Nicotine Vapes on Kingston Road", body: "Main Kingston Cannabis lists disposable nicotine vapes, pods and devices at 615 Kingston Rd near Main Street." },
          { heading: "Nicotine Vapes Near Main Street", body: "Compare the current device selection by format, flavour, puff count and listed price at the corner of Kingston Road and Main Street." },
          { heading: "Open 24 Hours in East Toronto", body: "Main Kingston Cannabis lists 24-hour shopping for cigarettes, nicotine vapes and other smoke-shop essentials." },
        ]}
        faqs={[
          { q: "Does Main Kingston Cannabis sell nicotine vapes?", a: "Yes. Main Kingston Cannabis lists nicotine vape devices with formats, flavours, puff counts and prices." },
          { q: "What nicotine vape details can I compare?", a: "Listings may include the device format, flavour, puff count and price. Selection can change, so check the current details before visiting." },
          { q: "Where is Main Kingston Cannabis?", a: "Main Kingston Cannabis is at 615 Kingston Rd, Toronto, ON M4E 1R3 and lists open 24 hours." },
        ]}
        address="615 Kingston Rd, Toronto"
        hours="Open 24 Hours"
        theme="nicotine"
      />
      <Footer />
    </>
  );
}
