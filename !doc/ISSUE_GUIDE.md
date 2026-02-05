# GitHub Issues 使用指南

本博客使用 GitHub Issues 作为内容管理系统。通过给 Issue 添加不同的标签，可以将内容分类展示。

## 📝 创建文章（长文）

### 步骤

1. 访问仓库 Issues 页面：https://github.com/Muliminty/muliminty-blog/issues/new

2. 填写内容：
   - **Title**：文章标题（如：`深入理解 React Hooks 原理`）
   - **Body**：使用 Markdown 编写正文

3. 添加标签：
   - 必须添加：`article`
   - 可选标签：`React`、`前端`、`教程` 等分类标签

4. 点击 **Submit new issue**

### 示例

```markdown
标题：深入理解 React Hooks 原理

正文：
## 什么是 Hooks

React Hooks 是 React 16.8 引入的新特性...

## useState 原理

useState 通过闭包实现状态保存...

## 最佳实践

1. 不要在循环、条件或嵌套函数中调用 Hook
2. 只在 React 函数组件中调用 Hook
...

标签：article, React, 前端
```

**效果**：文章会显示在 `/posts` 页面

---

## 💭 创建动态（短文）

### 步骤

1. 访问：https://github.com/Muliminty/muliminty-blog/issues/new

2. 填写内容：
   - **Title**：动态标题（可选，可以留空）
   - **Body**：简短内容（建议 500 字以内）

3. 添加标签：
   - 必须添加：`tweet`
   - 可选标签：话题标签

4. 提交

### 示例 1：技术笔记

```markdown
标题：今天学到的 Next.js ISR

正文：
Next.js 的 ISR（Incremental Static Regeneration）真是太强了！

可以在构建时生成静态页面，同时支持按需重新验证。
设置 `revalidate: 3600` 就能实现 1 小时缓存。

既有静态站点的性能，又有动态内容的灵活性 🚀

标签：tweet, Next.js
```

### 示例 2：碎片思考

```markdown
标题：（留空）

正文：
刚发现一个有趣的 CSS 技巧：
使用 `aspect-ratio` 可以轻松实现响应式正方形容器，
不用再写 padding-top hack 了 💡

```css
.square {
  aspect-ratio: 1 / 1;
}
```

标签：tweet, CSS
```

**效果**：动态会显示在 `/tweets` 页面

---

## 🏷️ 标签系统

### 必需标签

| 标签 | 用途 | 显示位置 |
|------|------|----------|
| `article` | 标记为文章 | `/posts` 文章列表 |
| `tweet` | 标记为动态 | `/tweets` 动态流 |

### 可选标签（分类）

创建自定义标签对内容分类：

**技术分类**
- `React`、`Vue`、`Next.js`
- `TypeScript`、`JavaScript`
- `CSS`、`HTML`
- `Node.js`、`Docker`

**内容类型**
- `教程`、`笔记`、`踩坑`
- `源码分析`、`最佳实践`
- `工具推荐`、`资源分享`

**其他**
- `生活`、`思考`、`读书`

### 创建标签

1. 访问：https://github.com/Muliminty/muliminty-blog/labels

2. 点击 **New label**

3. 填写：
   - **Label name**：标签名（如 `React`）
   - **Description**：描述（如 `React 相关文章`）
   - **Color**：选择颜色

4. 点击 **Create label**

---

## ✍️ Markdown 语法支持

博客支持完整的 GitHub Flavored Markdown (GFM)。

### 基础语法

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体** *斜体* ~~删除线~~

- 无序列表
- 项目 2

1. 有序列表
2. 项目 2

[链接文字](https://example.com)

![图片描述](https://example.com/image.png)
```

### 代码块

````markdown
```javascript
function hello() {
  console.log('Hello World');
}
```
````

### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
```

### 引用

```markdown
> 这是一段引用文字
> 可以多行
```

### 任务列表

```markdown
- [x] 已完成任务
- [ ] 未完成任务
```

---

## 💬 评论与互动

### 评论

在 GitHub Issue 页面直接评论，评论会自动同步到博客文章详情页。

### Reactions（反应）

在 Issue 页面点击表情：
- 👍 赞同
- ❤️ 喜欢
- 😄 有趣
- 🚀 很棒
- 👀 关注

这些反应会显示在博客文章卡片上。

---

## 📊 内容管理

### 编辑内容

1. 打开对应的 Issue
2. 点击右上角 **Edit**
3. 修改内容
4. 点击 **Update comment**

**注意**：编辑后需要等待缓存刷新（默认 1 小时），或者重启开发服务器。

### 删除/隐藏内容

1. 打开对应的 Issue
2. 点击 **Close issue**

关闭的 Issue 不会显示在博客中。

### 置顶文章

Issue 按创建时间倒序排列，最新的显示在最前面。

如果需要置顶：
- 方案 1：重新创建 Issue（会获得新的创建时间）
- 方案 2：使用特殊标签如 `pinned`，然后修改代码优先显示

---

## 🎨 最佳实践

### 文章标题

✅ **好的标题**
- `深入理解 React Hooks 原理`
- `Next.js 14 新特性完全指南`
- `如何优化 Webpack 构建速度`

❌ **不好的标题**
- `学习笔记`（太宽泛）
- `test`（无意义）
- `关于 React 的一些想法`（不够具体）

### 文章结构

```markdown
# 标题

## 前言
简要介绍文章背景和要解决的问题

## 正文
### 小节 1
内容...

### 小节 2
内容...

## 总结
总结要点

## 参考资料
- [链接1](url)
- [链接2](url)
```

### 代码示例

- 添加语言标识以启用语法高亮
- 添加注释说明关键逻辑
- 保持代码简洁可运行

### 图片使用

**推荐方式**：
1. 上传到 GitHub Issue（拖拽上传）
2. 使用图床服务（如 GitHub、Cloudinary）
3. 使用相对路径（如果图片在仓库中）

**注意**：
- 图片大小控制在 1MB 以内
- 使用有意义的文件名
- 添加 alt 文字描述

---

## 🔄 内容同步

### 缓存机制

博客使用 Next.js ISR（增量静态再生成）：

- **文章列表**：1 小时缓存
- **文章详情**：24 小时缓存
- **动态流**：30 分钟缓存

### 手动刷新

**开发环境**：
```bash
# 重启服务器
Ctrl+C
npm run dev
```

**生产环境**：
```bash
# 重新构建
docker-compose down
docker-compose up -d --build
```

### 自动同步（可选）

配置 GitHub Webhook 实现实时同步：

1. 在仓库 Settings > Webhooks 添加 Webhook
2. Payload URL：`https://your-domain.com/api/revalidate`
3. 触发事件：Issues
4. 创建 API 路由处理 revalidation

---

## 📱 移动端编辑

### GitHub Mobile App

1. 下载 GitHub 官方 App
2. 登录账号
3. 找到仓库 > Issues
4. 可以创建、编辑、评论

### 浏览器

直接访问 GitHub 移动版网站，功能完整。

---

## 🚀 进阶技巧

### 使用 Issue Templates

创建 `.github/ISSUE_TEMPLATE/article.md`：

```markdown
---
name: 文章模板
about: 创建新文章
labels: article
---

## 标题
<!-- 填写文章标题 -->

## 摘要
<!-- 简要描述文章内容 -->

## 正文

### 背景

### 内容

### 总结

## 标签
<!-- 添加相关标签：React, Vue, CSS 等 -->
```

### 使用 GitHub Actions

自动同步到其他平台：

```yaml
# .github/workflows/sync.yml
name: Sync to Telegram

on:
  issues:
    types: [opened]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Send to Telegram
        run: |
          curl -X POST https://api.telegram.org/bot${{ secrets.BOT_TOKEN }}/sendMessage \
            -d chat_id=${{ secrets.CHAT_ID }} \
            -d text="新文章：${{ github.event.issue.title }}"
```

---

## 📚 示例仓库

查看示例 Issue：
- 文章示例：https://github.com/Muliminty/muliminty-blog/issues?q=label:article
- 动态示例：https://github.com/Muliminty/muliminty-blog/issues?q=label:tweet

---

## ❓ 常见问题

### Q: Issue 创建后没有显示？

A: 检查：
1. 是否添加了 `article` 或 `tweet` 标签
2. Issue 是否处于 Open 状态
3. 等待缓存刷新（或重启服务器）

### Q: 如何批量导入旧文章？

A: 使用 GitHub API 或 gh CLI：

```bash
gh issue create --title "文章标题" --body-file article.md --label article
```

### Q: 可以使用私有仓库吗？

A: 可以，但需要确保 GitHub Token 有访问私有仓库的权限。

### Q: 如何备份内容？

A: GitHub Issues 本身就是备份，也可以：
1. 定期导出 Issues 为 JSON
2. 使用 Git 克隆仓库
3. 使用第三方备份工具

---

## 🎯 快速开始

1. **创建第一篇文章**
   - 访问：https://github.com/Muliminty/muliminty-blog/issues/new
   - 标题：`Hello World - 我的第一篇博客`
   - 正文：随便写点什么
   - 标签：`article`

2. **创建第一条动态**
   - 标题：留空
   - 正文：`今天开始写博客了 🎉`
   - 标签：`tweet`

3. **访问博客**
   - 文章：http://localhost:3000/posts
   - 动态：http://localhost:3000/tweets

开始你的创作之旅吧！✨
