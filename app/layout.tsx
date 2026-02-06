import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import ProgressBar from '@/components/ProgressBar';

export const metadata: Metadata = {
  title: 'Muliminty Blog',
  description: '基于 GitHub Issues 的个人博客',
  keywords: ['博客', '技术', 'GitHub Issues'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ProgressBar />
        <Navigation />
        <main style={{ minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </main>
        <footer className="backdrop-blur" style={{
          borderTop: '1px solid var(--border-color)',
          padding: 'var(--spacing-lg) 0',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
        }}>
          <div className="container">
            <p>© 2026 Muliminty Blog. Powered by GitHub Issues.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
