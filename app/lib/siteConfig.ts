/**
 * Site-wide cigarette visibility.
 * Defaults off. Set NEXT_PUBLIC_SHOW_CIGARETTES=true and rebuild to restore
 * cigarette pages, menus, banners, copy, schema, and sitemap entries.
 */
export const SHOW_CIGARETTES = process.env.NEXT_PUBLIC_SHOW_CIGARETTES === "true";

/** Neighbourhood vape page used when cigarette URLs are temporarily redirected. */
export const VAPE_PAGE_PATH = "/vape-shop-kingston-road";
