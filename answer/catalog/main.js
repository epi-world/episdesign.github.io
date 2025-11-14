document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-button");
  const cards = document.querySelectorAll(".card");
  const lightsToggle = document.querySelector(".gallery-toggle");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");

  /* ---------- Filter ---------- */
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      cards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");
        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  /* ---------- Lights toggle ----------
     Lights Off (初期) : 明るいギャラリー
     Lights On         : 暗くなって作品が浮かぶ
  ------------------------------------- */
  if (lightsToggle) {
    lightsToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const dark = document.body.classList.contains("dark-mode");
      lightsToggle.textContent = dark ? "Lights On" : "Lights Off";
    });
  }

  /* ---------- Lightbox (full-screen image) ---------- */
  const imageButtons = document.querySelectorAll(".card-image-button");

  imageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.image;
      const alt = btn.getAttribute("aria-label") || "";
      if (!src || !lightbox || !lightboxImage) return;

      lightboxImage.src = src;
      lightboxImage.alt = alt;
      lightbox.classList.add("is-open");
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    if (lightboxImage) {
      lightboxImage.src = "";
    }
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
});