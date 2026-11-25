"use client";

import Link from "next/link";
import { CIGARETTES_LP_PATH, MESH_HUB_LINKS, TIER_MESH_LINKS, VERTICAL_MESH_LINKS } from "../lib/organicPaths";
import { useCigaretteState } from "./CigaretteStateProvider";
import styles from "./StoreMeshNav.module.css";

export function StoreMeshNav({ currentPath }: { currentPath?: string }) {
  const { web: showCigarettes } = useCigaretteState();
  const hubs = MESH_HUB_LINKS.filter((link) => link.href !== currentPath);
  const verticals = VERTICAL_MESH_LINKS.filter((link) => link.href !== currentPath && (showCigarettes || link.href !== CIGARETTES_LP_PATH));
  const tiers = TIER_MESH_LINKS.filter((link) => link.href !== currentPath);

  return (
    <nav className={styles.mesh} aria-label="Kingston Road store pages">
      <p className={styles.label}>Kingston Road / Beach corridor pages</p>
      <div className={styles.row}>
        {hubs.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className={styles.row}>
        {verticals.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className={styles.row}>
        {tiers.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
