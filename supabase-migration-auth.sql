-- ============================================================
-- 行级安全策略迁移：从「匿名全开放」收紧为「管理端需登录」
-- ============================================================
-- 适用：已经执行过 supabase.sql、线上正在运行的库
-- 执行位置：Supabase 控制台 → SQL Editor → 粘贴执行
--
-- 前置条件（必须先做，否则后台无法登录）：
--   Authentication → Users → Add user，创建管理员账号（邮箱 + 密码）
--   建议同时在 Authentication → Providers → Email 中关闭
--   "Enable email signup"，防止他人自行注册账号
--
-- 迁移前的问题：原策略对 anon 开放了 select / update / delete，
-- 而 anon key 是公开在浏览器中的，等于任何人拿到 key 后
-- 都能读取、修改、删除全部报名数据。
-- ============================================================

-- 1. 移除旧的匿名策略
drop policy if exists "报名者可以提交" on public.registrations;
drop policy if exists "后台可以查看" on public.registrations;
drop policy if exists "后台可以修改得分" on public.registrations;
drop policy if exists "后台可以删除报名" on public.registrations;

-- 2. 报名端：匿名用户只能提交报名，不能读取他人数据
create policy "报名者可以提交"
  on public.registrations for insert to anon
  with check (
    char_length(name) between 1 and 30
    and char_length(qq) between 4 and 20
    and match_date between date '2026-10-01' and date '2026-10-07'
  );

-- 3. 公开得分榜：匿名仅能读取「已录入得分」的记录，
--    且列权限收窄到榜单实际需要的三列（不暴露 QQ 号与报名时间）
revoke select on public.registrations from anon;
grant select (name, team, score) on public.registrations to anon;

create policy "公榜可读已录入得分"
  on public.registrations for select to anon
  using (score is not null);

-- 4. 管理端：仅已登录管理员可查看全部、修改得分、删除报名
create policy "管理员可以查看"
  on public.registrations for select to authenticated using (true);

create policy "管理员可以修改得分"
  on public.registrations for update to authenticated
  using (true) with check (score is null or score between 0 and 999);

create policy "管理员可以删除报名"
  on public.registrations for delete to authenticated using (true);

-- 5. 报名人数统计改用安全定义函数，
--    避免为了拿到总数而向匿名用户开放整表行读取
create or replace function public.registration_count()
returns bigint
language sql
security definer
set search_path = public
as $$ select count(*) from public.registrations; $$;

revoke all on function public.registration_count() from public;
grant execute on function public.registration_count() to anon, authenticated;
