function renderCategories() {
  const container = document.getElementById("categories");
  const categories = ["All", ...new Set(Nexus.movies.map(movie => movie.category).filter(Boolean))];

  container.innerHTML = categories.map(category => `
    <button class="category-btn ${category === Nexus.activeCategory ? "active" : ""}"
            type="button" data-category="${escapeAttr(category)}">
      ${escapeHtml(category)}
    </button>
  `).join("");

  container.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
      Nexus.activeCategory = button.dataset.category;
      container.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      document.getElementById("section-title").textContent =
        Nexus.activeCategory === "All" ? "ALL MOVIES" : Nexus.activeCategory.toUpperCase();
      applyFilters();
    });
  });
}
