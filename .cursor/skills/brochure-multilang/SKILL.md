---
name: brochure-multilang
description: >-
  Sets up French/English i18n on an Astro brochure site using the ARM Services
  multilang pattern. Configures getFixedT, fr.json, and en.json; writes English
  copy even when ENABLE_MULTILANG is false; generates /en/ pages, hreflang, and
  the language switcher only when ENABLE_MULTILANG is true and publishedLocales
  includes en. Use when creating a brochure site, adding a language, editing
  locale JSON, slugs, hreflang, legal pages, or ENABLE_MULTILANG.
---

# Brochure multilang

Repeat the ARM Services language setup. Three jobs, in this order. Do not add a second i18n library, a `/fr/` prefix, or a route that appears because `en.json` exists.

Reference implementation: `/Users/adam/code/heavensal/landingPages/arm-services-astro`. When that repo is the one open, `MULTILANG.md` is the URL law. On a new site, copy the machinery listed below, then replace the client copy.

## 1. Basic i18n

Do this on every brochure site.

- Locales are `fr` and `en` in `src/i18n/i18n.ts`. `fallbackLng` is `fr`.
- Visible copy is read with `getFixedT(locale)`.
- Each section component takes `locale: 'fr' | 'en'`.
- French routes set `locale` to `'fr'`: `src/pages/index.astro`, `mentions-legales.astro`, `politique-de-confidentialite.astro`, `conditions-generales.astro`.
- `src/lib/paths.ts` holds `legalSlugs` and `legalPath()`. French slugs: `mentions-legales`, `politique-de-confidentialite`, `conditions-generales`. English slugs: `legal-notice`, `privacy-policy`, `terms-of-service`.
- `isMultilangEnabled()` is `import.meta.env.ENABLE_MULTILANG === 'true'`. Any other value is off.
- Declare `ENABLE_MULTILANG` in `src/env.d.ts` and `.env.example`.
- `publishedLocales` lives in `src/site.config.ts`.
- hreflang comes from `buildAlternateLanguages()` in `src/lib/seo.ts`, which keeps a locale only when `isPublishedLocale()` is true.

If those files are missing, copy them from the reference repo:

- `src/i18n/i18n.ts`
- `src/lib/paths.ts`
- `src/lib/seo.ts`
- `src/pages/en/[...slug].astro`
- `src/pages/blog/[...slug].astro`
- `src/pages/en/blog/[...slug].astro`
- `src/components/LanguageSwitcher.astro`
- `src/pages/404.astro`
- `MULTILANG.md`
- The three root redirects in `astro.config.mjs` (`/legal-notice`, `/privacy-policy`, `/terms-of-service` → the French slugs, status 301)

Then replace client copy. `scripts/gen-locales.mjs` in the reference repo writes ARM Services sentences. Do not run it for another brand.

## 2. English terms, even when the flag is false

Every edit that adds or changes a key in `fr.json` writes the same key in `en.json` in the same change.

- The key trees match. A missing English key falls back to French and would later show French on an English URL.
- An empty English string is allowed only when the French string is empty.
- `LanguageSwitcher`, legal pages, the 404 page, and every section have English entries.
- Keep `en.json` and `src/pages/en/[...slug].astro` when `ENABLE_MULTILANG=false`.

`en.json` prepares English. It does not create a `/en/` URL.

## 3. Build `/en/` only when both switches are on

| Site | `publishedLocales` | `ENABLE_MULTILANG` |
|---|---|---|
| French only | `['fr']` | `false` |
| French and English | `['fr', 'en']` | `true` |

Set both together. `isPublishedLocale('en')` is true only when `'en'` is listed and `ENABLE_MULTILANG` is the string `true`.

### Flag false

- `getStaticPaths()` in `src/pages/en/[...slug].astro` returns `[]`.
- `blogStaticPaths('en')` returns `[]`.
- `LanguageSwitcher.astro` renders nothing. The hero may still import it.
- `localePathPrefix('en')` is empty, so footer links stay on the French slugs.
- Head: `hreflang="fr"` and `hreflang="x-default"`, both the French URL. No `hreflang="en"`. No `og:locale:alternate`.

### Flag true

- The same `getStaticPaths()` returns `/en/`, `/en/legal-notice`, `/en/privacy-policy`, `/en/terms-of-service`.
- The switcher links `/` and `/en/`.
- hreflang lists `fr`, `en`, and `x-default` (the French URL). A missing translation is omitted.
- `/en/blog` exists only when `CONTENTFORGE_ARTICLES_ENABLED=true` and English is published. A slug returned for one locale is not announced for the other.
- `.env` is gitignored. Add `ENABLE_MULTILANG` to the `pnpm run build` environment in `.github/workflows/deploy.yml`. A local `.env` does not change the GitHub Pages build.

These root redirects stay in both modes:

- `/legal-notice` → `/mentions-legales`
- `/privacy-policy` → `/politique-de-confidentialite`
- `/terms-of-service` → `/conditions-generales`

French stays at the root. English, when published, lives under `/en/`. The slug matches the page language.

## Checks

After `pnpm build`, French only:

- `dist` has no `en/index.html`
- The home head has `fr` and `x-default` only

After `pnpm build`, both languages:

- `dist/en/index.html` and the three English legal pages exist
- Each page's hreflang points at a page that was generated
- The footer on an English legal page uses the English slug
- `/privacy-policy/` still redirects to the French slug

## Do not

- Prefix French with `/fr/`
- Publish `/privacy-policy/`, `/legal-notice/`, or `/terms-of-service/` at the root
- Announce `hreflang="en"` while English is unpublished
- Rename components into French (`TermsArticle` stays `TermsArticle`)
- Redirect `/en/privacy-policy` to French
- Put a capital letter or an accent in a slug
