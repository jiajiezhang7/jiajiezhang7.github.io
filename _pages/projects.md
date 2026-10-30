---
layout: page
title: Projects
permalink: /projects/
description: Robot learning · autonomy · systems
nav: true
nav_order: 3
display_categories: [research]
editorial: true
_styles: |
  @import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap");
---

<div class="projects projects-editorial">
{% assign sorted_projects = site.projects | sort: "importance" %}
{% if site.enable_project_categories and page.display_categories %}
  {% assign sorted_projects = "" | split: "" %}
  {% for category in page.display_categories %}
    {% assign categorized_projects = site.projects | where: "category", category | sort: "importance" %}
    {% assign sorted_projects = sorted_projects | concat: categorized_projects %}
  {% endfor %}
{% endif %}

{% assign featured_project = nil %}
{% for project in sorted_projects %}
{% if project.featured %}
{% assign featured_project = project %}
{% break %}
{% endif %}
{% endfor %}
{% if featured_project == nil and sorted_projects.size > 0 %}
{% assign featured_project = sorted_projects | first %}
{% endif %}

{% if featured_project %}
{% assign project = featured_project %}
{% assign featured = true %}
{% include projects_editorial.liquid %}
{% endif %}

<div class="proj-index">
{% for project in sorted_projects %}
  {% if featured_project and project.id == featured_project.id %}
    {% continue %}
  {% endif %}
  {% assign featured = false %}
  {% include projects_editorial.liquid %}
{% endfor %}
</div>
</div>

<script>
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-proj-reveal]").forEach(function (el) {
      el.classList.add("is-in");
    });
    return;
  }
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-proj-reveal]"));
  if (!nodes.length) return;
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  nodes.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i * 0.05, 0.3) + "s";
    io.observe(el);
  });
})();
</script>
