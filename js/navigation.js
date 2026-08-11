function initNavigation() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
    });
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
      });
    });
  }

  document.querySelectorAll('a[data-transition]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") return;
      e.preventDefault();
      const curtain = document.querySelector("[data-page-curtain]");
      if (!curtain) return window.location.href = href;
      curtain.classList.add("is-active");
      setTimeout(() => window.location.href = href, 420);
    });
  });
}
