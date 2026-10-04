import type { Metadata } from "next";
import TvReviewQr from "../TvReviewQr";

export const metadata: Metadata = {
  title: "Main Kingston Cannabis In-Store Flower Display",
  description: "Operational in-store flower menu display for Main Kingston Cannabis.",
  robots: { index: false, follow: false },
};

export default function TvLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <TvReviewQr storeName="Main Kingston cannabis" />
    </>
  );
}
