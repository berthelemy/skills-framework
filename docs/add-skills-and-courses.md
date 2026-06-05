# Add Skills and Courses

## 1. Update Data Files

Edit `_data/` files as needed:

- `categories.yml`
- `skills.yml`
- `levels.yml`
- `level_descriptors.yml`
- `courses.yml`

Use stable, unique refs:

- `skill_ref`
- `course_ref`
- `category_ref`

## 2. Add Skill Detail Page

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

## 3. Add Course Detail Page

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

## 4. Link Courses to Skill Levels

In `_data/level_descriptors.yml`, ensure `associated_courses` includes the correct `course_ref` values.

## 5. Validate

Run:

```bash
./scripts/validate_metadata.sh
```
