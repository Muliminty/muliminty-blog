import ArrowCard from "@/components/ArrowCard";
import Container from "@/components/Container";
import { postsByYear } from "@/lib/data/posts";

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const years = Array.from(postsByYear.keys()).sort((a, b) => b - a);

  return (
    <Container>
      <h1 className="mb-8 text-2xl font-bold">标签: {tag}</h1>
      <aside data-pagefind-ignore>
        <div className="space-y-10">
          <div className="space-y-4">
            {years
              .filter((year) => {
                const posts = postsByYear.get(year);
                return posts?.some((post) => post.metadata.tags?.includes(tag));
              })
              .map((year, i) => (
                <section key={`post-${i}`} className="animate space-y-4">
                  <div className="font-semibold text-black dark:text-white">{year}</div>
                  <div>
                    <ul className="not-prose flex flex-col gap-4">
                      {postsByYear
                        .get(year)
                        ?.filter((post) => post.metadata.tags?.includes(tag))
                        .map((post, i) => (
                          <li key={`post-card-${i}`}>
                            <ArrowCard {...post} />
                          </li>
                        ))}
                    </ul>
                  </div>
                </section>
              ))}
          </div>
        </div>
      </aside>
    </Container>
  );
}
