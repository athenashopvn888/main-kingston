import type { Metadata } from "next";
import GamesContent from "./GamesContent";

export const metadata: Metadata = {
  title: "Cannabis Arcade Games — Main Kingston Cannabis | Toronto",
  description: "Play free online cannabis-themed games like Flappy Bud and Snake Munchies while you wait at Main Kingston Cannabis.",
  alternates: {
    canonical: "https://www.mainkingstoncannabis.ca/games",
  },
};

export default function GamesPage() {
  return <GamesContent />;
}
