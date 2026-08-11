function initTheme() {
  const saved = localStorage.getItem("site-theme");
  const preferred = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  setTheme(preferred);

  document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("site-theme", theme);
  document.querySelectorAll("[data-theme-label]").forEach(el => {
    el.textContent = theme === "dark" ? "Light" : "Dark";
  });
}
