import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { generateSlug } from '@/lib/utils';

interface ArticleCardProps {
  id: number;
  title: string;
  summary?: string;
  createdAt: string;
  labels: Array<{ name: string; color: string }>;
  reactions?: {
    thumbsUp: number;
    heart: number;
  };
  comments: number;
}

export default function ArticleCard({
  id,
  title,
  summary,
  createdAt,
  labels,
  reactions,
  comments,
}: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: zhCN,
  });

  // 生成 SEO 友好的 slug
  const slug = generateSlug(title, id);

  return (
    <Link href={`/posts/${slug}`}>
      <article className="card" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-sm)',
        height: '100%',
      }}>
        {/* 标题 */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          lineHeight: 1.4,
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-xs)',
        }}>
          {title}
        </h2>

        {/* 摘要 */}
        {summary && (
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {summary}
          </p>
        )}

        {/* 标签 */}
        {labels.length > 0 && (
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-xs)',
            flexWrap: 'wrap',
            marginTop: 'auto',
          }}>
            {labels.map((label) => (
              <span
                key={label.name}
                style={{
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: `#${label.color}20`,
                  color: `#${label.color}`,
                  border: `1px solid #${label.color}40`,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        )}

        {/* 元信息 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-md)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          paddingTop: 'var(--spacing-sm)',
          borderTop: '1px solid var(--border-color)',
        }}>
          <span>{timeAgo}</span>
          {reactions && (
            <>
              <span>👍 {reactions.thumbsUp}</span>
              <span>❤️ {reactions.heart}</span>
            </>
          )}
          <span>💬 {comments}</span>
        </div>
      </article>
    </Link>
  );
}
