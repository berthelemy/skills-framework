# How to use this site

## For humans

Use the website to browse:

- Home: project overview
- Skills: grouped by category and sorted alphabetically
- Courses: sorted alphabetically
- Skill pages: detailed level descriptors and linked courses
- Course pages: course details and linked skill levels

Navigation is available in the top menu:

- Home
- Skills
- Courses

## For machines and ai agents

This framework is designed for structured consumption with:

- Stable URLs for skill and course pages
- Canonical, OpenGraph, Twitter, and JSON-LD metadata
- Machine-readable endpoints:
  - `/skills.json`
  - `/courses.json`
- Discoverability files:
  - `/llms.txt`
  - `/robots.txt`
  - `/sitemap.xml`

## Validate output locally

Run:

```bash
./scripts/validate_metadata.sh
```

This verifies metadata tags, generated machine-readable artifacts, and build integrity.
