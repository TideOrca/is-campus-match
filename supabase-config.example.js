// Supabase 项目配置模板
//
// 使用方式：将本文件复制为 supabase-config.js，填入自己的项目信息。
// supabase-config.js 已被 .gitignore 忽略，不会进入版本库。
// 项目地址与 anon key 可在 Supabase 控制台 Project Settings → API 中获取。
//
// 注意：anon key 是设计为公开的客户端密钥，可以暴露在浏览器中；
// 数据安全依赖数据库的行级安全策略（RLS），不要把 service_role key 放进前端。
// 管理员身份通过 Supabase Auth 登录，不在此处配置任何密码。
window.SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT-REF.supabase.co',
  anonKey: 'YOUR-ANON-PUBLISHABLE-KEY'
};
