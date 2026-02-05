#!/bin/bash

# 博客部署脚本
# 用途：一键构建和部署 Docker 容器

set -e  # 遇到错误立即退出

echo "🚀 开始部署 Muliminty Blog..."

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "❌ 错误：未找到 .env 文件"
    echo "请复制 .env.local.example 为 .env 并配置环境变量"
    exit 1
fi

# 加载环境变量
export $(cat .env | grep -v '^#' | xargs)

# 检查必要的环境变量
if [ -z "$GITHUB_TOKEN" ] || [ -z "$GITHUB_OWNER" ] || [ -z "$GITHUB_REPO" ]; then
    echo "❌ 错误：缺少必要的环境变量"
    echo "请确保 .env 文件中配置了 GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO"
    exit 1
fi

echo "✅ 环境变量检查通过"

# 停止并删除旧容器
echo "🛑 停止旧容器..."
docker-compose down

# 构建新镜像
echo "🔨 构建 Docker 镜像..."
docker-compose build --no-cache

# 启动容器
echo "🚀 启动容器..."
docker-compose up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

# 检查健康状态
echo "🏥 检查应用健康状态..."
if curl -f http://localhost:80/health > /dev/null 2>&1; then
    echo "✅ 应用部署成功！"
    echo "📝 访问地址: http://localhost"
else
    echo "⚠️  警告：健康检查失败，请查看日志"
    docker-compose logs --tail=50 blog
fi

echo ""
echo "📊 查看日志: docker-compose logs -f"
echo "🛑 停止服务: docker-compose down"
echo "🔄 重启服务: docker-compose restart"
