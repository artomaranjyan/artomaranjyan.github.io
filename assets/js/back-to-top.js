(() => {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const footer = document.querySelector("footer.sticky-bottom, footer.fixed-bottom");
  const defaultBottom = parseFloat(window.getComputedStyle(button).bottom) || 30;

  const updateButton = () => {
    button.hidden = window.scrollY < 1;
    const footerOverlap = footer ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top) : 0;
    button.style.bottom = `${Math.max(defaultBottom, footerOverlap + 15)}px`;
  };

  button.addEventListener("click", () => {
    const heading = document.querySelector("h1");
    if (heading) {
      const hadTabIndex = heading.hasAttribute("tabindex");
      if (!hadTabIndex) {
        heading.setAttribute("tabindex", "-1");
        heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
      }
      heading.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", updateButton, { passive: true });
  window.addEventListener("resize", updateButton);
  updateButton();
})();
