'use client';

import { useInView } from 'react-intersection-observer';
import FeedItem from './FeedItem';

interface FeedListProps {
  initialData: {
    nodes: Array<{
      id: string;
      number: number;
      title: string;
      body: string;
      createdAt: string;
      labels: {
        nodes: Array<{
          id: string;
          name: string;
          color: string;
        }>;
      };
      reactions: {
        totalCount: number;
        nodes: Array<{
          content: string;
        }>;
      };
      comments: {
        totalCount: number;
      };
    }>;
    totalCount: number;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export default function FeedList({ initialData }: FeedListProps) {
  return (
    <div className="container-narrow" style={{
      paddingTop: 'var(--spacing-lg)',
      paddingBottom: 'var(--spacing-xl)',
    }}>
      {/* 列表 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
      }}>
        {initialData.nodes.map((item, index) => (
          <FeedItemWrapper key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* 空状态 */}
      {initialData.nodes.length === 0 && (
        <div className="card" style={{
          textAlign: 'center',
          padding: 'var(--spacing-xl)',
        }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            暂无内容，去 GitHub Issues 创建第一篇吧 ✨
          </p>
        </div>
      )}
    </div>
  );
}

// 包装组件，处理滚动动画
function FeedItemWrapper({ item, index }: { item: any; index: number }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    delay: index * 50, // 错开动画时间
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <FeedItem item={item} />
    </div>
  );
}
