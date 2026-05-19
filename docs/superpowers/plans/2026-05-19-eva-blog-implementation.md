# EVA 主题个人博客 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个以《新世纪福音战士》为主题的 Next.js 个人博客，融合 NERV 终端美学与游戏级交互，Markdown + Git 管理内容，Vercel 部署。

**Architecture:** Next.js 14 App Router 全栈框架，React Three Fiber 驱动 3D 场景，Framer Motion + GSAP 驱动动效，next-mdx-remote 渲染 Markdown 内容，Open-Meteo 免费天气 API，全部客户端彩蛋系统。移动端自动降级。

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS v4, React Three Fiber, Drei, Framer Motion, GSAP, next-mdx-remote, gray-matter, Fuse.js, Open-Meteo API

**Spec:** docs/superpowers/specs/2026-05-19-eva-blog-design.md

---

## File Structure (Created this plan)

```
E:\AI\
├── config.json
├── content/posts/hello-world.md
├── public/fonts/
├── public/models/ (placeholder)
├── public/images/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── posts/page.tsx
│   │   ├── posts/[slug]/page.tsx
│   │   ├── tags/page.tsx
│   │   ├── tags/[tag]/page.tsx
│   │   ├── about/page.tsx
│   │   └── links/page.tsx
│   ├── components/
│   │   ├── terminal/shell.tsx
│   │   ├── terminal/menu.tsx
│   │   ├── terminal/status-bar.tsx
│   │   ├── terminal/prompt.tsx
│   │   ├── effects/scanlines.tsx
│   │   ├── effects/glitch.tsx
│   │   ├── effects/at-field.tsx
│   │   ├── effects/particles.tsx
│   │   ├── effects/cursor-trail.tsx
│   │   ├── effects/typewriter.tsx
│   │   ├── three/eva-scene.tsx
│   │   ├── easter-eggs/konami-code.tsx
│   │   ├── easter-eggs/lance.tsx
│   │   ├── easter-eggs/idle-trigger.tsx
│   │   ├── weather/weather-provider.tsx
│   │   ├── weather/weather-display.tsx
│   │   ├── weather/weather-effects.tsx
│   │   ├── search/search-box.tsx
│   │   ├── mdx/mdx-renderer.tsx
│   │   └── mdx/components.tsx
│   └── lib/
│       ├── posts.ts
│       ├── search-index.ts
│       ├── theme.ts
│       ├── weather.ts
│       └── device.ts
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── .gitignore
└── package.json
```

---

## Phase 1: 项目脚手架

### Task 1: 初始化 Next.js 项目

**Files:**
- Create: `E:\AI\package.json`, `E:\AI\tsconfig.json`, `E:\AI\next.config.mjs`, `E:\AI\tailwind.config.ts`, `E:\AI\.gitignore`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "eva-blog",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.99.0",
    "three": "^0.164.0",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.0",
    "next-mdx-remote": "^4.4.0",
    "gray-matter": "^4.0.3",
    "fuse.js": "^7.0.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/node": "^20.12.0",
    "@types/three": "^0.164.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] },
    "baseUrl": "."
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 next.config.mjs**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 4: 创建 tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "eva-red": "#FF0000",
        "eva-purple": "#660099",
        "eva-bg": "#0a0a0a",
        "eva-black": "#000000",
        "eva-unit01": "#6A0572",
        "eva-unit02": "#FF0000",
        "eva-unit00": "#0000FF",
        "eva-unit03": "#00AA00",
        "eva-unit05": "#FF6600",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: 创建 postcss.config.mjs**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: 创建 .gitignore**

```
node_modules/
.next/
out/
.superpowers/
```

- [ ] **Step 7: 安装依赖**

```bash
cd E:\AI && npm install
```

### Task 2: 创建主题与基础样式

**Files:**
- Create: `E:\AI\src\lib\theme.ts`
- Create: `E:\AI\src\app\globals.css`

- [ ] **Step 1: 创建主题 tokens**

```ts
// src/lib/theme.ts
export const colors = {
  evaRed: "#FF0000",
  evaPurple: "#660099",
  evaBg: "#0a0a0a",
  evaBlack: "#000000",
  white: "#FFFFFF",
  textPrimary: "#CCCCCC",
  textSecondary: "#999999",
  textMuted: "#666666",
  unit01: "#6A0572",
  unit02: "#FF0000",
  unit00: "#0000FF",
  unit03: "#00AA00",
  unit05: "#FF6600",
} as const;

export const tagMap: Record<string, string> = {
  frontend: "初号机·界面",
  backend: "MAGI核心",
  "ai/ml": "傀儡系统",
  devops: "NERV总部",
  design: "橙色图案",
  tutorial: "训练模拟",
  rust: "圣枪·Rust",
  thoughts: "LCL之海",
  animation: "AT力场",
  performance: "暴走模式",
};

export function getEvaTag(standardTag: string): string {
  return tagMap[standardTag] ?? standardTag;
}

export const magiBranches = {
  MELCHIOR: "技术分析",
  BALTHASAR: "思想随笔",
  CASPER: "项目实践",
} as const;

export type MagiBranch = keyof typeof magiBranches;
```

- [ ] **Step 2: 创建全局 CSS**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

:root {
  --eva-red: #FF0000;
  --eva-purple: #660099;
  --eva-bg: #0a0a0a;
  --eva-black: #000000;
  --text-primary: #CCCCCC;
  --text-secondary: #999999;
  --text-muted: #666666;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--eva-black);
  color: var(--text-primary);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--eva-red);
  color: var(--eva-black);
}

/* CRT scanline base — applied via .crt-overlay class */
.crt-overlay::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
}

/* Blinking cursor */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

/* CRT chromatic aberration on hover */
.crt-hover:hover {
  text-shadow: 1px 0 var(--eva-red), -1px 0 var(--eva-purple);
}
```

- [ ] **Step 3: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: scaffold project with Next.js, Tailwind, and EVA theme tokens"
```

---

## Phase 2: 内容引擎

### Task 3: Markdown 文章解析库

**Files:**
- Create: `E:\AI\src\lib\posts.ts`
- Create: `E:\AI\content\posts\hello-world.md`

- [ ] **Step 1: 创建示例文章**

```markdown
---
title: "人类补完计划：一场关于连接的实验"
date: 2024-06-01
tags: [thoughts, frontend]
branch: BALTHASAR
excerpt: "在第三次冲击之后，我们开始思考：什么是真正的连接？"
---

## 序幕

LCL 之海中，所有的灵魂融为一体。没有隔阂，没有误解——但也没有个体。

这让我想起 Web 的初衷：连接一切。
```

- [ ] **Step 2: 创建 posts.ts 解析库**

```ts
// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MagiBranch } from "./theme";

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  branch: MagiBranch;
  excerpt?: string;
  cover?: string;
  updated?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  excerpt: string;
}

const postsDir = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];

  const filenames = fs.readdirSync(postsDir);
  const posts = filenames
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDir, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const frontmatter: PostFrontmatter = {
        title: data.title ?? slug,
        date: data.date ?? "1970-01-01",
        tags: data.tags ?? [],
        branch: data.branch ?? "BALTHASAR",
        excerpt: data.excerpt,
        cover: data.cover,
        updated: data.updated,
      };

      const excerpt =
        frontmatter.excerpt ??
        content.replace(/[#*`\[\]()\!\->]/g, "").slice(0, 150).trim();

      return { slug, frontmatter, content, excerpt };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags.includes(tag));
}
```

- [ ] **Step 3: 验证**

```bash
cd E:\AI && npx ts-node -e "
const { getAllPosts } = require('./src/lib/posts');
console.log(JSON.stringify(getAllPosts(), null, 2));
"
```
Expected: 输出 hello-world 文章数据

- [ ] **Step 4: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add markdown post parser and sample article"
```

### Task 4: MDX 渲染器

**Files:**
- Create: `E:\AI\src\components\mdx\mdx-renderer.tsx`
- Create: `E:\AI\src\components\mdx\components.tsx`

- [ ] **Step 1: 创建自定义 MDX 组件**

```tsx
// src/components/mdx/components.tsx
import { ReactNode } from "react";

export function MDXH1({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-eva-red text-2xl font-bold border-b border-eva-purple pb-2 mb-4">
      {children}
    </h1>
  );
}

export function MDXH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-eva-red text-xl font-bold mt-8 mb-4">
      &gt; {children}
    </h2>
  );
}

export function MDXH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-eva-purple text-lg font-bold mt-6 mb-3">
      // {children}
    </h3>
  );
}

export function MDXPre({ children }: { children: ReactNode }) {
  return (
    <pre className="bg-eva-black border border-eva-purple p-4 rounded overflow-x-auto my-4 text-sm">
      {children}
    </pre>
  );
}

export function MDXCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-eva-black text-eva-red px-1.5 py-0.5 rounded text-sm">
      {children}
    </code>
  );
}

export function MDXBlockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-4 border-eva-red pl-4 my-4 text-text-secondary italic">
      {children}
    </blockquote>
  );
}

export function MDXA({ href, children }: { href?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-eva-red hover:text-eva-purple underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  );
}

export function MDXHr() {
  return <hr className="border-eva-purple my-8" />;
}

export const mdxComponents = {
  h1: MDXH1,
  h2: MDXH2,
  h3: MDXH3,
  pre: MDXPre,
  code: MDXCode,
  blockquote: MDXBlockquote,
  a: MDXA,
  hr: MDXHr,
};
```

- [ ] **Step 2: 创建 MDX 渲染器**

```tsx
// src/components/mdx/mdx-renderer.tsx
"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "./components";

interface Props {
  source: MDXRemoteSerializeResult;
}

export function MDXRenderer({ source }: Props) {
  return (
    <div className="prose-invert max-w-none leading-relaxed">
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add MDX renderer with NERV terminal styled components"
```

---

## Phase 3: NERV 终端外壳

### Task 5: 设备检测 Hook

**Files:**
- Create: `E:\AI\src\lib\device.ts`

- [ ] **Step 1: 创建设备检测工具**

```ts
// src/lib/device.ts
"use client";

import { useState, useEffect } from "react";

export interface DeviceInfo {
  isMobile: boolean;
  supportsWebGL: boolean;
  prefersReducedMotion: boolean;
  isTouch: boolean;
}

export function useDeviceCapabilities(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>({
    isMobile: false,
    supportsWebGL: true,
    prefersReducedMotion: false,
    isTouch: false,
  });

  useEffect(() => {
    const isMobile =
      /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let supportsWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      supportsWebGL = !!(
        canvas.getContext("webgl") || canvas.getContext("webgl2")
      );
    } catch {
      supportsWebGL = false;
    }

    setInfo({ isMobile, supportsWebGL, prefersReducedMotion, isTouch });
  }, []);

  return info;
}
```

- [ ] **Step 2: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add device capability detection hook"
```

### Task 6: CRT 扫描线与故障效果

**Files:**
- Create: `E:\AI\src\components\effects\scanlines.tsx`
- Create: `E:\AI\src\components\effects\glitch.tsx`

- [ ] **Step 1: 创建扫描线组件**

```tsx
// src/components/effects/scanlines.tsx
"use client";

import { useEffect, useRef } from "react";

interface Props {
  enabled: boolean;
}

export function Scanlines({ enabled }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    let gapLines = new Set<number>();
    const totalLines = 40;

    const randomizeGaps = () => {
      gapLines = new Set<number>();
      const count = 1 + Math.floor(Math.random() * 3); // 1-3 gaps
      for (let i = 0; i < count; i++) {
        gapLines.add(Math.floor(Math.random() * totalLines));
      }
      if (ref.current) {
        const stops = Array.from({ length: totalLines }, (_, i) => {
          const y = (i / totalLines) * 100;
          const alpha = gapLines.has(i) ? 0 : 0.08;
          return `rgba(0,0,0,${alpha}) ${y}%`;
        }).join(", ");
        ref.current.style.background = `repeating-linear-gradient(0deg, ${stops})`;
      }
    };

    randomizeGaps();
    const interval = setInterval(randomizeGaps, 10000 + Math.random() * 10000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
    />
  );
}
```

- [ ] **Step 2: 创建故障块组件**

```tsx
// src/components/effects/glitch.tsx
"use client";

import { useEffect, useState } from "react";

interface Props {
  enabled: boolean;
}

interface GlitchBlock {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
  opacity: number;
}

export function Glitch({ enabled }: Props) {
  const [blocks, setBlocks] = useState<GlitchBlock[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const spawnGlitch = () => {
      const block: GlitchBlock = {
        id: Date.now(),
        top: Math.random() * window.innerHeight,
        left: Math.random() * window.innerWidth,
        width: 40 + Math.random() * 120,
        height: 2 + Math.random() * 8,
        opacity: 0.06 + Math.random() * 0.08,
      };
      setBlocks((prev) => [...prev.slice(-3), block]);
      setTimeout(() => {
        setBlocks((prev) => prev.filter((b) => b.id !== block.id));
      }, 800);
    };

    const interval = setInterval(spawnGlitch, 8000 + Math.random() * 7000);
    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9997 }}>
      {blocks.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            top: b.top,
            left: b.left,
            width: b.width,
            height: b.height,
            background: `rgba(255,0,0,${b.opacity})`,
            transform: "skewX(-5deg)",
            transition: "opacity 0.3s",
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add CRT scanline and glitch effects"
```

### Task 7: AT 力场过渡动画

**Files:**
- Create: `E:\AI\src\components\effects\at-field.tsx`

- [ ] **Step 1: 创建 AT 力场动画组件**

```tsx
// src/components/effects/at-field.tsx
"use client";

import { useEffect, useRef } from "react";

interface Props {
  trigger: number; // 递增此值来触发动画
}

export function ATField({ trigger }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (trigger === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;
    const startTime = performance.now();
    const duration = 600;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw concentric hexagons
      for (let ring = 0; ring < 4; ring++) {
        const delay = ring * 0.15;
        const ringProgress = Math.max(
          0,
          Math.min(1, (eased - delay) / 0.85)
        );
        if (ringProgress <= 0) continue;

        const radius = ringProgress * maxRadius;
        const alpha = (1 - ringProgress) * (1 - ring * 0.2);
        const color =
          ring < 2
            ? `rgba(102, 0, 153, ${alpha})`
            : `rgba(255, 0, 0, ${alpha * 0.6})`;

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10000 }}
    />
  );
}
```

- [ ] **Step 2: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add AT Field hexagon ripple transition animation"
```

---

## Phase 4: 导航与布局

### Task 8: NERV 系统菜单

**Files:**
- Create: `E:\AI\src\components\terminal\menu.tsx`

- [ ] **Step 1: 创建 SystemMenu 组件**

```tsx
// src/components/terminal/menu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { num: "01", label: "ROOT_ARCHIVE", href: "/" },
  { num: "02", label: "MAGI_QUERY", href: "/posts" },
  { num: "03", label: "TAG_MATRIX", href: "/tags" },
  { num: "04", label: "PILOT_FILE", href: "/about" },
  { num: "05", label: "COMM_LINKS", href: "/links" },
];

export function SystemMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 border-r border-eva-purple bg-eva-black z-50 p-4">
        <Link href="/" className="text-eva-red text-lg font-bold tracking-widest mb-8">
          NERV
        </Link>
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.num}
                href={item.href}
                className={`font-mono text-sm py-2 px-3 rounded transition-colors ${
                  isActive
                    ? "text-eva-red bg-eva-red/10 border-l-2 border-eva-red"
                    : "text-text-secondary hover:text-eva-red hover:bg-eva-bg"
                }`}
              >
                &gt; [{item.num}] {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile: hamburger + overlay */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-4 right-4 z-50 text-eva-red font-mono text-sm bg-eva-black border border-eva-purple px-3 py-1 rounded"
        >
          {open ? "[X] CLOSE" : "[≡] MENU"}
        </button>
        {open && (
          <div className="fixed inset-0 bg-eva-black z-40 flex flex-col justify-center items-center gap-4">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.num}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-mono text-lg ${
                    isActive ? "text-eva-red" : "text-text-secondary"
                  }`}
                >
                  &gt; [{item.num}] {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add NERV system menu with mobile hamburger"
```

### Task 9: 状态栏

**Files:**
- Create: `E:\AI\src\components\terminal\status-bar.tsx`

- [ ] **Step 1: 创建 StatusBar 组件**

```tsx
// src/components/terminal/status-bar.tsx
"use client";

import { useState, useEffect } from "react";

interface Props {
  weatherDisplay?: React.ReactNode;
}

export function StatusBar({ weatherDisplay }: Props) {
  const [syncRate, setSyncRate] = useState(99.8);
  const [glitchText, setGlitchText] = useState<string | null>(null);

  // Random sync fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncRate(95 + Math.random() * 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Random SIG_ERR glitch
  useEffect(() => {
    const showGlitch = () => {
      setGlitchText("SIG_ERR: 0x7F");
      setTimeout(() => setGlitchText(null), 1500);
    };
    const interval = setInterval(
      showGlitch,
      8000 + Math.random() * 12000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-eva-black border-t border-eva-purple z-50">
      <div className="flex justify-between items-center px-4 py-1 font-mono text-xs text-text-muted">
        <span className="text-eva-purple">MELCHIOR-1</span>
        <span className="hidden sm:inline text-text-muted">|</span>
        <span className="hidden sm:inline text-eva-purple">BALTHASAR-2</span>
        <span className="hidden sm:inline text-text-muted">|</span>
        <span className="hidden sm:inline text-eva-purple">CASPER-3</span>
        <span className="text-text-muted">|</span>
        {weatherDisplay ?? <span className="text-text-muted">TOKYO-3</span>}
        <span className="text-text-muted">|</span>
        <span>
          SYNC:{" "}
          <span
            className={
              syncRate < 97
                ? "text-eva-red"
                : syncRate < 99
                ? "text-eva-purple"
                : "text-text-secondary"
            }
          >
            {syncRate.toFixed(1)}%
          </span>
        </span>
        {glitchText && (
          <span className="text-eva-red animate-pulse ml-2">{glitchText}</span>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add NERV status bar with sync rate and random SIG_ERR"
```

### Task 10: TerminalShell 根布局

**Files:**
- Create: `E:\AI\src\components\terminal\shell.tsx`
- Modify: `E:\AI\src\app\layout.tsx`

- [ ] **Step 1: 创建 TerminalShell**

```tsx
// src/components/terminal/shell.tsx
"use client";

import { ReactNode } from "react";
import { SystemMenu } from "./menu";
import { StatusBar } from "./status-bar";
import { Scanlines } from "../effects/scanlines";
import { Glitch } from "../effects/glitch";
import { useDeviceCapabilities } from "@/lib/device";
import { WeatherProvider } from "../weather/weather-provider";
import { WeatherDisplay } from "../weather/weather-display";

export function TerminalShell({ children }: { children: ReactNode }) {
  const { isMobile, prefersReducedMotion } = useDeviceCapabilities();
  const crtEnabled = !isMobile && !prefersReducedMotion;

  return (
    <WeatherProvider>
      <div className={`min-h-screen bg-eva-black ${crtEnabled ? "crt-overlay" : ""}`}>
        <Scanlines enabled={crtEnabled} />
        <Glitch enabled={crtEnabled} />
        <SystemMenu />
        {/* Main content area — offset for desktop sidebar */}
        <main className="md:ml-56 pt-4 pb-12 px-4 md:px-8 min-h-screen">
          {children}
        </main>
        <StatusBar weatherDisplay={<WeatherDisplay />} />
      </div>
    </WeatherProvider>
  );
}
```

- [ ] **Step 2: 更新根布局**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { TerminalShell } from "@/components/terminal/shell";

export const metadata: Metadata = {
  title: "NERV DIGITAL ARCHIVE",
  description: "MAGI SYSTEM v3.0 — Evangelion Digital Archive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <TerminalShell>{children}</TerminalShell>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add TerminalShell root layout with CRT effects"
```

---

## Phase 5: 页面实现

### Task 11: 首页 — 3D EVA 场景 + 文章档案

**Files:**
- Create: `E:\AI\src\app\page.tsx`
- Create: `E:\AI\src\components\three\eva-scene.tsx`

- [ ] **Step 1: 创建 3D EVA 场景（占位版）**

```tsx
// src/components/three/eva-scene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { useDeviceCapabilities } from "@/lib/device";

function FallbackScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* SVG NERV Logo placeholder */}
      <svg viewBox="0 0 200 200" className="w-64 h-64 opacity-20">
        <text
          x="100"
          y="80"
          textAnchor="middle"
          fill="#FF0000"
          fontSize="24"
          fontFamily="monospace"
          fontWeight="bold"
        >
          NERV
        </text>
        <polygon
          points="100,95 140,118 140,164 100,187 60,164 60,118"
          fill="none"
          stroke="#660099"
          strokeWidth="1.5"
        />
        <text
          x="100"
          y="155"
          textAnchor="middle"
          fill="#660099"
          fontSize="8"
          fontFamily="monospace"
        >
          GOD&apos;S IN HIS HEAVEN
        </text>
        <text
          x="100"
          y="168"
          textAnchor="middle"
          fill="#660099"
          fontSize="8"
          fontFamily="monospace"
        >
          ALL&apos;S RIGHT WITH THE WORLD
        </text>
      </svg>
    </div>
  );
}

function ParticleField() {
  // Simplified placeholder — real implementation uses useFrame
  return null;
}

export function EVA3DScene() {
  const { isMobile, supportsWebGL, prefersReducedMotion } =
    useDeviceCapabilities();
  const use3D = supportsWebGL && !isMobile && !prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {use3D ? (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#FF0000" />
          <pointLight position={[-10, -5, -5]} intensity={0.5} color="#660099" />
          {/* 3D model placeholder — actual model loaded in later task */}
          <mesh rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 2, 0.5]} />
            <meshStandardMaterial color="#6A0572" wireframe />
          </mesh>
        </Canvas>
      ) : (
        <FallbackScene />
      )}
      <ParticleField />
    </div>
  );
}
```

- [ ] **Step 2: 创建首页**

```tsx
// src/app/page.tsx
import { getAllPosts } from "@/lib/posts";
import { getEvaTag } from "@/lib/theme";
import Link from "next/link";
import { HomeClient } from "./home-client";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="relative min-h-[calc(100vh-6rem)]">
      <HomeClient />

      <div className="relative z-10 pt-8">
        <div className="font-mono text-xs text-eva-red mb-4 tracking-widest">
          [SYS] MAGI SYSTEM v3.0 // PILOT: ONLINE
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] text-white mb-1">
          NEON GENESIS
        </h1>
        <p className="text-eva-purple text-sm tracking-[0.3em] mb-8">
          EVANGELION DIGITAL ARCHIVE
        </p>

        <div className="flex gap-3 mb-8 font-mono text-xs">
          <Link href="/posts" className="bg-eva-red/15 border border-eva-red text-eva-red px-3 py-1.5 rounded hover:bg-eva-red/25 transition-colors">
            &gt; LATEST ARCHIVE
          </Link>
          <Link href="/about" className="bg-eva-purple/15 border border-eva-purple text-text-secondary px-3 py-1.5 rounded hover:bg-eva-purple/25 transition-colors">
            &gt; PILOT FILE
          </Link>
        </div>

        {/* Article feed */}
        <div className="border border-eva-purple rounded p-4 font-mono text-sm max-w-2xl">
          <div className="text-eva-red text-xs mb-3">
            &gt; RECENT ARCHIVES
          </div>
          {posts.length === 0 ? (
            <p className="text-text-muted text-xs">
              &gt; NO ARCHIVES FOUND. AWAITING FIRST ENTRY...
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="flex items-baseline gap-3 py-1.5 border-b border-eva-black hover:border-eva-red/30 transition-colors group"
                >
                  <span className="text-text-muted text-xs shrink-0">
                    {i === 0 ? (
                      <span className="text-eva-red">&gt; {String(i + 1).padStart(3, "0")}</span>
                    ) : (
                      <span className="text-text-muted">&gt; {String(i + 1).padStart(3, "0")}</span>
                    )}
                  </span>
                  <span className="text-text-secondary group-hover:text-eva-red transition-colors truncate">
                    {post.frontmatter.title}
                  </span>
                  <span className="text-text-muted text-xs hidden sm:inline shrink-0">
                    {post.frontmatter.tags.map((t) => getEvaTag(t)).join(" ")}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建客户端组件（分离 3D 场景）**

```tsx
// src/app/home-client.tsx
"use client";

import dynamic from "next/dynamic";

const EVA3DScene = dynamic(
  () => import("@/components/three/eva-scene").then((m) => ({ default: m.EVA3DScene })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center font-mono text-eva-red text-sm">
        &gt; LCL FILLING...
      </div>
    ),
  }
);

export function HomeClient() {
  return <EVA3DScene />;
}
```

- [ ] **Step 4: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add homepage with 3D EVA scene and article feed"
```

### Task 12: 文章列表页

**Files:**
- Create: `E:\AI\src\app\posts\page.tsx`
- Create: `E:\AI\src\components\search\search-box.tsx`

- [ ] **Step 1: 创建搜索框**

```tsx
// src/components/search/search-box.tsx
"use client";

import { useState, useRef } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export function SearchBox({ onSearch }: Props) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="font-mono text-sm mb-4">
      <div
        className="flex items-center gap-2 bg-eva-black border border-eva-purple rounded px-3 py-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-eva-red shrink-0">&gt;</span>
        <span className={focused ? "text-text-muted" : "text-text-secondary"}>
          SEARCH_ARCHIVE:
        </span>
        <input
          ref={inputRef}
          type="text"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-text-primary flex-1 font-mono text-sm"
          placeholder="_"
        />
        {focused && (
          <span className="text-eva-red cursor-blink">▊</span>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建文章列表页**

```tsx
// src/app/posts/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getEvaTag } from "@/lib/theme";
import { SearchBox } from "@/components/search/search-box";
import Fuse from "fuse.js";

export default function PostsPage() {
  const allPosts = useMemo(() => getAllPosts(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allPosts.forEach((p) => p.frontmatter.tags.forEach((t) => tagSet.add(t)));
    return [...tagSet].sort();
  }, [allPosts]);

  const fuse = useMemo(
    () =>
      new Fuse(allPosts, {
        keys: ["frontmatter.title", "frontmatter.excerpt", "content"],
        threshold: 0.3,
      }),
    [allPosts]
  );

  const filtered = useMemo(() => {
    let result = allPosts;

    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((r) => r.item);
    }

    if (activeTag) {
      result = result.filter((p) => p.frontmatter.tags.includes(activeTag));
    }

    return result;
  }, [allPosts, searchQuery, activeTag, fuse]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="font-mono text-xs text-eva-red mb-2 tracking-widest">
        &gt; QUERY: ALL_ARCHIVES | SORT: DATE_DESC
      </div>

      <SearchBox onSearch={setSearchQuery} />

      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTag(null)}
          className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
            activeTag === null
              ? "bg-eva-red text-white border-eva-red"
              : "bg-eva-black text-text-muted border-eva-purple hover:text-eva-red"
          }`}
        >
          ALL
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
              tag === activeTag
                ? "bg-eva-red text-white border-eva-red"
                : "bg-eva-black text-text-muted border-eva-purple hover:text-eva-red"
            }`}
          >
            {getEvaTag(tag)}
          </button>
        ))}
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <div className="font-mono text-sm text-text-muted py-8">
          {searchQuery
            ? "&gt; SEARCH: NO MATCHING DOCUMENTS"
            : activeTag
            ? `&gt; QUERY RETURNED 0 RESULTS FOR TAG: ${getEvaTag(activeTag)}`
            : "&gt; NO ARCHIVES FOUND. AWAITING FIRST ENTRY..."}
        </div>
      ) : (
        <div className="border border-eva-purple rounded divide-y divide-eva-bg font-mono text-sm">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 px-4 py-3 hover:bg-eva-red/5 transition-colors group"
            >
              <span className="text-eva-purple text-xs shrink-0">
                {post.frontmatter.date}
              </span>
              <span className="text-text-secondary group-hover:text-eva-red transition-colors flex-1">
                {post.frontmatter.title}
              </span>
              <span className="text-text-muted text-xs flex gap-2 shrink-0">
                {post.frontmatter.tags.map((t) => (
                  <span key={t}>{getEvaTag(t)}</span>
                ))}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination footer */}
      <div className="font-mono text-xs text-eva-red mt-4">
        &gt; {filtered.length} RECORDS FOUND.{" "}
        <span className="cursor-blink">▊</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add posts list page with Fuse.js search and tag filtering"
```

### Task 13: 文章详情页

**Files:**
- Create: `E:\AI\src\app\posts\[slug]\page.tsx`

- [ ] **Step 1: 创建文章详情页**

```tsx
// src/app/posts/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getEvaTag, magiBranches } from "@/lib/theme";
import { MDXRenderer } from "@/components/mdx/mdx-renderer";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const mdxSource = await serialize(post.content);

  return (
    <article className="max-w-3xl mx-auto">
      {/* NERV Archive Header */}
      <div className="border border-eva-purple rounded p-4 mb-8 font-mono text-xs">
        <div className="text-eva-red">
          &gt; MAGI_ARCHIVE_ID: NERV-{post.frontmatter.date.replace(/-/g, "")}-{post.slug.slice(0, 8).toUpperCase()}
        </div>
        <div className="text-eva-purple">
          &gt; CLEARANCE: LEVEL-3
        </div>
        <div className="text-text-muted">
          &gt; TIMESTAMP: {post.frontmatter.date} 14:30:00 JST
        </div>
        <div className="text-text-secondary">
          &gt; SUBJECT: {post.frontmatter.title}
        </div>
        <div className="text-eva-purple">
          &gt; BRANCH: {post.frontmatter.branch} ({magiBranches[post.frontmatter.branch]})
        </div>
        <div className="text-text-muted mt-2 flex gap-2">
          &gt; TAGS:{" "}
          {post.frontmatter.tags.map((t) => (
            <Link
              key={t}
              href={`/tags/${t}`}
              className="text-eva-red hover:text-eva-purple"
            >
              [{getEvaTag(t)}]
            </Link>
          ))}
        </div>
      </div>

      {/* Article title */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {post.frontmatter.title}
      </h1>

      {/* MDX Content */}
      <div className="prose-invert max-w-none">
        <MDXRenderer source={mdxSource} />
      </div>

      {/* Back link */}
      <div className="mt-12 pt-4 border-t border-eva-purple font-mono text-sm">
        <Link href="/posts" className="text-eva-red hover:text-eva-purple">
          &gt; BACK TO ARCHIVE
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add post detail page with NERV archive format and MDX rendering"
```

### Task 14: 标签墙 + 关于页 + 友链 + 404

**Files:**
- Create: `E:\AI\src\app\tags\page.tsx`
- Create: `E:\AI\src\app\tags\[tag]\page.tsx`
- Create: `E:\AI\src\app\about\page.tsx`
- Create: `E:\AI\src\app\links\page.tsx`
- Create: `E:\AI\src\app\not-found.tsx`

- [ ] **Step 1: 标签墙页**

```tsx
// src/app/tags/page.tsx
import { getAllTags } from "@/lib/posts";
import { getEvaTag } from "@/lib/theme";
import Link from "next/link";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="font-mono text-xs text-eva-red mb-6 tracking-widest">
        &gt; TAG_MATRIX: CLASSIFIED_INDEX
      </div>

      {/* EVA terminology mapping reference */}
      <div className="border border-eva-purple rounded p-4 mb-8 font-mono text-xs">
        <div className="text-eva-red mb-2">&gt; TERMINOLOGY_MAPPING:</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-text-muted">
          <span>frontend → 初号机·界面</span>
          <span>backend → MAGI核心</span>
          <span>ai/ml → 傀儡系统</span>
          <span>devops → NERV总部</span>
          <span>design → 橙色图案</span>
          <span>tutorial → 训练模拟</span>
          <span>rust → 圣枪·Rust</span>
          <span>thoughts → LCL之海</span>
          <span>animation → AT力场</span>
          <span>performance → 暴走模式</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="font-mono text-sm border border-eva-purple rounded px-4 py-3 hover:border-eva-red hover:bg-eva-red/5 transition-colors group"
          >
            <span className="text-text-secondary group-hover:text-eva-red">
              {getEvaTag(tag)}
            </span>
            <span className="text-text-muted ml-2">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 按标签过滤页**

```tsx
// src/app/tags/[tag]/page.tsx
import { getPostsByTag, getAllPosts } from "@/lib/posts";
import { getEvaTag } from "@/lib/theme";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags.forEach((t) => tagSet.add(t)));
  return [...tagSet].map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="font-mono text-xs text-eva-red mb-4 tracking-widest">
        &gt; QUERY: TAG_FILTER = &quot;{getEvaTag(params.tag)}&quot;
      </div>

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-text-muted">
          &gt; QUERY RETURNED 0 RESULTS FOR TAG: {getEvaTag(params.tag)}
        </p>
      ) : (
        <div className="border border-eva-purple rounded divide-y divide-eva-bg font-mono text-sm">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex items-center gap-4 px-4 py-3 hover:bg-eva-red/5 transition-colors"
            >
              <span className="text-eva-purple text-xs">{post.frontmatter.date}</span>
              <span className="text-text-secondary hover:text-eva-red flex-1">
                {post.frontmatter.title}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="font-mono text-xs text-eva-red mt-4">
        &gt; {posts.length} RECORDS FOUND. <span className="cursor-blink">▊</span>
      </div>

      <div className="mt-8 font-mono text-sm">
        <Link href="/tags" className="text-eva-red hover:text-eva-purple">
          &gt; BACK TO TAG_MATRIX
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 关于页 — 驾驶员 ID 卡**

```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="font-mono text-xs text-eva-red mb-6 tracking-widest">
        &gt; ACCESS: MAGI DATABASE // PERSONNEL FILE
      </div>

      <div className="border-2 border-eva-purple rounded-lg p-6 bg-eva-black">
        {/* Pilot ID Card */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-eva-red flex items-center justify-center bg-eva-red/10 shrink-0">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <div className="text-white text-lg font-bold font-mono">
              PILOT: [NAME]
            </div>
            <div className="text-eva-purple text-xs font-mono mt-1">
              CLEARANCE: LEVEL-5 | 初号机 适格者
            </div>
            <div className="text-eva-red text-xs font-mono mt-1">
              CHILDREN No.03
            </div>
          </div>
        </div>

        {/* Sync rate skill bars */}
        <div className="space-y-3 font-mono text-xs">
          {[
            { label: "初号机·界面", level: 90 },
            { label: "MAGI核心", level: 75 },
            { label: "傀儡系统", level: 60 },
            { label: "圣枪·Rust", level: 50 },
          ].map((skill) => (
            <div key={skill.label}>
              <div className="flex justify-between text-text-muted mb-1">
                <span>{skill.label}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="h-2 bg-eva-black rounded-full overflow-hidden border border-eva-purple">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${skill.level}%`,
                    background:
                      skill.level > 80
                        ? "var(--eva-red)"
                        : skill.level > 60
                        ? "var(--eva-purple)"
                        : "#666666",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Contact commands */}
        <div className="mt-6 pt-4 border-t border-eva-purple font-mono text-xs space-y-1">
          <div className="text-text-muted">
            &gt; COMM: GITHUB <span className="text-eva-red">[link]</span>
          </div>
          <div className="text-text-muted">
            &gt; COMM: EMAIL <span className="text-eva-red">[link]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 友链页**

```tsx
// src/app/links/page.tsx
export default function LinksPage() {
  const links = [
    // Placeholder — add real links in config.json later
  ];

  return (
    <div className="max-w-lg mx-auto">
      <div className="font-mono text-xs text-eva-red mb-6 tracking-widest">
        &gt; COMM_LINKS: ALLIED_STATIONS
      </div>

      {links.length === 0 ? (
        <div className="border border-eva-purple rounded p-6 font-mono text-sm text-text-muted">
          &gt; NO ALLIED STATIONS DETECTED. AWAITING DIPLOMATIC CHANNELS...
        </div>
      ) : (
        <div className="border border-eva-purple rounded divide-y divide-eva-bg font-mono text-sm">
          {links.map((link: any) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-4 py-3 hover:bg-eva-red/5 transition-colors"
            >
              <span className="text-eva-red">&gt; [{link.id}]</span>
              <span className="text-text-secondary">{link.name}</span>
              <span className="text-text-muted text-xs ml-auto">{link.desc}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: 404 页面**

```tsx
// src/app/not-found.tsx
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="font-mono text-eva-red text-6xl mb-4">404</div>
      <div className="font-mono text-sm text-eva-purple mb-2 tracking-widest">
        &gt; WARNING: PATTERN BLUE
      </div>
      <p className="font-mono text-text-muted text-sm mb-8 max-w-md">
        此路不通，使徒入侵。目标路径不存在于 MAGI 数据库中。
      </p>
      <Link
        href="/"
        className="font-mono text-sm text-eva-red border border-eva-red px-4 py-2 rounded hover:bg-eva-red/10 transition-colors"
      >
        &gt; RETURN TO NERV HQ
      </Link>
    </div>
  );
}
```

- [ ] **Step 6: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add tags, about, links, and 404 pages"
```

---

## Phase 6: 彩蛋系统

### Task 15: Konami Code 暴走模式

**Files:**
- Create: `E:\AI\src\components\easter-eggs\konami-code.tsx`

- [ ] **Step 1: 创建 Konami Code 组件**

```tsx
// src/components/easter-eggs/konami-code.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export function useKonamiCode() {
  const [berserk, setBerserk] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.code].slice(-KONAMI_SEQUENCE.length);
        if (
          next.length === KONAMI_SEQUENCE.length &&
          next.every((k, i) => k === KONAMI_SEQUENCE[i])
        ) {
          setBerserk(true);
          return [];
        }
        return next;
      });
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ESC to exit berserk
  useEffect(() => {
    if (!berserk) return;
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Escape") setBerserk(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [berserk]);

  const exitBerserk = useCallback(() => setBerserk(false), []);

  return { berserk, exitBerserk };
}

interface BerserkOverlayProps {
  active: boolean;
}

export function BerserkOverlay({ active }: BerserkOverlayProps) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10001 }}>
      {/* Red tint */}
      <div className="absolute inset-0 bg-eva-red/10 animate-pulse" />
      {/* Screen shake */}
      <div
        className="absolute inset-0"
        style={{
          animation: "shake 0.1s infinite",
        }}
      />
      {/* Warning text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono">
        <div
          className="text-eva-red text-2xl md:text-4xl font-bold animate-pulse"
          style={{ textShadow: "0 0 20px #FF0000" }}
        >
          ⚠ 暴走模式 ⚠
        </div>
        <div className="text-eva-purple text-sm mt-2">
          初号机 失控临界 · 同步率 400%
        </div>
        <div className="text-text-muted text-xs mt-4">按 ESC 退出暴走模式</div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2px, 1px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, -2px); }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add Konami Code berserk mode easter egg"
```

### Task 16: 朗基努斯之枪 + 空闲触发器

**Files:**
- Create: `E:\AI\src\components\easter-eggs\lance.tsx`
- Create: `E:\AI\src\components\easter-eggs\idle-trigger.tsx`

- [ ] **Step 1: 创建朗基努斯之枪动画**

```tsx
// src/components/easter-eggs/lance.tsx
"use client";

import { useEffect, useRef } from "react";

interface Props {
  trigger: number;
}

export function LanceAnimation({ trigger }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger === 0 || !ref.current) return;
    const el = ref.current;

    el.style.transition = "none";
    el.style.transform = "translate(120vw, -20vh) rotate(-45deg)";
    el.style.opacity = "0";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s";
        el.style.transform = "translate(-20vw, 110vh) rotate(-45deg)";
        el.style.opacity = "0.8";
      });
    });
  }, [trigger]);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none"
      style={{ zIndex: 10002, top: 0, left: 0 }}
    >
      {/* Stylized lance — CSS drawn */}
      <div className="relative w-64 h-4">
        <div className="absolute inset-y-0 left-0 right-0"
          style={{
            background: "linear-gradient(90deg, #FF0000, #660099, #FF0000)",
            clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 70%)",
          }}
        />
        {/* Double helix fork */}
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-12">
          <div className="w-full h-[2px] bg-eva-red absolute top-1" style={{ transform: "rotate(-30deg)" }} />
          <div className="w-full h-[2px] bg-eva-red absolute bottom-1" style={{ transform: "rotate(30deg)" }} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建空闲触发器**

```tsx
// src/components/easter-eggs/idle-trigger.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

export function useIdleTimer(timeout: number = 5000) {
  const [idleTrigger, setIdleTrigger] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIdleTrigger((prev) => prev + 1);
      }, timeout);
    };

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [timeout]);

  return idleTrigger;
}
```

- [ ] **Step 3: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add Lance of Longinus animation and idle trigger"
```

### Task 17: 集成彩蛋到根布局

**Files:**
- Modify: `E:\AI\src\components\terminal\shell.tsx`

- [ ] **Step 1: 更新 TerminalShell 集成彩蛋**

在 `shell.tsx` 中添加：

```tsx
// Add these imports at top:
import { useKonamiCode, BerserkOverlay } from "../easter-eggs/konami-code";
import { LanceAnimation } from "../easter-eggs/lance";
import { useIdleTimer } from "../easter-eggs/idle-trigger";
import { useState } from "react";

// Inside TerminalShell function, add after existing hooks:
const { berserk, exitBerserk } = useKonamiCode();
const idleCount = useIdleTimer(5000);
const [nervLogoClicks, setNervLogoClicks] = useState(0);

// In the JSX, add before the closing </div> (before the one wrapping children):
{/* Easter eggs */}
<BerserkOverlay active={berserk} />
<LanceAnimation trigger={idleCount + (nervLogoClicks >= 3 ? 999 : 0)} />
```

- [ ] **Step 2: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: integrate easter eggs into root layout"
```

---

## Phase 7: 天气系统

### Task 18: 天气工具库

**Files:**
- Create: `E:\AI\src\lib\weather.ts`

- [ ] **Step 1: 创建天气处理库**

```ts
// src/lib/weather.ts

export type EvaWeatherCode =
  | "橙色图案"
  | "插入栓待机"
  | "LCL污染"
  | "LCL泄漏"
  | "使徒接近"
  | "第二次冲击之冬"
  | "使徒来袭"
  | "AT力场崩坏";

export interface WeatherData {
  evaCode: EvaWeatherCode;
  temperature: number;
  windSpeed: number;
  city: string;
}

const WMO_TO_EVA: Record<number, EvaWeatherCode> = {
  0: "橙色图案",
  1: "橙色图案",
  2: "插入栓待机",
  3: "插入栓待机",
  45: "LCL污染",
  48: "LCL污染",
  51: "LCL泄漏",
  53: "LCL泄漏",
  55: "LCL泄漏",
  61: "使徒接近",
  63: "使徒接近",
  65: "使徒接近",
  80: "使徒接近",
  81: "使徒接近",
  82: "使徒接近",
  71: "第二次冲击之冬",
  73: "第二次冲击之冬",
  75: "第二次冲击之冬",
  77: "第二次冲击之冬",
  85: "第二次冲击之冬",
  86: "第二次冲击之冬",
  95: "使徒来袭",
  96: "使徒来袭",
  99: "使徒来袭",
};

const WEATHER_PARTICLE_CONFIG: Record<EvaWeatherCode, { count: number; color: string; speed: number }> = {
  "橙色图案": { count: 0, color: "transparent", speed: 0 },
  "插入栓待机": { count: 0, color: "transparent", speed: 0 },
  "LCL污染": { count: 30, color: "#660099", speed: 0.2 },
  "LCL泄漏": { count: 80, color: "#660099", speed: 3 },
  "使徒接近": { count: 200, color: "#660099", speed: 5 },
  "第二次冲击之冬": { count: 100, color: "#FFFFFF", speed: 1 },
  "使徒来袭": { count: 150, color: "#FF0000", speed: 6 },
  "AT力场崩坏": { count: 60, color: "#FF0000", speed: 8 },
};

export function getWeatherParticleConfig(code: EvaWeatherCode) {
  return WEATHER_PARTICLE_CONFIG[code];
}

const CACHE_KEY = "eva-weather-cache";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
  data: WeatherData;
  timestamp: number;
}

function getCachedWeather(): WeatherData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_DURATION) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function setCachedWeather(data: WeatherData) {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — silently skip
  }
}

export async function fetchWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  // Check cache first
  const cached = getCachedWeather();
  if (cached) return cached;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,wind_speed_10m`,
      { signal: controller.signal }
    );

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const json = await res.json();
    const wmoCode = json.current.weather_code as number;
    const temperature = json.current.temperature_2m as number;
    const windSpeed = json.current.wind_speed_10m as number;

    let evaCode = WMO_TO_EVA[wmoCode] ?? "插入栓待机";

    // Wind override
    if (windSpeed > 30 && evaCode !== "使徒来袭") {
      evaCode = "AT力场崩坏";
    }

    const data: WeatherData = {
      evaCode,
      temperature,
      windSpeed,
      city: "TOKYO-3", // Will be updated by reverse geocode if available
    };

    setCachedWeather(data);
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

export function getSeason(): string {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "春";
  if (month >= 6 && month <= 8) return "夏";
  if (month >= 9 && month <= 11) return "秋";
  return "冬";
}

export function getDateEffect(): string | null {
  const today = new Date();
  const md = `${today.getMonth() + 1}-${today.getDate()}`;

  if (md === "10-4") return "使徒袭来纪念日";

  // Check birthday from config (loaded separately)
  try {
    const config = JSON.parse(
      document.querySelector('script[data-config="site-config"]')?.textContent ?? "{}"
    );
    if (config.birthday) {
      const [bm, bd] = config.birthday.split("-").map(Number);
      if (bm === today.getMonth() + 1 && bd === today.getDate()) {
        return "适格者诞生日";
      }
    }
  } catch {
    // no config
  }

  if (md === "1-1") return "新世纪元旦";

  return null;
}

// Particle config used by weather-effects
export { WEATHER_PARTICLE_CONFIG };
```

- [ ] **Step 2: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add weather library with EVA code mapping and caching"
```

### Task 19: 天气 Provider + Display + Effects

**Files:**
- Create: `E:\AI\src\components\weather\weather-provider.tsx`
- Create: `E:\AI\src\components\weather\weather-display.tsx`
- Create: `E:\AI\src\components\weather\weather-effects.tsx`

- [ ] **Step 1: WeatherProvider**

```tsx
// src/components/weather/weather-provider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { WeatherData, fetchWeather } from "@/lib/weather";

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
}

const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  loading: true,
});

export function useWeather() {
  return useContext(WeatherContext);
}

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchWeather(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setWeather(data);
        } catch {
          // silent fail
        }
        setLoading(false);
      },
      () => {
        // Permission denied or error — silent
        setLoading(false);
      },
      { timeout: 5000 }
    );
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, loading }}>
      {children}
    </WeatherContext.Provider>
  );
}
```

- [ ] **Step 2: WeatherDisplay**

```tsx
// src/components/weather/weather-display.tsx
"use client";

import { useWeather } from "./weather-provider";
import { getDateEffect } from "@/lib/weather";

export function WeatherDisplay() {
  const { weather, loading } = useWeather();

  if (loading || !weather) {
    const dateEffect = getDateEffect();
    if (dateEffect) {
      return <span className="text-eva-red">{dateEffect}</span>;
    }
    return <span className="text-text-muted">TOKYO-3</span>;
  }

  return (
    <span className="text-text-secondary">
      {weather.city} | {weather.evaCode} · {weather.temperature.toFixed(1)}°C
    </span>
  );
}
```

- [ ] **Step 3: WeatherEffects**

```tsx
// src/components/weather/weather-effects.tsx
"use client";

import { useEffect, useRef } from "react";
import { useWeather } from "./weather-provider";
import { useDeviceCapabilities } from "@/lib/device";
import { EvaWeatherCode, getWeatherParticleConfig } from "@/lib/weather";

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  wobble: number;
}

export function WeatherEffects() {
  const { weather } = useWeather();
  const { isMobile, prefersReducedMotion } = useDeviceCapabilities();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!weather || prefersReducedMotion) return;

    const config = getWeatherParticleConfig(weather.evaCode);
    if (config.count === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const actualCount = isMobile ? Math.floor(config.count / 4) : config.count;

    // Init particles
    particlesRef.current = Array.from({ length: actualCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: config.speed * (0.5 + Math.random()),
      size: 1 + Math.random() * (weather.evaCode === "第二次冲击之冬" ? 3 : 2),
      opacity: 0.3 + Math.random() * 0.5,
      wobble: Math.random() * Math.PI * 2,
    }));

    // Glitch flash for 使徒来袭
    let lastFlash = 0;

    const animate = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (const p of particles) {
        p.y += p.speed;
        p.wobble += 0.02;

        // Wind effect for AT力场崩坏
        const windDrift =
          weather.evaCode === "AT力场崩坏"
            ? Math.cos(p.wobble) * config.speed * 0.5
            : weather.evaCode === "LCL污染"
            ? Math.sin(p.wobble * 0.5) * 0.5
            : 0;

        p.x += windDrift;

        // Wrap around
        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;

        ctx.beginPath();

        if (weather.evaCode === "第二次冲击之冬") {
          // Snow: circles
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();
        } else {
          // Rain / particles: vertical lines
          const lineHeight = p.speed * 3;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + windDrift * 2, p.y - lineHeight);
          ctx.strokeStyle = `rgba(${config.color === "#FF0000" ? "255,0,0" : "102,0,153"}, ${p.opacity})`;
          ctx.lineWidth = p.size;
          ctx.stroke();
        }
      }

      // 使徒来袭: random flash
      if (weather.evaCode === "使徒来袭" && now - lastFlash > 3000 + Math.random() * 5000) {
        lastFlash = now;
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
          // Flash clears on next frame
        }, 100);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [weather, isMobile, prefersReducedMotion]);

  if (!weather || prefersReducedMotion) return null;

  const config = getWeatherParticleConfig(weather.evaCode);
  if (config.count === 0) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
```

- [ ] **Step 4: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add weather provider, NERV status display, and weather particle effects"
```

---

## Phase 8: 动效完善

### Task 20: 粒子背景 + 鼠标轨迹 + 打字机

**Files:**
- Create: `E:\AI\src\components\effects\particles.tsx`
- Create: `E:\AI\src\components\effects\cursor-trail.tsx`
- Create: `E:\AI\src\components\effects\typewriter.tsx`

- [ ] **Step 1: 粒子背景场**

```tsx
// src/components/effects/particles.tsx
"use client";

import { useEffect, useRef } from "react";
import { useDeviceCapabilities } from "@/lib/device";
import { getSeason } from "@/lib/weather";

const seasonColors: Record<string, [string, string]> = {
  "春": ["#FF9ECF", "#FF0000"],
  "夏": ["#00FF88", "#660099"],
  "秋": ["#FFB800", "#FF0000"],
  "冬": ["#AACCFF", "#660099"],
};

export function ParticleField() {
  const { prefersReducedMotion, isMobile } = useDeviceCapabilities();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = isMobile ? 25 : 60;
    const season = getSeason();
    const [c1, c2] = seasonColors[season] ?? seasonColors["冬"];

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 0.5 + Math.random() * 1.5,
      color: Math.random() > 0.5 ? c1 : c2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion, isMobile]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
```

- [ ] **Step 2: 鼠标粒子轨迹**

```tsx
// src/components/effects/cursor-trail.tsx
"use client";

import { useEffect, useRef } from "react";
import { useDeviceCapabilities } from "@/lib/device";

export function CursorTrail() {
  const { isMobile, prefersReducedMotion } = useDeviceCapabilities();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handler = (e: MouseEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    };
    window.addEventListener("mousemove", handler);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pointsRef.current = pointsRef.current
        .filter((p) => p.age < 30)
        .map((p) => ({ ...p, age: p.age + 1 }));

      for (const p of pointsRef.current) {
        const alpha = (1 - p.age / 30) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(raf);
    };
  }, [isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9995 }}
    />
  );
}
```

- [ ] **Step 3: 打字机效果**

```tsx
// src/components/effects/typewriter.tsx
"use client";

import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 40, className, onComplete }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (i < text.length) {
        // Random stutter: 5-15% chance of extra delay
        const stutterChance = Math.random();
        const stutterDelay =
          stutterChance > 0.85
            ? speed * (3 + Math.random() * 5)
            : stutterChance > 0.95
            ? speed * (6 + Math.random() * 10)
            : speed;

        setDisplayed(text.slice(0, i + 1));
        i++;
        timeout = setTimeout(type, stutterDelay);
      } else {
        onComplete?.();
      }
    };

    timeout = setTimeout(type, speed);

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setCursor((c) => !c);
    }, 530);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="text-eva-red"
        style={{ opacity: cursor ? 1 : 0 }}
      >
        ▌
      </span>
    </span>
  );
}
```

- [ ] **Step 4: 提交**

```bash
cd E:\AI && git add -A && git commit -m "feat: add particle field, cursor trail, and typewriter effect"
```

---

## Phase 9: 部署配置

### Task 21: Vercel 部署配置 + 项目收尾

**Files:**
- Create: `E:\AI\vercel.json`
- Create: `E:\AI\config.json`

- [ ] **Step 1: 创建 vercel.json**

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

- [ ] **Step 2: 创建 config.json**

```json
{
  "siteName": "NERV DIGITAL ARCHIVE",
  "description": "MAGI SYSTEM v3.0 — Evangelion Digital Archive",
  "birthday": "",
  "pilotName": "",
  "social": {
    "github": "",
    "email": ""
  },
  "links": []
}
```

- [ ] **Step 3: 首次构建验证**

```bash
cd E:\AI && npm run build
```
Expected: 构建成功，无 TypeScript 错误。`.next/` 目录生成。

- [ ] **Step 4: 启动开发服务器测试**

```bash
cd E:\AI && npm run dev
```

验证以下页面可访问：
- http://localhost:3000/ — 首页
- http://localhost:3000/posts — 文章列表
- http://localhost:3000/posts/hello-world — 文章详情
- http://localhost:3000/tags — 标签墙
- http://localhost:3000/about — 关于页
- http://localhost:3000/links — 友链
- http://localhost:3000/nonexistent — 404 页面

- [ ] **Step 5: 初始化 Git 并推送（手动）**

```bash
cd E:\AI && git init && git add -A && git commit -m "feat: complete EVA blog — all phases"
# 用户需要手动:
# 1. 在 GitHub 创建仓库
# 2. git remote add origin <repo-url>
# 3. git push -u origin main
# 4. 在 Vercel 导入 GitHub 仓库，自动部署
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-2 | 项目脚手架 + 主题系统 |
| 2 | 3-4 | Markdown 解析 + MDX 渲染 |
| 3 | 5-7 | 设备检测 + CRT 效果 + AT 力场 |
| 4 | 8-10 | 导航菜单 + 状态栏 + 根布局 |
| 5 | 11-14 | 全部页面（首页/列表/详情/标签/关于/友链/404）|
| 6 | 15-17 | 彩蛋（Konami/朗基努斯之枪/空闲触发）|
| 7 | 18-19 | 天气系统（API/EVA映射/显示/粒子特效）|
| 8 | 20 | 动效（粒子场/鼠标轨迹/打字机）|
| 9 | 21 | Vercel 部署配置 + 构建验证 |

**总计：21 个任务，每个 2-5 分钟**
