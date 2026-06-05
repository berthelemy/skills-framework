# Skills framework

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

1. Clone and install dependencies:

```bash
git clone <your-repo-url>
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

- Site usage (human + machine): [docs/how-to-use-site.md](docs/how-to-use-site.md)
- Whole-site content configuration (`content.yaml` equivalent): [docs/content-configuration.md](docs/content-configuration.md)
- Add skills and courses: [docs/add-skills-and-courses.md](docs/add-skills-and-courses.md)
- GitHub Pages deployment: [docs/github-pages-deployment.md](docs/github-pages-deployment.md)
- Interactive agent prompt templates: [docs/agent-prompts.md](docs/agent-prompts.md)

## Related project guidance

- Framework requirements: [AGENTS.MD](AGENTS.MD)
- Session metadata rules: [.github/copilot-instructions.md](.github/copilot-instructions.md)
- Metadata CI workflow: [.github/workflows/metadata-validation.yml](.github/workflows/metadata-validation.yml)
- GitHub Pages deploy workflow: [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)
