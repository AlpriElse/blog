import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts.ts";
import type { PostSection } from "./postSections.ts";

const getPostsBySection = (
  posts: CollectionEntry<"blog" | "blog-fixtures">[],
  section: PostSection
) => getSortedPosts(posts.filter(post => post.data.section === section));

export default getPostsBySection;
