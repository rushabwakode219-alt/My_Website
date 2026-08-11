document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-ready");
  if (window.initTheme) initTheme();
  if (window.initNavigation) initNavigation();
  if (window.initAnimations) initAnimations();
  if (window.initGallery) initGallery();
  if (window.initVideos) initVideos();
  if (window.initContactForm) initContactForm();
  if (window.initDynamicContent) initDynamicContent();
});
