import Link from "@/components/Link";
import { posts } from "@/lib/data/posts";

export default function TagCloud() {
  const tags = posts.reduce(
    (acc, post) => {
      post.metadata.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <div className="my-8 animate">
      <h2 className="mb-4 text-xl font-semibold">标签</h2>
      <div className="flex flex-wrap gap-3">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/blog/tags/${encodeURIComponent(tag)}`}
            className="group relative inline-flex items-center rounded-full border border-black/15 px-3 py-1.5 text-sm no-underline transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
          >
            {tag}
            <span className="ml-1.5 rounded-full bg-black/10 px-1.5 py-0.5 text-xs text-black/60 dark:bg-white/10 dark:text-white/60">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
