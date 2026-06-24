---
layout: docs
title: How to add/edit a skills category
audience: designers
description: 
sort_order: 4
---
{% include note.html content = "Either talk to your developer, or follow the instructions at [Introduction for site developers](intro-site-developers.md) in order to get a copy of the site that you can work on." %}

## AI-assisted approach

If you use an AI coding tool, you can ask it to review this site and to add the categories you need.

## Manual approach

1. Find the `_data/categories.yml` file. This contains the categories into which the skills are organised. Each category is described by a YAML `list item` containing a `dictionary` of keys and their values.

2. Add categories at the bottom of this file by copying an existing category, or delete the lines containing categories you no longer need. If you edit the `category_ref` key value, then make you change that value wherever it's mentioned in the skills files.

## Category keys reference

| Key | Purpose |
|-------|-------------|
| `category_ref` | a unique ID for the category. This field is referred to by the skills themselves. Make sure they match up with what you use in the skills. |
| `name` | a human-readable name |
| `description` | a short description to be shown to the website users |

## Sample categories YAML file

```
- category_ref: accessibility
  name: Accessibility
  description: Designing and reviewing interfaces for inclusive use.
- category_ref: data-modeling
  name: Data Modeling
  description: Structuring domain data for reuse and interoperability.
```

**Warning:** Do not change any of the field names, like `description`. If you do, the data in this field may not be shown on the published site.