---
name: skills-machine-readable
description: 'Define human skills in a machine-readable way. Use when normalizing skill concepts into structured categories, skill records, level descriptors, level numbers, and courses for this skills framework.'
argument-hint: 'Raw skill concept or draft taxonomy'
---

# Machine-readable skills

## When to use
Use this skill when turning a human-friendly skill idea into the structured skill model used by this repository, or when checking that existing skill content is internally consistent.

## Goal
Produce skill definitions that are stable, structured, and easy for both humans and machines to consume.

## Procedure
1. Identify the core skill concept.
   - Choose a concise, stable skill name.
   - Separate the skill from the surrounding domain if the idea is too broad.

2. Define the category.
   - Give the category a short name and clear description.
   - Group related skills together when they serve the same audience or domain.

3. Write the skill record.
   - Include a unique skill reference.
   - Store the skill name, description, and category reference.
   - Keep the description specific enough to distinguish it from neighboring skills.

4. Define proficiency levels.
   - Use the 1-7 level range only.
   - Add only the levels that are meaningful for the skill.
   - For each level, write a descriptor that explains what performance looks like at that level.

5. Add level number records.
   - Give each level a title and a generic description.
   - Keep the wording consistent across skills so levels remain comparable.
   - Use the SFIA-style level range as the source model for progression.

6. Attach courses only when they support the level definition.
   - Add courses as evidence, training, or preparation for a level.
   - Include the course reference, name, provider, URL, and description.
   - Avoid adding courses that do not clearly support the related level.

7. Normalize the content.
   - Use stable references.
   - Keep names short and predictable.
   - Avoid duplicate concepts under different labels.
   - Mark unknown data as missing rather than inventing it.

## Decision rules
- Use one category when multiple skills share the same domain and audience.
- Split categories only when the taxonomy would otherwise become ambiguous.
- Link a skill to more than one level when the skill grows meaningfully across proficiency bands.
- Omit a level if the skill does not need that stage of progression.
- Omit a course if no reliable course supports the level.

## Validation
Treat the definition as complete only when all of these are true:
- every skill has exactly one category
- every skill has a unique reference
- every level descriptor references one skill and one level number
- every level number is between 1 and 7
- every course record includes reference, name, provider, URL, and description
- the same concept is not modeled twice under different names
- the structure can be serialized without adding extra interpretation

## Review output
When reviewing a skill definition, report:
- the missing or ambiguous field
- why it breaks machine readability or consistency
- the smallest change that resolves it
- any related records that should be checked next
