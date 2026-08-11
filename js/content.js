function initDynamicContent() {
  document.querySelectorAll("[data-site-name]").forEach(el => el.textContent = SITE_CONFIG.photographerName);
  document.querySelectorAll("[data-site-email]").forEach(el => {
    el.textContent = SITE_CONFIG.email;
    if (el.tagName === "A") el.href = `mailto:${SITE_CONFIG.email}`;
  });
  document.querySelectorAll("[data-instagram]").forEach(el => el.href = SITE_CONFIG.instagram !== "YOUR_INSTAGRAM_URL" ? SITE_CONFIG.instagram : "#");
  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    const n = SITE_CONFIG.whatsapp.replace(/\D/g, "");
    el.href = n ? `https://wa.me/${n}` : "#";
  });

  const recent = document.querySelector("[data-recent-work]");
  if (recent) {
    recent.innerHTML = RECENT_WORK.map((item, i) => `
      <button class="work-card ${i % 3 === 1 ? "work-card--tall" : ""}" data-gallery-item data-src="${item.src}" data-alt="${item.alt}" data-caption="${item.title}">
        <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async">
        <span>${item.title}</span>
      </button>`).join("");
  }
}
