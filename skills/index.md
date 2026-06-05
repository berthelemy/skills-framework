---
layout: page
title: Skills
permalink: /skills/
---

<div class="row g-3">
  {% for skill in site.data.skills %}
    {% assign category = site.data.categories | where: 'category_ref', skill.category_ref | first %}
    <div class="col-md-6">
      <article class="card card-elevated h-100">
        <div class="card-body">
          <h2 class="h5 card-title mb-2">
            <a href="{{ skill.url | relative_url }}">{{ skill.name }}</a>
          </h2>
          <p class="card-text mb-2">{{ skill.description }}</p>
          {% if category %}
            <p class="small text-body-secondary mb-0">Category: {{ category.name }}</p>
          {% endif %}
        </div>
      </article>
    </div>
  {% endfor %}
</div>
