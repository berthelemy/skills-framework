# Copilot session instructions

## Metadata maintenance (every session)

At the start of each session, review metadata-related files and update them if the session introduces new pages, URLs, entities, or content changes.

Required checks:
- `_includes/head.html` for canonical, OpenGraph, Twitter, and JSON-LD tags.
- `_data/content.yml` for branding, organization, and SEO defaults.
- Page front matter (`description`, `og_type`, `image`) in edited pages.
- Discoverability artifacts: `llms.txt`, `robots.txt`, `skills.json`, `courses.json`, and `sitemap.xml`.

If no metadata change is needed, explicitly state that metadata was reviewed and no updates were required.
