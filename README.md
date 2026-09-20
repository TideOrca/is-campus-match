# 黑流树海 · 校内赛事报名系统

面向校内《明日方舟》集成战略交流赛的报名与成绩公示平台。纯静态前端 + Supabase 云端数据库，无自建服务器，可直接部署到任意静态托管。

线上地址：<https://match.tideorca.xyz>

## 功能

**报名端**
- 报名表单：昵称、QQ 号、参赛分队、比赛日期，含前后端双重格式校验
- 实时报名人数统计
- 公开得分榜：按得分倒序展示已录入成绩的选手

**管理后台**（`admin.html`）
- Supabase Auth 邮箱密码登录，未登录不可读写数据
- 按得分排序的选手列表，行内改分即时保存
- 删除报名（二次确认）、手动刷新

## 技术栈

| 层 | 选型 |
|---|---|
| 前端 | 原生 HTML / CSS / JavaScript，无构建步骤 |
| 数据 | Supabase（PostgreSQL）+ 行级安全策略（RLS） |
| 认证 | Supabase Auth（邮箱密码） |
| 部署 | Cloudflare |

前端通过 CDN 引入 `@supabase/supabase-js`，其余为手写代码；得分榜与后台所有动态渲染的字段统一做 HTML 转义。

## 目录结构

```
index.html                  报名页（赛事信息、规则、日程、FAQ、报名弹窗）
script.js                   报名交互、人数统计、得分榜
styles.css                  全站样式
admin.html / admin.js       管理后台（登录、改分、删除）
supabase.sql                建表与行级安全策略（全新部署用）
supabase-migration-auth.sql 已上线项目的 RLS 收紧迁移脚本
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

1. 在 Supabase 控制台 SQL Editor 中执行 `supabase.sql`（已上线项目改用 `supabase-migration-auth.sql`）。
2. 在 Authentication → Users 中创建管理员账号（后台登录用）。
3. 在 Authentication → Providers → Email 中关闭公开注册，避免他人自行注册账号。
4. 把项目 URL 与 anon key 填入 `supabase-config.js`。

## 安全说明

数据库中保存了报名者的 QQ 号，因此行级安全策略按最小权限设计：

- 匿名用户（anon）只能提交报名，不能读取他人数据
- 公开得分榜所需的姓名、分队、得分三列单独授权，其余列（QQ 号、报名时间）匿名不可读，且只能读到已录入得分的记录
- 查看全部报名、修改得分、删除记录均要求已登录的管理员身份
- 报名人数统计通过 `registration_count()` 函数返回，避免为计数而开放整表读取

`anon key` 按 Supabase 设计是公开密钥，可以出现在浏览器中；数据安全由上述策略保证。**不要**把 `service_role` key 放进任何前端代码。

## 声明

非官方、非盈利的校内玩家交流活动。相关游戏素材著作权归上海鹰角网络科技有限公司所有。
