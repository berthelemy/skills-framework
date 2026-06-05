# Agent Prompt Templates

## Interactive Prompt: Add a Skill with Associated Data

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

## Interactive Prompt: Add a Course with Associated Links

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
