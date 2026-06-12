---
layout: page
title: Courses
permalink: /courses/
---

<div class="row g-3">
  {% comment %} 
    Sort the courses natively by their title field from their front matter
  {% endcomment %}
  {% assign sorted_courses = site.courses | sort: 'title' %}
  
  {% for course in sorted_courses %}
    <div class="col-md-6">
      <article class="card card-elevated h-100">
        <div class="card-body">
          <h2 class="h5 card-title mb-2">
            <a href="{{ course.url | relative_url }}">{{ course.title }}</a>
          </h2>
          <p class="mb-2">{{ course.description }}</p>
          <p class="small text-body-secondary mb-2">Provider: {{ course.provider }}</p>
          <a href="{{ course.external_url }}" target="_blank" rel="noopener noreferrer">
            Visit external course page
          </a>
        </div>
      </article>
    </div>
  {% endfor %}
</div>
