import HomePage from "./HomePage";
import { faqPageJsonLd, toJsonLd } from "./lib/storeNap";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqPageJsonLd) }}
      />
      <HomePage />
    </>
  );
}
