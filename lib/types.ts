// GitHub Issues 相关类型定义

export type ContentType = 'article' | 'tweet';

// Reaction 类型
export type ReactionType = 'THUMBS_UP' | 'THUMBS_DOWN' | 'LAUGH' | 'HOORAY' | 'CONFUSED' | 'HEART' | 'ROCKET' | 'EYES';

export interface ReactionGroup {
  totalCount: number;
  nodes: Array<{
    content: ReactionType;
    user: {
      login: string;
      avatarUrl: string;
    };
  }>;
}

// Label 类型
export interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
}

// User 类型
export interface User {
  login: string;
  avatarUrl: string;
  url: string;
}

// Comment 类型
export interface Comment {
  id: string;
  body: string;
  createdAt: string;
  author: User;
  reactions: ReactionGroup;
}

export interface CommentConnection {
  totalCount: number;
  nodes: Comment[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

// Issue 类型（对应博客内容）
export interface Issue {
  id: string;
  number: number;
  title: string;
  body: string;
  bodyHTML: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  labels: {
    nodes: Label[];
  };
  reactions: ReactionGroup;
  comments: CommentConnection;
  url: string;
}

// 分页信息
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

// Issues 查询结果
export interface IssuesConnection {
  totalCount: number;
  nodes: Issue[];
  pageInfo: PageInfo;
}

// GraphQL 查询变量
export interface IssuesQueryVariables {
  owner: string;
  repo: string;
  labels?: string[];
  first?: number;
  after?: string | null;
  orderBy?: {
    field: 'CREATED_AT' | 'UPDATED_AT';
    direction: 'ASC' | 'DESC';
  };
}

// 内容分类配置
export const CONTENT_LABELS = {
  ARTICLE: 'article',  // 长文章
  TWEET: 'tweet',      // 短动态
} as const;
