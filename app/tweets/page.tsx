import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getTweets } from '@/lib/github';
import { formatRelativeTime } from '@/lib/utils';
import { getRevalidateTime } from '@/lib/cache';

// ISR 配置：30分钟重新验证（动态更新频繁）
export const revalidate = getRevalidateTime('TWEETS');

export const metadata = {
  title: '动态流 - Muliminty Blog',
  description: '碎片化思考与快速记录',
};

export default async function TweetsPage() {
  const data = await getTweets({ first: 30 });

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ color: '#1da1f2', marginBottom: '1rem', display: 'inline-block' }}>
          ← 返回首页
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💭 动态流</h1>
        <p style={{ color: '#666' }}>共 {data.totalCount} 条动态</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {data.nodes.map((issue) => (
          <article
            key={issue.id}
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              borderLeft: '3px solid #1da1f2',
            }}
          >
            {/* 头部信息 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src={issue.author.avatarUrl}
                alt={issue.author.login}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                  {issue.author.login}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>
                  {formatRelativeTime(issue.createdAt)}
                </div>
              </div>

              <a
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.75rem',
                  color: '#1da1f2',
                  padding: '0.25rem 0.5rem',
                  border: '1px solid #1da1f2',
                  borderRadius: '4px',
                }}
              >
                #{issue.number}
              </a>
            </div>

            {/* 标题（如果有） */}
            {issue.title && (
              <h2
                style={{
                  fontSize: '1.125rem',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                }}
              >
                {issue.title}
              </h2>
            )}

            {/* 内容 */}
            <div
              style={{
                fontSize: '0.9375rem',
                lineHeight: '1.6',
                color: '#333',
                marginBottom: '1rem',
              }}
              className="markdown-body"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {issue.body}
              </ReactMarkdown>
            </div>

            {/* 标签 */}
            {issue.labels.nodes.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {issue.labels.nodes
                  .filter((label) => label.name !== 'tweet')
                  .map((label) => (
                    <span
                      key={label.id}
                      style={{
                        padding: '0.25rem 0.5rem',
                        background: `#${label.color}20`,
                        color: `#${label.color}`,
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                      }}
                    >
                      #{label.name}
                    </span>
                  ))}
              </div>
            )}

            {/* 互动数据 */}
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                fontSize: '0.875rem',
                color: '#666',
                paddingTop: '0.75rem',
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <span>💬 {issue.comments.totalCount}</span>
              <span>👍 {issue.reactions.totalCount}</span>
            </div>
          </article>
        ))}
      </div>

      {data.pageInfo.hasNextPage && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>更多动态加载中...</p>
        </div>
      )}
    </div>
  );
}
