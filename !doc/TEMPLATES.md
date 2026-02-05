# Issue 模板示例

## 文章模板

### 技术教程

```markdown
标题：深入理解 React Hooks 原理

## 前言
React Hooks 是 React 16.8 引入的新特性...

## 什么是 Hooks
Hooks 允许你在不编写 class 的情况下使用 state 和其他 React 特性。

## useState 原理
```javascript
const [count, setCount] = useState(0);
```

useState 通过闭包实现状态保存...

## useEffect 原理
useEffect 用于处理副作用...

## 最佳实践
1. 不要在循环、条件或嵌套函数中调用 Hook
2. 只在 React 函数组件中调用 Hook

## 总结
Hooks 让函数组件拥有了状态管理能力...

## 参考资料
- [React 官方文档](https://react.dev)

标签：article, React, 教程
```

---

### 踩坑记录

```markdown
标题：Next.js 部署到 Docker 的坑

## 问题描述
使用 Docker 部署 Next.js 应用时遇到 404 错误

## 环境
- Next.js 14.2
- Docker 20.10
- Node.js 20

## 原因分析
next.config.js 需要配置 output: 'standalone'

## 解决方案
```javascript
// next.config.js
module.exports = {
  output: 'standalone',
}
```

## 完整 Dockerfile
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
COPY --from=builder /app/.next/standalone ./
CMD ["node", "server.js"]
```

## 总结
记得配置 standalone 模式！

标签：article, Next.js, Docker, 踩坑
```

---

### 源码分析

```markdown
标题：React 18 并发渲染源码解析

## 概述
React 18 引入了并发渲染特性...

## 核心概念
### Fiber 架构
Fiber 是 React 16 引入的新协调引擎...

### 时间切片
通过 requestIdleCallback 实现...

## 源码分析
```javascript
// packages/react-reconciler/src/ReactFiberWorkLoop.js
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

## 实际应用
使用 useTransition 和 useDeferredValue...

标签：article, React, 源码分析
```

---

## 动态模板

### 技术笔记

```markdown
标题：今天学到的 CSS 技巧

使用 `aspect-ratio` 可以轻松实现响应式正方形：

```css
.square {
  aspect-ratio: 1 / 1;
}
```

不用再写 padding-top hack 了！💡

标签：tweet, CSS
```

---

### 工具推荐

```markdown
标题：推荐一个 VS Code 插件

刚发现 Error Lens 这个插件，
可以在代码行内直接显示错误信息，
不用再鼠标悬停查看了 🚀

安装：在 VS Code 搜索 "Error Lens"

标签：tweet, 工具推荐
```

---

### 碎片思考

```markdown
标题：关于代码可读性的思考

好的代码应该像散文一样易读。

变量命名、函数拆分、注释说明，
每一个细节都在为未来的自己（或他人）服务。

写代码不仅是给机器看的，
更是给人看的。

标签：tweet, 思考
```

---

### 资源分享

```markdown
标题：前端学习资源汇总

📚 推荐几个优质学习资源：

1. MDN Web Docs - 最权威的前端文档
2. JavaScript.info - JS 深入教程
3. React 官方文档 - 最新最全
4. CSS-Tricks - CSS 技巧宝库

持续学习，持续进步！

标签：tweet, 资源分享
```

---

### 读书笔记

```markdown
标题：《代码整洁之道》读书笔记

今天读到一句话：

"代码质量的唯一有效度量标准是每分钟说出 WTF 的次数"

深以为然。写代码时多想想：
- 这段代码别人能看懂吗？
- 三个月后的自己能看懂吗？

标签：tweet, 读书笔记
```

---

## 使用建议

### 文章（article）适合：
- ✅ 完整的技术教程（1000+ 字）
- ✅ 深度源码分析
- ✅ 系统性知识总结
- ✅ 项目实战记录

### 动态（tweet）适合：
- ✅ 快速技术笔记（< 500 字）
- ✅ 工具/资源推荐
- ✅ 碎片化思考
- ✅ 日常学习记录

---

## 标签建议

### 技术分类
- `React`、`Vue`、`Angular`
- `JavaScript`、`TypeScript`
- `CSS`、`HTML`
- `Node.js`、`Deno`
- `Next.js`、`Nuxt`
- `Webpack`、`Vite`
- `Docker`、`Kubernetes`

### 内容类型
- `教程` - 手把手教学
- `笔记` - 学习记录
- `踩坑` - 问题解决
- `源码分析` - 深入原理
- `最佳实践` - 经验总结
- `工具推荐` - 效率工具
- `资源分享` - 学习资源

### 其他
- `随笔` - 技术随想
- `思考` - 深度思考
- `读书笔记` - 读书心得
- `面试` - 面试相关

---

## 快速创建

复制模板 → 修改内容 → 添加标签 → 提交

开始创作：https://github.com/Muliminty/muliminty-blog/issues/new
