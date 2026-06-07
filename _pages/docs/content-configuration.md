---
layout: page
---
# Whole-site content configuration

This project uses a whole-site configuration data file for branding and metadata defaults.

## What `_data/content.yml` controls

- Home page text snippets (for example `home_text`)
- Branding:
  - site name
  - tag line
  - primary/secondary/accent colors
  - link colors (`link_color`, `link_hover_color`, `link_visited_color`)
  - font family
- Organization details:
  - name
  - URL
  - logo path
- SEO defaults:
  - default description
  - default image
  - twitter card type

## Why it matters

Values from `_data/content.yml` are used by templates and metadata includes, including:

- `_includes/head.html`
- `_includes/navigation.html`
- `_includes/footer.html`

Keeping this file accurate ensures consistent branding and high-quality metadata across the entire site.

Branding colors must also remain accessible: configured text/link colors are validated against a white background using WCAG 2.2 AA contrast thresholds.

## Recommended update process

1. Edit `_data/content.yml`.
2. Build locally:

```bash
bundle exec jekyll build
```

3. Run metadata validation:

```bash
./scripts/validate_metadata.sh
```

4. If you changed colors, ensure the script passes color contrast checks for:

- `branding.primary_color`
- `branding.accent_color`
- `branding.link_color`
- `branding.link_hover_color`
- `branding.link_visited_color`
- `branding.secondary_color`



## Glossary definitions

The site supports an inline glossary driven by [_data/glossary.csv](/_data/glossary.csv).

The CSV must include these headers:

- `item`
- `definition`

Behavior:

- On each page, the first occurrence of a glossary `item` is highlighted with a dotted underline.
- Clicking the highlighted term opens a modal with the matching `definition`.

Example row:

```csv
item,definition
taxonomy,"A classification structure used to organize related concepts."
```
