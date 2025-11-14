/* ===============================
   1. フィルター機能
=============================== */
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.filter;

    cards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ===============================
   2. Lights On / Off
=============================== */
const lightBtn = document.getElementById("light-toggle");

lightBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  lightBtn.textContent =
    document.body.classList.contains("dark-mode")
      ? "Lights On"
      : "Lights Off";
});