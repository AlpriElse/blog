import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog" | "blog-fixtures">["data"];
  secHeading?: boolean;
}

const formatDate = (value: string | Date) =>
  new Date(value).toISOString().slice(0, 10);

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, tags } = frontmatter;
  const displayDate = formatDate(
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime
  );

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-semibold decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="block text-lg font-semibold text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <p className="mt-1 text-sm italic text-skin-base/70">
        <time dateTime={displayDate}>{displayDate}</time>
        {tags.length > 0 && (
          <>
            {" ; "}
            {tags.map(tag => `#${tag}`).join(", ")}
          </>
        )}
      </p>
    </li>
  );
}
