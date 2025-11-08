// なめらかスクロール（Lenis）
const lenis = new Lenis({ smoothWheel: true, syncTouch: true, lerp: 0.1 });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// GSAPプラグイン
gsap.registerPlugin(ScrollTrigger);

// ヒーローの軽いパララックス
gsap.to('.heroTitle', {
  y: -30, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

// テキスト要素のフェードイン
gsap.utils.toArray('.left .ttl, .left .meta, .left .line').forEach((el, i) => {
  gsap.from(el, {
    y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: (i % 3) * 0.06,
    scrollTrigger: { trigger: el.closest('.chapter'), start: 'top 75%', toggleActions: 'play none none reverse' }
  });
});

// 各章のギャラリーをスクロールで切替
document.querySelectorAll('.chapter').forEach(section => {
  const panels = section.querySelectorAll('.gallery .panel');
  if (!panels.length) return;

  // 初期表示
  panels[0].classList.add('is-active');

  // 章の縦尺に応じて段階的に切替
  panels.forEach((_, idx) => {
    ScrollTrigger.create({
      trigger: section,
      start: `top+=${idx * 35}% center`,   // 35%刻みで次の画像へ
      end:   `top+=${(idx + 1) * 35}% center`,
      onEnter:     () => activate(idx),
      onEnterBack: () => activate(idx)
    });
  });

  function activate(i){
    panels.forEach((p, k) => p.classList.toggle('is-active', k === i));
  }
});

// 安全策：iOSのアドレスバー高さ変動でvhが詰むのを緩和
// スクロール領域が短すぎる場合は強制的に余白を確保
function ensureScrollRoom(){
  document.querySelectorAll('.chapter').forEach(sec => {
    if (sec.offsetHeight < window.innerHeight * 1.2) {
      sec.style.minHeight = '180vh';
    }
  });
}
window.addEventListener('load', ensureScrollRoom);
window.addEventListener('resize', ensureScrollRoom);