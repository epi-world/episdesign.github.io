// ページ全体のスクリプト
document.addEventListener('DOMContentLoaded', () => {

  // --- ぬるぬるスクロール設定（Lenis） ---
  const lenis = new Lenis({ smoothWheel: true, syncTouch: true, lerp: 0.1 });
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // --- GSAP準備 ---
  gsap.registerPlugin(ScrollTrigger);

  // --- ヒーロータイトルのパララックス ---
  gsap.to('.heroTitle', {
    y: -30, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // --- 左側テキストのフェードイン ---
  gsap.utils.toArray('.left .ttl, .left .meta, .left .line').forEach((el, i) => {
    gsap.from(el, {
      y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: (i % 3) * 0.06,
      scrollTrigger: { 
        trigger: el.closest('.chapter'),
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // --- 各章ごとのギャラリー切り替え ---
  document.querySelectorAll('.chapter').forEach(section => {
    const panels = section.querySelectorAll('.gallery .panel');
    if (!panels.length) return;

    // 初期表示（最初の画像を強制的に見せる）
    panels[0].classList.add('is-active');

    // スクロールで画像を順番に切り替え
    panels.forEach((_, idx) => {
      ScrollTrigger.create({
        trigger: section,
        start: `top+=${idx * 35}% center`,
        end:   `top+=${(idx + 1) * 35}% center`,
        onEnter:     () => activate(idx),
        onEnterBack: () => activate(idx)
      });
    });

    // 画像切替処理
    function activate(i){
      panels.forEach((p, k) => p.classList.toggle('is-active', k === i));
    }
  });

  // --- スクロール領域確保（iOS対策） ---
  function ensureScrollRoom(){
    document.querySelectorAll('.chapter').forEach(sec => {
      if (sec.offsetHeight < window.innerHeight * 1.2) {
        sec.style.minHeight = '180vh';
      }
    });
  }
  window.addEventListener('load', ensureScrollRoom);
  window.addEventListener('resize', ensureScrollRoom);

});