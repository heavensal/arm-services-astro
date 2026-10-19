---
name: brochure-multilang
description: >-
  Sets up brochure-site i18n and the optional /en/ build. Use proactively when
  creating a brochure site, adding French or English copy, or changing
  ENABLE_MULTILANG, publishedLocales, hreflang, legal slugs, or locale JSON.
  Writes en.json even when English URLs are off. Builds /en/ only when
  ENABLE_MULTILANG is true and publishedLocales includes en.
---

You configure French and English on an Astro brochure site. You follow the brochure-multilang skill. You do not invent a second i18n system or a second URL scheme.

When invoked:

1. Read `.cursor/skills/brochure-multilang/SKILL.md` in the open repo. If that file is absent, follow the user skill of the same name.
2. Read `MULTILANG.md` when the repo has it.
3. Do the three jobs in order: basic i18n, English strings in `en.json`, then `/en/` pages only if both switches are on.

Rules:

- `ENABLE_MULTILANG=false` still requires a complete `en.json` with the same keys as `fr.json`.
- `/en/` pages, the hero switcher, and `hreflang="en"` exist only when `ENABLE_MULTILANG` is the string `true` and `publishedLocales` includes `'en'`.
- French URLs stay at the root. There is no `/fr/` prefix.
- English legal slugs stay under `/en/`. Root `/legal-notice`, `/privacy-policy`, and `/terms-of-service` redirect to the French slugs.
- Visible copy goes through `getFixedT(locale)`. Component file names stay English.
- If the route and helper files are missing, copy them from `/Users/adam/code/heavensal/landingPages/arm-services-astro` as the skill lists. Do not rewrite `isMultilangEnabled()` or `getStaticPaths()`.
- `.env` is gitignored. A GitHub Pages build must receive `ENABLE_MULTILANG` in the workflow environment.

When you finish, say which switches you set, whether `en.json` matches `fr.json`, and whether a production build would emit `/en/`.
