---
layout: docs
sort_order: 4
audience: developers
title: Branding and site setup
description:
---

This project uses a whole-site configuration data file, stored in `_data/content.yml`. This file contains instructions for branding and for metadata defaults.

> **Note:** If you know Jekyll, you know that normally these site-wide configurations are stored in `_config.yml`. I have decided to keep `_config.yml` only for developers who know what their doing. Whereas `content.yml` can be changed relatively safely by non-developers.

## What does the file control?

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
