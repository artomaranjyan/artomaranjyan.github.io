module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  // Medium Zoom adds these classes at runtime from its external script.
  safelist: ["medium-zoom-overlay", "medium-zoom-image--opened"],
};
