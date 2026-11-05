# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static website for 清華保育園 (Seika Hoikuen), a licensed nursery school in 由宇町, Iwakuni, Yamaguchi.
Domain: `seikahoiku.com` (CNAME in repo root), deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.
No build tools, no framework, no package manager. Pure HTML + CSS + vanilla JS.

## Development

Open any `.html` file directly in a browser, or use a local static server:

```sh
python3 -m http.server 8000
```

No build step, no linting, no unit tests. Before pushing, check that every referenced file and `#anchor` exists:

```sh
python3 .github/scripts/check-site.py .
```

## Deployment and what is public

The Pages workflow copies **only** these into `_site/` and publishes that folder:

`*.html`, `*.css`, `*.js`, `CNAME`, `robots.txt`, `sitemap.xml`, `images/`, `fonts/`

It then runs `check-site.py _site` and fails the deploy if a page references something missing.
Consequences:

- A new top-level folder or file type (e.g. `downloads/`, `.pdf` in the root) is **not** published until it is added to the "Collect public files" step.
- `_work/` (original/high-res source images), `docs/` (internal PDFs such as 年間行事計画表 and 入園しおり) and `CLAUDE.md` are intentionally not published. Do not link to them from pages.
- Put only web-ready, referenced assets in `images/`. Keep originals in `_work/`.
- Actions are pinned to commit SHAs; Dependabot (`.github/dependabot.yml`) proposes updates.

## Site Structure

| File | Page | Extra CSS |
|------|------|-----------|
| `index.html` | ホーム | — (uses `home.js`) |
| `features.html` | 園の特色 | `inner.css` |
| `daily.html` | 一日の流れ | `inner.css` |
| `events.html` | 年間行事 | `inner.css` |
| `classes.html` | クラス紹介 | `inner.css` |
| `admission.html` | 入園案内 (contact form, privacy policy `#privacy`) | `inner.css`, `admission.css` |
| `recruit.html` | 職員募集（停止中） | `inner.css` |
| `hoikushi-shien.html` | 保育士支援情報 | `inner.css` |
| `foodbank.html` | フードバンクの取り組み | `inner.css` |

### Stylesheets

- `palette.css` — color tokens (iroha 048「モーニングプール」). `--color-*` are the source values; legacy names (`--main`, `--accent`, `--ink`, `--line`, `--paper`, …) map onto them. Change colors here only.
- `home.css` — loaded by **every** page. Self-hosted `@font-face` block (`BEGIN LOCAL FONTS` … `END LOCAL FONTS`), base typography, header, buttons, links, home sections, `.site-footer`, responsive rules (main breakpoints 1100px / 900px / 600px; the header switches to the menu button at 900px).
- `inner.css` — inner pages: `.page-hero`, `.breadcrumb`, cards, schedule table, calendar, class cards, `.inner-footer`, and the shared `ip-*` components.
- `admission.css` — admission-only fees/procedures/preparation display.

### Scripts

- `navigation.js` — every page. Mobile menu toggle (`.menu-toggle` / `#main-nav`), closes on link click, Escape, outside click, focus leaving the header.
- `home.js` — `index.html` only. The 園の一日 day explorer; its times mirror the table in `daily.html`, so update both together.

## Page Architecture

Home (`<body class="home-page">`): `.site-header` → `main#main` with `.spotlight` (optional highlighted notice above the intro; delete the whole `aside` when no longer needed), `.intro`, `.news`, `.values`, `#life`, `.admission`, `#community` (`#daremo-tsuen` こども誰でも通園制度, 園庭開放 tables, foodbank link), `.access`, `.contact-band` → `.site-footer` → `.mobile-actions`.

Inner pages (`<body class="inner-page page-<name>">`):

1. `.skip-link` to `#main`
2. `<header class="site-header">` — same markup on all pages (brand, `.menu-toggle`, `nav#main-nav`)
3. `<section class="page-hero"><div class="wrap page-hero-layout">` with the page `<h1>` and `.hero-subtitle`
4. `<nav class="breadcrumb">` inside `.container`
5. Content sections built from `ip-*` components (see below)
6. `<footer class="footer inner-footer">` — address/hours/page links. Set `aria-current="page"` on the current page's link in `.inner-footer-nav`.
7. `.mobile-actions` (fixed bottom bar on phones) and `<script src="navigation.js" defer>`

Every page `<head>` has the Google Analytics tag (G-J6V6DL9J5M), description, OGP (`og:url`, `og:image` = `images/og-image.jpg` 1200×630), `twitter:card`, and `<link rel="canonical">`. Keep `og:url` and `canonical` equal to the page's sitemap URL.

## Inner-page components (`ip-*` in `inner.css`)

- Section frames: `section.ip-block` (plain), `.ip-band` (pale band), `.ip-closing` (pale band at page end), each wrapping `.wrap`.
- Headings: `.ip-heading` (h2 + lead paragraph).
- Layout: `.ip-split` (two columns), `.ip-duo` (text + panel), `.ip-stack`, `.ip-rule`.
- Panels and lists: `.ip-panel`, `.ip-checks`, `.ip-steps` / `.ip-step-num`, `.ip-faq` (`details`), `.ip-links`.
- `.ip-nowrap` — wrap a phrase so Japanese line breaks fall at sensible points (used heavily in headings and buttons).
- Line endings: `home.css` sets `text-wrap: pretty` on text blocks and `word-break: auto-phrase` on headings/`summary`, but browser support varies (auto-phrase is Chrome/Edge only). For short text (headings, leads under `h2`, list items, `dt`/`dd`, `summary`), still group the last phrase with `.ip-nowrap` so no line ends with only 1–2 characters at 360–1280px. Inside `summary`, wrap the spans in one outer `<span>` (the summary is a grid). Inside `.news-item a`, `.ip-nowrap` keeps the link underline.

Other shared pieces: `.card-grid` > `.card` (`.card-icon` img + h3 + p), `.news-list` > `.news-item` (`.news-date`, `.news-tag`, then a link or text span), `.schedule-table` (`th scope="col"`; widths live in CSS, not inline styles).

## Fonts

Self-hosted WOFF2 subsets in `fonts/` (M PLUS Rounded 1c 400/700 for body `--round`, Kaisei Decol 400 for headings `--serif`), subset to the characters used on the site. New kanji outside the subset fall back to system fonts — see `fonts/README.md` to regenerate.

## Images

```
images/
  icons/                    Lucide SVG icons used in cards and the day explorer
  seika-logo.webp           Header/footer logo
  seika-favicon.png         Favicon (64×64)
  seika-building(-small).webp  Home hero photo (srcset)
  og-image.jpg              Social share image (1200×630)
  fb-yamaguchi-logo.png     Food bank page logo
_work/                      Originals, not published (high-res logos, 清華保育園正面.jpg, class illustrations)
```

## Content conventions

- 園庭開放 schedule lives in `index.html#niwa-kaiho` (one table per period). Remove past dates and add a matching `.news-item` when publishing a new period. Always double-check that the weekday in `（曜）` matches the date.
- News items: newest first, date format `YYYY.MM.DD`.
- Adding a page: copy an inner page, update `<title>`, description, OGP/canonical URLs, `aria-current` in the footer, link it from `.inner-footer-nav` on all inner pages, and add it to `sitemap.xml`.
- The privacy policy (`admission.html#privacy`) is linked from every footer. Update it if new tracking or third-party embeds are added.
