# Muliminty Blog

## 🎮 在线体验

- **🌐 博客地址**: [填写你的博客链接] - 在线访问
- **💭 参与讨论**: [创建 Issue](https://github.com/muliminty/muliminty-blog/issues) 交流与留言
- **📚 浏览内容**: 在站点上阅读文章与动态

## ✨ 项目介绍

**数据与内容使用 GitHub Issues 同步。**

本博客将 **GitHub Issues** 作为内容存储与数据源：每篇博文/每条动态对应一个 Issue，编辑、分类、评论都基于 Issues 与 Labels，无需自建数据库，数据全在 GitHub 上可查、可备份、可协作。

- **GitHub Issues** 📝 = 内容与数据存储
- **本仓库** 🚀 = 博客站点 + 与 Issues 的同步展示

这里会记录技术笔记、生活随想与一些发现，欢迎通过 Issue 一起交流。

## 🚀 亮点功能

1. **📝 基于 GitHub Issues**
   - 内容全部存储在 GitHub Issues，支持 Labels 分类与筛选
2. **👍 互动能力**
   - 点赞：使用 GitHub Reactions（👍 ❤️ 😄 😮 😢 😡 🚀 👀）
   - 评论：完整评论与嵌套回复，对应 Issue 评论
3. **✨ 体验与展示**
   - 响应式布局，适配桌面与移动端
   - 合理的加载与骨架屏体验
4. **🤖 数据同步**
   - 数据使用 **GitHub Issues 同步**：发布/编辑/关闭 Issue 即更新博客内容
   - 可配合 GitHub Actions 将新 Issue 同步到其他平台（如 Telegram、Gist 等）

## 📝 使用说明

### 发布内容

1. 在本仓库（或配置的仓库）中 [新建 Issue](https://github.com/muliminty/muliminty-blog/issues/new)
2. 用 Markdown 编写正文
3. 添加合适标签（Labels）做分类
4. 发布后内容会通过 Issues 同步到博客展示

### 内容管理

- **编辑**：在对应 Issue 中直接编辑
- **删除/隐藏**：关闭该 Issue
- **分类**：使用 GitHub Labels 管理分类
- **排序**：可通过 Issue 创建时间、标签等控制展示顺序

### 🤖 自动化同步（可选）

若希望新发布的 Issue 自动同步到其他平台：

1. 在仓库中创建 `.github/workflows/sync.yml`，用 GitHub Actions 监听 `issues` 事件
2. 在仓库 Settings > Secrets and variables 中配置所需 Token、Webhook 等
3. 按需配置 Telegram Bot、Gist 等接收端

## 🛠️ 技术栈

（根据实际项目填写，参考示例：）

- **前端**: React / Next.js / 其他
- **构建**: Vite / Rsbuild / 其他
- **样式**: CSS / Tailwind / Emotion 等
- **数据**: GitHub GraphQL API（读取 Issues / Comments / Reactions）
- **规范**: ESLint + Prettier

## 📦 本地开发

```bash
# 安装依赖
npm install

# 启动开发
npm run dev
```

## 📋 配置说明

使用 GitHub Issues 作为数据源时，通常需要：

1. **仓库**：确认博客使用的 GitHub 仓库（如本仓库或单独的内容仓库）
2. **Token**：若需服务端或 CI 读写 Issues，在 [Personal access tokens](https://github.com/settings/tokens) 申请具备 `repo` 与 `read:user` 的 Token，并妥善保管
3. **OAuth**：若博客支持在浏览器内发帖/评论，需配置 [GitHub OAuth App](https://github.com/settings/developers)

## 🤝 参与

欢迎通过 [Issues](https://github.com/muliminty/muliminty-blog/issues) 讨论、反馈或投稿。

---

<div align="center">

**感谢你的关注与支持！**

Made with ❤️ by [muliminty](https://github.com/muliminty)

</div>
