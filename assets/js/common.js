$(document).ready(function () {
  // Native buttons support pointer, Enter, and Space activation.
  $(".publications button[aria-controls]").on("click", function () {
    const panel = document.getElementById(this.getAttribute("aria-controls"));
    if (!panel) return;
    const row = this.closest(".links").parentElement;
    const open = this.getAttribute("aria-expanded") !== "true";
    row.querySelectorAll(".hidden").forEach((other) => {
      other.classList.remove("open");
      other.setAttribute("aria-hidden", "true");
      other.inert = true;
    });
    row.querySelectorAll("button[aria-controls]").forEach((button) => button.setAttribute("aria-expanded", "false"));
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
    panel.inert = !open;
    this.setAttribute("aria-expanded", String(open));
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
