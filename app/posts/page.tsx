import { getArticles } from '@/lib/github';
import { extractExcerpt } from '@/lib/utils';
import { getRevalidateTime } from '@/lib/cache';
import ArticleCard from '@/components/ArticleCard';

// ISR 配置：1小时重新验证
export const revalidate = getRevalidateTime('LIST');

export const metadata = {
  title: '文章列表 - Muliminty Blog',
  description: '技术文章与深度思考',
};

export default async function PostsPage() {
  const data = await getArticles({ first: 20 });

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
      {/* 页面头部 */}
      <header style={{
        marginBottom: 'var(--spacing-xl)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--text-primary)',
        }}>
          📝 文章列表
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
        }}>
          共 <span className="text-neon">{data.totalCount}</span> 篇文章
        </p>
      </header>

      {/* 文章网格 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 'var(--spacing-md)',
      }}>
        {data.nodes.map((issue) => {
          const excerpt = extractExcerpt(issue.body);

          return (
            <ArticleCard
              key={issue.id}
              id={issue.number}
              title={issue.title}
              summary={excerpt}
              createdAt={issue.createdAt}
              labels={issue.labels.nodes.map((label) => ({
                name: label.name,
                color: label.color,
              }))}
              reactions={{
                thumbsUp: issue.reactions.nodes.filter((r: any) => r.content === 'THUMBS_UP').length,
                heart: issue.reactions.nodes.filter((r: any) => r.content === 'HEART').length,
              }}
              comments={issue.comments.totalCount}
            />
          );
        })}
      </div>

      {/* 加载更多提示 */}
      {data.pageInfo.hasNextPage && (
        <div style={{
          marginTop: 'var(--spacing-xl)',
          textAlign: 'center',
        }}>
          <div className="animate-pulse" style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
          }}>
            更多内容加载中...
          </div>
        </div>
      )}

      {/* 空状态 */}
      {data.nodes.length === 0 && (
        <div className="card" style={{
          textAlign: 'center',
          padding: 'var(--spacing-xl)',
        }}>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
          }}>
            暂无文章，去 GitHub Issues 创建第一篇吧 ✨
          </p>
        </div>
      )}
    </div>
  );
}
