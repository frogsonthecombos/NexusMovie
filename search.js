const searchInput = document.getElementById("search-input");

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  Nexus.filteredMovies = Nexus.movies.filter(movie => {
    const categoryMatch = Nexus.activeCategory === "All" ||
      String(movie.category).toLowerCase() === Nexus.activeCategory.toLowerCase();

    const searchMatch = !query ||
      [movie.title, movie.year, movie.category, movie.description, movie.id]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return categoryMatch && searchMatch;
  });

  renderMovies();
}

searchInput.addEventListener("input", applyFilters);

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.body.classList.contains("player-open")) {
    closePlayer();
  }
});
