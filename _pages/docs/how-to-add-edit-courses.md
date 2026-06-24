---
layout: docs
title: How to add/edit courses
audience: designers
description: 
sort_order: 4
---
{% include note.html content = "Either talk to your developer, or follow the instructions at [Introduction for site developers](/docs/intro-site-developers) in order to get a copy of the site that you can work on." %}

## AI-assisted approach

If you use an AI coding tool, you can ask it to review this site and to add the courses you need, with appropriate connections to the skills.

## Manual approach

1. Find the courses in `collections/_courses/`. Each course has its own file, each containing two parts: the frontmatter (between `---` markers), the content (below the second `---` marker). The frontmatter helps to keep things organised. The content is anything that helps fill out the description of the course. Like the categories, the frontmatter contains a list of `key` / `value` pairs.

2. Either edit a file, or create a new one, ensuring the frontmatter exists correctly.

3. Edit the related skills to include any new course references as required.

## Courses keys reference

| Key | Description |
|-------|-------------|
| course_ref | A unique reference ID |
| title | The name of the course |
| description | A short description of the course |
| image | The location of an optional image used when sharing on social media |
| provider | The name of the course provider. Make sure this remains consistent between courses from the same organisation. |
| external_url | The web address for the course on the provider's website |


## Sample course frontmatter

```yaml
---
course_ref: course-my-course
title: My Course
description: Short summary for metadata and previews.
image: /assets/images/social-card.svg
provider: SkillPath Academy
url: /courses/accessible-html-foundations/
external_url: https://example.com/courses/accessible-html-foundations
---
```