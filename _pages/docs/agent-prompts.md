---
layout: docs
audience: designers
title: Prompts for AI Agents
description: How to prompt your AI agent to help you add skills and courses
sort_order: 5
---
{% include note.html content = "Either talk to your developer, or follow the instructions at [Introduction for site developers](/docs/intro-site-developers) in order to get a copy of the site that you can work on." %}

## Interactive prompt: add a skill with associated data

```text
Add a new skill to this skills framework and include all associated data.

Work in two phases.

Phase 1: Interactive intake (no file edits yet)
Ask me for all required inputs (skill basics, category, level descriptors, associated courses, metadata), then wait for my answers.
Summarize captured inputs and ask for confirmation.

Phase 2: Apply changes after confirmation
- Update `_data/skills.yml`
- Add category in `_data/categories.yml` if needed
- Update `_data/level_descriptors.yml`
- Update `_data/courses.yml` for linked courses
- Create `collections/_skills/<slug>.md`
- Create any needed `collections/_courses/<slug>.md`
- Validate links and refs across files
- Run `./scripts/validate_metadata.sh`

Output:
- Files changed
- Validation result
```

## Interactive prompt: add a course with associated links

```text
Add a new course to this skills framework and wire it to the correct skill level descriptors.

Work in two phases.

Phase 1: Interactive intake (no file edits yet)
Ask me for course details, slug/URL, linked skill refs, target level numbers, descriptor strategy (reuse/new), and metadata.
Summarize captured inputs and ask for confirmation.

Phase 2: Apply changes after confirmation
- Update `_data/courses.yml`
- Update `_data/level_descriptors.yml` to include the course in associated courses
- Create `collections/_courses/<slug>.md`
- Create descriptors only if required
- Validate references and URLs
- Run `./scripts/validate_metadata.sh`

Output:
- Files changed
- Validation result
```

