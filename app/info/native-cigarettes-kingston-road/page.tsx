import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SmokePilotLanding } from "../../components/SmokePilot";
import { getItemsByCategory } from "../../lib/products";

export const metadata: Metadata = {
  title: { absolute: "Native Cigarettes Kingston Road | Main Kingston Cannabis" },
  description: "Browse Native cigarette brands, pack styles, and listed prices at Main Kingston Cannabis, 615 Kingston Rd, Toronto. Open 24 Hours.",
  alternates: { canonical: "https://www.mainkingstoncannabis.ca/info/native-cigarettes-kingston-road" },
};

export default function NativeCigarettesPage() {
  const items = getItemsByCategory("CIGARETTES");
  return (
    <>
      <Navbar />
      <SmokePilotLanding
        canonicalUrl="https://www.mainkingstoncannabis.ca/info/native-cigarettes-kingston-road"
        storeName="Main Kingston Cannabis"
        locationLabel="Kingston Road"
        eyebrow="Native Cigarettes · Kingston Road"
        title="Native Cigarettes in Kingston Road"
        intro="Shop Native cigarette brands, full, light and menthol styles, plus Backwoods, grabba and nicotine pouches at Main Kingston Cannabis near Kingston Road and Main Street."
        items={items}
        menuHref="/items/cigarettes"
        menuLabel="Shop the cigarette menu"
        menuHeading="Native Cigarette Brands & Prices"
        menuIntro="Compare cigarette brands, styles and listed prices from Main Kingston Cannabis in East Toronto."
        crossLink={{ href: "/info/nicotine-vapes-kingston-road", eyebrow: "Also at Main Kingston Cannabis", title: "Prefer a nicotine vape?", body: "Shop nicotine vape devices with brand, flavour, puff-count and listed price details from Main Kingston Cannabis.", label: "Shop nicotine vapes" }}
        sections={[
          { heading: "Native Cigarettes on Kingston Road", body: "Main Kingston Cannabis carries Native cigarettes and smoke-shop essentials at 615 Kingston Rd near Main Street in East Toronto." },
          { heading: "Full, Light and Menthol Styles", body: "Compare Canadian, Canadian Goose, Canadian Classics, Nexus, Time and Putters across full, light and menthol styles in the listed selection." },
          { heading: "Backwoods, Grabba and Nicotine Pouches", body: "The smoke-shop selection also includes Backwoods, grabba, grabba shakers and nicotine pouches where listed." },
        ]}
        faqs={[
          { q: "Does Main Kingston Cannabis sell Native cigarettes?", a: "Yes. Main Kingston Cannabis lists Native cigarette brands and related smoke-shop products at 615 Kingston Rd, Toronto." },
          { q: "Can I see cigarette prices online?", a: "Yes. Listed prices appear with the cigarette selection, and staff can confirm current shelf details when you visit." },
          { q: "Where is Main Kingston Cannabis?", a: "Main Kingston Cannabis is at 615 Kingston Rd, Toronto, ON M4E 1R3 and lists open 24 hours." },
        ]}
        address="615 Kingston Rd, Toronto"
        hours="Open 24 Hours"
        theme="cigarettes"
      />
      <Footer />
    </>
  );
}
