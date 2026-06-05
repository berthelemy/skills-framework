---
layout: page
title: Skills
permalink: /skills/
---

<div class="row g-3">
  {% assign sorted_categories = site.data.categories | sort: 'name' %}
  {% for category in sorted_categories %}
    {% assign category_skills = site.data.skills | where: 'category_ref', category.category_ref | sort: 'name' %}
    {% if category_skills and category_skills.size > 0 %}
      <div class="col-12">
        <h2 class="h4 mt-2 mb-3">{{ category.name }}</h2>
      </div>
      {% for skill in category_skills %}
        <div class="col-md-6">
          <article class="card card-elevated h-100">
            <div class="card-body">
              <h3 class="h5 card-title mb-2">
                <a href="{{ skill.url | relative_url }}">{{ skill.name }}</a>
              </h3>
              <p class="card-text mb-2">{{ skill.description }}</p>
              <p class="small text-body-secondary mb-0">Category: {{ category.name }}</p>
            </div>
          </article>
        </div>
      {% endfor %}
    {% endif %}
  {% endfor %}
</div>
