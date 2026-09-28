document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("particles-js");
  if (!container || typeof particlesJS !== "function") return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let particles;
  let loading = false;
  let glow = "transparent";

  const getColors = () => {
    const style = getComputedStyle(document.documentElement);
    return {
      color: style.getPropertyValue("--global-particle-color").trim() || "#e94e65",
      glow: style.getPropertyValue("--global-particle-glow").trim() || "transparent",
    };
  };

  const updateColor = () => {
    if (!particles) return;
    const colors = getColors();
    const color = colors.color;
    const rgb = {
      r: parseInt(color.slice(1, 3), 16),
      g: parseInt(color.slice(3, 5), 16),
      b: parseInt(color.slice(5, 7), 16),
    };
    glow = colors.glow;
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
      const { color } = getColors();
      config.particles.color.value = color;
      config.particles.line_linked.color = color;
      particlesJS("particles-js", config);
      particles = window.pJSDom.find((entry) => entry.pJS.canvas.el.parentElement === container).pJS;
      const draw = particles.fn.particlesDraw;
      particles.fn.particlesDraw = () => {
        // Resizing the canvas resets its context, so restore the glow before each draw.
        particles.canvas.ctx.shadowColor = glow;
        particles.canvas.ctx.shadowBlur = 5;
        draw();
      };
      updateColor();
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
