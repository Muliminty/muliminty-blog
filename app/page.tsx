import { getAllContent } from '@/lib/github';
import { getRevalidateTime } from '@/lib/cache';
import FeedList from '@/components/FeedList';

// ISR 配置：1小时重新验证
export const revalidate = getRevalidateTime('LIST');

export const metadata = {
  title: 'Muliminty Blog',
  description: '基于 GitHub Issues 的个人博客',
};

export default async function HomePage() {
  // 获取所有内容（文章 + 动态）
  const data = await getAllContent({ first: 50 });

  return <FeedList initialData={data} />;
}
