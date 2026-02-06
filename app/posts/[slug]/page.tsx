import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getIssue, getArticles } from '@/lib/github';
import { extractIssueNumber, formatDate, getReadingTime } from '@/lib/utils';
import { getRevalidateTime } from '@/lib/cache';

// ISR 配置：24小时重新验证
export const revalidate = getRevalidateTime('DETAIL');

// 生成静态路径
export async function generateStaticParams() {
  const data = await getArticles({ first: 50 });

  return data.nodes.map((issue) => ({
    slug: `${issue.number}-${issue.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')}`,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const issueNumber = extractIssueNumber(params.slug);

  // 如果无法提取有效的 issue number，返回默认 metadata
  if (!issueNumber || issueNumber === 0) {
    return {
      title: '文章未找到 - Muliminty Blog',
      description: '该文章不存在或已被删除',
    };
  }

  try {
    const issue = await getIssue(
      process.env.GITHUB_OWNER!,
      process.env.GITHUB_REPO!,
      issueNumber
    );

    if (!issue) {
      return {
        title: '文章未找到 - Muliminty Blog',
        description: '该文章不存在或已被删除',
      };
    }

    return {
      title: `${issue.title} - Muliminty Blog`,
      description: issue.body.slice(0, 160),
    };
  } catch (error) {
    return {
      title: '文章未找到 - Muliminty Blog',
      description: '该文章不存在或已被删除',
    };
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const issueNumber = extractIssueNumber(params.slug);

  if (!issueNumber) {
    notFound();
  }

  const issue = await getIssue(
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!,
    issueNumber
  );

  if (!issue) {
    notFound();
  }

  const readingTime = getReadingTime(issue.body);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Link href="/posts" style={{ color: '#0070f3', marginBottom: '2rem', display: 'inline-block' }}>
        ← 返回文章列表
      </Link>

      <article
        style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {/* 文章头部 */}
        <header style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.3' }}>
            {issue.title}
          </h1>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              fontSize: '0.875rem',
              color: '#666',
              marginBottom: '1rem',
            }}
          >
            <span>📅 {formatDate(issue.createdAt, 'yyyy-MM-dd HH:mm')}</span>
            <span>⏱️ {readingTime} 分钟阅读</span>
            <span>💬 {issue.comments.totalCount} 评论</span>
            <span>👍 {issue.reactions.totalCount} 反应</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {issue.labels.nodes
              .filter((label) => label.name !== 'article')
              .map((label) => (
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
        </header>

        {/* 文章内容 */}
        <div
          style={{
            lineHeight: '1.8',
            fontSize: '1rem',
            color: '#333',
          }}
          className="markdown-body"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {issue.body}
          </ReactMarkdown>
        </div>

        {/* 文章底部 */}
        <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img
              src={issue.author.avatarUrl}
              alt={issue.author.login}
              style={{ width: '48px', height: '48px', borderRadius: '50%' }}
            />
            <div>
              <div style={{ fontWeight: 'bold' }}>{issue.author.login}</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                发布于 {formatDate(issue.createdAt, 'yyyy-MM-dd')}
              </div>
            </div>
          </div>

          <a
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: '#24292e',
              color: 'white',
              borderRadius: '4px',
              fontSize: '0.875rem',
            }}
          >
            在 GitHub 上查看并评论
          </a>
        </footer>
      </article>

      {/* 评论区 */}
      {issue.comments.totalCount > 0 && (
        <section
          style={{
            marginTop: '2rem',
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ marginBottom: '1.5rem' }}>💬 评论 ({issue.comments.totalCount})</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {issue.comments.nodes.map((comment) => (
              <div
                key={comment.id}
                style={{
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <img
                    src={comment.author.avatarUrl}
                    alt={comment.author.login}
                    style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                      {comment.author.login}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                      {formatDate(comment.createdAt, 'yyyy-MM-dd HH:mm')}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#333' }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {comment.body}
                  </ReactMarkdown>
                </div>

                {comment.reactions.totalCount > 0 && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>
                    👍 {comment.reactions.totalCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
