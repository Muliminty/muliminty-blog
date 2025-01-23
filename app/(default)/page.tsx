import ArrowCard from "@/components/ArrowCard";
import Container from "@/components/Container";
import Link from "@/components/Link";

import TagCloud from "@/components/TagCloud";
import { SITE, SOCIALS } from "@/lib/config";

import type { PostItem } from "@/lib/data/posts";
import { posts } from "@/lib/data/posts";
import projects from "@/lib/data/projects";

const homepagePosts = posts.slice(0, SITE.NUM_POSTS_ON_HOMEPAGE);
const homepageProjects = projects.slice(0, SITE.NUM_PROJECTS_ON_HOMEPAGE);

export default function HomePage() {
  return (
    <Container>
      <TagCloud />
      <aside data-pagefind-ignore>
        {/* <h1 className="font-semibold text-black dark:text-white">Muliminty Blog.</h1> */}
        <div className="space-y-16">
          <section>
            <article className="space-y-4">
              <span>
                <p>
                  欢迎来到我的技术博客！这里是我作为一名前端工程师记录学习、实践和思考的地方。我专注于分享前端开发中的技术细节、最佳实践以及解决问题的思路。
                </p>
                <p>
                  博客内容涵盖 <Link href="https://reactjs.org/">React</Link>、
                  <Link href="https://vuejs.org/">Vue</Link>、
                  <Link href="https://www.typescriptlang.org/">TypeScript</Link>{" "}
                  等主流技术栈，同时也会涉及一些前端工程化、性能优化和用户体验设计的经验。
                </p>
              </span>
              <span className="animate">
                <p>
                  我使用 <Link href="https://nextjs.org/">Next</Link>{" "}
                  构建了这个博客，它轻量、高效且支持 Markdown 和
                  MDX，非常适合技术内容的写作和分享。博客还集成了{" "}
                  <Link href="https://giscus.app/">Giscus</Link> 评论系统，方便大家交流讨论。
                </p>
              </span>
            </article>
          </section>

          <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">最新文章</h2>
              <Link href="/blog"> 查看所有文章 </Link>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {homepagePosts.map((post: PostItem, i: number) => (
                <li key={`post-${i}`}>
                  <ArrowCard {...post} />
                </li>
              ))}
            </ul>
          </section>

          {/* <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">最近的项目</h2>
              <Link href="/projects"> 查看所有项目 </Link>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {homepageProjects.map((project, i) => (
                <li key={`project-${i}`}>
                  <ArrowCard {...project} />
                </li>
              ))}
            </ul>
          </section> */}

          {/* <section className="animate space-y-4">
            <h2 className="font-semibold text-black dark:text-white">联系我</h2>
            <article>
              <p>
                If you want to get in touch with me about something or just to say hi, reach out on
                social media or send me an email.
              </p>
            </article>
            <ul className="not-prose flex flex-wrap gap-2">
              {SOCIALS.map((SOCIAL, i) => (
                <li key={`social-${i}`} className="flex gap-x-2 text-nowrap">
                  <Link href={SOCIAL.HREF} external aria-label={`${SITE.TITLE} on ${SOCIAL.NAME}`}>
                    {SOCIAL.NAME}
                  </Link>
                  {"/"}
                </li>
              ))}
              <li className="line-clamp-1">
                <Link href={`mailto:${SITE.EMAIL}`} aria-label={`Email ${SITE.TITLE}`}>
                  {SITE.EMAIL}
                </Link>
              </li>
            </ul>
          </section> */}
        </div>
      </aside>
    </Container>
  );
}
