---
layout: page
---
# How to use this site

The published website produced by this framework is designed to allow both humans and machines (AI agents particularly) to read and navigate the skills.

## Structure

The skills are placed into categories. Each category can hold as many skills as you wish, but we recommend no more than 10 in each.

A skill has a title, a reference code and then up to seven level descriptors. This approach is based on the same model as has been successfully used by the <a href="https://sfia-online.org/" target="_blank">SfIA skills framework</a> for the past 20 years.

We recommend that you review how the SfIA framework operates - particularly the concept of "levels of responsibility" before starting to work on your own framework.

We have provided the ability to add references to courses. These are linked to specific levels within a skill, so that users can find courses to help them to attain that level.

## How humans will use the site

The site can be browsed directly, or users can search for specific terms.

Key pages:

- [Skills](/skills)
- [Courses](/courses)
- [Search](/search)
- [Documentation](/docs)

## For machines and AI agents

All the skills and courses are designed to be consumed easily by machines.

You can point the machine to the markdown files directly.

This framework is designed for structured consumption with:

- Stable URLs for skill and course pages
- Canonical, OpenGraph, Twitter, and JSON-LD metadata
- Machine-readable endpoints:
  - `/skills.json`
  - `/courses.json`
  - `/search-index.json`
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
