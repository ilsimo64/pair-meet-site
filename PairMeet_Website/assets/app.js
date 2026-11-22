document.addEventListener('DOMContentLoaded',()=>{
  document.body.classList.add('page-enter');
  document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());

  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
  if(toggle&&nav)toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });

  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}
  }),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  const search=document.querySelector('#command-search'),filter=document.querySelector('#command-filter');
  function runFilter(){
    if(!search)return;
    const q=search.value.toLowerCase(),f=filter.value;let count=0;
    document.querySelectorAll('.command').forEach(el=>{
      const ok=el.dataset.search.includes(q)&&(f==='all'||el.dataset.category===f);
      el.hidden=!ok;if(ok)count++;
    });
    const empty=document.querySelector('.empty');if(empty)empty.hidden=count!==0;
  }
  if(search){search.addEventListener('input',runFilter);filter.addEventListener('change',runFilter)}

  // After the destination document loads, lift the same-colour curtain to reveal it.
  if(sessionStorage.getItem('pairmeet-transition-in')==='1'){
    sessionStorage.removeItem('pairmeet-transition-in');
    const curtain=document.createElement('div');curtain.className='page-transition is-lifting';
    curtain.innerHTML='<span class="transition-earth" aria-hidden="true">🌍</span>';
    document.body.appendChild(curtain);
    window.setTimeout(()=>curtain.remove(),650);
  }

  // Internal page links use a falling curtain and two stepped globe-spin bursts.
  document.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{
    if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
    const u=new URL(a.href);
    if(u.origin!==location.origin||u.pathname===location.pathname)return;
    e.preventDefault();
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){location.href=u.href;return}
    const curtain=document.createElement('div');curtain.className='page-transition is-dropping';
    curtain.innerHTML='<span class="transition-earth is-spinning" aria-hidden="true">🌍</span>';
    document.body.appendChild(curtain);
    sessionStorage.setItem('pairmeet-transition-in','1');
    window.setTimeout(()=>{location.href=u.href},2050);
  }));
});
