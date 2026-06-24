---
layout: page
---
# README

A Jekyll + Bootstrap framework for publishing skills content that works for both humans and machines.

## Purpose

This project helps you model and publish:

- Skills categories
- Skills
- Levels and level descriptors
- Courses linked to skill levels

It provides:

- Human-readable pages for browsing and navigation
- Machine-readable outputs for AI agents and integrations

## Quick start

1. Fork and install dependencies:

```bash
git Fork <your-repo-url>
cd skills-framework
bundle install
```

2. Build and serve:

```bash
bundle exec jekyll build
bundle exec jekyll serve
```

3. Validate metadata and machine-readable outputs:

```bash
./scripts/validate_metadata.sh
```

## Documentation

Documentation is available in the docs folder.

## Related project guidance

- Framework requirements: [AGENTS.MD](AGENTS.MD)
- Session metadata rules: [.github/copilot-instructions.md](.github/copilot-instructions.md)
- Metadata CI workflow: [.github/workflows/metadata-validation.yml](.github/workflows/metadata-validation.yml)
- GitHub Pages deploy workflow: [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)

