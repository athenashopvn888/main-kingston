import type { Metadata } from "next";
import PostContent from "./PostContent";
import { getStaticPost } from "../staticPosts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const staticPost = getStaticPost(slug);

  if (staticPost) {
    return {
      title: staticPost.seoTitle,
      description: staticPost.metaDescription,
      alternates: {
        canonical: `https://www.mainkingstoncannabis.ca/blog/${slug}`,
      },
    };
  }

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} - Blog | Main Kingston Cannabis`,
    description: `Read about ${title.toLowerCase()} and other cannabis guides from Main Kingston Cannabis in Toronto.`,
    alternates: {
      canonical: `https://www.mainkingstoncannabis.ca/blog/${slug}`,
    },
  };
}

export default function BlogPostPage() {
  return <PostContent />;
}
