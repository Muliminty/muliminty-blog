/**
 * Next.js ISR 缓存配置
 *
 * 设计思路：
 * 1. 列表页使用较短的 revalidate 时间（1小时），保证新内容及时展示
 * 2. 详情页使用较长的 revalidate 时间（24小时），减少 API 调用
 * 3. 使用 on-demand revalidation 在 GitHub Webhook 触发时主动刷新
 */

// 缓存时间配置（秒）
export const CACHE_CONFIG = {
  // 列表页：1小时
  LIST: 3600,
  // 详情页：24小时
  DETAIL: 86400,
  // 动态流：30分钟（更新频繁）
  TWEETS: 1800,
} as const;

/**
 * 获取 revalidate 时间
 * @param type - 页面类型
 * @returns revalidate 秒数
 */
export function getRevalidateTime(
  type: keyof typeof CACHE_CONFIG
): number {
  return CACHE_CONFIG[type];
}

/**
 * 生成缓存标签
 * 用于 Next.js 的 revalidateTag
 */
export function getCacheTags(params: {
  type: 'article' | 'tweet' | 'all';
  id?: string;
}) {
  const tags: string[] = [`content-${params.type}`];

  if (params.id) {
    tags.push(`content-${params.id}`);
  }

  return tags;
}
