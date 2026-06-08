import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Cannabis Blog & Guides — Main Kingston Cannabis | Toronto",
  description: "Read the latest strain reviews, dosing guides, and cannabis news from Main Kingston Cannabis in Toronto.",
  alternates: {
    canonical: "https://mainkingstoncannabis.ca/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
