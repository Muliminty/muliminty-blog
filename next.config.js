/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 React 严格模式
  reactStrictMode: true,

  // 图片优化配置 - GitHub 头像等
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
  },

  // 环境变量
  env: {
    GITHUB_OWNER: process.env.GITHUB_OWNER,
    GITHUB_REPO: process.env.GITHUB_REPO,
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  },

  // 输出配置 - Docker 部署使用 standalone
  output: 'standalone',
}

module.exports = nextConfig
