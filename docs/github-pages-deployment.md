# GitHub Pages Deployment

This repository includes a deployment workflow:

- `.github/workflows/deploy-pages.yml`

## Configure `_config.yml`

Set:

- `url`: your GitHub Pages domain
- `baseurl`:
  - `""` for user/organization sites
  - `"/<repo>"` for project sites

## Enable Pages with Actions

1. Commit and push the workflow file.
2. In GitHub, open **Settings > Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually from **Actions**.

## Verify Deployment

Check these published paths:

- `/llms.txt`
- `/robots.txt`
- `/sitemap.xml`
- `/skills.json`
- `/courses.json`
