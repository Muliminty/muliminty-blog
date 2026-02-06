import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { extractExcerpt, generateSlug } from '@/lib/utils';

export default function FeedItem({ item }: { item: any }) {
  const timeAgo = formatDistanceToNow(new Date(item.createdAt), {
    addSuffix: true,
    locale: zhCN,
  });

  const excerpt = extractExcerpt(item.body);
  const slug = generateSlug(item.title, item.number);
  const isTweet = item.labels.nodes.some((l: any) => l.name.toLowerCase() === 'tweet');

  // 计算 reactions 统计
  const thumbsUp = item.reactions.nodes.filter((r: any) => r.content === 'THUMBS_UP').length;
  const heart = item.reactions.nodes.filter((r: any) => r.content === 'HEART').length;

  return (
    <Link href={`/posts/${slug}`}>
      <article className="card" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-sm)',
      }}>
        {/* 标题 */}
        <h2 style={{
          fontSize: isTweet ? '1.1rem' : '1.25rem',
          fontWeight: 600,
          lineHeight: 1.4,
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-xs)',
        }}>
          {item.title}
        </h2>

        {/* 摘要 */}
        {excerpt && (
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: isTweet ? 3 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {excerpt}
          </p>
        )}

        {/* 标签 */}
        {item.labels.nodes.length > 0 && (
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-xs)',
            flexWrap: 'wrap',
            marginTop: 'auto',
          }}>
            {item.labels.nodes
              .filter((label: any) => !['article', 'tweet'].includes(label.name.toLowerCase()))
              .map((label: any) => (
                <span
                  key={label.id}
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
          {thumbsUp > 0 && <span>👍 {thumbsUp}</span>}
          {heart > 0 && <span>❤️ {heart}</span>}
          <span>💬 {item.comments.totalCount}</span>
          {isTweet && (
            <span style={{
              marginLeft: 'auto',
              color: 'var(--neon-green)',
              fontSize: '0.75rem',
            }}>
              动态
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
