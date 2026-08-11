function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const status = form.querySelector("[data-form-status]");
    if (status) {
      status.textContent = "Thank you. Your inquiry is ready to be connected to a secure form service.";
      status.classList.add("is-visible");
    }
  });
}
