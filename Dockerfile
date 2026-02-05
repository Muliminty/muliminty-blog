# 多阶段构建 - 优化镜像大小

# 阶段 1: 依赖安装
FROM node:20-alpine AS deps
WORKDIR /app

# 复制 package 文件
COPY package.json package-lock.json* ./

# 安装依赖（使用国内镜像加速）
RUN npm config set registry https://registry.npmmirror.com && \
    npm ci --only=production

# 阶段 2: 构建应用
FROM node:20-alpine AS builder
WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 设置构建时环境变量（可选）
ARG GITHUB_TOKEN
ARG GITHUB_OWNER
ARG GITHUB_REPO
ENV GITHUB_TOKEN=$GITHUB_TOKEN
ENV GITHUB_OWNER=$GITHUB_OWNER
ENV GITHUB_REPO=$GITHUB_REPO

# 构建 Next.js 应用
RUN npm run build

# 阶段 3: 运行时镜像
FROM node:20-alpine AS runner
WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 设置文件权限
RUN chown -R nextjs:nodejs /app

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "server.js"]
