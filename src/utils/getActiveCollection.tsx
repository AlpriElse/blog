import { getCollection, type CollectionEntry } from "astro:content";

export async function getActiveCollection(): Promise<
  CollectionEntry<"blog" | "blog-fixtures">[]
> {
  return await getCollection(
    getActiveCollectionName(),
    entry => !entry.data.hidden
  );
}

export async function hasContentInActiveCollection(): Promise<Boolean> {
  return getActiveCollection().then(collection => collection.length !== 0);
}

export function getActiveCollectionName(): "blog" | "blog-fixtures" {
  const mode = import.meta.env.MODE;
  if (mode === "development") {
    return "blog-fixtures";
  }

  return "blog";
}
