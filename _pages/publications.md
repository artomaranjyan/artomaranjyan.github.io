---
layout: page
permalink: /publications/
title: Publications
description:
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

<!-- {% include bib_search.liquid %} -->

{% capture paper_count %}{% bibliography_count --query @article %}{% endcapture %}

<div class="publications publications-numbered" style="counter-reset: publication {{ paper_count | plus: 1 }};">

{% bibliography %}

</div>
