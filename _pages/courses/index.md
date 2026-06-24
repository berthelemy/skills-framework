---
layout: page
title: Courses
permalink: /courses/
---
{% comment %} 
    Group all courses by their provider front matter field and sort them alphabetically
  {% endcomment %}
  {% assign grouped_courses = site.courses | group_by: "provider" | sort: "name" %}

{% for group in grouped_courses %}
<h2>{{ group.name }}</h2>
<div class="row g-3">
  
  
  {% for course in group.items %}
    <div class="col-md-6">
      <article class="card card-elevated h-100">
        <div class="card-body">
          <h2 class="h5 card-title mb-2">
            <a href="{{ course.url | relative_url }}">{{ course.title }}</a>
          </h2>
          <p class="mb-2">{{ course.description }}</p>
          <a href="{{ course.external_url }}" target="_blank" rel="noopener noreferrer">
            Visit external course page
          </a>
        </div>
      </article>
    </div>
  {% endfor %}
</div>
{% endfor %}
