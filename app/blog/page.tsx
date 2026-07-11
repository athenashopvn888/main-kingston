import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Main Kingston Cannabis Blog | Cannabis Menu Guides",
  description: "Read Main Kingston Cannabis cannabis menu guides, flower tier notes, and local store checks for Toronto shoppers.",
  alternates: {
    canonical: "https://www.mainkingstoncannabis.ca/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
