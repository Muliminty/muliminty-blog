export const metadata = {
  title: '关于 - Muliminty Blog',
  description: '关于我和这个博客',
};

export default function AboutPage() {
  return (
    <div className="container-narrow" style={{
      paddingTop: 'var(--spacing-xl)',
      paddingBottom: 'var(--spacing-xl)',
    }}>
      {/* 个人信息 */}
      <div className="card" style={{
        textAlign: 'center',
        marginBottom: 'var(--spacing-lg)',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto var(--spacing-md)',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--neon-green) 0%, #00cc33 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
        }}>
          ✨
        </div>

        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: 'var(--spacing-sm)',
        }}>
          Muliminty
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-md)',
        }}>
          Another day another bug
        </p>

        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          justifyContent: 'center',
        }}>
          <a
            href="https://github.com/muliminty"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            GitHub
          </a>
          <a
            href="https://github.com/muliminty/muliminty-blog/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            留言
          </a>
        </div>
      </div>

      {/* 关于博客 */}
      <div className="card">
        <h2 style={{
          fontSize: '1.25rem',
          marginBottom: 'var(--spacing-md)',
          color: 'var(--neon-green)',
        }}>
          关于这个博客
        </h2>
        <div style={{
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          fontSize: '0.95rem',
        }}>
          <p style={{ marginBottom: 'var(--spacing-sm)' }}>
            基于 <code>GitHub Issues</code> 的个人博客，所有内容存储在 GitHub 上。
          </p>
          <p>
            使用 Next.js 14 + TypeScript 构建，采用暗黑主题设计。
          </p>
        </div>
      </div>
    </div>
  );
}
