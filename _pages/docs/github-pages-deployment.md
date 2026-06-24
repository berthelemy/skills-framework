---
layout: docs
title: Deploying on Github pages
audience: developers
description: How to make your site available to the public on Github Pages
sort_order: 6
---

**Note:** Github Pages is currently free, and has been for years. Of course, that may change...

## Step 1: Configure _config.yml

Within `_config.yml` set:

- `url`: your GitHub Pages domain
- `baseurl`:
  - `""` for user/organization sites
  - `"/<repo>"` for project sites

## Step 2: Enable Pages with actions

1. Commit and push the workflow file.
2. In GitHub, open **Settings > Pages**.
3. Set **Source** to **GitHub Actions**.

## Step 3: Push your code to Github

1. Push to `main`
2. Check that the included workflow has completed properly in Github's **Actions** tab.

**Note:** If you need to make changes to the workflow, you will find it here: `.github/workflows/deploy-pages.yml`