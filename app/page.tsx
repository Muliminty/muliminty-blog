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

  return (
    <>
      {/* Hero 区域 */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            {/* 左侧头像 */}
            <div className="hero-avatar">
              <div className="avatar-circle">
                <span className="avatar-initial">M</span>
              </div>
            </div>
            {/* 右侧文字 */}
            <div className="hero-text">
              <p className="hero-greeting">Hello, I'm</p>
              <h1 className="hero-name">Muliminty</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 内容列表 */}
      <FeedList initialData={data} />
    </>
  );
}
