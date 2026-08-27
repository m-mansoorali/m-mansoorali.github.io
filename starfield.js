// Starfield canvas — twinkling stars, shared across all pages
(function(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function initStars(){
    stars = [];
    const count = Math.floor((w * h) / 9000);
    for(let i=0;i<count;i++){
      stars.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.4 + 0.3,
        baseAlpha: Math.random()*0.6 + 0.3,
        phase: Math.random()*Math.PI*2,
        speed: Math.random()*0.02 + 0.005
      });
    }
  }
  initStars();
  window.addEventListener('resize', initStars);

  let t = 0;
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){
      const alpha = reduceMotion ? s.baseAlpha : s.baseAlpha + Math.sin(t*s.speed*10 + s.phase)*0.25;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(242,239,230,${Math.max(0,Math.min(1,alpha))})`;
      ctx.fill();
    }
    t++;
    if(!reduceMotion) requestAnimationFrame(draw);
  }
  draw();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
})();
