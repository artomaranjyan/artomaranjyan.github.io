$(document).ready(function () {
  if (typeof mediumZoom === "function") {
    medium_zoom = mediumZoom("[data-zoomable]", {
      background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee",
    });
  }

  // Render the original at its final size: scaling the small thumbnail can blur
  // the portrait on mobile browsers, even when Medium Zoom loads its HD source.
  const trigger = document.querySelector("[data-portrait-zoom]");
  const viewer = document.getElementById("portrait-viewer");
  if (!trigger || !viewer || typeof viewer.showModal !== "function") return;

  const photo = viewer.querySelector(".portrait-viewer-image");
  const error = viewer.querySelector(".portrait-viewer-error");
  const closeButton = viewer.querySelector(".portrait-viewer-close");

  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-controls", viewer.id);
  trigger.addEventListener("click", (event) => {
    // Preserve the link's normal open-in-new-tab behavior.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (viewer.open) return;

    error.hidden = true;
    photo.hidden = false;
    photo.src = trigger.href;
    viewer.showModal();
    document.documentElement.classList.add("portrait-viewer-open");
    closeButton.focus({ preventScroll: true });
  });

  photo.addEventListener("error", () => {
    photo.hidden = true;
    error.hidden = false;
  });

  closeButton.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer || event.target === photo) viewer.close();
  });
  // Native dialog handles Escape and keeps keyboard focus inside the viewer.
  viewer.addEventListener("close", () => {
    document.documentElement.classList.remove("portrait-viewer-open");
    trigger.focus({ preventScroll: true });
  });
});
