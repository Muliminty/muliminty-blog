import Link from 'next/link';
import { getArticles } from '@/lib/github';
import { formatDate, extractExcerpt, getReadingTime, generateSlug } from '@/lib/utils';
import { getRevalidateTime } from '@/lib/cache';

// ISR 配置：1小时重新验证
export const revalidate = getRevalidateTime('LIST');

export const metadata = {
  title: '文章列表 - Muliminty Blog',
  description: '技术文章与深度思考',
};

export default async function PostsPage() {
  const data = await getArticles({ first: 20 });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ color: '#0070f3', marginBottom: '1rem', display: 'inline-block' }}>
          ← 返回首页
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📝 文章列表</h1>
        <p style={{ color: '#666' }}>共 {data.totalCount} 篇文章</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {data.nodes.map((issue) => {
          const slug = generateSlug(issue.title, issue.number);
          const excerpt = extractExcerpt(issue.body);
          const readingTime = getReadingTime(issue.body);

          return (
            <article
              key={issue.id}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Link href={`/posts/${slug}`}>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem',
                    color: '#111',
                    cursor: 'pointer',
                  }}
                >
                  {issue.title}
                </h2>
              </Link>

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: '#666',
                  marginBottom: '1rem',
                }}
              >
                <span>📅 {formatDate(issue.createdAt, 'yyyy-MM-dd')}</span>
                <span>⏱️ {readingTime} 分钟阅读</span>
                <span>💬 {issue.comments.totalCount} 评论</span>
                <span>👍 {issue.reactions.totalCount} 反应</span>
              </div>

              <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '1rem' }}>
                {excerpt}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {issue.labels.nodes.map((label) => (
                  <span
                    key={label.id}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: `#${label.color}20`,
                      color: `#${label.color}`,
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                    }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {data.pageInfo.hasNextPage && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>更多内容加载中...</p>
        </div>
      )}
    </div>
  );
}
