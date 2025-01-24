import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并并优化类名
 * @param inputs 类名参数
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期为 "MM/DD/YYYY" 格式
 * @param date 日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric", // 年份
    month: "2-digit", // 月份，两位数
    day: "2-digit", // 日期，两位数
  }).format(date);
}

/**
 * 计算 HTML 内容的阅读时间
 * @param html HTML 字符串
 * @returns 阅读时间字符串，例如 "5 min read"
 */
export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, ""); // 去除 HTML 标签
  const wordCount = textOnly.split(/\s+/).length; // 计算单词数量
  const readingTimeMinutes = Math.ceil(wordCount / 200); // 按每分钟 200 词计算阅读时间
  return `${readingTimeMinutes} 分钟阅读`; // 返回阅读时间
}