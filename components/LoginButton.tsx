'use client';

import { useEffect, useState } from 'react';
import {
  getOAuthUrl,
  getCurrentUser,
  saveToken,
  clearToken,
  isAuthenticated,
  type GitHubUser,
} from '@/lib/auth';

/**
 * 登录组件
 *
 * 功能：
 * 1. 显示登录/登出按钮
 * 2. 显示用户头像和名称
 * 3. 处理 OAuth 回调后的 token 保存
 */

export default function LoginButton() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查 URL 中是否有 token（OAuth 回调）
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      saveToken(token);
      // 清除 URL 中的 token
      window.history.replaceState({}, '', window.location.pathname);
    }

    // 加载用户信息
    loadUser();
  }, []);

  async function loadUser() {
    setLoading(true);
    if (isAuthenticated()) {
      const userData = await getCurrentUser();
      setUser(userData);
    }
    setLoading(false);
  }

  function handleLogin() {
    // 保存当前页面地址，登录后返回
    const returnUrl = window.location.pathname;
    window.location.href = getOAuthUrl() + `&state=${returnUrl}`;
  }

  function handleLogout() {
    clearToken();
    setUser(null);
  }

  if (loading) {
    return (
      <div style={{ padding: '0.5rem 1rem', color: '#666' }}>
        加载中...
      </div>
    );
  }

  if (user) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem',
        }}
      >
        <img
          src={user.avatar_url}
          alt={user.login}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
          }}
        />
        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
          {user.name || user.login}
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.25rem 0.75rem',
            fontSize: '0.875rem',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          登出
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      style={{
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        background: '#24292e',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <svg
        height="16"
        width="16"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
      使用 GitHub 登录
    </button>
  );
}
