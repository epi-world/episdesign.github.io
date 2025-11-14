// =====================================================
// epis design - Answer catalog script
// ・フィルター
// ・Lights On / Off 切り替え
// ・画像クリックでフルスクリーン表示
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Filter ----------
  const filterButtons = document.querySelectorAll(".filter-button");
  const cards = document.querySelectorAll(".card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // active 切り替え
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      // カードの表示切り替え
      cards.forEach((card) => {
        const cat = card.dataset.category || "";
        if (filter === "all") {
          card.classList.remove("hidden");
        } else {
          if (cat.includes(filter)) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        }
      });
    });
  });

  // ---------- Lights On / Off ----------
  const toggleBtn = document.getElementById("galleryToggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const body = document.body;
      const dark = body.classList.toggle("dark-mode");
      toggleBtn.textContent = dark ? "Lights On" : "Lights Off";
    });
  }

  // ---------- Lightbox (full screen image) ----------

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxClose = document.getElementById("lightbox-close");
  const triggers = document.querySelectorAll(".js-lightbox-trigger");

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (alt) lightboxImg.alt = alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    // 画像を消しておく（ギガ節約 & チラつき防止）
    lightboxImg.src = "";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const src = trigger.dataset.full;
      const img = trigger.querySelector("img");
      const alt = img ? img.alt : "";
      if (src) {
        openLightbox(src, alt);
      }
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      // 背景クリックで閉じる（画像やボタンを除く）
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      closeLightbox();
    });
  }

  // ESCキーでも閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
});