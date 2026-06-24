---
layout: docs
sort_order: 10
audience: developers
title: How to remove the information box
description:
---

When you want to remove the information box at the top of the screen, there are two ways to do this:

## 1. Remove the 'include' command

Find the file `_layouts/default.html`

Within this file remove (or comment out) the line that says:

{% raw %}`{% include alert.html %}`{% endraw %}

## 2. Remove the alert code from the include

1. Find the file `_includes/alert.html`
2. Delete (or comment out) the contents of this file
