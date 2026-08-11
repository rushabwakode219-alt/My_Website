window.addEventListener("pageshow", () => {
  const curtain = document.querySelector("[data-page-curtain]");
  if (curtain) setTimeout(() => curtain.classList.remove("is-active"), 50);
});
