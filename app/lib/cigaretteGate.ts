import { SHOW_CIGARETTES, VAPE_PAGE_PATH } from "./siteConfig";
import { isKeptSmokeSlug, isKeptSmokeText } from "./cigaretteCopy";
import guideCopy from "./guideCopy.json";
import deliveryGuideCopy from "./deliveryGuideCopy.json";
import itemsJson from "./items.json";

export { SHOW_CIGARETTES, VAPE_PAGE_PATH, isKeptSmokeSlug, isKeptSmokeText };

type NamedSlug = { slug?: string; name?: string; lane?: string; category_path?: string; category?: string };

const guides = guideCopy as NamedSlug[];
const deliveryGuides = deliveryGuideCopy as NamedSlug[];
const items = itemsJson as NamedSlug[];

/** Cigarette/tobacco mention, after Backwoods, cigarillos, and rolling papers are ignored. */
export function mentionsHiddenSmoke(value: string): boolean {
  if (!value) return false;
  const stripped = value.replace(/backwoods?|cigarillos?|rolling[\s-]?papers?|raw[\s-]?papers?/gi, " ");
  return /\bcigarettes?\b|\btobacco\b|\bnative[\s-]?smokes?\b|\bgrabba\b|\bmarlboro\b|\bbelmont\b|\bcarton\b/i.test(stripped);
}

function stripTerm(text: string, term: string): string {
  const token = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text
    .replace(new RegExp(`\\b${token}\\s+and\\s+`, "gi"), "")
    .replace(new RegExp(`,\\s*${token}\\b\\s*,`, "gi"), ",")
    .replace(new RegExp(`\\b${token}\\b\\s*,\\s*`, "gi"), "")
    .replace(new RegExp(`,\\s*${token}\\b`, "gi"), "")
    .replace(new RegExp(`\\b${token}\\b`, "gi"), "");
}

function applyPhraseRules(text: string): string {
  let next = text;
  for (const term of ["native cigarettes", "native-smokes education", "native smokes education", "native-smokes", "native smokes", "cigarettes", "cigarette", "tobacco", "grabba"]) {
    next = stripTerm(next, term);
  }
  next = next.replace(/\s{2,}/g, " ");
  next = next.replace(/\s+([,.;])/g, "$1");
  next = next.replace(/,\s*,+/g, ",");
  next = next.replace(/,\s*and\b/gi, " and");
  next = next.replace(/\band\s+and\b/gi, "and");
  next = next.replace(/\s+and\s*([.!?]|$)/gi, "$1");
  next = next.replace(/:\s*and\b/gi, ":");
  next = next.replace(/(^|[.!?]\s+)([a-z])/g, (_match, prefix: string, letter: string) => prefix + letter.toUpperCase());
  return next.replace(/\s{2,}/g, " ").trim();
}

/** When the switch is on, copy is returned unchanged. */
export function scrubCigaretteCopy(text: string): string {
  if (SHOW_CIGARETTES || !text || !mentionsHiddenSmoke(text)) return text;
  const sentences = text.split(/(?<=[.!?])\s+/);
  const next = sentences
    .map((sentence) => {
      if (!mentionsHiddenSmoke(sentence)) return sentence;
      const sharesAnotherTopic = /flower|weed|vape|edible|pre-roll|preroll|concentrate|accessor|dispensar|delivery|kingston|hour|visit|menu|tier|cannabis|shop/i.test(sentence);
      return sharesAnotherTopic ? applyPhraseRules(sentence) : "";
    })
    .filter((sentence) => sentence.trim())
    .join(" ");
  return next.replace(/\s{2,}/g, " ").trim();
}

export function isCigaretteItem(item: { slug?: string; name?: string; category?: string }): boolean {
  const slug = item.slug || "";
  const name = item.name || "";
  if (isKeptSmokeSlug(slug, name)) return false;
  return String(item.category || "").toUpperCase() === "CIGARETTES";
}

export function isCigaretteItemSlug(slug: string): boolean {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) return false;
  return isCigaretteItem(item);
}

export function isCigaretteGuideSlug(slug: string): boolean {
  if (isKeptSmokeSlug(slug)) return false;
  const guide = guides.find((entry) => entry.slug === slug);
  if (guide?.lane === "native_cig") return !isKeptSmokeSlug(guide.slug || slug, guide.name || "");
  const delivery = deliveryGuides.find((entry) => entry.slug === slug);
  if (!delivery) return false;
  if (isKeptSmokeSlug(delivery.slug || slug, delivery.name || "")) return false;
  return delivery.lane === "native_cig" || delivery.category_path === "/items/cigarettes";
}

export function isCigaretteResourceSlug(slug: string): boolean {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return clean === "native-smokes" || clean.startsWith("native-smokes/");
}

const EXACT_CIGARETTE_PATHS = new Set([
  "/cigarettes",
  "/items/cigarettes",
  "/native-cigarettes-kingston-road",
  "/info/native-cigarettes-kingston-road",
  "/info/native-cigarettes-york",
  "/resources/native-smokes",
  "/resources/native-smokes/native-cigarettes-guide",
]);

export function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0].split("#")[0];
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

export function isCigaretteRequestPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (EXACT_CIGARETTE_PATHS.has(path)) return true;
  if (path.startsWith("/resources/native-smokes/")) return true;
  const guide = path.match(/^\/guides\/([^/]+)$/);
  if (guide) return isCigaretteGuideSlug(decodeURIComponent(guide[1]));
  const item = path.match(/^\/item\/([^/]+)$/);
  if (item) return isCigaretteItemSlug(decodeURIComponent(item[1]));
  return false;
}

export function isCigaretteHref(href: string): boolean {
  if (!href.startsWith("/")) return false;
  return isCigaretteRequestPath(href);
}

type ResourceCard = { title: string; href: string; text: string };
type ResourceSection = {
  heading: string;
  body?: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};
type ResourceFaq = { question: string; answer: string };
type GateableResource = {
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  cards: ResourceCard[];
  sections: ResourceSection[];
  faqs?: ResourceFaq[];
};

function hiddenBlock(parts: Array<string | undefined>): boolean {
  return mentionsHiddenSmoke(parts.filter(Boolean).join(" "));
}

export function presentResourcePage<T extends GateableResource>(page: T): T {
  if (SHOW_CIGARETTES) return page;
  const sections = page.sections
    .filter((section) => !hiddenBlock([section.heading, section.body, ...(section.paragraphs || []), ...(section.bullets || [])]))
    .map((section) => ({
      ...section,
      subsections: section.subsections?.filter((subsection) => !hiddenBlock([subsection.heading, ...subsection.paragraphs, ...(subsection.bullets || [])])),
    }));
  return {
    ...page,
    title: scrubCigaretteCopy(page.title),
    seoTitle: scrubCigaretteCopy(page.seoTitle),
    description: scrubCigaretteCopy(page.description),
    eyebrow: scrubCigaretteCopy(page.eyebrow),
    intro: scrubCigaretteCopy(page.intro),
    cards: page.cards.filter((card) => !isCigaretteHref(card.href) && !hiddenBlock([card.title, card.text])),
    sections,
    faqs: page.faqs?.filter((faq) => !hiddenBlock([faq.question, faq.answer])),
  };
}

export function cigaretteRedirectSources(): string[] {
  const paths = new Set<string>(EXACT_CIGARETTE_PATHS);
  for (const guide of guides) {
    if (guide.slug && isCigaretteGuideSlug(guide.slug)) paths.add(`/guides/${guide.slug}`);
  }
  for (const guide of deliveryGuides) {
    if (guide.slug && isCigaretteGuideSlug(guide.slug)) paths.add(`/guides/${guide.slug}`);
  }
  for (const item of items) {
    if (item.slug && isCigaretteItem(item)) paths.add(`/item/${item.slug}`);
  }
  return [...paths].sort();
}
