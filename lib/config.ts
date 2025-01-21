// 导入类型定义：Metadata, Site, Socials
// 这些类型可能定义在项目中的某个类型声明文件（如 `@/types` 模块）中
import type { Metadata, Site, Socials } from "@/types";

// 定义 SITE 常量，类型为 Site
// 该对象存储了网站的基本信息
export const SITE: Site = {
  TITLE: "muliminty", // 网站标题
  DESCRIPTION: "muliminty blog.", // 网站描述
  EMAIL: "muliminty@qq.com", // 联系邮箱
  NUM_POSTS_ON_HOMEPAGE: 5, // 首页显示的博客文章数量
  NUM_PROJECTS_ON_HOMEPAGE: 3, // 首页显示的项目数量
};

// 定义 HOME 常量，类型为 Metadata
// 该对象存储了首页的元数据信息
export const HOME: Metadata = {
  TITLE: "Home", // 首页标题
  DESCRIPTION: "muliminty 分享博客的地方.", // 首页描述
};

// 定义 BLOG 常量，类型为 Metadata
// 该对象存储了博客页面的元数据信息
export const BLOG: Metadata = {
  TITLE: "Blog", // 博客页面标题
  DESCRIPTION: "我感兴趣的话题的文章集。", // 博客页面描述
};

// 定义 PROJECTS 常量，类型为 Metadata
// 该对象存储了项目页面的元数据信息
export const PROJECTS: Metadata = {
  TITLE: "项目", // 项目页面标题
  DESCRIPTION: "我的项目集合，其中包含存储库和现场演示的链接。", // 项目页面描述
};

// 定义 SOCIALS 常量，类型为 Socials（一个数组）
// 该数组存储了社交媒体的链接信息
export const SOCIALS: Socials = [
  {
    NAME: "X (formerly Twitter)", // 社交媒体名称（X，原名 Twitter）
    HREF: "https://twitter.com/boogerbuttcheeks", // 社交媒体链接
  },
  {
    NAME: "GitHub", // 社交媒体名称（GitHub）
    HREF: "https://github.com/trevortylerlee", // 社交媒体链接
  },
  {
    NAME: "LinkedIn", // 社交媒体名称（LinkedIn）
    HREF: "https://www.linkedin.com/in/trevortylerlee", // 社交媒体链接
  },
];
