export default function LoadingSkeleton() {
  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xl)' }}>
      {/* 加载提示 */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'var(--spacing-xl)',
      }}>
        <div className="animate-spin" style={{
          width: '40px',
          height: '40px',
          margin: '0 auto var(--spacing-md)',
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--neon-green)',
          borderRadius: '50%',
        }} />
        <p className="animate-pulse" style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
        }}>
          加载中...
        </p>
      </div>

      {/* 骨架屏卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 'var(--spacing-md)',
      }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card animate-pulse">
            {/* 标题骨架 */}
            <div style={{
              height: '24px',
              background: 'var(--bg-hover)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 'var(--spacing-sm)',
            }} />

            {/* 内容骨架 */}
            <div style={{
              height: '16px',
              background: 'var(--bg-hover)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 'var(--spacing-xs)',
              width: '90%',
            }} />
            <div style={{
              height: '16px',
              background: 'var(--bg-hover)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 'var(--spacing-md)',
              width: '70%',
            }} />

            {/* 标签骨架 */}
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-xs)',
              marginBottom: 'var(--spacing-md)',
            }}>
              <div style={{
                height: '20px',
                width: '60px',
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-sm)',
              }} />
              <div style={{
                height: '20px',
                width: '80px',
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-sm)',
              }} />
            </div>

            {/* 元信息骨架 */}
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              paddingTop: 'var(--spacing-sm)',
              borderTop: '1px solid var(--border-color)',
            }}>
              <div style={{
                height: '14px',
                width: '60px',
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-sm)',
              }} />
              <div style={{
                height: '14px',
                width: '40px',
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-sm)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
