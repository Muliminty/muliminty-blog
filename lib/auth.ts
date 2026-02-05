/**
 * GitHub OAuth 认证工具
 *
 * 设计思路：
 * 1. 使用 GitHub OAuth App 进行用户认证
 * 2. 获取 access_token 后存储在 localStorage
 * 3. 使用 token 调用 GitHub API 进行评论和点赞
 */

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  email: string;
}

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '';
const STORAGE_KEY = 'github_token';

/**
 * 获取 OAuth 授权 URL
 */
export function getOAuthUrl(): string {
  const redirectUri = `${window.location.origin}/api/auth/callback`;
  const scope = 'public_repo'; // 需要写权限来评论和点赞

  return `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}`;
}

/**
 * 保存 token 到 localStorage
 */
export function saveToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, token);
  }
}

/**
 * 获取保存的 token
 */
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY);
  }
  return null;
}

/**
 * 清除 token
 */
export function clearToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * 检查是否已登录
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser(): Promise<GitHubUser | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Token 可能过期，清除
      clearToken();
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
}

/**
 * 添加 Reaction
 */
export async function addReaction(
  owner: string,
  repo: string,
  issueNumber: number,
  content: string
): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/reactions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.squirrel-girl-preview+json',
        },
        body: JSON.stringify({ content }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Failed to add reaction:', error);
    return false;
  }
}

/**
 * 删除 Reaction
 */
export async function removeReaction(
  owner: string,
  repo: string,
  issueNumber: number,
  reactionId: number
): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/reactions/${reactionId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.squirrel-girl-preview+json',
        },
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Failed to remove reaction:', error);
    return false;
  }
}

/**
 * 创建评论
 */
export async function createComment(
  owner: string,
  repo: string,
  issueNumber: number,
  body: string
): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Failed to create comment:', error);
    return false;
  }
}

/**
 * 获取用户在某个 Issue 上的 Reactions
 */
export async function getUserReactions(
  owner: string,
  repo: string,
  issueNumber: number
): Promise<Array<{ id: number; content: string }>> {
  const token = getToken();
  if (!token) return [];

  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/reactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.squirrel-girl-preview+json',
        },
      }
    );

    if (!response.ok) return [];

    const reactions = await response.json();
    return reactions
      .filter((r: any) => r.user.login === user.login)
      .map((r: any) => ({ id: r.id, content: r.content }));
  } catch (error) {
    console.error('Failed to get user reactions:', error);
    return [];
  }
}
