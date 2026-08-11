function initAnimations() {
  if (!window.gsap) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;

  if (window.Lenis && !reduce) {
    const lenis = new Lenis({
      duration: mobile ? 0.8 : 1.05,
      smoothWheel: true,
      smoothTouch: false
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  const loader = document.querySelector("[data-loader]");
  if (loader && !sessionStorage.getItem("loader-seen")) {
    const tl = gsap.timeline({
      onComplete: () => {
        loader.classList.add("is-hidden");
        sessionStorage.setItem("loader-seen", "1");
      }
    });
    tl.from("[data-loader-name]", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" })
      .to("[data-loader-progress]", { width: "100%", duration: 1.15, ease: "power2.inOut" })
      .to("[data-loader-enter]", { opacity: 1, duration: 0.3 }, "-=0.15")
      .to(loader, { opacity: 0, duration: 0.55, delay: 0.18 });
  } else if (loader) {
    loader.classList.add("is-hidden");
  }

  if (reduce) return;

  if (window.ScrollTrigger) {
    gsap.utils.toArray("[data-reveal]").forEach(el => {
      gsap.from(el, {
        y: 45, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });

    gsap.utils.toArray("[data-image-reveal]").forEach(el => {
      gsap.from(el, {
        clipPath: "inset(12% 12% 12% 12%)", scale: 1.06, opacity: 0,
        duration: 1.15, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true }
      });
    });

    if (!mobile) {
      gsap.utils.toArray("[data-parallax]").forEach(el => {
        gsap.to(el, {
          yPercent: -10, ease: "none",
          scrollTrigger: { trigger: el, scrub: true }
        });
      });
    }
  }

  document.querySelectorAll("[data-magnetic]").forEach(btn => {
    if (mobile) return;
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX-r.left-r.width/2)*0.12, y: (e.clientY-r.top-r.height/2)*0.12, duration: 0.25 });
    });
    btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: 0.4 }));
  });
}
