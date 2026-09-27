document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("particles-js");
  if (!container || typeof particlesJS !== "function") return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let particles;
  let loading = false;

  const updateColor = () => {
    if (!particles) return;
    const value = document.documentElement.getAttribute("data-theme") === "dark" ? 255 : 0;
    const color = value ? "#ffffff" : "#000000";
    const rgb = { r: value, g: value, b: value };
    particles.particles.color.value = color;
    particles.particles.line_linked.color = color;
    particles.particles.line_linked.color_rgb_line = rgb;
    particles.particles.array.forEach((particle) => {
      particle.color.value = color;
      particle.color.rgb = { ...rgb };
    });
    if (!particles.particles.move.enable) particles.fn.particlesDraw();
  };

  const updateMotion = () => {
    if (!particles) {
      if (!reducedMotion.matches) start();
      return;
    }
    const enabled = !reducedMotion.matches;
    const wasMoving = particles.particles.move.enable;
    particles.particles.move.enable = enabled;
    particles.interactivity.events.onclick.enable = enabled;
    if (!enabled) {
      window.cancelRequestAnimFrame(particles.fn.drawAnimFrame);
      particles.tmp.repulse_clicking = false;
    } else if (!wasMoving) {
      particles.fn.vendors.draw();
    }
  };

  const start = async () => {
    if (loading || particles || reducedMotion.matches) return;
    loading = true;
    try {
      const response = await fetch(container.dataset.config);
      if (!response.ok) return;
      const config = await response.json();
      if (reducedMotion.matches) return;
      const color = document.documentElement.getAttribute("data-theme") === "dark" ? "#ffffff" : "#000000";
      config.particles.color.value = color;
      config.particles.line_linked.color = color;
      particlesJS("particles-js", config);
      particles = window.pJSDom.find((entry) => entry.pJS.canvas.el.parentElement === container).pJS;
    } catch (error) {
      // A decorative background must not prevent reading or changing the theme.
      console.warn("Particle background could not be loaded.", error);
    } finally {
      loading = false;
    }
  };

  document.addEventListener("themechange", updateColor);
  reducedMotion.addEventListener("change", updateMotion);
  start();
});
