import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import type { Issue, Label } from './types';

/**
 * 格式化日期
 */
export function formatDate(date: string | Date, formatStr = 'yyyy-MM-dd HH:mm') {
  return format(new Date(date), formatStr, { locale: zhCN });
}

/**
 * 相对时间格式化
 */
export function formatRelativeTime(date: string | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: zhCN,
  });
}

/**
 * 判断内容类型
 */
export function getContentType(issue: Issue): 'article' | 'tweet' | 'unknown' {
  const labelNames = issue.labels.nodes.map((l) => l.name.toLowerCase());

  if (labelNames.includes('article')) return 'article';
  if (labelNames.includes('tweet')) return 'tweet';

  return 'unknown';
}

/**
 * 获取阅读时间估算（分钟）
 * 中文按 400 字/分钟，英文按 200 词/分钟
 */
export function getReadingTime(content: string): number {
  // 统计中文字符
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  // 统计英文单词
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;

  const minutes = Math.ceil(chineseChars / 400 + englishWords / 200);
  return Math.max(1, minutes);
}

/**
 * 提取摘要
 * @param content - Markdown 内容
 * @param maxLength - 最大长度
 */
export function extractExcerpt(content: string, maxLength = 200): string {
  // 移除 Markdown 语法
  const plainText = content
    .replace(/#{1,6}\s/g, '') // 标题
    .replace(/\*\*(.+?)\*\*/g, '$1') // 粗体
    .replace(/\*(.+?)\*/g, '$1') // 斜体
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // 链接
    .replace(/`(.+?)`/g, '$1') // 行内代码
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/!\[.*?\]\(.*?\)/g, '') // 图片
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.slice(0, maxLength) + '...';
}

/**
 * 按颜色分组 Labels
 */
export function groupLabelsByColor(labels: Label[]) {
  return labels.reduce((acc, label) => {
    const color = label.color;
    if (!acc[color]) {
      acc[color] = [];
    }
    acc[color].push(label);
    return acc;
  }, {} as Record<string, Label[]>);
}

/**
 * 生成 SEO 友好的 slug
 */
export function generateSlug(title: string, number: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  return `${number}-${slug}`;
}

/**
 * 从 slug 提取 issue number
 */
export function extractIssueNumber(slug: string): number {
  const match = slug.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : 0;
}
