document.querySelectorAll("[data-glitch]").forEach(element => {
  element.addEventListener("mouseenter", () => {
    element.classList.add("glitch-active");
    setTimeout(() => element.classList.remove("glitch-active"), 420);
  });
});

setInterval(() => {
  const targets = document.querySelectorAll("[data-glitch]");
  if (!targets.length) return;
  const target = targets[Math.floor(Math.random() * targets.length)];
  target.classList.add("glitch-active");
  setTimeout(() => target.classList.remove("glitch-active"), 260);
}, 5500);
