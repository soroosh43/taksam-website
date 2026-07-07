
const body=document.body;const btn=document.getElementById('langToggle');const year=new Date().getFullYear();document.querySelectorAll('[data-year]').forEach(el=>el.textContent=year);function setLang(lang){if(lang==='fa'){body.classList.remove('lang-en');body.classList.add('lang-fa');body.setAttribute('dir','rtl');body.setAttribute('lang','fa');if(btn)btn.textContent='English';}else{body.classList.remove('lang-fa');body.classList.add('lang-en');body.setAttribute('dir','ltr');body.setAttribute('lang','en');if(btn)btn.textContent='فارسی';}localStorage.setItem('taksam-active-language',lang)}if(btn)btn.addEventListener('click',()=>setLang(body.classList.contains('lang-en')?'fa':'en'));setLang(localStorage.getItem('taksam-active-language')||'en');

// v5 live homepage slideshow
(function(){
  const slides=[...document.querySelectorAll('.hero-slideshow .slide')];
  const dots=[...document.querySelectorAll('.hero-slideshow .slide-dot')];
  if(!slides.length) return;
  let idx=0;
  function show(i){
    idx=(i+slides.length)%slides.length;
    slides.forEach((s,n)=>s.classList.toggle('active',n===idx));
    dots.forEach((d,n)=>d.classList.toggle('active',n===idx));
  }
  dots.forEach((d,n)=>d.addEventListener('click',()=>show(n)));
  setInterval(()=>show(idx+1),4500);
})();
