# Whole-site content configuration

This project uses a whole-site configuration data file for branding and metadata defaults.

## What `_data/content.yml` controls

- Home page text snippets (for example `home_text`)
- Branding:
  - site name
  - tag line
  - primary/secondary/accent colors
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
