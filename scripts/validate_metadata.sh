#!/usr/bin/env bash

# This script verifies metadata tags, generated machine-readable artifacts, and build integrity.

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

# Validate brand color contrast requirements (WCAG 2.2 AA for normal text).
ruby - <<'RUBY'
require 'yaml'

content = YAML.load_file('_data/content.yml') || {}
branding = content['branding'] || {}

link_color = branding.fetch('link_color', branding['accent_color'])
link_hover_color = branding.fetch('link_hover_color', branding['primary_color'])
link_visited_color = branding.fetch('link_visited_color', link_color)

def parse_hex_color(value, key)
  str = value.to_s.strip
  unless str.match?(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
    raise SystemExit, "Invalid color format for #{key}: #{str.inspect}. Use #RGB or #RRGGBB."
  end

  if str.length == 4
    r = (str[1] * 2).to_i(16)
    g = (str[2] * 2).to_i(16)
    b = (str[3] * 2).to_i(16)
  else
    r = str[1..2].to_i(16)
    g = str[3..4].to_i(16)
    b = str[5..6].to_i(16)
  end

  [r, g, b]
end

def channel_luminance(channel)
  c = channel / 255.0
  return c / 12.92 if c <= 0.03928

  ((c + 0.055) / 1.055) ** 2.4
end

def relative_luminance(rgb)
  r, g, b = rgb
  (0.2126 * channel_luminance(r)) + (0.7152 * channel_luminance(g)) + (0.0722 * channel_luminance(b))
end

def contrast_ratio(rgb_a, rgb_b)
  l1 = relative_luminance(rgb_a)
  l2 = relative_luminance(rgb_b)
  lighter = [l1, l2].max
  darker = [l1, l2].min
  (lighter + 0.05) / (darker + 0.05)
end

white = [255, 255, 255]
checks = [
  ['branding.primary_color', branding['primary_color'], white, 4.5, 'primary button text against white page context'],
  ['branding.accent_color', branding['accent_color'], white, 4.5, 'accent text against white page background'],
  ['branding.link_color', link_color, white, 4.5, 'link text against white page background'],
  ['branding.link_hover_color', link_hover_color, white, 4.5, 'link hover text against white page background'],
  ['branding.link_visited_color', link_visited_color, white, 4.5, 'visited link text against white page background'],
  ['branding.secondary_color', branding['secondary_color'], white, 4.5, 'body text against white page background']
]

failures = []

checks.each do |name, color_value, comparison_rgb, minimum_ratio, context|
  rgb = parse_hex_color(color_value, name)
  ratio = contrast_ratio(rgb, comparison_rgb)
  if ratio < minimum_ratio
    failures << format('%s contrast is %.2f:1 (< %.1f:1) for %s', name, ratio, minimum_ratio, context)
  end
end

unless failures.empty?
  raise SystemExit, "Color contrast validation failed:\n- #{failures.join("\n- ")}"
end
RUBY

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
