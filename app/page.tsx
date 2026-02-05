import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Muliminty Blog</h1>
      <p style={{ margin: '1rem 0', color: '#666' }}>
        基于 GitHub Issues 的个人博客
      </p>

      <nav style={{ marginTop: '2rem' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li>
            <Link
              href="/posts"
              style={{
                padding: '0.5rem 1rem',
                background: '#0070f3',
                color: 'white',
                borderRadius: '4px',
                display: 'inline-block',
              }}
            >
              📝 文章列表
            </Link>
          </li>
          <li>
            <Link
              href="/tweets"
              style={{
                padding: '0.5rem 1rem',
                background: '#1da1f2',
                color: 'white',
                borderRadius: '4px',
                display: 'inline-block',
              }}
            >
              💭 动态流
            </Link>
          </li>
        </ul>
      </nav>

      <section style={{ marginTop: '3rem', lineHeight: '1.8' }}>
        <h2>快速开始</h2>
        <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
          <li>配置 .env.local 文件（参考 .env.local.example）</li>
          <li>在 GitHub 仓库创建 Issue，添加 label: article 或 tweet</li>
          <li>刷新页面查看内容</li>
        </ol>
      </section>
    </main>
  );
}
