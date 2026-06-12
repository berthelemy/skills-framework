---
layout: page
title: Skills
permalink: /skills/
---

<div class="row g-3">
  {% comment %} 
    Group all skills by their category front matter field and sort them alphabetically
  {% endcomment %}
  {% assign grouped_skills = site.skills | group_by: "category_ref" | sort: "name" %}

  {% for group in grouped_skills %}
      {% for category in site.data.categories %}
      {% if category.category_ref == group.name %}
      

      <div class="col-12">
        <h2 class="h4 mt-2 mb-3">{{ category.name }}</h2>
        <p class="lead">{{ category.description }}</p>
      </div>

      {% endif %}
      {% endfor %}
      

      {% comment %} Sort the skills within this specific category by their title {% endcomment %}
      {% assign sorted_skills = group.items | sort: "title" %}
      
      {% for skill in sorted_skills %}
        <div class="col-md-6">
          <article class="card card-elevated h-100">
            <div class="card-body">
              <h3 class="h5 card-title mb-2">
                <a href="{{ skill.url | relative_url }}">{{ skill.title }}</a>
              </h3>
              <p class="card-text mb-2">{{ skill.description }}</p>
              <p class="small text-body-secondary mb-0">Category: {{ group.name }}</p>
            </div>
          </article>
        </div>
      {% endfor %}

    
  {% endfor %}
</div>
