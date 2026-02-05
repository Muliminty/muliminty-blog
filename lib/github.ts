import { GraphQLClient } from 'graphql-request';
import type { Issue, IssuesConnection, IssuesQueryVariables } from './types';

// 初始化 GraphQL 客户端
const endpoint = 'https://api.github.com/graphql';

function getClient() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN is not configured');
  }

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// GraphQL 查询：获取 Issues 列表
const GET_ISSUES_QUERY = `
  query GetIssues(
    $owner: String!
    $repo: String!
    $labels: [String!]
    $first: Int = 10
    $after: String
    $orderBy: IssueOrder
  ) {
    repository(owner: $owner, name: $repo) {
      issues(
        first: $first
        after: $after
        labels: $labels
        orderBy: $orderBy
        states: OPEN
      ) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          id
          number
          title
          body
          bodyHTML
          createdAt
          updatedAt
          url
          author {
            login
            avatarUrl
            url
          }
          labels(first: 10) {
            nodes {
              id
              name
              color
              description
            }
          }
          reactions(first: 100) {
            totalCount
            nodes {
              content
              user {
                login
                avatarUrl
              }
            }
          }
          comments(first: 5, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              body
              createdAt
              author {
                login
                avatarUrl
                url
              }
              reactions(first: 50) {
                totalCount
                nodes {
                  content
                  user {
                    login
                    avatarUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL 查询：获取单个 Issue 详情
const GET_ISSUE_QUERY = `
  query GetIssue($owner: String!, $repo: String!, $number: Int!) {
    repository(owner: $owner, name: $repo) {
      issue(number: $number) {
        id
        number
        title
        body
        bodyHTML
        createdAt
        updatedAt
        url
        author {
          login
          avatarUrl
          url
        }
        labels(first: 10) {
          nodes {
            id
            name
            color
            description
          }
        }
        reactions(first: 100) {
          totalCount
          nodes {
            content
            user {
              login
              avatarUrl
            }
          }
        }
        comments(first: 100, orderBy: {field: UPDATED_AT, direction: ASC}) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            body
            createdAt
            author {
              login
              avatarUrl
              url
            }
            reactions(first: 50) {
              totalCount
              nodes {
                content
                user {
                  login
                  avatarUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * 获取 Issues 列表
 * @param variables - 查询参数
 * @returns Issues 列表数据
 */
export async function getIssues(
  variables: IssuesQueryVariables
): Promise<IssuesConnection> {
  const client = getClient();

  // 默认按创建时间倒序排列
  const queryVariables = {
    ...variables,
    orderBy: variables.orderBy || {
      field: 'CREATED_AT',
      direction: 'DESC',
    },
  };

  const data = await client.request<{
    repository: { issues: IssuesConnection };
  }>(GET_ISSUES_QUERY, queryVariables);

  return data.repository.issues;
}

/**
 * 获取单个 Issue 详情
 * @param owner - 仓库所有者
 * @param repo - 仓库名称
 * @param number - Issue 编号
 * @returns Issue 详情
 */
export async function getIssue(
  owner: string,
  repo: string,
  number: number
): Promise<Issue | null> {
  const client = getClient();

  const data = await client.request<{
    repository: { issue: Issue | null };
  }>(GET_ISSUE_QUERY, { owner, repo, number });

  return data.repository.issue;
}

/**
 * 获取文章列表（label: article）
 */
export async function getArticles(params?: {
  first?: number;
  after?: string | null;
}) {
  return getIssues({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    labels: ['article'],
    first: params?.first || 10,
    after: params?.after,
  });
}

/**
 * 获取动态列表（label: tweet）
 */
export async function getTweets(params?: {
  first?: number;
  after?: string | null;
}) {
  return getIssues({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    labels: ['tweet'],
    first: params?.first || 20,
    after: params?.after,
  });
}

/**
 * 获取所有内容（混合模式）
 */
export async function getAllContent(params?: {
  first?: number;
  after?: string | null;
}) {
  return getIssues({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    first: params?.first || 15,
    after: params?.after,
  });
}
