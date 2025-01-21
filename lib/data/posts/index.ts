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

const postsByYear = groupPostsByYear(posts);
const postsBySlug = groupPostsBySlug(posts);

export { posts, postsByYear, postsBySlug };
