function initGallery() {
  const items = [...document.querySelectorAll("[data-gallery-item]")];
  const lightbox = document.querySelector("[data-lightbox]");
  if (!items.length || !lightbox) return;

  const img = lightbox.querySelector("[data-lightbox-image]");
  const caption = lightbox.querySelector("[data-lightbox-caption]");
  const close = lightbox.querySelector("[data-lightbox-close]");
  const prev = lightbox.querySelector("[data-lightbox-prev]");
  const next = lightbox.querySelector("[data-lightbox-next]");
  let index = 0;

  const open = i => {
    index = i;
    const source = items[index];
    img.src = source.dataset.src || source.querySelector("img").src;
    img.alt = source.dataset.alt || source.querySelector("img").alt || "";
    caption.textContent = source.dataset.caption || "";
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
  };
  const update = () => {
    const source = items[index];
    img.src = source.dataset.src || source.querySelector("img").src;
    img.alt = source.dataset.alt || source.querySelector("img").alt || "";
    caption.textContent = source.dataset.caption || "";
  };
  const shut = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
  };

  items.forEach((item, i) => item.addEventListener("click", () => open(i)));
  close.addEventListener("click", shut);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) shut(); });
  prev.addEventListener("click", () => { index = (index - 1 + items.length) % items.length; update(); });
  next.addEventListener("click", () => { index = (index + 1) % items.length; update(); });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") shut();
    if (e.key === "ArrowLeft") prev.click();
    if (e.key === "ArrowRight") next.click();
  });

  let startX = 0;
  lightbox.addEventListener("touchstart", e => startX = e.changedTouches[0].screenX, {passive:true});
  lightbox.addEventListener("touchend", e => {
    const delta = e.changedTouches[0].screenX - startX;
    if (Math.abs(delta) > 45) delta > 0 ? prev.click() : next.click();
  }, {passive:true});
}
