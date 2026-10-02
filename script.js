/* Bozkurt Robotik v2. No libraries, no network requests, no tracking. */
(() => {
  'use strict';
  const TEXT = {"tr":{"modes":["Konum","Hız","Akım"],"modeValues":["45°","1200 dev/dk","Iₕₑdₑf"],"tabs":["Tanılama","Kontrol tasarımı","Telemetri"],"tabTitles":["Motor davranışını karakterize edin.","Uygulamaya uygun kontrolü oluşturun.","Tepkiyi ve durumu birlikte izleyin."],"tabNotes":["Kontrollü test, modelleme ve parametre kestirimi için hedeflenen iş akışı.","Konum, hız ve akım kontrolü için geliştirilen mimariler.","Örnek çizimdir. Gerçek motor verisi veya performans sonucu göstermez."],"chartLabels":["Örnek uyarım","Hedef / tepki","Örnek sinyal"],"motion":"Animasyonları durdur","resume":"Animasyonları oynat","openMenu":"Menüyü aç","closeMenu":"Menüyü kapat","copy":"Adresi kopyala","copied":"Adres kopyalandı","copyError":"Adresi seçip kopyalayın","productLabels":["ANA TEKNOLOJİ","STANDART SENSÖR MODÜLÜ","İLERİ SEVİYE SENSÖR MODÜLÜ"],"productNames":["Akıllı DC Motor Kontrolcü","9 Serbestlik Dereceli IMU","Yüksek Performans Hedefli IMU"],"productStates":["Prototip / doğrulama","Ticarileştirme hazırlığı","Ar-Ge aşamasında"],"productDescriptions":["Enkoderli fırçalı DC motorlar için karakterizasyon, kontrolcü tasarımı ve konum, hız, akım kontrolünü birleştirmeyi hedefleyen platform.","Genel robotik, gömülü sistem ve araştırma uygulamaları için ivmeölçer, jiroskop ve manyetometreyi bir araya getiren modül.","Robotik ve hareket kestirimi araştırmalarına yönelik, ayrı bir performans seviyesinde geliştirilen ikinci IMU ailesi."],"modalStatus":"Geliştirme durumu","modalArchitecture":"Ürün yaklaşımı","modalInquiry":"Bu ürün hakkında yazın","subject":"Bozkurt Robotik — Ürün ve iş birliği talebi","algoValues":["Konum · Hız · Akım","PI / PD / PID · LQR / LQI · MRAC","Bozucu gözlemcisi · Genişletilmiş durum gözlemcisi"],"algoNote":"Bu mimariler geliştirme ve doğrulama kapsamındadır.","sensorAxes":"İvme / Açısal hız / Manyetik alan","motorModes":"Konum / Hız / Akım","architecture":"Mimari gösterim · Ürün fotoğrafı değildir"},"en":{"modes":["Position","Velocity","Current"],"modeValues":["45°","1200 rpm","Iₜₐᵣɡₑₜ"],"tabs":["Identification","Control design","Telemetry"],"tabTitles":["Characterize motor behavior.","Create application-oriented control.","Monitor response and status together."],"tabNotes":["A target workflow for controlled testing, modeling and parameter estimation.","Architectures under development for position, velocity and current control.","Illustrative chart. Not actual motor data or a performance result."],"chartLabels":["Sample excitation","Target / response","Sample signal"],"motion":"Pause animations","resume":"Play animations","openMenu":"Open menu","closeMenu":"Close menu","copy":"Copy address","copied":"Address copied","copyError":"Select and copy the address","productLabels":["CORE TECHNOLOGY","STANDARD SENSOR MODULE","ADVANCED SENSOR MODULE"],"productNames":["Intelligent DC Motor Controller","9-DoF IMU Module","Advanced 9-DoF IMU"],"productStates":["Prototype / validation","Commercialization preparation","Research & development"],"productDescriptions":["A platform under development to combine characterization, controller design and position, velocity and current control for brushed DC motors with encoders.","An accelerometer, gyroscope and magnetometer in one module for general robotics, embedded systems and research applications.","A second IMU family being developed at a higher performance tier for robotics and motion estimation research."],"modalStatus":"Development status","modalArchitecture":"Product approach","modalInquiry":"Ask about this product","subject":"Bozkurt Robotik — Product and partnership inquiry","algoValues":["Position · Velocity · Current","PI / PD / PID · LQR / LQI · MRAC","Disturbance observer · Extended state observer"],"algoNote":"These architectures are in development and validation.","sensorAxes":"Acceleration / Angular velocity / Magnetic field","motorModes":"Position / Velocity / Current","architecture":"Architecture illustration · Not a product photograph"}};
  const language = document.documentElement.lang === 'en' ? 'en' : 'tr';
  const t = TEXT[language];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };
  let preference = storage.get('br-motion-v2');
  let paused = preference ? preference === 'paused' : motionQuery.matches;
  let requestSceneRender = () => {};

  // The locale is part of the URL, so every page is readable without JavaScript.
  $$('.lang-link').forEach(link => {
    link.addEventListener('click', () => {
      const hash = window.location.hash;
      if (hash) link.href = link.href.split('#')[0] + hash;
    });
  });
  $$('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  // Manual pause also works when the system has not requested reduced motion.
  function applyMotion() {
    document.body.classList.toggle('motion-paused', paused);
    document.documentElement.style.scrollBehavior = paused ? 'auto' : '';
    const button = $('.motion-button');
    if (button) {
      const label = paused ? t.resume : t.motion;
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(paused));
      $('.sr-only', button).textContent = label;
      $('svg', button).innerHTML = paused
        ? '<path d="m8 5 11 7-11 7Z"/>'
        : '<path d="M8 5v14M16 5v14"/>';
    }
    requestSceneRender();
  }
  $('.motion-button')?.addEventListener('click', () => {
    paused = !paused;
    preference = paused ? 'paused' : 'running';
    storage.set('br-motion-v2', preference);
    applyMotion();
  });
  motionQuery.addEventListener?.('change', () => {
    if (!preference) { paused = motionQuery.matches; applyMotion(); }
  });
  applyMotion();

  // Mobile navigation. Menu, Escape and all anchor links use the same close path.
  const menuButton = $('.menu-toggle');
  const menu = $('#mobile-nav');
  function setMenu(open, returnFocus = false) {
    if (!menuButton || !menu) return;
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? t.closeMenu : t.openMenu);
    if (returnFocus) menuButton.focus();
  }
  menuButton?.addEventListener('click', () => setMenu(menu.hidden));
  $$('#mobile-nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu && !menu.hidden) setMenu(false, true);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) setMenu(false);
  }, {passive:true});

  // Progressive enhancement: content is never hidden unless observers exist.
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    }, {threshold:.08, rootMargin:'0px 0px -20px 0px'});
    $$('[data-reveal]').forEach(el => reveal.observe(el));
    document.body.classList.add('motion-ready');

    const steps = $$('.story-step');
    const ratios = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => ratios.set(entry.target, entry.intersectionRatio));
      const best = steps.reduce((a, b) => (ratios.get(a) || 0) > (ratios.get(b) || 0) ? a : b);
      if (!best || !(ratios.get(best) > 0)) return;
      const index = best.dataset.step;
      steps.forEach(step => step.classList.toggle('is-current', step === best));
      $$('.flow-node').forEach(node => node.classList.toggle('is-active', node.dataset.node === index));
    }, {rootMargin:'-15% 0px -35% 0px', threshold:[0,.2,.4,.6,.8,1]});
    steps.forEach(step => observer.observe(step));

    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$('.desktop-nav a').forEach(link => {
          if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-20% 0px -60% 0px',threshold:0});
    ['technology','products','software','about'].forEach(id => {
      const el = document.getElementById(id);
      if(el) navObserver.observe(el);
    });
  }

  let scrollTick = false;
  function updateScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    $('.reading-progress')?.style.setProperty('transform', `scaleX(${Math.min(1, window.scrollY / max)})`);
    document.body.classList.toggle('is-scrolled', window.scrollY > 15);
    scrollTick = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTick) { scrollTick = true; requestAnimationFrame(updateScroll); }
  }, {passive:true});
  updateScroll();

  // Desktop UI is explicitly illustrative. These traces are not measurements.
  const traces = [
    ['M0 147H95V49H320V128H540V76H700','M0 147H95C105 145 119 62 140 49S173 49 203 49H320C340 49 350 132 383 128H540C565 128 577 71 604 76H700'],
    ['M0 155H115V59H700','M0 155H115C142 154 157 45 185 38S230 69 273 60S348 59 396 59H700'],
    ['M0 103H700','M0 110C25 109 30 74 57 74S84 123 113 118S147 66 173 76S202 128 232 107S259 66 288 86S322 130 352 100S382 69 410 91S445 122 476 92S510 72 541 96S572 122 603 94S639 77 668 99L700 101']
  ];
  const tabs = $$('[data-tab]');
  function setTab(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    $('#studio-panel')?.setAttribute('aria-labelledby', `tab-${index}`);
    if (focus) tabs[index]?.focus();
    $('#studio-label').textContent = t.tabs[index];
    $('#studio-title').textContent = t.tabTitles[index];
    $('#studio-note').textContent = t.tabNotes[index];
    $('#chart-label').textContent = t.chartLabels[index];
    $('#chart-reference').setAttribute('d', traces[index][0]);
    const signal = $('#chart-signal');
    signal.setAttribute('d', traces[index][1]);
    if (!paused && signal.animate) {
      const length = signal.getTotalLength();
      signal.getAnimations().forEach(a => a.cancel());
      signal.animate([
        {strokeDasharray:String(length), strokeDashoffset:String(length)},
        {strokeDasharray:String(length), strokeDashoffset:'0'}
      ], {duration:1100, easing:'cubic-bezier(.22,1,.36,1)'});
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setTab(index));
    tab.addEventListener('keydown', e => {
      let next = index;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index+1)%tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index+tabs.length-1)%tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length-1;
      else return;
      e.preventDefault(); setTab(next,true);
    });
  });

  // Product details use native dialog keyboard support and restore trigger focus.
  const dialog = $('.product-dialog');
  let lastTrigger = null;
  const specific = language === 'tr' ? [
    ['<p><b>Motor:</b> Enkoderli fırçalı DC</p><p><b>Kontrol:</b> Konum, hız ve akım</p><p><b>Yapılar:</b> PI / PD / PID, LQR / LQI, MRAC</p><p><b>Kestirim:</b> Bozucu ve genişletilmiş durum gözlemcileri</p>',
     'İlk prototip tamamlandı. Donanım revizyonu, kontrol yazılımı, bilgisayar arayüzü ve doğrulama çalışmaları devam ediyor. Akım, gerilim, haberleşme ve boyut değerleri henüz burada yayımlanmamıştır.'],
    ['<p><b>İvmeölçer + jiroskop:</b> LSM6DSOXTR</p><p><b>Üç eksenli manyetometre:</b> MMC5603NJ</p><p><b>Ürün ailesi:</b> Standart / erişilebilir 9 serbestlik dereceli IMU</p>',
     'Üretim ve ticarileştirme hazırlığındadır. Sistem düzeyinde doğrulanmış gürültü, yönelim doğruluğu veya navigasyon performansı değerleri sunulmuyor. Güncel ürün bilgisi için bize yazın.'],
    ['<p><b>İvmeölçer + jiroskop:</b> ICM-42688</p><p><b>Üç eksenli manyetometre:</b> MMC5983MA</p><p><b>Ürün ailesi:</b> İleri seviye 9 serbestlik dereceli IMU</p>',
     'Standart IMU’nun bir revizyonu değil, farklı bir uygulama seviyesine yönelik ikinci bir üründür. Ar-Ge aşamasındadır. Satışa hazır ürün veya doğrulanmış navigasyon sınıfı iddiası değildir.']
  ] : [
    ['<p><b>Motor:</b> Brushed DC with encoder</p><p><b>Control:</b> Position, velocity and current</p><p><b>Methods:</b> PI / PD / PID, LQR / LQI, MRAC</p><p><b>Estimation:</b> Disturbance and extended state observers</p>',
     'The first prototype is complete. Hardware revisions, control software, desktop interface and validation are in progress. Current, voltage, communication interface and size specifications are not yet published here.'],
    ['<p><b>Accelerometer + gyroscope:</b> LSM6DSOXTR</p><p><b>Three-axis magnetometer:</b> MMC5603NJ</p><p><b>Product family:</b> Standard / accessible 9-DoF IMU</p>',
     'In production and commercialization preparation. No validated system-level noise, attitude accuracy or navigation performance figures are claimed. Contact us for current product information.'],
    ['<p><b>Accelerometer + gyroscope:</b> ICM-42688</p><p><b>Three-axis magnetometer:</b> MMC5983MA</p><p><b>Product family:</b> Advanced 9-DoF IMU</p>',
     'A separate product for a different application tier, not a revision of the standard IMU. In R&D, not a ready-to-sell product or a claim of validated navigation-grade performance.']
  ];
  $$('[data-product]').forEach(button => {
    button.addEventListener('click', () => {
      const i = Number(button.dataset.product);
      if (!dialog || !Number.isInteger(i) || !specific[i]) return;
      lastTrigger = button;
      $('#dialog-label').textContent = t.productLabels[i];
      $('#dialog-title').textContent = t.productNames[i];
      $('.dialog-status').textContent = t.modalStatus + ': ' + t.productStates[i];
      $('.dialog-description').textContent = t.productDescriptions[i];
      $('.dialog-spec').innerHTML = specific[i][0]; // Static, authored local content only.
      $('.dialog-caveat').textContent = specific[i][1];
      $('.dialog-inquiry').href = 'mailto:info@bozkurtrobotik.com?subject=' +
        encodeURIComponent('Bozkurt Robotik — ' + t.productNames[i]);
      document.body.classList.add('dialog-open');
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      $('.dialog-close').focus();
    });
  });
  function closeDialog() {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else { dialog.removeAttribute('open'); document.body.classList.remove('dialog-open'); lastTrigger?.focus(); }
  }
  $('.dialog-close')?.addEventListener('click', closeDialog);
  dialog?.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastTrigger?.focus(); });
  dialog?.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) closeDialog();
  });

  // Copying an address is not a message submission. Never report "sent".
  $('[data-copy]')?.addEventListener('click', async () => {
    const feedback = $('.copy-feedback');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText('info@bozkurtrobotik.com');
      feedback.textContent = t.copied;
    } catch {
      const range = document.createRange();
      range.selectNodeContents($('.email-address'));
      const selection = window.getSelection();
      selection.removeAllRanges(); selection.addRange(range);
      feedback.textContent = t.copyError;
    }
  });

  // The hero is a mathematical motion illustration, not a product model or test.
  // A capped DPR, frame rate, visibility observer and reduced-motion control keep
  // rendering bounded. Only the visible hero uses requestAnimationFrame.
  const canvas = $('#motion-canvas');
  const stage = $('.orbital-stage');
  const scene = $('[data-scene]');
  if (!canvas || !stage || !scene) return;
  const ctx = canvas.getContext('2d', {alpha:true});
  if (!ctx) return;
  let width = 0, height = 0, dpr = 1;
  let frameId = 0, visible = true, lastTime = 0, animationTime = 0;
  let mode = 0, px = 0, py = 0, targetX = 0, targetY = 0;
  const points = [];
  const U = 100, V = 20;
  for (let i=0; i<U; i++) {
    const u = i/U*Math.PI*2;
    for (let j=0; j<V; j++) {
      const v = j/V*Math.PI*2;
      points.push({u,v,i,j});
    }
  }
  const clamp = (x,a,b) => Math.max(a,Math.min(b,x));
  function project(x,y,z,rx,ry,rz) {
    const y1=y*Math.cos(rx)-z*Math.sin(rx), z1=y*Math.sin(rx)+z*Math.cos(rx);
    const x2=x*Math.cos(ry)+z1*Math.sin(ry), z2=-x*Math.sin(ry)+z1*Math.cos(ry);
    const x3=x2*Math.cos(rz)-y1*Math.sin(rz), y3=x2*Math.sin(rz)+y1*Math.cos(rz);
    const perspective=8/(8-z2);
    return {x:width*.5+x3*width*.136*perspective,
            y:height*.51+y3*width*.136*perspective,z:z2,p:perspective};
  }
  function paint(time) {
    if (width < 1 || height < 1) return;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,width,height);
    const seconds=time*.001;
    px+=(targetX-px)*.075; py+=(targetY-py)*.075;
    const rx=.68+py*.12+Math.sin(seconds*.16)*.025;
    const ry=-.34+px*.16;
    const rz=-.36+Math.sin(seconds*.13)*.04;
    const phase=seconds*(mode===1?.55:.13);
    const tube=mode===2 ? .55+Math.sin(seconds*1.9)*.045 : .55;

    // Fine orbital guide rings in the same projected coordinate system.
    [3.18,3.5].forEach((r,k) => {
      ctx.beginPath();
      for(let a=0;a<=128;a++){
        const angle=a/128*Math.PI*2;
        const p=project(r*Math.cos(angle),r*Math.sin(angle),0,rx,ry,rz);
        if(a===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);
      }
      ctx.strokeStyle=k?'rgba(75,105,124,.10)':'rgba(75,105,124,.19)';
      ctx.lineWidth=.7; ctx.setLineDash(k?[1,7]:[]); ctx.stroke();
    });
    ctx.setLineDash([]);

    const drawn=points.map(p=>{
      const u=p.u+phase;
      const r=2.19+tube*Math.cos(p.v);
      const z=tube*Math.sin(p.v);
      const pos=project(r*Math.cos(u),r*Math.sin(u),z,rx,ry,rz);
      const red=(p.i>10 && p.i<19 && p.j<11);
      return {...pos,red,j:p.j};
    }).sort((a,b)=>a.z-b.z);
    for(const p of drawn){
      const shade=clamp((p.z+2.7)/5.4,0,1);
      const alpha=.20+shade*.72;
      const radius=(.48+shade*.8)*p.p*(width/570);
      ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.4,radius),0,Math.PI*2);
      ctx.fillStyle=p.red?`rgba(208,44,31,${alpha})`:`rgba(26,58,78,${alpha})`;
      ctx.fill();
    }
    // Longitudinal filaments make the orbital form legible even while paused.
    for(let j=0;j<10;j++){
      const v=j/10*Math.PI*2, r=2.19+tube*Math.cos(v), z=tube*Math.sin(v);
      ctx.beginPath();
      for(let i=0;i<=100;i++){
        const u=i/100*Math.PI*2+phase;
        const p=project(r*Math.cos(u),r*Math.sin(u),z,rx,ry,rz);
        if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);
      }
      ctx.strokeStyle='rgba(41,78,101,.10)';ctx.lineWidth=.65;ctx.stroke();
    }
    // A deliberate red arc and three moving markers, not random decoration.
    ctx.beginPath();
    for(let i=0;i<=28;i++){
      const u=phase*.6+3.45+i/28*.75;
      const p=project(3.18*Math.cos(u),3.18*Math.sin(u),0,rx,ry,rz);
      if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);
    }
    ctx.strokeStyle='#d52b20';ctx.lineWidth=1.6;ctx.stroke();
    for(let k=0;k<3;k++){
      const u=phase*.42+k*Math.PI*2/3+.3;
      const p=project(3.18*Math.cos(u),3.18*Math.sin(u),0,rx,ry,rz);
      ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fillStyle=k===0?'#d52b20':'#7893a3';ctx.fill();
      ctx.beginPath();ctx.arc(p.x,p.y,7,0,Math.PI*2);ctx.strokeStyle='rgba(105,137,155,.20)';ctx.lineWidth=1;ctx.stroke();
    }
  }
  function loop(now){
    frameId=0;
    if(paused || !visible || document.hidden) {lastTime=0;return;}
    const interval=window.innerWidth<700?1000/30:1000/45;
    if(!lastTime || now-lastTime>=interval){
      const delta=lastTime?Math.min(now-lastTime,70):0;
      animationTime+=delta;lastTime=now;paint(animationTime);
    }
    frameId=requestAnimationFrame(loop);
  }
  function renderState(){
    if(frameId){cancelAnimationFrame(frameId);frameId=0;}
    lastTime=0;
    paint(animationTime);
    if(!paused && visible && !document.hidden)frameId=requestAnimationFrame(loop);
  }
  requestSceneRender=renderState;
  function resize(){
    const rect=stage.getBoundingClientRect();
    width=Math.round(rect.width);height=Math.round(rect.height);
    dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    renderState();
  }
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(stage);
  else window.addEventListener('resize',resize,{passive:true});
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{
      visible=entries[0].isIntersecting;
      renderState();
    },{rootMargin:'80px'}).observe(stage);
  }
  document.addEventListener('visibilitychange',renderState);
  scene.addEventListener('pointermove',e=>{
    if(paused || e.pointerType!=='mouse')return;
    const rect=stage.getBoundingClientRect();
    targetX=clamp((e.clientX-rect.left)/rect.width-.5,-.5,.5);
    targetY=clamp((e.clientY-rect.top)/rect.height-.5,-.5,.5);
  },{passive:true});
  scene.addEventListener('pointerleave',()=>{targetX=0;targetY=0;},{passive:true});
  $$('[data-mode]').forEach(button=>{
    button.addEventListener('click',()=>{
      mode=Number(button.dataset.mode);
      $$('[data-mode]').forEach(b=>{
        const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));
      });
      $('#mode-value').textContent=t.modeValues[mode];
      renderState();
    });
  });
  document.body.classList.add('has-canvas');
  resize();
})();
