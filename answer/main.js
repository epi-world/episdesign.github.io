document.addEventListener('DOMContentLoaded', () => {
  // Lenis
  const lenis = new Lenis({ smoothWheel:true, syncTouch:true, lerp:0.1 });
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // GSAP
  gsap.registerPlugin(ScrollTrigger);

  // 初期表示の強制（JSが生きてるかの検査も兼ねる）
  document.querySelectorAll('.chapter').forEach(section => {
    const panels = section.querySelectorAll('.gallery .panel');
    if (!panels.length) return;
    panels[0].classList.add('is-active');
  });

  // スクロール切替
  document.querySelectorAll('.chapter').forEach(section => {
    const panels = section.querySelectorAll('.gallery .panel');
    if (panels.length < 2) return; // 1枚なら切替はスキップ
    panels.forEach((_, idx) => {
      ScrollTrigger.create({
        trigger: section,
        start: `top+=${idx*35}% center`,
        end:   `top+=${(idx+1)*35}% center`,
        onEnter:     () => activate(idx),
        onEnterBack: () => activate(idx)
      });
    });
    function activate(i){
      panels.forEach((p, k) => p.classList.toggle('is-active', k === i));
    }
  });
});