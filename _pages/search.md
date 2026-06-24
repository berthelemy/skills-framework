---
layout: page
title: Search
description: Search across skills, courses, and documentation.
og_type: website
image:
permalink: /search/
---

<form id="site-search-form" class="card card-elevated p-3 p-md-4 mb-4" role="search" data-index-url="{{ '/search-index.json' | relative_url }}">
  <div class="row g-3 align-items-end">
    <div class="col-12 col-md-8">
      <label for="site-search-query" class="form-label">Search terms</label>
      <input
        id="site-search-query"
        name="q"
        class="form-control"
        type="search"
        autocomplete="off"
        placeholder="Try: {{ site.data.content.search.search-terms }}"
      >
      <div class="form-text">Searches titles, descriptions, and linked level descriptors.</div>
    </div>
    <div class="col-12 col-md-4">
      <label for="site-search-type" class="form-label">Filter by content type</label>
      <select id="site-search-type" name="type" class="form-select">
        <option value="all">All</option>
        <option value="skill">Skills</option>
        <option value="course">Courses</option>
        <option value="doc">Documentation</option>
      </select>
    </div>
  </div>
</form>

<p id="site-search-status" class="text-body-secondary" aria-live="polite">Enter a search term to see results.</p>

<section aria-labelledby="site-search-results-heading">
  <h2 id="site-search-results-heading" class="h4">Results</h2>
  <div id="site-search-results" class="list-group"></div>
</section>

<noscript>
  <p>This search feature needs JavaScript. You can still browse <a href="{{ '/skills/' | relative_url }}">skills</a>, <a href="{{ '/courses/' | relative_url }}">courses</a>, and <a href="{{ '/docs/' | relative_url }}">documentation</a>.</p>
</noscript>

<script src="{{ '/assets/js/search.js' | relative_url }}" defer></script>