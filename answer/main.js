// なめらかスクロール
const lenis = new Lenis({ smoothWheel: true, syncTouch: true, lerp: 0.1 });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// GSAP
gsap.registerPlugin(ScrollTrigger);

// ヒーローのほんのりパララックス
gsap.to('.heroTitle', {
  y: -30, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

// テキストのフェードイン
gsap.utils.toArray('.left .ttl, .left .meta, .left .line').forEach((el, i) => {
  gsap.from(el, {
    y: 20, opacity: 0, duration: .6, ease: 'power2.out', delay: (i % 3) * 0.06,
    scrollTrigger: { trigger: el.closest('.chapter'), start: 'top 75%', toggleActions: 'play none none reverse' }
  });
});

// 各章のギャラリーをスクロールで切替
document.querySelectorAll('.chapter').forEach(section => {
  const panels = section.querySelectorAll('.gallery .panel');
  if (!panels.length) return;

  // 最初の1枚を表示
  panels[0].classList.add('is-active');

  // 章のスクロール長に応じてパネルを順にアクティブ化
  panels.forEach((panel, idx) => {
    ScrollTrigger.create({
      trigger: section,
      start: `top+=${idx * 30}% center`,  // 30%刻みで切替（好みで調整）
      end: `top+=${(idx + 1) * 30}% center`,
      onEnter: () => activate(idx),
      onEnterBack: () => activate(idx)
    });
  });

  function activate(i) {
    panels.forEach((p, k) => p.classList.toggle('is-active', k === i));
  }
});