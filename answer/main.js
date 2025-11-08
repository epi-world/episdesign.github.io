// なめらかスクロール
const lenis = new Lenis({ smoothWheel: true, syncTouch: true, lerp: 0.1 });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// スクロール演出
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.card').forEach((el, i) => {
  gsap.from(el, {
    y: 28, opacity: 0, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
  });
});