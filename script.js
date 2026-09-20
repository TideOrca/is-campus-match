const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.topbar nav');
const dialog = document.querySelector('#signupDialog');
const form = document.querySelector('#signupForm');
const success = dialog.querySelector('.success');
const teamOptions = ['指挥分队','后勤分队','矛头分队','破坏战术分队','突击战术分队','堡垒战术分队','远程战术分队','高台突破分队','地面突破分队','本源研修分队','地质调查分队','文明开化分队','开拓者分队','多边贸易分队'];
const supaCfg = window.SUPABASE_CONFIG || {};
const supa = window.supabase && supaCfg.url && !supaCfg.url.includes('YOUR-') ? window.supabase.createClient(supaCfg.url, supaCfg.anonKey) : null;
const controlStyle = document.createElement('style'); controlStyle.textContent = '#signupForm input:not([type="checkbox"]),#signupForm select{display:block;width:100%;height:48px;margin-top:8px;padding:0 14px;border:1px solid #a8aaa7;border-radius:0;background:#fff;color:#101313;font-family:"Noto Sans SC",sans-serif;font-size:14px;line-height:48px;appearance:none}#signupForm select{background-image:linear-gradient(45deg,transparent 50%,#171b18 50%),linear-gradient(135deg,#171b18 50%,transparent 50%);background-position:calc(100% - 18px) 20px,calc(100% - 13px) 20px;background-size:5px 5px,5px 5px;background-repeat:no-repeat;padding-right:38px}#signupForm input:focus,#signupForm select:focus{outline:2px solid #a7e328;outline-offset:0;border-color:#171b18}#signupForm button:hover{filter:brightness(1.08);transform:translateY(-1px)}'; document.head.appendChild(controlStyle);
const modalStyle=document.createElement('style'); modalStyle.textContent='#signupDialog{width:min(560px,calc(100% - 28px));padding:0;background:#e9eae5;border:0;border-top:6px solid #a7e328;box-shadow:0 30px 90px #000b}#signupDialog:before{content:"IS / CAMPUS TERMINAL  ·  ENTRY 04";display:block;padding:15px 38px 13px;background:#151a18;color:#a7e328;font:10px "Roboto Mono";letter-spacing:1.2px}#signupDialog>.close-modal{top:48px;right:22px;color:#e9eae5;font-size:24px}#signupDialog>.eyebrow,#signupDialog>h2,#signupDialog>form,#signupDialog>.success{margin-left:42px;margin-right:42px}#signupDialog>.eyebrow{margin-top:31px;margin-bottom:8px;font-size:10px;color:#6d746d}#signupDialog h2{font-size:36px;letter-spacing:1px;margin-top:0;margin-bottom:28px}#signupForm label{position:relative;display:block;padding-top:4px;margin:18px 0;color:#353b36;font:700 11px "Roboto Mono";letter-spacing:.4px}#signupForm label:before{content:"";display:inline-block;width:12px;height:3px;background:#a7e328;margin:0 7px 3px 0}#signupForm .primary-btn{width:100%;margin-top:17px;text-align:left;display:flex;justify-content:space-between;align-items:center}#signupForm small{display:block;margin:17px 0 35px;color:#727a73;font-size:11px}#signupDialog .success{padding:20px 0 42px;text-align:left}#signupDialog .success b{position:relative;display:grid;place-items:center;width:74px;height:74px;margin:15px 0 22px;background:#151a18;color:#a7e328;font:32px "Roboto Mono";clip-path:polygon(0 0,78% 0,100% 22%,100% 100%,0 100%)}#signupDialog .success b:after{content:"TRANSMISSION ACCEPTED";position:absolute;left:88px;top:30px;white-space:nowrap;color:#6d746d;font:10px "Roboto Mono"}#signupDialog .success h3{font-size:30px;margin:0 0 10px}#signupDialog .success p{color:#687069;margin:0 0 24px}#signupDialog .success .primary-btn{background:#151a18;color:#e9eae5}#signupDialog .success .primary-btn span{color:#a7e328}@media(max-width:600px){#signupDialog>.eyebrow,#signupDialog>h2,#signupDialog>form,#signupDialog>.success{margin-left:24px;margin-right:24px}#signupDialog:before{padding-left:24px}.group-pop img{width:190px}}'; document.head.appendChild(modalStyle);
document.querySelector('.open-modal').innerHTML='提交报名 <span>→</span>'; document.querySelector('.success p').textContent='报名信息已保存。';
const extraStyle=document.createElement('style');extraStyle.textContent='.top-tools{display:inline-flex;align-items:center;gap:22px;position:relative}.top-tools .group-entry,.top-tools .score-entry{display:inline-flex;align-items:center;gap:5px;padding:0;border:0;background:none;color:inherit;font-family:"Noto Sans SC",sans-serif;font-size:13px;font-weight:700;line-height:1.4;cursor:pointer}.top-tools .group-entry:hover,.top-tools .score-entry:hover{background:none;color:#698f0e}.group-pop{display:none;position:absolute;left:-18px;top:calc(100% + 16px);z-index:5;padding:12px;background:#f5f5f0;border:1px solid #8e968e;border-radius:18px;box-shadow:0 18px 45px #0005}.group-pop:before{content:"";position:absolute;top:-8px;left:35px;width:14px;height:14px;background:#f5f5f0;border-left:1px solid #8e968e;border-top:1px solid #8e968e;transform:rotate(45deg)}.group-pop img{display:block;width:220px;height:auto;max-height:300px;object-fit:contain;border-radius:10px}.group-entry:hover .group-pop{display:block}.score-dialog{width:min(680px,calc(100% - 28px));max-height:80vh}.score-dialog h2{margin-bottom:8px}.score-updated{color:#778078;font-size:12px}.score-table-wrap{overflow:auto}.score-dialog table{border-collapse:collapse;width:100%;min-width:450px}.score-dialog th,.score-dialog td{padding:12px 10px;border-bottom:1px solid #c5c8c2;text-align:left;font-size:13px}.score-dialog th{font:10px "Roboto Mono";color:#727a73}.close-score{position:absolute;right:16px;top:12px;border:0;background:none;font-size:24px;cursor:pointer}@media(max-width:800px){.top-tools{width:100%;gap:12px;flex-wrap:wrap}.top-tools button{white-space:nowrap}.topbar nav.open .top-tools{display:flex}.group-pop img{width:190px;max-height:260px}}';document.head.appendChild(extraStyle);
const statement=document.querySelector('.statement');
const topNav=document.querySelector('.topbar nav');
topNav.insertAdjacentHTML('afterbegin','<span class="top-tools"><button class="group-entry" type="button">加入群聊<span class="group-pop"><img src="qq.jpg" alt="赛事群二维码"></span></button><button class="score-entry" type="button">得分榜</button></span>');
const countTarget=document.querySelector('.status-strip div:nth-child(3) strong');
async function loadRegistrationCount(){if(!supa||!countTarget)return;const {count,error}=await supa.from('registrations').select('*',{count:'exact',head:true});if(!error)countTarget.textContent=`${count??0} 名选手`;}
loadRegistrationCount();
document.body.insertAdjacentHTML('beforeend','<dialog id="scoreDialog" class="score-dialog"><button class="close-score" aria-label="关闭">×</button><p class="eyebrow"><span></span> 实时记录</p><h2>当前得分榜</h2><p class="score-updated" id="scoreUpdated">正在读取…</p><div class="score-table-wrap"><table><thead><tr><th>排名</th><th>姓名</th><th>分队</th><th>得分</th></tr></thead><tbody id="scoreBody"></tbody></table></div></dialog>');
const scoreDialog=document.querySelector('#scoreDialog');
document.querySelector('.score-entry').addEventListener('click',()=>{scoreDialog.showModal();loadScoreboard()}); document.querySelector('.close-score').addEventListener('click',()=>scoreDialog.close());
async function loadScoreboard(){const scoreBody=document.querySelector('#scoreBody');if(!supa){scoreBody.innerHTML='<tr><td colspan="4">数据库尚未配置。</td></tr>';return}const {data,error}=await supa.from('registrations').select('name,team,score').not('score','is',null).order('score',{ascending:false});if(error){scoreBody.innerHTML=`<tr><td colspan="4">读取失败：${error.message}</td></tr>`;return}scoreBody.innerHTML=data.map((p,i)=>`<tr><td>${i+1}</td><td>${escapeText(p.name)}</td><td>${escapeText(p.team)}</td><td><strong>${p.score}</strong></td></tr>`).join('')||'<tr><td colspan="4">暂无已录入得分</td></tr>';document.querySelector('#scoreUpdated').textContent=`共 ${data.length} 名选手 · 仅显示已录入得分`;}
function escapeText(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
form.innerHTML = `<label>昵称<input name="name" required maxlength="30" placeholder="请输入昵称"></label><label>QQ号<input name="qq" required maxlength="20" inputmode="numeric" pattern="[0-9]{4,20}" placeholder="请输入QQ号"></label><label>分队<select name="team" required><option value="">请选择分队</option>${teamOptions.map(t=>`<option>${t}</option>`).join('')}</select></label><label>比赛日期<select name="match_date" required><option value="">请选择比赛日期</option>${[1,2,3,4,5,6,7].map(d=>`<option value="2026-10-${String(d).padStart(2,'0')}">2026年10月${d}日</option>`).join('')}</select></label><button class="primary-btn" type="submit">提交报名 <span>→</span></button><small>报名信息仅用于本次校内比赛。</small>`;
const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('is-visible');
}), { threshold: 0.14 });
document.querySelectorAll('.section, .register, .rule-list article, .timeline li').forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
const heroBackground = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroBackground.style.transform = `scale(1.02) translateY(${Math.min(window.scrollY * 0.08, 38)}px)`;
  }
}, { passive: true });

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelector('.open-modal').addEventListener('click', () => dialog.showModal());
dialog.querySelector('.close-modal').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (!supa) { localStorage.setItem('is-campus-interest', JSON.stringify(data)); form.hidden = true; success.hidden = false; return; }
  const button = form.querySelector('button'); button.disabled = true; button.textContent = '提交中…';
  supa.from('registrations').insert(data).then(({error}) => { if (error) { button.disabled = false; button.textContent = '提交报名 →'; alert('提交失败，请稍后重试：'+error.message); return; } form.hidden = true; success.hidden = false; });
});

dialog.querySelector('.close-success').addEventListener('click', () => dialog.close());
