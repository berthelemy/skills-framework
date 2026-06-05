# Skills Framework

A Jekyll and Bootstrap-based reference framework for publishing skills content that is easy to use by people and straightforward to consume by machines and AI agents.

## Purpose

This project provides a structured way to model and publish:

- Skill categories
- Skills
- Proficiency levels
- Level descriptors
- Courses linked to skill levels

The framework supports both:

- Human-readable browsing through a Bootstrap website
- Machine-readable consumption through metadata, JSON endpoints, and discoverability files

## How Humans Use This Site

People can browse and navigate the site via:

- Home page overview
- Skills index grouped by category and sorted alphabetically
- Courses index sorted alphabetically
- Individual skill pages
- Individual course pages

The site uses clear navigation and card-based lists to make skills and courses easy to scan.

## How Machines and AI Agents Use This Site

The site is optimized for machine and agent discovery using:

- Stable, individually addressable URLs for skills and courses
- OpenGraph and Twitter metadata in the shared head include
- Canonical links for consistent indexing
- JSON-LD structured data for Organization, WebSite, Skill terms, and Courses
- JSON endpoints:
  - `/skills.json`
  - `/courses.json`
- Discoverability files:
  - `/llms.txt`
  - `/robots.txt`
  - `/sitemap.xml`

## Repository Structure

- `_data/`: structured content model and branding/SEO configuration
- `collections/_skills/`: skill detail pages
- `collections/_courses/`: course detail pages
- `_layouts/`: page templates
- `_includes/`: reusable head, navigation, footer components
- `skills/` and `courses/`: aggregate route pages
- `scripts/validate_metadata.sh`: metadata validation script used locally and in CI
- `.github/workflows/metadata-validation.yml`: CI workflow enforcing metadata quality

## Clone and Run Locally

1. Clone the repository:

```bash
git clone <your-repo-url>
cd skills-framework
```

2. Install dependencies:

```bash
bundle install
```

3. Build the site:

```bash
bundle exec jekyll build
```

4. Serve locally:

```bash
bundle exec jekyll serve
```

5. Open:

- `http://127.0.0.1:4000/`

If `_config.yml` is changed, restart `jekyll serve`.

## Publish Your Own Version on GitHub Pages

You can publish your own fork or clone of this framework using GitHub Pages.

### 1. Create your repository

1. Push your copy to GitHub.
2. Decide your Pages URL type:
   - User/organization site: `https://<account>.github.io`
   - Project site: `https://<account>.github.io/<repo>`

### 2. Update site URL settings

In `_config.yml`, set:

- `url`: your GitHub Pages domain, for example `https://myaccount.github.io`
- `baseurl`:
  - `""` for user/organization sites
  - `"/<repo>"` for project sites

These values are required for correct canonical, OpenGraph, sitemap, and JSON-LD absolute URLs.

### 3. Deploy with the included GitHub Actions workflow

This repository already includes a working deployment workflow:

- `.github/workflows/deploy-pages.yml`

What this workflow does:

1. Triggers on push to `main` (and supports manual run via `workflow_dispatch`).
2. Sets up Ruby with Bundler cache.
3. Builds the site with `bundle exec jekyll build`.
4. Uploads `_site` as a GitHub Pages artifact.
5. Deploys via `actions/deploy-pages`.

To enable it in your repository:

1. Commit and push `.github/workflows/deploy-pages.yml`.
2. In GitHub, go to **Settings > Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).

You can monitor deployment status in **Actions** and get the published URL from the deploy job output.

#### Option B: GitHub Pages built-in Jekyll build

You can use built-in Pages builds, but dependency behavior is more constrained than custom Actions workflows. If you use this route, verify your plugin set is supported and test output carefully.

### 4. Verify published metadata endpoints

After publishing, verify these public URLs:

- `/llms.txt`
- `/robots.txt`
- `/sitemap.xml`
- `/skills.json`
- `/courses.json`

Also verify at least one skill page and one course page resolve correctly.

### 5. Keep Pages-safe metadata quality checks

Before pushing, run:

```bash
./scripts/validate_metadata.sh
```

This helps prevent broken metadata from reaching production Pages builds.

## Add Your Own Skills and Courses

### 1. Add or update core data

Edit these files in `_data/`:

- `categories.yml`
- `skills.yml`
- `levels.yml`
- `level_descriptors.yml`
- `courses.yml`

Guidelines:

- Keep references stable and unique (for example `skill_ref`, `course_ref`)
- Keep skill and course URLs consistent with page slugs
- Keep relationships valid (course refs used in descriptors must exist)

### 2. Add skill detail pages

Create a file in `collections/_skills/` for each skill, for example:

- `collections/_skills/my-skill.md`

Use front matter like:

```yaml
---
skill_ref: my-skill
title: My Skill
category_ref: my-category
layout: skill
description: Short summary for metadata and social previews.
og_type: article
image: /assets/images/social-card.svg
---
```

### 3. Add course detail pages

Create a file in `collections/_courses/` for each course, for example:

- `collections/_courses/my-course.md`

Use front matter like:

```yaml
---
course_ref: course-my-course
title: My Course
layout: course
description: Short summary for metadata and social previews.
og_type: article
image: /assets/images/social-card.svg
---
```

### 4. Keep metadata current

When content changes, review and update if needed:

- `_includes/head.html` (canonical, OG, Twitter, JSON-LD)
- `_data/content.yml` (branding and SEO defaults)
- Front matter metadata (`description`, `og_type`, `image`)
- `llms.txt`, `robots.txt`, `skills.json`, `courses.json`, `sitemap.xml`

### 5. Validate before committing

Run:

```bash
./scripts/validate_metadata.sh
```

This checks:

- Required metadata files exist
- YAML/JSON/XML syntax validity
- Required metadata tags
- Jekyll build output artifacts

## Sample Agent Prompt: Add a Skill with Associated Data

Use the following prompt with your coding agent when you want it to add a new skill end-to-end.

```text
Add a new skill to this skills framework and include all associated data.

Work in two phases.

Phase 1: Interactive intake (no file edits yet)
Ask me for the required inputs first, then wait for my answers.
Ask for:
1. Skill basics:
  - skill name
  - skill_ref slug
  - short description
  - category_ref (reuse existing or create new)
2. Category details (only if creating a new one):
  - category name
  - category description
3. Level descriptors (minimum 2):
  - level_number (1-7)
  - descriptor text
  - associated course refs for that level
4. Courses (for all associated course refs):
  - course_ref
  - course name
  - provider
  - internal url (`/courses/<slug>/`)
  - external_url
  - description
5. Skill/course page metadata:
  - page descriptions
  - image path (default `/assets/images/social-card.svg` unless I override)

Before Phase 2, summarize the captured inputs and ask for confirmation.

Phase 2: Apply changes after confirmation

Requirements:
1. Update `_data/skills.yml` with a new `skill_ref`, `name`, `description`, `category_ref`, and `url`.
2. If needed, add or reuse a category in `_data/categories.yml`.
3. Add at least two level descriptors for this skill in `_data/level_descriptors.yml`, each with:
  - `descriptor`
  - `level_number`
  - `skill_ref`
  - `associated_courses`
4. Add one or more linked courses in `_data/courses.yml` with:
  - `course_ref`
  - `name`
  - `provider`
  - `url` (internal path under `/courses/.../`)
  - `external_url`
  - `description`
5. Create `collections/_skills/api-design.md` with front matter:
  - `skill_ref`
  - `title`
  - `category_ref`
  - `layout: skill`
  - `description`
  - `og_type: article`
  - `image: /assets/images/social-card.svg`
6. Create course detail page(s) in `collections/_courses/` for any newly added courses using `layout: course`.
7. Ensure links are consistent between data files and collection pages.
8. Run `./scripts/validate_metadata.sh` and fix any issues.

Output format:
- Provide a summary of files changed.
- Confirm validation result.
```

Tip:

- Keep naming consistent and slug-friendly (`api-design`, `course-api-design-fundamentals`) so URLs remain predictable.
- Keep the intake questions concise and numbered so responses are easy to map into data files.

## Sample Agent Prompt: Add a Course with Associated Links

Use the following prompt with your coding agent when you want it to add a new course and link it to existing or new skill level descriptors.

```text
Add a new course to this skills framework and wire it to the correct skill level descriptors.

Work in two phases.

Phase 1: Interactive intake (no file edits yet)
Ask me for the required inputs first, then wait for my answers.
Ask for:
1. Course basics:
  - course name
  - course_ref slug
  - provider
  - external_url
  - short description
2. Internal route details:
  - course page slug for `/courses/<slug>/`
3. Skill linkage details:
  - existing `skill_ref` values this course should support
  - target `level_number` values (1-7) for each linked skill
4. Descriptor handling for each skill+level link:
  - whether to reuse an existing descriptor or create a new one
  - descriptor text when creating a new descriptor
5. Course page metadata:
  - page description
  - image path (default `/assets/images/social-card.svg` unless I override)

Before Phase 2, summarize the captured inputs and ask for confirmation.

Phase 2: Apply changes after confirmation

Requirements:
1. Add the course to `_data/courses.yml` with:
  - `course_ref`
  - `name`
  - `provider`
  - `url` (internal path `/courses/<slug>/`)
  - `external_url`
  - `description`
2. Create `collections/_courses/<slug>.md` with front matter:
  - `course_ref`
  - `title`
  - `layout: course`
  - `description`
  - `og_type: article`
  - `image: /assets/images/social-card.svg`
3. Update `_data/level_descriptors.yml` so each intended skill+level descriptor includes this course in `associated_courses`.
4. If a required descriptor does not exist, create one with valid `skill_ref`, `level_number`, and `descriptor` text.
5. Ensure all references are valid and consistent across files (`course_ref`, `skill_ref`, and URLs).
6. Run `./scripts/validate_metadata.sh` and fix any issues.

Output format:
- Provide a summary of files changed.
- Confirm validation result.
```

Tip:

- Prefer linking a course to existing descriptors when possible to avoid duplicate descriptor records.

## Customization Notes

- Update production URL in `_config.yml` (`url`) for correct absolute canonical and social links.
- Update organization details and SEO defaults in `_data/content.yml`.
- Replace social/brand assets in `assets/images/` as needed.

## Related Documentation

- `AGENTS.MD` for framework requirements and conventions
- `.github/copilot-instructions.md` for session-level metadata maintenance rules
