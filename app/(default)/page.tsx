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
      <aside data-pagefind-ignore>
        {/* <h1 className="font-semibold text-black dark:text-white">Muliminty Blog.</h1> */}
        <div className="space-y-16">
          <section>
            <article className="space-y-4">
              <span>
                <p>
                  你好，欢迎来到我的技术博客！这里是我作为前端开发者记录和分享技术心得的地方，希望能为你带来一些启发和帮助。
                </p>
                <p>
                  我会分享一些关于 <Link href="https://reactjs.org/">React</Link>、
                  <Link href="https://vuejs.org/">Vue</Link>、
                  <Link href="https://www.typescriptlang.org/">TypeScript</Link>{" "}
                  的内容，偶尔也会聊聊前端工程化、性能优化和用户体验设计。
                </p>
              </span>
              <span className="animate">
                <p>
                  这个博客是用 <Link href="https://nextjs.org/">Next.js</Link> 搭建的，支持 Markdown
                  和 MDX，写技术文章非常方便。我还接入了{" "}
                  <Link href="https://giscus.app/">Giscus</Link>{" "}
                  评论系统，欢迎你留下宝贵的意见或问题！
                </p>
              </span>
            </article>
          </section>

          <TagCloud />

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
