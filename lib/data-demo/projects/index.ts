// import project1, { metadata as metadata1 } from "./project-1/index.mdx";
// import project2, { metadata as metadata2 } from "./project-2/index.mdx";
// import project3, { metadata as metadata3 } from "./project-3/index.mdx";
// import project4, { metadata as metadata4 } from "./project-4/index.mdx";

// import type { PostItem } from "@/lib/data/posts";

// export interface ProjectItem extends PostItem {
//   demo: string;
//   repo: string;
// }

// const projects = [
//   { Component: project1, metadata: metadata1 },
//   { Component: project2, metadata: metadata2 },
//   { Component: project3, metadata: metadata3 },
//   { Component: project4, metadata: metadata4 },
// ]
//   .filter(({ metadata: { draft } }) => !draft)
//   .sort(
//     ({ metadata: { date: a } }, { metadata: { date: b } }) =>
//       new Date(b).getTime() - new Date(a).getTime()
//   ) as Array<ProjectItem>;

// export const projectsByYear: Map<number, ProjectItem> = projects.reduce(
//   (map, post) => map.set(new Date(post.metadata.date).getFullYear(), post),
//   new Map()
// );

// export const projectsBySlug: Map<string, ProjectItem> = projects.reduce(
//   (map, post) => map.set(post.metadata.slug, post),
//   new Map()
// );

// export default projects as Array<ProjectItem>;
// 使用 require.context 动态导入所有 MDX 文件
const projectModules = require.context("./", true, /index\.mdx$/);

// 定义 ProjectItem 类型
export interface ProjectItem extends PostItem {
  demo: string;
  repo: string;
}

// 生成 projects 数组
const projects = projectModules
  .keys()
  .map((key) => {
    const module = projectModules(key);
    return {
      Component: module.default,
      metadata: module.metadata,
    };
  })
  .filter(({ metadata: { draft } }) => !draft) // 过滤掉草稿
  .sort(
    ({ metadata: { date: a } }, { metadata: { date: b } }) =>
      new Date(b).getTime() - new Date(a).getTime() // 按日期排序
  ) as Array<ProjectItem>;

// 工具函数：按年份分组
function groupProjectsByYear(projects: ProjectItem[]): Map<number, ProjectItem[]> {
  return projects.reduce((map, project) => {
    const year = new Date(project.metadata.date).getFullYear();
    return map.set(year, (map.get(year) ?? []).concat(project));
  }, new Map<number, ProjectItem[]>());
}

// 工具函数：按 slug 分组
function groupProjectsBySlug(projects: ProjectItem[]): Map<string, ProjectItem> {
  return projects.reduce((map, project) => {
    const encodedSlug = encodeURIComponent(project.metadata.slug);
    const decodedSlug = decodeURIComponent(encodedSlug) || project.metadata.title;
    return map.set(decodedSlug, {
      ...project,
      metadata: {
        ...project.metadata,
        originalSlug: project.metadata.slug,
        slug: decodedSlug,
      },
    });
  }, new Map());
}

// 导出分组数据
export const projectsByYear = groupProjectsByYear(projects);
export const projectsBySlug = groupProjectsBySlug(projects);

// 导出 projects 数组
export default projects;
