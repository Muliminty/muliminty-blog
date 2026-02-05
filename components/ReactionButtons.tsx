'use client';

import { useState, useEffect } from 'react';
import {
  addReaction,
  removeReaction,
  getUserReactions,
  isAuthenticated,
} from '@/lib/auth';

/**
 * Reaction 按钮组件
 *
 * 功能：
 * 1. 显示所有 Reaction 类型和数量
 * 2. 高亮显示当前用户已点的 Reaction
 * 3. 点击添加/删除 Reaction
 * 4. 乐观更新 UI
 */

interface ReactionButtonProps {
  owner: string;
  repo: string;
  issueNumber: number;
  reactions: {
    totalCount: number;
    nodes: Array<{
      content: string;
      user: {
        login: string;
      };
    }>;
  };
}

// Reaction 类型映射
const REACTION_TYPES = {
  '+1': '👍',
  '-1': '👎',
  laugh: '😄',
  hooray: '🎉',
  confused: '😕',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
} as const;

type ReactionContent = keyof typeof REACTION_TYPES;

export default function ReactionButtons({
  owner,
  repo,
  issueNumber,
  reactions: initialReactions,
}: ReactionButtonProps) {
  const [reactions, setReactions] = useState(initialReactions);
  const [userReactions, setUserReactions] = useState<
    Array<{ id: number; content: string }>
  >([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      loadUserReactions();
    }
  }, []);

  async function loadUserReactions() {
    const data = await getUserReactions(owner, repo, issueNumber);
    setUserReactions(data);
  }

  // 统计每种 Reaction 的数量
  const reactionCounts = Object.keys(REACTION_TYPES).reduce((acc, type) => {
    acc[type as ReactionContent] = reactions.nodes.filter(
      (r) => r.content === type
    ).length;
    return acc;
  }, {} as Record<ReactionContent, number>);

  // 检查用户是否已点过某个 Reaction
  function hasUserReacted(content: string): boolean {
    return userReactions.some((r) => r.content === content);
  }

  // 获取用户的 Reaction ID
  function getUserReactionId(content: string): number | null {
    const reaction = userReactions.find((r) => r.content === content);
    return reaction?.id || null;
  }

  async function handleReaction(content: ReactionContent) {
    if (!isAuthenticated()) {
      alert('请先登录');
      return;
    }

    setLoading(content);

    try {
      const hasReacted = hasUserReacted(content);

      if (hasReacted) {
        // 删除 Reaction
        const reactionId = getUserReactionId(content);
        if (reactionId) {
          const success = await removeReaction(owner, repo, issueNumber, reactionId);
          if (success) {
            // 乐观更新
            setUserReactions((prev) =>
              prev.filter((r) => r.id !== reactionId)
            );
            setReactions((prev) => ({
              ...prev,
              totalCount: prev.totalCount - 1,
              nodes: prev.nodes.filter((_, i) => {
                // 简单处理：删除第一个匹配的
                const index = prev.nodes.findIndex((r) => r.content === content);
                return i !== index;
              }),
            }));
          }
        }
      } else {
        // 添加 Reaction
        const success = await addReaction(owner, repo, issueNumber, content);
        if (success) {
          // 乐观更新（实际 ID 需要重新获取，这里用临时 ID）
          setUserReactions((prev) => [
            ...prev,
            { id: Date.now(), content },
          ]);
          setReactions((prev) => ({
            ...prev,
            totalCount: prev.totalCount + 1,
            nodes: [
              ...prev.nodes,
              { content, user: { login: 'current_user' } },
            ],
          }));
        }
      }
    } catch (error) {
      console.error('Failed to handle reaction:', error);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        padding: '0.5rem 0',
      }}
    >
      {(Object.keys(REACTION_TYPES) as ReactionContent[]).map((type) => {
        const count = reactionCounts[type];
        const hasReacted = hasUserReacted(type);
        const isLoading = loading === type;

        return (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.25rem 0.5rem',
              fontSize: '0.875rem',
              background: hasReacted ? '#e3f2fd' : '#f5f5f5',
              border: hasReacted ? '1px solid #2196f3' : '1px solid #ddd',
              borderRadius: '12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>{REACTION_TYPES[type]}</span>
            {count > 0 && <span style={{ fontWeight: '500' }}>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
