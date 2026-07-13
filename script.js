
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


// v12 scroll-triggered animated counters and trust-title reveal
(function(){
  const stats = document.querySelector('.stats');
  const counters = document.querySelectorAll('.counter[data-target]');
  const trust = document.querySelector('.trusted-clients');

  function formatCounter(value, suffix){
    return Math.floor(value).toLocaleString('en-US') + (suffix || '');
  }

  function runCounters(){
    counters.forEach((el) => {
      if (el.dataset.done === '1') return;
      el.dataset.done = '1';
      const target = parseInt(el.dataset.target || '0', 10);
      const suffix = el.dataset.suffix || '';
      const duration = target >= 300 ? 1450 : 1150;
      const start = performance.now();

      function step(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = formatCounter(target * eased, suffix);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('en-US') + suffix;
      }
      requestAnimationFrame(step);
    });
  }

  if ('IntersectionObserver' in window){
    if (stats){
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting){
            stats.classList.add('in-view');
            runCounters();
            statsObserver.disconnect();
          }
        });
      }, {threshold: 0.25});
      statsObserver.observe(stats);
    }

    if (trust){
      const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting){
            trust.classList.add('in-view');
            trustObserver.disconnect();
          }
        });
      }, {threshold: 0.18});
      trustObserver.observe(trust);
    }
  } else {
    if (stats) stats.classList.add('in-view');
    if (trust) trust.classList.add('in-view');
    runCounters();
  }
})();
