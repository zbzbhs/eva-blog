# EVA 主题个人博客 — 设计规格文档

## 概述

基于 Next.js 的个人博客，以《新世纪福音战士》(EVA) 为主题，融合 NERV 终端美学与游戏级交互体验。通过 Markdown + Git 管理内容，Vercel 自动部署。

## 技术栈

| 层级 | 技术 | 用途 |
|------|------|------|
| 框架 | Next.js 14 App Router | 路由、SSG/ISR、Vercel 部署 |
| 3D | React Three Fiber + Drei | EVA 初号机 3D 场景 |
| 动效 | Framer Motion + GSAP | 页面过渡、粒子、波纹 |
| 样式 | Tailwind CSS v4 + CSS Modules | EVA 配色主题系统 |
| 内容 | next-mdx-remote + gray-matter | Markdown → 富文章渲染 |
| 搜索 | Fuse.js | 客户端模糊搜索 |
| 天气 | Open-Meteo API + Geolocation API | 免费、无需 API Key、纯前端请求 |
| 部署 | Vercel | 自动构建、边缘网络 |

## 配色系统

```
主色:    #FF0000 — EVA 红（强调、标题、链接、警告）
背景:    #0a0a0a — 近黑（主背景）
          #000000 — 纯黑（CRT 底色）
辅色:    #660099 — EVA 紫（渐变、标签、次级强调）
中性:    #FFFFFF / #CCCCCC / #999999 / #666666 — 文字层级
机体配色（用于标签/分类/代码高亮）:
  初号机: #6A0572   贰号机: #FF0000   零号机: #0000FF
  叁号机: #00AA00   伍号机: #FF6600
```

## 路由结构

```
/                      首页 — 3D EVA 场景 + 精选文章
/posts                 文章列表（MAGI 数据查询）+ 搜索 + 标签过滤
/posts/[slug]          文章详情（NERV 机密档案格式）
/tags                  标签墙（EVA 术语）
/tags/[tag]            按标签过滤
/about                 关于页（适格者驾驶员 ID 卡）
/links                 友链
```

## 项目结构

```
eva-blog/
├── content/posts/              # Markdown 文章
│   ├── hello-world.md
│   └── ...
├── public/
│   ├── models/                 # 3D 模型 (EVA-01.glb)
│   ├── fonts/                  # 等宽终端字体
│   └── images/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 根布局 = TerminalShell
│   │   ├── page.tsx            # 首页
│   │   ├── posts/
│   │   │   ├── page.tsx        # 文章列表 + 搜索
│   │   │   └── [slug]/page.tsx # 文章详情
│   │   ├── tags/
│   │   │   ├── page.tsx        # 标签墙
│   │   │   └── [tag]/page.tsx  # 按标签过滤
│   │   ├── about/page.tsx      # 驾驶员档案
│   │   └── links/page.tsx      # 友链
│   ├── components/
│   │   ├── terminal/           # NERV 终端组件
│   │   │   ├── shell.tsx       # CRT 外壳（扫描线/边框/失真）
│   │   │   ├── menu.tsx        # NERV 系统菜单
│   │   │   ├── prompt.tsx      # 命令行光标/打字机文本
│   │   │   └── status-bar.tsx  # 底部状态条
│   │   ├── effects/
│   │   │   ├── at-field.tsx    # AT 力场六边形波纹
│   │   │   ├── particles.tsx   # 粒子背景场
│   │   │   ├── scanlines.tsx   # CRT 扫描线
│   │   │   ├── glitch.tsx      # 随机故障块
│   │   │   ├── cursor-trail.tsx# 鼠标粒子轨迹
│   │   │   └── typewriter.tsx  # 打字机效果（带随机卡顿）
│   │   ├── three/
│   │   │   ├── eva-scene.tsx   # 3D EVA 场景 (R3F)
│   │   │   ├── model.tsx       # 模型加载器
│   │   │   └── nerv-logo.tsx   # 3D 粒子 NERV 标志
│   │   ├── easter-eggs/
│   │   │   ├── konami-code.tsx # Konami Code 暴走模式
│   │   │   ├── lance.tsx       # 朗基努斯之枪动画
│   │   │   └── idle-trigger.ts # 空闲检测触发器
│   │   ├── mdx/
│   │   │   ├── mdx-renderer.tsx# MDX 渲染器
│   │   │   └── components.tsx  # 自定义 MDX 组件
│   │   ├── weather/
│   │   │   ├── weather-provider.tsx # 天气数据 Context + 位置获取
│   │   │   ├── weather-display.tsx  # 终端天气信息组件
│   │   │   └── weather-effects.tsx  # 天气驱动的视觉特效覆盖层
│   │   ├── search/
│   │   │   └── search-box.tsx  # 命令行风格搜索框
│   │   └── layout/
│   │       ├── header.tsx
│   │       └── footer.tsx
│   ├── lib/
│   │   ├── posts.ts            # Markdown 读取/解析
│   │   ├── search-index.ts     # 构建时生成搜索索引
│   │   ├── theme.ts            # EVA 主题 tokens
│   │   ├── weather.ts           # 天气API、EVA映射、日期特效
│   │   └── device.ts           # 设备检测 & 降级策略
│   └── app/globals.css         # Tailwind + CRT 关键 CSS
├── next.config.mjs
├── tailwind.config.ts
├── vercel.json
└── package.json
```

## 组件职责

### TerminalShell（根布局）
所有页面的外层框架，提供：
- CRT 扫描线覆盖层（`::after` pseudo-element, `repeating-linear-gradient`）
- 随机故障块（每 8-15 秒，随机位置/大小，半透明色块 `skewX` 偏移）
- 底部 NERV 状态栏：`MELCHIOR-1 | BALTHASAR-2 | CASPER-3 | SYNC:XX%`
- 不完美感：扫描线随机 1-3 行间断（`opacity: 0` 断层）

### SystemMenu（导航）
- 桌面端：左侧固定侧边栏，NERV 系统菜单风格
- 移动端：底部汉堡菜单展开
- 菜单项格式：`> [编号] 功能名`，如 `> [01] ROOT_ARCHIVE`
- 当前页菜单项高亮红色

### EVA3DScene（首页背景）
- 低面数 EVA 初号机 `.glb` 模型，缓慢自转
- 紫色/红色粒子场环绕
- `Suspense` fallback：加载时显示 "LCL FILLING..."
- 移动端/无 WebGL：降级为 2D Canvas 粒子 + 静态 NERV Logo SVG

### ATField（过渡动画）
- 路由切换时触发
- 六边形波纹从中心向外扩散（Canvas 2D）
- 颜色：紫色外圈 → 红色内圈
- 持续 600ms
- 移动端：简化为 fade 过渡，跳过六边形动画

### 彩蛋系统

| 触发器 | 效果 | 实现方式 |
|--------|------|---------|
| Konami Code（↑↑↓↓←→←→BA）| 暴走模式：CRT 色彩反转 + 屏幕振动 + 红色叠加层 | keydown 序列检测 |
| 双击 NERV Logo | 朗基努斯之枪划过 + AT 力场全屏展开 | 双击事件 + GSAP 路径动画 |
| 5 秒无操作 | 朗基努斯之枪从右上角缓缓划过 | IdleDetector + CSS transform |
| 404 页面 | 「此路不通，使徒入侵」+ 莉莉丝画面 | 自定义 404 页面 |

### 内容页面

**文章列表 (/posts)**
- 顶部：`> QUERY: ALL_ARCHIVES | SORT: DATE_DESC`
- 搜索框：命令行输入风格，焦点时显示 `> SEARCH_ARCHIVE: _` 带闪烁光标
- 标签过滤：Pill 形式，选中高亮红色（.active 类）
- 列表格式：`[日期] [标题] [EVA标签]`，每行一条
- 底部：`> N RECORDS FOUND. PAGE X/Y ▊`

**文章详情 (/posts/[slug])**
- 档案头部：`MAGI_ARCHIVE_ID`, `CLEARANCE`, `TIMESTAMP`, `SUBJECT`, `BRANCH`
- 三个 MAGI 分支对应文章分类：
  - MELCHIOR：技术分析 / 教程
  - BALTHASAR：思想 / 随笔
  - CASPER：项目 / 实践
- 正文 MDX 渲染，代码块使用 NERV 终端风格（黑底绿字/红字）
- 移动端：CRT 装饰减弱，保证长文阅读舒适度

**关于页 (/about)**
- 驾驶员 ID 卡格式：
  - 圆形头像 + 红色边框
  - `CHILDREN No.XX` 编号
  - `DESIGNATED PILOT` 称号
  - 同步率条 → 技能熟练度可视化（宽度百分比 + 颜色从灰→紫→红）
  - 社交链接以系统命令形式：`> COMM: GITHUB [link]`

**标签墙 (/tags)**
- EVA 术语标签云
- 标签 → 文章数量
- 标准标签与 EVA 术语的双语映射表

## 标签映射表

| 标准分类（代码层） | EVA 术语（UI 展示） | 用途 |
|-------------------|---------------------|------|
| frontend | 初号机·界面 | 前端开发 |
| backend | MAGI核心 | 后端开发 |
| ai/ml | 傀儡系统 | AI/机器学习 |
| devops | NERV总部 | DevOps/基础设施 |
| design | 橙色图案 | 设计/UI |
| tutorial | 训练模拟 | 教程 |
| rust | 圣枪·Rust | Rust 开发 |
| thoughts | LCL之海 | 随笔/思考 |
| animation | AT力场 | 动画/动效 |
| performance | 暴走模式 | 性能优化 |

## 动效分层 & 性能策略

| 层级 | 桌面端 | 移动端 | 实现 |
|------|--------|--------|------|
| L1 环境层 | CRT 扫描线 + 微失真 + 粒子场 | 无 CRT，纯色背景 | CSS + Canvas 2D |
| L2 响应层 | 鼠标粒子轨迹 + AT 力场悬停 | 触摸涟漪 | Canvas 2D |
| L3 导航层 | AT 力场展开过渡 + NERV 菜单 | fade/slide | Framer Motion |
| L4 彩蛋层 | 按键/手势触发 EVA 场景 | 同等支持 | GSAP + React 状态 |

**移动端检测策略：**
```ts
const { isMobile, supportsWebGL, prefersReducedMotion } = useDeviceCapabilities()

// 决策矩阵
CRT效果    = !isMobile && !prefersReducedMotion
3D场景     = supportsWebGL && !isMobile && !prefersReducedMotion
粒子效果   = !prefersReducedMotion
```

**首屏加载优化：**
- 3D 模型 `React.lazy()` + `Suspense`，加载时显示 LCL 注入动画
- 搜索索引独立 chunk，`lazy()` 按需加载
- Framer Motion `LazyMotion` + `domAnimation` 减小初始 bundle
- 字体 `font-display: swap`，先以系统等宽字体渲染
- 首屏关键 CSS 内联，Tailwind purge 掉未使用样式

## 内容发布流程

```
1. 在 content/posts/ 下创建 xxx.md
2. 填写 frontmatter:
   ---
   title: "文章标题"
   date: 2024-06-01
   tags: [frontend, animation]
   branch: MELCHIOR     # 可选：MELCHIOR | BALTHASAR | CASPER
   excerpt: "摘要"
   cover: /images/xxx.png  # 可选
   ---
3. git add + git commit + git push
4. Vercel 自动检测 push → 构建 → 部署
```

## 部署

- 平台：Vercel
- 构建命令：`next build`
- 输出目录：`.next`
- 环境变量：`NEXT_PUBLIC_SITE_URL`（站点 URL）
- 关联：GitHub 仓库 → Vercel Project，main 分支自动部署
- `.gitignore`：`.superpowers/`、`node_modules/`、`.next/`

## Frontmatter 规范

```yaml
---
title: "string"           # 必填
date: YYYY-MM-DD          # 必填
tags: [string, ...]       # 必填，至少一个
branch: MELCHIOR          # 可选，默认 BALTHASAR
excerpt: "string"         # 可选，不填则截取正文前 150 字
cover: "/images/x.png"    # 可选
updated: YYYY-MM-DD       # 可选
---
```

## 不完美感实现细节

1. **打字机卡顿**：`setTimeout` 递推字符时，随机在 5-15% 的位置插入 80-200ms 额外延迟
2. **扫描线断层**：CSS `nth-child(random(1, numLines))` 挑 1-3 行，将扫描线 `opacity` 降至 0，每 10-20 秒重新随机
3. **信号干扰**：状态栏右侧偶尔闪现 `SIG_ERR: 0x7F`（持续 1-2 秒，间隔 5-15 秒随机）
4. **CRT 色彩偏移**：hover 特定元素时轻微 RGB 通道偏移（`text-shadow: 1px 0 red, -1px 0 blue`），概率 10%

以上「故障」只在桌面端生效，移动端全部关闭。

## 天气系统

### 数据获取

```
1. 浏览器 Geolocation API → 获取经纬度（需用户授权）
2. fetch → Open-Meteo API (free, no key)
   GET https://api.open-meteo.com/v1/forecast
     ?latitude=X&longitude=Y
     &current=weather_code,temperature_2m,relative_humidity_2m,wind_speed_10m
3. 解析 weather_code → EVA 天气类型
4. 30 分钟缓存（localStorage），减少请求
```

**隐私设计**：
- 位置仅存内存，不持久化，不上传服务器
- 用户可拒绝位置授权 → 手动输入城市名或跳过天气
- 天气 API 请求是纯前端 fetch，无代理

### 硬性约束

1. **全程中文 EVA 术语**：代码变量名使用英文（编程需要），但 UI 展示、状态栏、CSS 类名中不出现 `晴`/`雨`/`雪` 等普通天气词，全部使用中文 EVA 代号（`橙色图案`/`LCL泄漏`/`第二次冲击之冬` 等）
2. **动效统一**：雨滴为竖线扫描线粒子、雪为 LCL 结晶缓降、雷暴为 AT 力场过载闪烁——所有天气动效均以 NERV 终端/AT 力场视觉语言实现，不加天气图标、emoji、自然风景等无关元素
3. **内容不抢占**：天气仅存在于状态栏文字 + 最底层背景粒子（`z-index: 0`，`pointer-events: none`），不影响文章区域的可读性、布局和交互

### Weather Code → EVA 映射

| WMO Code | EVA 代号（中文） | 视觉效果（NERV终端语言） | 状态栏显示 |
|----------|-----------------|------------------------|-----------|
| 0-1 | `橙色图案` | 扫描线透光增强、背景微暖（#FF0000 透 3%）、粒子休眠 | `橙色图案` |
| 2-3 | `插入栓待机` | 终端亮度降至 85%、扫描线加重、粒子密度减半 | `插入栓待机` |
| 45-48 | `LCL污染` | Canvas 波动雾层（`#660099` 透 5%）、文字渲染微模糊 `filter: blur(0.3px)` | `LCL污染` |
| 51-55 | `LCL泄漏` | 竖线扫描式下落粒子（80个, 2px宽, `#660099`）、蓝色CRT色调 | `LCL泄漏` |
| 61-65, 80-82 | `使徒接近` | 密集竖线粒子（200个）+ 随机AT力场六边形波纹扩散（1次/3-8秒） | `使徒接近` |
| 71-77, 85-86 | `第二次冲击之冬` | 白色LCL结晶缓降粒子（100个, `#FFFFFF` 透 60%）、蓝色CRT色调 `hue-rotate(180deg)` | `第二次冲击之冬` |
| 95-99 | `使徒来袭` | AT力场过载：全屏白色闪烁（50-200ms, 间隔≥3秒）+ 红色CRT色调 + 屏幕微振 `transform: translate(±2px)` | `使徒来袭` |
| wind>30km/h | `AT力场崩坏` | 粒子水平加速 + AT力场六边形不规则破碎效果（`scale` 随机 ±5%） | `AT力场崩坏` |

### 天气显示组件 (WeatherDisplay)

在 TerminalShell 状态栏中显示。**状态栏全程使用 EVA 术语，不出现 `晴`/`雨`/`雷暴` 等普通词汇。**

```
晴:
  MELCHIOR-1 | BALTHASAR-2 | CASPER-3 | TOKYO-3 | 橙色图案 | SYNC: 99.8%

雷暴:
  MELCHIOR-1 | BALTHASAR-2 | CASPER-3 | TOKYO-3 | 使徒来袭 | SYNC: 89.2%

雪:
  MELCHIOR-1 | BALTHASAR-2 | CASPER-3 | TOKYO-3 | 第二次冲击之冬 | SYNC: 95.1%
```

WeatherDisplay 组件位置：状态栏中段，格式 `城市代号 | EVA天气代号`。城市名获取自 Geolocation 反向地理编码，回退为 `TOKYO-3`。温度以 `XX.X°C` 的形式附加在天气代号后。

### 日期特效系统

| 日期类型 | 触发条件 | 效果 |
|---------|---------|------|
| 适格者诞生日 | 配置文件 `config.json` 中的 `birthday` | 状态栏显示 `> 适格者诞生日`，NERV Logo 变为金色 |
| 使徒袭来纪念日 | 每年 10 月 4 日（EVA 首播） | 全站红色主题 + 状态栏倒计时 `距使徒袭来已 XX 年` |
| 新世纪元旦 | 1 月 1 日 | 状态栏 `> 新世纪：第 XX 年` |
| 季节切换 | 春分/夏至/秋分/冬至 | 粒子颜色随季节变化（春樱/夏绿/秋金/冬冰） |

日期配置存储在 `/config.json`，可选。无配置则仅用系统日期。

### 季节粒子色调

| 季节（中文代号） | 北半球月份 | 粒子主色 | 粒子辅色 |
|-----------------|-----------|---------|---------|
| 春（樱） | 3-5 | `#FF9ECF` | `#FF0000` |
| 夏（绿） | 6-8 | `#00FF88` | `#660099` |
| 秋（金） | 9-11 | `#FFB800` | `#FF0000` |
| 冬（冰） | 12-2 | `#AACCFF` | `#660099` |

### 天气特效性能 & 层级约束

- **不抢占内容**：所有天气视觉效果渲染在 `z-index: 0` 层，`pointer-events: none`，位于文章内容之后、背景色之前。天气粒子不会出现在文章文字上方
- 天气特效在请求完成后异步加载（不阻塞首屏）
- 雨/雪粒子数量：桌面端 120 个，移动端 30 个
- 雷暴闪烁最小间隔 3 秒，防止光敏性问题
- `prefersReducedMotion` → 跳过所有天气动效，仅保留状态栏天气文字
- 天气 API 请求失败 → 静默降级，状态栏不显示天气信息

## 不支持/后置功能

- 评论系统（后续迭代考虑 Giscus）
- RSS 订阅（后续迭代）
- 多语言（后续迭代）
- 管理后台（不需要，Git 管理内容）
- 数据库（不需要，纯静态）
- 用户认证（不需要）

## Edge Cases

- **空文章列表**：显示 `> NO ARCHIVES FOUND. AWAITING FIRST ENTRY...`
- **标签无匹配**：显示 `> QUERY RETURNED 0 RESULTS FOR TAG: [xxx]`
- **搜索无结果**：显示 `> SEARCH: NO MATCHING DOCUMENTS`
- **Markdown 解析失败**：构建时报错，不生成损坏页面（ISR fallback）
- **3D 模型加载失败**：静默降级为 2D SVG 场景
- **WebGL 不可用**：跳过所有 3D，显示静态背景
- **极窄屏幕（<320px）**：最小字号 12px，菜单变为全屏覆盖
- **用户拒绝位置授权**：天气不显示，状态栏无天气段，无降级提示
- **天气 API 超时/失败**：5秒超时，静默降级，状态栏跳过天气
- **GPS 不可用（桌面端）**：基于 IP 的近似位置回退（可选），或默认 "TOKYO-3"
- **离线状态**：使用上次缓存的天气数据（localStorage），过期后静默跳过
