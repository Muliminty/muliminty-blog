import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
