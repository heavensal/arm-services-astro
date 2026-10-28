# Multilang on a brochure site

Mandatory rule for Codex, Claude, Cursor, and GitHub Copilot.
Read this file before any change to languages, URLs, slugs, hreflang, the sitemap, or legal pages.

ARM Services is the “one language” case. The repository can also produce a “several languages” site. Both cases share the same code. What changes is what the site **publishes**.

## Concept

A brochure site is the public site (Astro here). It displays. It is not the CMS.
Forge, in the other repository, authors the blog, FAQ, and reviews. The brochure site fetches them at build time, only when that block’s flag is `true`. Hero, services, process, areas, legal pages, phone, and quote stay in this repository.

The language model is ready for French and English. Each site chooses how many languages it publishes.

- Code, component names, and variable names stay in English: `TermsArticle`, `PrivacyArticle`, `legalSlugs`.
- Visible copy comes from `src/i18n/locales/fr.json` or `en.json`, via `getFixedT(locale)`.
- The public URL is in the language of the page. A slug is an address word: lowercase, hyphens, no accent, no capital letter.

`en.json` can exist while the site publishes French only. The file prepares English. It does not create a `/en/` URL.

French is the default language. It lives at the root. There is no `/fr/` prefix.
English, when it is published, lives under `/en/`.

## The two switches

Both must agree. Do not turn on only one.

| Switch | Where | Role |
|---|---|---|
| `publishedLocales` | `src/site.config.ts` | Languages the site announces. hreflang, Open Graph, and JSON-LD `inLanguage` cite only this list. |
| `ENABLE_MULTILANG` | `.env`, read by `isMultilangEnabled()` | `true` generates `/en/` pages and shows the language switcher. `false` generates none. |

`isPublishedLocale('en')` is true only when both are on: `'en'` is in `publishedLocales` **and** `ENABLE_MULTILANG=true`.

| Site | `publishedLocales` | `ENABLE_MULTILANG` |
|---|---|---|
| One language (ARM Services today) | `['fr']` | `false` |
| Several languages | `['fr', 'en']` | `true` |

## One language

ARM Services publishes French only.

Expected:

- No `/en/` URL. Not the home page, not a legal page, not the blog.
- The hero language switcher is absent.
- The sitemap contains French URLs only.
- hreflang: `fr` and `x-default`, both pointing at the French URL of the page. No `hreflang="en"`.
- No `og:locale:alternate`. JSON-LD `inLanguage`: `fr-FR` only.
- The footer and canonicals use the French slug.
- `src/pages/en/[...slug].astro` returns an empty list. The file stays in the repository for the day English is turned on.

Public legal pages:

| Page | Route file | URL |
|---|---|---|
| Legal notice | `src/pages/mentions-legales.astro` | `/mentions-legales/` |
| Privacy policy | `src/pages/politique-de-confidentialite.astro` | `/politique-de-confidentialite/` |
| Terms | `src/pages/conditions-generales.astro` | `/conditions-generales/` |

Components stay `LegalNoticeArticle`, `PrivacyArticle`, `TermsArticle`.

These URLs must not exist as French pages:

- `/legal-notice/`
- `/privacy-policy/`
- `/terms-of-service/`

They redirect to the French slug (`astro.config.mjs`, status 301). The redirect stays in place even on the day English is added, because English does not occupy the root: it occupies `/en/`.

## Several languages

Turn both switches on together. The site then publishes French at the root and English under `/en/`.

Expected:

- `/` and `/en/`: the same home page, each in its language.
- The language switcher is visible.
- hreflang cites `fr`, `en`, and `x-default`. `x-default` repeats the French URL, the site default language.
- `og:locale:alternate` cites the other language.
- Each page points at its real translation. A missing translation is not announced.
- The sitemap contains the French URLs and the generated `/en/` URLs.

The slug follows the language of the page. The French page keeps its French slug. The English page gets the English slug, under `/en/`.

| Page | French | English |
|---|---|---|
| Home | `/` | `/en/` |
| Legal notice | `/mentions-legales/` | `/en/legal-notice/` |
| Privacy policy | `/politique-de-confidentialite/` | `/en/privacy-policy/` |
| Terms | `/conditions-generales/` | `/en/terms-of-service/` |

Slugs live in `legalSlugs` (`src/lib/paths.ts`). Links go through `legalPath(locale, page)`: the `en/` prefix is added only when English is published.

Example. The French privacy policy is `/politique-de-confidentialite/`. On the day English is published, the translation is `/en/privacy-policy/`. The French URL does not become `/privacy-policy/`.

## Blog

The blog is not a page stored in the repository. It is generated only when `FORGE_ARTICLES_ENABLED=true` and the language is published.

- French: `/blog` and `/blog/{slug}`.
- English: `/en/blog` and `/en/blog/{slug}`, and only when English is published.
- An article present in only one language does not announce the other in hreflang.

On ARM Services the three Forge flags stay `false`. No `/blog` URL is generated. The `blog` segment is the same in both languages. The article slug is the one Forge returns.

## What not to do

- Publish `/privacy-policy/`, `/legal-notice/`, or `/terms-of-service/` at the root of a French-only site.
- Generate a `/en/` page because `en.json` exists, or because the component has a `locale` prop.
- Announce `hreflang="en"`, a `/en/` link, or `og:locale:alternate` while English is not published.
- Translate component file names (`TermsArticle` stays `TermsArticle`).
- Prefix French with `/fr/`.
- Redirect `/en/privacy-policy` to French. That path is reserved for the English page.
- Turn on `ENABLE_MULTILANG` without adding `'en'` to `publishedLocales`, or the reverse.
- Put a capital letter or an accent in a slug. `Politique-de-confidentialité` is not a URL. The URL is `/politique-de-confidentialite/`.

## Files

| File | Role |
|---|---|
| `src/site.config.ts` | `publishedLocales`, default language |
| `.env` | `ENABLE_MULTILANG` |
| `src/i18n/i18n.ts` | `isMultilangEnabled()`, `getFixedT(locale)` |
| `src/lib/paths.ts` | `legalSlugs`, `legalPath`, `en/` prefix |
| `src/lib/seo.ts` | hreflang, canonical, Open Graph, JSON-LD |
| `src/pages/*.astro` | French routes; the file name is the slug |
| `src/pages/en/[...slug].astro` | English routes, generated only when the flag is `true` |
| `src/components/LanguageSwitcher.astro` | Switcher, rendered only when the flag is `true` |
| `astro.config.mjs` | Redirects from the old English slugs to the French slugs |
