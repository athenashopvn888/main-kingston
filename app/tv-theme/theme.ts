import type { CSSProperties } from "react";

export type TvTheme = {
  headerImage: string;
  backgroundImage: string;
  cornerLeft?: string;
  cornerRight?: string;
  primary: string;
  accent: string;
  glow: string;
  cardBorder: string;
  headerText: string;
  sloganLeft: string;
  sloganRight: string;
  footerLeft: string;
  footerRight: string;
};

export const TV_THEMES: Readonly<Record<string, TvTheme>> = {
  MKC01: {
    headerImage: "/tv-theme/mkc01/header.webp",
    backgroundImage: "/tv-theme/mkc01/background.webp",
    cornerLeft: "/tv-theme/mkc01/corner-left.png",
    cornerRight: "/tv-theme/mkc01/corner-right.png",
    primary: "#087A35",
    accent: "#D91522",
    glow: "rgba(217, 21, 34, 0.34)",
    cardBorder: "rgba(244, 224, 170, 0.92)",
    headerText: "#FFF9EA",
    sloganLeft: "OPEN 24 HOURS",
    sloganRight: "EXPLORE EVERY TIER",
    footerLeft: "MAIN KINGSTON CANNABIS",
    footerRight: "KINGSTON ROAD · ALWAYS OPEN",
  },
};

export function getTvTheme(storeCode?: string | null): TvTheme | undefined {
  return storeCode ? TV_THEMES[storeCode] : undefined;
}

type TvThemeVariables = CSSProperties & {
  "--tv-theme-header-image": string;
  "--tv-theme-background-image": string;
  "--tv-theme-primary": string;
  "--tv-theme-accent": string;
  "--tv-theme-glow": string;
  "--tv-theme-card-border": string;
  "--tv-theme-header-text": string;
};

export function getTvThemeVariables(theme: TvTheme): TvThemeVariables {
  return {
    "--tv-theme-header-image": `url("${theme.headerImage}")`,
    "--tv-theme-background-image": `url("${theme.backgroundImage}")`,
    "--tv-theme-primary": theme.primary,
    "--tv-theme-accent": theme.accent,
    "--tv-theme-glow": theme.glow,
    "--tv-theme-card-border": theme.cardBorder,
    "--tv-theme-header-text": theme.headerText,
  };
}
