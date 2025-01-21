// import post00, { metadata as metadata00 } from "./00-micro-changelog/index.mdx";
// import post01, { metadata as metadata01 } from "./01-getting-started/index.mdx";
// import post02, { metadata as metadata02 } from "./02-blog-collection/index.mdx";
// import post03, { metadata as metadata03 } from "./03-projects-collection/index.mdx";
// import post04, { metadata as metadata04 } from "./04-markdown-syntax/index.mdx";
// import post05, { metadata as metadata05 } from "./05-mdx-syntax/index.mdx";
// import post06, { metadata as metadata06 } from "./06-year-sorting-example/index.mdx";
// import post07, { metadata as metadata07 } from "./07-draft-example/index.mdx";
// import post08, { metadata as metadata08 } from "./08-prev-next-order-example/index.mdx";

// const posts = [
//   { Component: post00, metadata: metadata00 },
//   { Component: post01, metadata: metadata01 },
//   { Component: post02, metadata: metadata02 },
//   { Component: post03, metadata: metadata03 },
//   { Component: post04, metadata: metadata04 },
//   { Component: post05, metadata: metadata05 },
//   { Component: post06, metadata: metadata06 },
//   { Component: post07, metadata: metadata07 },
//   { Component: post08, metadata: metadata08 },
// ]
//   .filter(({ metadata: { draft } }) => !draft)
//   .sort(
//     ({ metadata: { date: a } }, { metadata: { date: b } }) =>
//       new Date(b).getTime() - new Date(a).getTime()
//   );

// export type PostItem = (typeof posts)[number];

// export const postsByYear: Map<number, Array<PostItem>> = posts.reduce((map, post) => {
//   const year = new Date(post.metadata.date).getFullYear();
//   return map.set(year, (map.get(year) ?? []).concat(post));
// }, new Map<number, Array<PostItem>>());

// export const postsBySlug: Map<string, PostItem> = posts.reduce((map, post) => {
//   const encodedSlug = encodeURIComponent(post.metadata.slug);
//   const decodedSlug = decodeURIComponent(encodedSlug) || post.metadata.title;
//   return map.set(decodedSlug, {
//     ...post,
//     metadata: {
//       ...post.metadata,
//       originalSlug: post.metadata.slug,
//       slug: decodedSlug,
//     },
//   });
// }, new Map());

// export default posts;

// lib/data/posts.ts

// 使用 require.context 动态导入所有 MDX 文件
const postModules = require.context("./", true, /index\.mdx$/);

// 生成 posts 数组
const posts = postModules
  .keys()
  .map((key) => {
    const module = postModules(key);
    return {
      Component: module.default,
      metadata: module.metadata,
    };
  })
  .filter(({ metadata: { draft } }) => !draft)
  .sort(
    ({ metadata: { date: a } }, { metadata: { date: b } }) =>
      new Date(b).getTime() - new Date(a).getTime()
  );

// 定义 PostItem 类型
export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  collection: string;
  slug: string;
  tags?: string[];
  draft?: boolean;
  content?: string;
}

export type PostItem = {
  Component: React.ComponentType;
  metadata: PostMetadata;
};

// 工具函数：按年份分组
function groupPostsByYear(posts: PostItem[]): Map<number, PostItem[]> {
  return posts.reduce((map, post) => {
    const year = new Date(post.metadata.date).getFullYear();
    return map.set(year, (map.get(year) ?? []).concat(post));
  }, new Map<number, PostItem[]>());
}

// 工具函数：按 slug 分组
function groupPostsBySlug(posts: PostItem[]): Map<string, PostItem> {
  return posts.reduce((map, post) => {
    const encodedSlug = encodeURIComponent(post.metadata.slug);
    const decodedSlug = decodeURIComponent(encodedSlug) || post.metadata.title;
    return map.set(decodedSlug, {
      ...post,
      metadata: {
        ...post.metadata,
        originalSlug: post.metadata.slug,
        slug: decodedSlug,
      },
    });
  }, new Map());
}

// 导出分组数据
export const postsByYear = groupPostsByYear(posts);
export const postsBySlug = groupPostsBySlug(posts);

// 导出 posts 数组
export default posts;
