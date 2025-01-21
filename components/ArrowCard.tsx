import Link from "@/components/Link";
import type { PostItem } from "@/lib/data/posts";

export default function ArrowCard({ metadata }: PostItem) {
  const { title, description, slug, collection, tags } = metadata;
  return (
    // <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
    <Link
      href={`/${collection}/${slug ? encodeURIComponent(slug) : title}`}
      className="not-prose group relative flex flex-nowrap rounded-lg border border-black/15 px-4 py-3 pr-10 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
    >
      <div className="flex flex-1 flex-col truncate">
        <div className="font-semibold">{title}</div>
        <div className="text-sm">{description}</div>
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/10 px-2 py-1 text-xs text-black dark:bg-white/10 dark:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="absolute right-2 top-1/2 size-5 -translate-y-1/2 fill-none stroke-current stroke-2"
      >
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          className="translate-x-3 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100"
        ></line>
        <polyline
          points="12 5 19 12 12 19"
          className="-translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
        ></polyline>
      </svg>
    </Link>
  );
}
