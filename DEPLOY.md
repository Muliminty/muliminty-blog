# Docker 部署指南

## 前置要求

- Docker 20.10+
- Docker Compose 2.0+
- GitHub Personal Access Token

## 快速开始

### 1. 配置环境变量

```bash
# 复制环境变量模板
cp .env.local.example .env

# 编辑 .env 文件，填入你的配置
vim .env
```

必需配置：
```env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
```

### 2. 一键部署

```bash
# 赋予执行权限
chmod +x deploy.sh

# 执行部署脚本
./deploy.sh
```

### 3. 访问应用

部署成功后访问：
- HTTP: http://localhost
- 应用端口: http://localhost:3000

## 手动部署

### 构建镜像

```bash
docker-compose build
```

### 启动服务

```bash
docker-compose up -d
```

### 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 只查看应用日志
docker-compose logs -f blog

# 只查看 nginx 日志
docker-compose logs -f nginx
```

### 停止服务

```bash
docker-compose down
```

### 重启服务

```bash
docker-compose restart
```

## 生产环境配置

### 1. 配置域名

编辑 `nginx/conf.d/blog.conf`：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 修改为你的域名
    # ...
}
```

### 2. 配置 HTTPS

1. 准备 SSL 证书文件：
   - `nginx/ssl/cert.pem`
   - `nginx/ssl/key.pem`

2. 取消注释 `nginx/conf.d/blog.conf` 中的 HTTPS 配置

3. 取消注释 `docker-compose.yml` 中的 SSL 卷挂载

4. 重启服务：
   ```bash
   docker-compose restart nginx
   ```

### 3. 性能优化

#### 调整 Next.js 缓存时间

编辑 `lib/cache.ts`：

```typescript
export const CACHE_CONFIG = {
  LIST: 3600,    // 列表页缓存 1 小时
  DETAIL: 86400, // 详情页缓存 24 小时
  TWEETS: 1800,  // 动态流缓存 30 分钟
};
```

#### 调整 Nginx worker 进程数

编辑 `nginx/nginx.conf`：

```nginx
worker_processes auto;  # 自动根据 CPU 核心数调整
```

## 故障排查

### 应用无法启动

```bash
# 查看详细日志
docker-compose logs blog

# 检查环境变量
docker-compose exec blog env | grep GITHUB
```

### Nginx 502 错误

```bash
# 检查应用是否正常运行
docker-compose ps

# 检查应用健康状态
curl http://localhost:3000

# 查看 nginx 日志
docker-compose logs nginx
```

### 内存不足

编辑 `docker-compose.yml` 添加资源限制：

```yaml
services:
  blog:
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

## 更新部署

### 更新代码

```bash
# 拉取最新代码
git pull

# 重新部署
./deploy.sh
```

### 清理旧镜像

```bash
# 删除未使用的镜像
docker image prune -a

# 删除未使用的容器和网络
docker system prune
```

## 备份与恢复

### 备份配置

```bash
# 备份环境变量和配置文件
tar -czf blog-config-backup.tar.gz .env nginx/
```

### 恢复配置

```bash
# 解压备份
tar -xzf blog-config-backup.tar.gz

# 重新部署
./deploy.sh
```

## 监控

### 查看资源使用

```bash
# 查看容器资源使用情况
docker stats

# 查看特定容器
docker stats muliminty-blog
```

### 健康检查

```bash
# 检查应用健康状态
curl http://localhost/health

# 查看容器健康状态
docker inspect --format='{{.State.Health.Status}}' muliminty-blog
```

## 常用命令

```bash
# 进入容器
docker-compose exec blog sh

# 查看容器详情
docker inspect muliminty-blog

# 查看网络
docker network ls

# 查看卷
docker volume ls

# 清理所有停止的容器
docker container prune

# 查看镜像
docker images
```
