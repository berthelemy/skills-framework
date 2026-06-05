---
name: wcag-aa-html
description: 'Create or review HTML so it is semantic, keyboard-accessible, screen-reader-friendly, and aligned with WCAG 2.2 Level AA. Use for accessible HTML output, contrast, forms, focus states, landmarks, images, and ARIA usage.'
argument-hint: 'HTML to create or review'
---

# Wcag 2.2 aa html

## When to use
Use this skill when producing or reviewing HTML that must meet WCAG 2.2 Level AA expectations. It applies to static markup, templates, component output, and HTML snippets that need accessible structure and behavior.

## Core goal
Produce HTML that is:
- semantic first
- operable by keyboard
- understandable by assistive technology
- readable at AA contrast levels
- resilient under zoom, reflow, and reduced motion preferences

## Procedure
1. Start with semantic elements instead of generic containers.
   - Prefer `header`, `nav`, `main`, `aside`, `footer`, `section`, `article`, `button`, `a`, `label`, `input`, `select`, and `details` when they match the content.
   - Use headings in a meaningful hierarchy.

2. Verify the page has a clear structure.
   - Include one main landmark.
   - Provide labels for regions only when the structure would otherwise be unclear.
   - Make sure repeated navigation and content groups are easy to scan.

3. Make every interactive control keyboard usable.
   - Use native controls first.
   - Ensure focus is visible and not removed without replacement.
   - Confirm tab order follows the visual and logical order.
   - Avoid pointer-only interactions.

4. Make form controls accessible by default.
   - Pair each input with a visible `label`.
   - Use `fieldset` and `legend` for grouped choices.
   - Provide helpful error text and associate it with the relevant field.
   - Mark required fields clearly in text and programmatically when needed.

5. Provide text alternatives and names.
   - Give informative `alt` text to meaningful images.
   - Use empty `alt` for decorative images.
   - Ensure icons, controls, and links have accessible names.
   - Use `aria-label` or `aria-labelledby` only when visible text is insufficient.

6. Use ARIA sparingly and correctly.
   - Prefer native HTML semantics over ARIA.
   - Do not add redundant roles or states.
   - Only use ARIA when it improves the accessible name, role, or state.
   - Never use ARIA to simulate unsupported behavior when a native element exists.

7. Check contrast and presentation.
   - Ensure text, icons, focus indicators, and essential UI graphics meet AA contrast expectations.
   - Do not convey meaning by color alone.
   - Make link styling distinguishable without relying only on color.

8. Verify dynamic behavior.
   - Announce important updates when content changes without a full page refresh.
   - Preserve focus after dialogs, menus, and destructive actions.
   - Provide accessible loading, validation, and success states.

9. Review responsive and user preference support.
   - Confirm content still works at high zoom and narrow viewports.
   - Avoid layouts that break at 200% zoom or reflow poorly.
   - Respect `prefers-reduced-motion` when animations are used.

## Completion checks
Treat the HTML as complete only when all of these are true:
- the document structure is semantic and logical
- all interactive elements are keyboard reachable and visible on focus
- form fields have labels, help text, and error associations where needed
- images and icons have correct accessible names or empty text alternatives
- contrast is acceptable for text and important UI affordances
- ARIA is minimal, valid, and not replacing native semantics
- the markup still works at zoom, reflow, and reduced-motion preferences

## Decision rules
- If a native element can do the job, use it.
- If visible text already names the control, do not add redundant ARIA.
- If a custom widget is unavoidable, define its name, role, and state carefully and test keyboard interaction first.
- If an accessibility requirement conflicts with visual design, change the design rather than hiding the problem in markup.

## Review output
When reviewing HTML, report:
- the issue
- why it affects WCAG 2.2 AA behavior
- the smallest markup change that fixes it
- any remaining manual checks that should still be performed
