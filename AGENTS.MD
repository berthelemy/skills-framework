# Skills framework

## Objective

To create a way to represent and display skills that work for both humans and agents.

## Development frameworks

- Jekyll site builder
- Bootstrap
- Bootstrap icons

## Jekyll structure

- Collections should be stored in a collections directory
- Head, Footer and Navigation components should be stored as _includes
- Use inheritance in layouts to make it easier to make wholesale changes

## Skills representation

Each skills category contains:

- name
- description

Each skill contains:

- skill reference
- name
- description
- category

Each level descriptor contains:

- descriptor
- level number (from 1-7)
- skill reference
- associated courses
    - course reference

Each level number contains:

- level number
- title
- generic description

The levels are defined similarly to those of the SFIA framework: https://sfia-online.org/en/about-sfia/how-sfia-works

Each course contains:

- course reference
- name
- provider
- url
- description

A category can contain one or more skills. A skill can be linked to one or more levels. A level can be linked to one or more courses.

## Display

The human-readable version will use a Bootstrap website, with branding configurable from a content configuration file.

The Jekyll _config.yml file will be kept separate from the content configuration file.

Each skill and course should be individually addressable with a URL.

## Navigation

The site main menu should contain:
- Home
- Skills
- Courses

Aggregate pages for skills should show the skills grouped by category and in alphabetical order.

Aggregate pages for courses should show the courses in alphabetical order.

Skills and courses should contain inter-links.

External links should open in a new tab.

## Visual design

- Use Bootstrap cards to display multiple skills and courses
- Use sentence case for headings

## Github skills

All workspace GitHub skills are listed here:

- [skills-machine-readable](.github/skills/skills-machine-readable/SKILL.md)
- [wcag-aa-html](.github/skills/wcag-aa-html/SKILL.md)

## Metadata skills used

The metadata and discoverability implementation used these skills:

- [skills-machine-readable](.github/skills/skills-machine-readable/SKILL.md): Used to normalize and expose structured data through consistent references, JSON outputs, and linkable entities.
- [wcag-aa-html](.github/skills/wcag-aa-html/SKILL.md): Used as the accessibility baseline while updating metadata-bearing templates and semantic page structure.

## Session metadata maintenance

Every session must review metadata and update it if necessary.

Minimum checklist per session:

- Validate canonical, OpenGraph, Twitter, and JSON-LD tags in `_includes/head.html`.
- Confirm branding and SEO defaults in `_data/content.yml` are still accurate.
- If branding colors are updated in `_data/content.yml`, run `./scripts/validate_metadata.sh` and verify WCAG 2.2 AA color contrast checks pass.
- Ensure edited content pages include appropriate front matter metadata (`description`, `og_type`, `image`).
- Verify discoverability outputs remain valid: `llms.txt`, `robots.txt`, `skills.json`, `courses.json`, and `sitemap.xml`.
- If no updates are needed, record that metadata was reviewed and no changes were required.
