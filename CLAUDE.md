# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static website for 清華保育園 (Seika Hoikuen), a Japanese licensed nursery school in Iwakuni, Yamaguchi.
Domain: `seikahoiku.com` — deployed via GitHub Pages (CNAME in repo root).
No build tools, no framework, no package manager. Pure HTML + CSS + vanilla JS.

## Development

Open any `.html` file directly in a browser, or use a local static server:

```sh
python3 -m http.server 8000
# or
npx serve .
```

No build step, no linting, no tests.

## Site Structure

Each page is a self-contained HTML file sharing a single stylesheet:

| File | Page |
|------|------|
| `index.html` | ホーム (Home) |
| `features.html` | 園の特色 (Features) |
| `daily.html` | 一日の流れ (Daily Schedule) |
| `events.html` | 年間行事 (Annual Events) |
| `classes.html` | クラス紹介 (Classes) |
| `admission.html` | 入園案内 (Admission) |
| `recruit.html` | 職員募集 (Recruitment) |

`style.css` (~1750 lines) is the single stylesheet shared across all pages.

## Design System (CSS Custom Properties)

```css
--main: #0ABAB5       /* teal — primary brand color */
--accent: #F28BA8     /* pink — accent color */
--bg: #F9FCFC         /* page background */
--text: #3D4F5F       /* body text */
--radius: 16px        /* card border radius */
--radius-full: 50px   /* pill border radius */
```

Font: **M PLUS Rounded 1c** (Google Fonts), with Japanese fallbacks `Hiragino Maru Gothic Pro`, `BIZ UDGothic`.

## Page Architecture

Every HTML page follows the same template:

1. **Header** (`<header class="header" id="header">`) — sticky, shrinks on scroll. Set `class="active"` on the `<a>` matching the current page.
2. **Page hero** (`<section class="page-hero">`) — inner pages only; home uses `<section class="hero">` with particles.
3. **Breadcrumb** (`<nav class="breadcrumb">`) — inner pages only.
4. **Sections** — use `.section` with `.container` inside. Titles use `.section-title`, subtitles use `.section-subtitle`, optional icon via `.section-title-icon`.
5. **Footer** — shared grid layout with address, hours, and nav links.
6. **Floating elements** — `.phone-cta` (tel link) and `#scrollTop` button at the bottom of `<body>`.
7. **Inline `<script>`** at the end of `<body>` — handles hamburger menu, header scroll shrink, Intersection Observer for animations, and scroll-to-top.

## Animation Classes

Elements animate in when scrolled into view via `IntersectionObserver`:

- `fade-in` — opacity + translateY fade in
- `slide-up` — slide up variant
- `stagger-1` through `stagger-5` — add delay to `fade-in` elements for sequential appearance

The observer adds `visible` class when the element enters the viewport.

## Image Assets

```
images/
  icons/       SVG icons (referenced inline via <img> in section headers and cards)
  cards/       Illustrations for feature/program cards
  classes/     Class page images
  calendar/    Seasonal images for the events page
ロゴ.png        Logo (header: 64px height, footer: 80px height)
清華保育園正面.jpg  Main exterior photo
favicon.svg
```

## Key Conventions

- **Adding a new page**: Copy the full header+footer+script block from an existing page, update `class="active"` in the nav, add to `sitemap.xml`.
- **Wave dividers**: SVG `<div class="wave-divider">` elements used between sections to create visual flow. `.flip` class mirrors it vertically.
- **Highlight boxes**: `.highlight-box` for callout content (CTA, philosophy statements).
- **Card grids**: `.card-grid` with `.card` children; each card has `.card-icon`, `<h3>`, `<p>`.
- **News list**: `.news-list` > `.news-item` with `.news-date`, `.news-tag` (variants: `event`, `recruit`), and text span.
- **Buttons**: `.btn.btn-primary` (teal filled) and `.btn.btn-secondary` (outlined). Group with `.btn-group`.
