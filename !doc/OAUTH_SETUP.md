# 评论和点赞功能配置指南

## 功能说明

博客支持以下互动功能：
- ✅ **点赞（Reactions）**：8 种表情反应
- ✅ **评论（Comments）**：Markdown 格式评论
- ✅ **GitHub OAuth 登录**：安全的用户认证

所有互动数据都存储在 GitHub Issues 中，无需额外数据库。

---

## 配置步骤

### 1. 创建 GitHub OAuth App

#### 1.1 访问 GitHub 设置

访问：https://github.com/settings/developers

点击 **OAuth Apps** → **New OAuth App**

#### 1.2 填写应用信息

| 字段 | 值 | 说明 |
|------|-----|------|
| **Application name** | Muliminty Blog | 应用名称 |
| **Homepage URL** | `http://localhost:3000` | 开发环境地址 |
| **Authorization callback URL** | `http://localhost:3000/api/auth/callback` | OAuth 回调地址 |
| **Application description** | 个人博客评论系统 | 可选描述 |

**生产环境**：
- Homepage URL: `https://your-domain.com`
- Callback URL: `https://your-domain.com/api/auth/callback`

#### 1.3 获取凭证

创建成功后，你会看到：
- **Client ID**：类似 `Iv1.a1b2c3d4e5f6g7h8`
- **Client Secret**：点击 **Generate a new client secret** 生成

⚠️ **重要**：Client Secret 只显示一次，请妥善保存！

---

### 2. 配置环境变量

#### 2.1 更新 .env.local

```bash
# 复制示例文件
cp .env.local.example .env.local

# 编辑配置
vim .env.local
```

#### 2.2 填入 OAuth 凭证

```env
# GitHub 配置
GITHUB_TOKEN=github_pat_xxxxx
GITHUB_OWNER=muliminty
GITHUB_REPO=muliminty-blog

# OAuth 配置（评论和点赞功能必需）
NEXT_PUBLIC_GITHUB_CLIENT_ID=Iv1.a1b2c3d4e5f6g7h8
GITHUB_CLIENT_SECRET=your_client_secret_here

# 缓存配置
REVALIDATE_TIME=3600
```

**注意**：
- `NEXT_PUBLIC_GITHUB_CLIENT_ID` 前缀 `NEXT_PUBLIC_` 是必需的（客户端可见）
- `GITHUB_CLIENT_SECRET` 不要加 `NEXT_PUBLIC_` 前缀（服务端专用）

---

### 3. 重启开发服务器

```bash
# 停止当前服务器（Ctrl+C）
# 重新启动
npm run dev
```

---

## 使用流程

### 用户端操作

#### 1. 登录

访问文章详情页，点击 **使用 GitHub 登录** 按钮

![登录按钮](https://via.placeholder.com/300x60?text=Login+Button)

#### 2. 授权

跳转到 GitHub 授权页面，点击 **Authorize**

![授权页面](https://via.placeholder.com/400x300?text=GitHub+OAuth)

#### 3. 点赞

登录后，点击表情按钮即可点赞：

- 👍 赞同
- ❤️ 喜欢
- 😄 有趣
- 🎉 很棒
- 😕 困惑
- 🚀 火箭
- 👀 关注

再次点击可取消点赞。

#### 4. 评论

在评论框输入内容（支持 Markdown），点击 **发表评论**。

评论成功后页面会自动刷新显示新评论。

---

## 权限说明

### OAuth 权限范围

应用请求的权限：
- `public_repo`：读写公开仓库的 Issues 和 Comments

### 为什么需要这些权限？

- **读取权限**：获取用户信息、查看已点赞的内容
- **写入权限**：创建评论、添加/删除 Reaction

### 安全性

- ✅ Token 存储在用户浏览器 localStorage
- ✅ Client Secret 只在服务端使用
- ✅ 所有操作都通过 GitHub API 进行
- ✅ 用户可随时在 GitHub 撤销授权

---

## 功能测试

### 测试点赞

1. 登录后访问任意文章
2. 点击表情按钮
3. 刷新页面，点赞应该保留
4. 再次点击可取消点赞

### 测试评论

1. 在评论框输入内容
2. 点击 **发表评论**
3. 页面刷新后应该看到新评论
4. 在 GitHub Issue 页面也能看到评论

### 测试登出

1. 点击用户头像旁的 **登出** 按钮
2. 页面刷新后应该显示 **使用 GitHub 登录** 按钮
3. 点赞和评论按钮应该不可用

---

## 常见问题

### Q1: 点击登录后跳转到 404

**原因**：OAuth App 的 Callback URL 配置错误

**解决**：
1. 检查 GitHub OAuth App 设置
2. 确保 Callback URL 是 `http://localhost:3000/api/auth/callback`
3. 生产环境改为 `https://your-domain.com/api/auth/callback`

### Q2: 登录后显示 "no_code" 错误

**原因**：用户拒绝授权或授权流程中断

**解决**：重新点击登录按钮

### Q3: 评论提交失败

**可能原因**：
1. Token 过期
2. 没有仓库写权限
3. 网络问题

**解决**：
1. 重新登录
2. 检查 OAuth 权限范围是否包含 `public_repo`
3. 查看浏览器控制台错误信息

### Q4: 点赞后刷新页面消失

**原因**：ISR 缓存未更新

**解决**：
- 开发环境：重启服务器
- 生产环境：等待缓存过期（默认 24 小时）或手动触发 revalidation

### Q5: Client Secret 泄露怎么办？

**解决**：
1. 立即在 GitHub OAuth App 设置中重新生成 Secret
2. 更新 `.env.local` 文件
3. 重启服务器
4. 确保 `.env.local` 在 `.gitignore` 中

---

## 生产环境部署

### 1. 更新 OAuth App 设置

在 GitHub OAuth App 中添加生产环境 URL：
- Homepage URL: `https://your-domain.com`
- Callback URL: `https://your-domain.com/api/auth/callback`

### 2. 配置环境变量

#### Docker 部署

编辑 `.env` 文件：

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=Iv1.xxxxx
GITHUB_CLIENT_SECRET=your_secret
```

#### Vercel 部署

在 Vercel 项目设置中添加环境变量：
- `NEXT_PUBLIC_GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

### 3. 测试

部署后访问生产环境，测试登录、点赞、评论功能。

---

## 进阶配置

### 自定义 Reaction 类型

编辑 `components/ReactionButtons.tsx`：

```typescript
const REACTION_TYPES = {
  '+1': '👍',
  'heart': '❤️',
  'rocket': '🚀',
  // 添加更多...
} as const;
```

### 评论 Markdown 预览

评论组件已支持预览功能，点击 **预览** 标签查看渲染效果。

### 评论通知

配置 GitHub Notifications 接收评论通知：
1. 访问：https://github.com/settings/notifications
2. 启用 **Issues** 通知
3. 选择通知方式（邮件/Web）

---

## 安全建议

1. ✅ **不要提交 .env.local 到 Git**
   ```bash
   # 确保 .gitignore 包含
   .env.local
   .env
   ```

2. ✅ **定期更换 Client Secret**
   - 每 3-6 个月更换一次
   - 怀疑泄露时立即更换

3. ✅ **使用 HTTPS**
   - 生产环境必须使用 HTTPS
   - 防止 Token 被中间人攻击

4. ✅ **限制 OAuth 权限**
   - 只请求必需的权限
   - 当前使用 `public_repo`

---

## 相关链接

- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [GitHub API 文档](https://docs.github.com/en/rest)
- [Next.js 环境变量](https://nextjs.org/docs/basic-features/environment-variables)

---

## 需要帮助？

- 查看浏览器控制台错误信息
- 检查服务器日志
- 在仓库创建 Issue 提问
