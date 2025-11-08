const lenis = new Lenis({ smoothWheel: true, syncTouch: true, lerp: 0.1 });
function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.line').forEach((el) => {
  gsap.from(el, {
    y: 24, opacity: 0, duration: 0.6, ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 90%" }
  });
});