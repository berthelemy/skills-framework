---
layout: docs
title: How to add/edit skills
audience: designers
description: 
sort_order: 4
---
{% include note.html content = "Either talk to your developer, or follow the instructions at [Introduction for site developers](intro-site-developers.md) in order to get a copy of the site that you can work on." %}

## AI-assisted approach

If you use an AI coding tool, you can ask it to review this site and to add the skills you need, with appropriate level descriptors.

## Manual approach 

1. Find the skills in the `collections/_skills/` directory. Each skill has its own file, each containing two parts: the frontmatter (between `---` markers), and the content (below the second `---` marker). The frontmatter helps to keep things organised. The content is anything that helps fill out the description of the skill. Like the categories, the frontmatter contains a list of `key` / `value` pairs.

2. Either edit a file, or create a new one, ensuring the frontmatter exists correctly.

3. Add any related courses as separate files.

4. Ensure the course references are correct inside the level descriptors.

#### Skills keys reference

| Key | Description |
|-------|-------------|
| `skill_ref` | A unique reference ID |
| `title` | The human-readable name of the skill |
| `category_ref` | The reference ID of the skill's category. This is the connection between skills and categories. |
| `description` | A short description of the skill as a whole |
| `image` | The location of an image, if you want one, that will show when sharing on social media |
| `level_descriptors` | A YAML list of of the levels for this skill, and the text that goes with that level. Note how the list is formatted in the sample below. |
| `level_descriptors / level` | The level number |
| `level_descriptors / text` | Description of the skill at this level |
| `level_descriptors / associated_courses` | A comma-separated array of course references. Note the square brackets around the array, and the quotes around each reference |

Don't forget to add the course file before adding links to it in a skill.

## Sample skill frontmatter

```yaml
---
skill_ref: semantic-html
title: Semantic HTML
category_ref: accessibility
layout: skill
description: Create accessible, semantic HTML for web content.
image: /assets/images/social-card.svg
level_descriptors:
  - level: 1
    text: "Uses basic semantic tags correctly (e.g., main, nav, article) instead of generic divs, and ensures images have appropriate alt attributes."
    associated_courses: ["course-accessible-html-foundations"]
  - level: 2
    text: "Structures forms with proper labels, applies correct heading hierarchies (H1-H6), and understands when to use button vs. anchor tags for keyboard navigation."
    associated_courses: ["course-accessible-html-foundations", "course-wcag-review-workflow"]
  - level: 3
    text: "Implements advanced WAI-ARIA roles, states, and properties where native HTML falls short, ensuring complex UI components (like modals or tabs) are screen-reader accessible."
    associated_courses: ["course-machine-readable-taxonomy"]
  - level: 4
    text: "Audits existing codebases using automated tools (e.g., Axe, Lighthouse) and manual screen reader testing (NVDA, VoiceOver) to identify and remediate WCAG compliance failures."
    associated_courses: ["course-machine-readable-taxonomy"]
  - level: 5
    text: "Establishes organization-wide accessibility guidelines, authors reusable accessible component libraries, and mentors engineering teams on inclusive design patterns."
---
```