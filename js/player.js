document.getElementById("close-player").addEventListener("click", closePlayer);
document.querySelector(".player-backdrop").addEventListener("click", closePlayer);

document.getElementById("movie-frame").addEventListener("load", () => {
  document.getElementById("player-loader").classList.add("hidden");
});
