window.Nexus = {
  movies: [],
  filteredMovies: [],
  activeCategory: "All"
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("data/movies.json");
    if (!response.ok) throw new Error("Could not load movies.json");
    Nexus.movies = await response.json();
    Nexus.filteredMovies = [...Nexus.movies];
    renderCategories();
    renderMovies();
    updateCounts();
  } catch (error) {
    console.error(error);
    document.getElementById("movie-grid").innerHTML =
      '<div class="load-error">DATABASE CONNECTION FAILED // CHECK data/movies.json</div>';
  }
});

function updateCounts() {
  document.getElementById("movie-count").textContent =
    String(Nexus.movies.length).padStart(2, "0");
  document.getElementById("result-count").textContent =
    `${String(Nexus.filteredMovies.length).padStart(2, "0")} RESULTS`;
}

function renderMovies() {
  const grid = document.getElementById("movie-grid");
  const empty = document.getElementById("empty-state");
  grid.innerHTML = "";

  if (!Nexus.filteredMovies.length) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  const fragment = document.createDocumentFragment();

  Nexus.filteredMovies.forEach((movie, index) => {
    const card = document.createElement("article");
    card.className = "movie-card";
    card.style.setProperty("--card-index", index);
    card.innerHTML = `
      <button class="poster-button" type="button" aria-label="Play ${escapeHtml(movie.title)}">
        <div class="poster-wrap">
          <img loading="lazy" src="${escapeAttr(movie.image)}" alt="${escapeAttr(movie.title)} poster"
               onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 450%22%3E%3Crect width=%22300%22 height=%22450%22 fill=%22%23101012%22/%3E%3Ctext x=%22150%22 y=%22225%22 fill=%22%23aaa%22 text-anchor=%22middle%22 font-size=%2214%22%3ENEXUS%20POSTER%20MISSING%3C/text%3E%3C/svg%3E'">
          <span class="poster-shine"></span>
          <span class="play-orb">▶</span>
          <span class="card-code">${escapeHtml(movie.id || "NXL-000")}</span>
        </div>
      </button>
      <div class="card-info">
        <div class="card-title-row">
          <h3>${escapeHtml(movie.title)}</h3>
          <span>${escapeHtml(movie.year || "")}</span>
        </div>
        <div class="card-meta">
          <span>${escapeHtml(movie.category || "Uncategorized")}</span>
          ${movie.rating ? `<span>${escapeHtml(movie.rating)}</span>` : ""}
        </div>
      </div>
    `;
    card.querySelector(".poster-button").addEventListener("click", () => openPlayer(movie));
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
  updateCounts();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function openPlayer(movie) {
  const modal = document.getElementById("player-modal");
  const frame = document.getElementById("movie-frame");
  const title = document.getElementById("player-title");

  title.textContent = movie.title;
  document.getElementById("player-year").textContent = movie.year || "";
  document.getElementById("player-category").textContent = movie.category || "";
  document.getElementById("player-id").textContent = movie.id || "";
  document.getElementById("player-loader").classList.remove("hidden");

  frame.src = toDrivePreviewUrl(movie.drive);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("player-open");
}

function closePlayer() {
  const modal = document.getElementById("player-modal");
  const frame = document.getElementById("movie-frame");
  frame.src = "";
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("player-open");
}

function toDrivePreviewUrl(url) {
  const match = String(url).match(/\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return url;
}
