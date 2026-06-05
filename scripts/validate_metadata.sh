#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

required_source_files=(
  "_data/content.yml"
  "_includes/head.html"
  "llms.txt"
  "robots.txt"
  "skills.json"
  "courses.json"
  "sitemap.xml"
)

for file in "${required_source_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required source file: $file"
    exit 1
  fi
done

# Validate YAML source syntax.
ruby -e "require 'yaml'; YAML.load_file('_data/content.yml'); YAML.load_file('_config.yml')"

# Validate key metadata markers in head include.
grep -q 'rel="canonical"' _includes/head.html
grep -q 'property="og:title"' _includes/head.html
grep -q 'name="twitter:card"' _includes/head.html
grep -q 'application/ld+json' _includes/head.html

bundle exec jekyll build

required_built_files=(
  "_site/llms.txt"
  "_site/robots.txt"
  "_site/skills.json"
  "_site/courses.json"
  "_site/sitemap.xml"
)

for file in "${required_built_files[@]}"; do
  if [[ ! -s "$file" ]]; then
    echo "Missing or empty generated file: $file"
    exit 1
  fi
done

python3 - <<'PY'
import json
from pathlib import Path
from xml.etree import ElementTree

skills = Path('_site/skills.json').read_text(encoding='utf-8')
courses = Path('_site/courses.json').read_text(encoding='utf-8')
json.loads(skills)
json.loads(courses)

sitemap = Path('_site/sitemap.xml').read_text(encoding='utf-8')
ElementTree.fromstring(sitemap)

robots = Path('_site/robots.txt').read_text(encoding='utf-8')
if 'Sitemap:' not in robots:
    raise SystemExit('robots.txt is missing a Sitemap declaration')

llms = Path('_site/llms.txt').read_text(encoding='utf-8')
for expected in ('/skills/', '/courses/', '/skills.json', '/courses.json'):
    if expected not in llms:
        raise SystemExit(f'llms.txt is missing expected entry: {expected}')
PY

echo "Metadata validation passed."
