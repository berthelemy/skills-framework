---
layout: docs
title: How to add skills and courses
audience: designers
description: How to add skills and related courses
sort_order: 4
---
The site data is stored in a set of YAML files, all stored in the directory: `/_data`.

**Warning:** Do not change any of the field names, like `description`. If you do, the data in this field may not be shown on the published site.

## Categories

The `categories.yml` file contains the categories into which the skills are organised.

Each category is defined by:

- `category_ref` - a unique ID for the category
- `name` - a human-readable name
- `description` - a short description to be shown to the website users

If you wish to add or edit a category, please copy the model shown below:

### Sample YAML file

```
- category_ref: accessibility
  name: Accessibility
  description: Designing and reviewing interfaces for inclusive use.
- category_ref: data-modeling
  name: Data Modeling
  description: Structuring domain data for reuse and interoperability.
```

## Skills

The skills are all stored in the file `/_data/skills.yml`.

Each skill is defined by:

- `skill_ref` - a unique ID for the skill
- `name` - a human-readable name
- `description` - A human-readable description
- `category_ref` - this must match an existing category reference in the `categories.yml` file
-  `url` - defines the url that users will use to access the skill

### Sample YAML file

```
- skill_ref: semantic-html
  name: Semantic HTML
  description: Create accessible, semantic HTML for web content.
  category_ref: accessibility
  url: /skills/semantic-html/
- skill_ref: taxonomy-design
  name: Taxonomy Design
  description: Model related concepts into stable machine-readable structures.
  category_ref: data-modeling
  url: /skills/taxonomy-design/
```

## Level descriptors

The level descriptors are stored in the file `/_data/level_descriptors.yml`.

Each level descriptor is defined by:

- `descriptor` - a textual description the skills needed at this level
- `level_number` - a number from 1 to 7
- `skill_ref` - refers to an existing skill in the `skills.yml` file
- `associated_courses` - refers to one or more `course_ref` entries in the `courses.yml` file

### Sample YAML file

```
- descriptor: Recognizes semantic HTML and basic accessibility patterns.
  level_number: 1
  skill_ref: semantic-html
  associated_courses:
    - course-accessible-html-foundations
- descriptor: Produces simple semantic HTML with visible labels and keyboard-friendly controls.
  level_number: 2
  skill_ref: semantic-html
  associated_courses:
    - course-accessible-html-foundations
    - course-wcag-review-workflow
```

## Courses

The list of courses is contained in the file `/_data/course.yml`.

Each course is defined by:

- `course_ref` - a unique ID for the course, used within the `level_descriptors.yml` file
- `name` - the name of the course
- `provider`- the name of the course provider
- `url` - the URL of the course page on the skills framework site
- `external_url` - the URL of the course on the provider's site
- `description` - a short description of the course

### Sample YAML file

```
- course_ref: course-accessible-html-foundations
  name: Accessible HTML Foundations
  provider: SkillPath Academy
  url: /courses/accessible-html-foundations/
  external_url: https://example.com/courses/accessible-html-foundations
  description: Introductory course covering semantic HTML, labels, and keyboard access.
- course_ref: course-wcag-review-workflow
  name: WCAG Review Workflow
  provider: SkillPath Academy
  url: /courses/wcag-review-workflow/
  external_url: https://example.com/courses/wcag-review-workflow
  description: Practical course for reviewing UI markup against WCAG 2.2 AA checks.
```



## 2. Add skill detail page

Create a file in `collections/_skills/`, for example `collections/_skills/my-skill.md`.

Recommended front matter:

```yaml
---
skill_ref: my-skill
title: My Skill
category_ref: my-category
layout: skill
description: Short summary for metadata and previews.
og_type: article
image: /assets/images/social-card.svg
---
```

## 3. Add course detail page

Create a file in `collections/_courses/`, for example `collections/_courses/my-course.md`.

Recommended front matter:

```yaml
---
course_ref: course-my-course
title: My Course
layout: course
description: Short summary for metadata and previews.
og_type: article
image: /assets/images/social-card.svg
---
```

## 4. Link courses to skill levels

In `_data/level_descriptors.yml`, ensure `associated_courses` includes the correct `course_ref` values.

## 5. Validate

Run:

```bash
./scripts/validate_metadata.sh
```

