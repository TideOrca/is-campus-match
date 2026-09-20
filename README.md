# 黑流树海 · 校内赛事报名系统

面向校内《明日方舟》集成战略交流赛的报名与成绩公示平台。纯静态前端 + Supabase 云端数据库，无自建服务器，可直接部署到任意静态托管。

线上地址：<https://match.tideorca.xyz>

## 功能

**报名端**
- 报名表单：昵称、QQ 号、参赛分队、比赛日期，含前后端双重格式校验
- 实时报名人数统计
- 公开得分榜：按得分倒序展示已录入成绩的选手

**管理后台**（`admin.html`）
- 访问密码验证，登录状态存于 sessionStorage
- 按得分排序的选手列表，行内改分即时保存
- 删除报名（二次确认）、手动刷新

## 技术栈

| 层 | 选型 |
|---|---|
| 前端 | 原生 HTML / CSS / JavaScript，无构建步骤 |
| 数据 | Supabase（PostgreSQL）+ 行级安全策略（RLS） |
| 管理后台验证 | 访问密码 + sessionStorage 会话 |
| 部署 | Cloudflare |

前端通过 CDN 引入 `@supabase/supabase-js`，其余为手写代码；得分榜与后台所有动态渲染的字段统一做 HTML 转义。

## 目录结构

```
index.html                  报名页（赛事信息、规则、日程、FAQ、报名弹窗）
script.js                   报名交互、人数统计、得分榜
styles.css                  全站样式
admin.html / admin.js       管理后台（登录、改分、删除）
supabase.sql                建表与行级安全策略（全新部署用）
supabase-config.example.js  配置模板，复制为 supabase-config.js 后填写
assets/                     背景图等静态资源
```

## 本地运行

```bash
# 1. 准备配置
cp supabase-config.example.js supabase-config.js   # 填入自己的项目 URL 与 anon key

# 2. 启动静态服务器（任选其一）
python -m http.server 8080
npx serve .
```

打开 <http://localhost:8080> 即可。`supabase-config.js` 已被 `.gitignore` 忽略，不会进入版本库。

## 数据库配置

1. 在 Supabase 控制台 SQL Editor 中执行 `supabase.sql`。
2. 把项目 URL、anon key 与管理后台访问密码填入 `supabase-config.js`。

## 安全说明

管理后台采用的是轻量访问密码验证，不是真正的账号体系：前端以匿名身份（anon）直连数据库，密码比对在浏览器端完成，登录状态存在 `sessionStorage`。

**请知悉这意味着什么**：`anon key` 按 Supabase 设计是公开密钥，会随前端下发给每个访客；而读取报名列表、改分、删除也都依赖匿名身份。因此任何拿到 `anon key` 的人都能读写这张表，表内报名者的 QQ 号对访问者是可见的。这是「简单验证」方案的固有代价，本项目按此权衡取舍。

访问密码保存在 `supabase-config.js` 中，该文件已被 `.gitignore` 忽略，请勿提交。**不要**把 `service_role` key 放进任何前端代码。

## 声明

非官方、非盈利的校内玩家交流活动。相关游戏素材著作权归上海鹰角网络科技有限公司所有。
