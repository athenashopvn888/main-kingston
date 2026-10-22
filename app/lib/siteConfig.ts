/**
 * Site-wide cigarette visibility.
 * Defaults off. Set NEXT_PUBLIC_SHOW_CIGARETTES=true and rebuild to restore
 * cigarette pages, menus, banners, copy, schema, and sitemap entries.
 */
export const SHOW_CIGARETTES = process.env.NEXT_PUBLIC_SHOW_CIGARETTES === "true";

/**
 * Explicit false / 0 / no / off blocks a feed from turning cigarettes back on.
 * An unset value is not that override. The public switch above stays the coded default.
 */
export function cigaretteEnvHardOff(raw: string | undefined = process.env.SHOW_CIGARETTES ?? process.env.NEXT_PUBLIC_SHOW_CIGARETTES): boolean {
  if (raw == null) return false;
  return /^(0|false|no|off)$/i.test(raw.trim());
}

/** Neighbourhood vape page used when cigarette URLs are temporarily redirected. */
export const VAPE_PAGE_PATH = "/vape-shop-kingston-road";
