'use client';

import { useState } from 'react';
import { createComment, isAuthenticated } from '@/lib/auth';

/**
 * 评论输入组件
 *
 * 功能：
 * 1. Markdown 编辑器
 * 2. 提交评论到 GitHub
 * 3. 提交成功后刷新页面
 */

interface CommentInputProps {
  owner: string;
  repo: string;
  issueNumber: number;
}

export default function CommentInput({
  owner,
  repo,
  issueNumber,
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isAuthenticated()) {
      alert('请先登录');
      return;
    }

    if (!content.trim()) {
      alert('请输入评论内容');
      return;
    }

    setLoading(true);

    try {
      const success = await createComment(owner, repo, issueNumber, content);

      if (success) {
        alert('评论成功！页面将刷新以显示新评论');
        setContent('');
        // 刷新页面以显示新评论
        window.location.reload();
      } else {
        alert('评论失败，请重试');
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert('评论失败，请重试');
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated()) {
    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          background: '#f8f9fa',
          borderRadius: '8px',
          color: '#666',
        }}
      >
        <p>登录后即可评论</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {/* 工具栏 */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '0.5rem',
            background: '#f8f9fa',
            borderBottom: '1px solid #ddd',
          }}
        >
          <button
            type="button"
            onClick={() => setPreview(false)}
            style={{
              padding: '0.25rem 0.75rem',
              fontSize: '0.875rem',
              background: !preview ? 'white' : 'transparent',
              border: !preview ? '1px solid #ddd' : 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            编辑
          </button>
          <button
            type="button"
            onClick={() => setPreview(true)}
            style={{
              padding: '0.25rem 0.75rem',
              fontSize: '0.875rem',
              background: preview ? 'white' : 'transparent',
              border: preview ? '1px solid #ddd' : 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            预览
          </button>
        </div>

        {/* 编辑区 */}
        {!preview ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="支持 Markdown 语法..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              border: 'none',
              outline: 'none',
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        ) : (
          <div
            style={{
              minHeight: '120px',
              padding: '1rem',
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              color: '#333',
            }}
          >
            {content || '暂无内容'}
          </div>
        )}
      </div>

      {/* 提交按钮 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '0.75rem',
        }}
      >
        <button
          type="submit"
          disabled={loading || !content.trim()}
          style={{
            padding: '0.5rem 1.5rem',
            fontSize: '0.875rem',
            background: loading || !content.trim() ? '#ccc' : '#2ea44f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading || !content.trim() ? 'not-allowed' : 'pointer',
            fontWeight: '500',
          }}
        >
          {loading ? '提交中...' : '发表评论'}
        </button>
      </div>

      {/* 提示 */}
      <div
        style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#666',
        }}
      >
        支持 Markdown 语法。评论将同步到 GitHub Issue。
      </div>
    </form>
  );
}
