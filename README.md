# ARM Services — Moving Company Brochure Site

Brochure site for ARM Services, a moving company based in Marseille. Built with Astro 7 and Tailwind 4, with full SEO (sitemap, Open Graph) and GitHub Pages deployment.

**Requirements:** Node.js ≥ 24 (see `package.json` → `engines`).

---

## Table of contents

- [Features](#features)
- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [Forge content](#forge-content)
- [Languages and hreflang](#languages-and-hreflang)
- [Multilang: how and why](#multilang-how-and-why)
- [Configuration](#configuration)
- [Components](#components)
- [SEO configuration](#seo-configuration)
- [Style conventions](#style-conventions)
- [Deployment](#deployment)
- [Commands](#commands)

---

## Features

- **SEO**: Open Graph, Twitter Cards, canonical URLs, hreflang (`fr` and `x-default` only), JSON-LD, sitemap, generated `robots.txt`
- **i18n**: French is published. `ENABLE_MULTILANG=false` generates no `/en/` URL. English copy still lives in `en.json`. See [Languages and hreflang](#languages-and-hreflang) and [Multilang: how and why](#multilang-how-and-why)
- **FAQ, reviews, blog**: each has its own Forge flag (`true` / `false`). Details in [Forge content](#forge-content)
- **Contact form**: dialog in the contact section, `POST` to Forge (`PUBLIC_CONTACT_FORM_URL` + **`PUBLIC_CONTACT_FORM_TOKEN`**, `Authorization: Bearer` header)
- **Email template**: `src/templates/email/contact-message.html` and `buildArmContactEmailHtml()` in `src/lib/email/contactMailHtml.ts` for the service that sends mail
- **Landing sections**: Hero, TrustBar, Services, Process, Areas, WhyUs, Reviews, QuoteCTA, FinalCTA (includes the form), Footer
- **Legal pages**: legal notice, privacy policy, terms of service
- **Accessibility**: semantic HTML, ARIA labels
- **Animations**: fade-in and scroll reveal, with `prefers-reduced-motion`
- **LLM-ready**: instructions for Cursor, GitHub Copilot, and Codex

---

## Quick start

### Install

```sh
git clone https://github.com/YOUR_USER/arm-services-astro.git
cd arm-services-astro
pnpm install
pnpm dev
```

### Initial setup

After cloning, copy **`.env.example`** to **`.env`**, then adjust if needed (`ENABLE_MULTILANG`, `FORGE_*`, **`PUBLIC_CONTACT_FORM_URL`**, **`PUBLIC_CONTACT_FORM_TOKEN`**). In particular, update:

1. **`astro.config.mjs`** — set `site` and `base` for the deployment URL
2. **`src/site.config.ts`** — site identity, contact, social links, OG image
3. **`src/i18n/locales/fr.json`** and **`en.json`** — copy (home, sections, legal pages)

---

## Project structure

```text
/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── site.webmanifest
│   └── android-chrome-512x512.png
├── src/
│   ├── assets/
│   │   └── images/           # Imported images (hero, etc.)
│   ├── components/           # Landing sections
│   │   ├── Hero.astro
│   │   ├── TrustBar.astro
│   │   ├── Services.astro
│   │   ├── Process.astro
│   │   ├── Areas.astro
│   │   ├── WhyUs.astro
│   │   ├── Reviews.astro
│   │   ├── QuoteCTA.astro
│   │   ├── FinalCTA.astro
│   │   ├── ContactFormDialog.astro
│   │   └── Footer.astro
│   ├── lib/
│   │   ├── email/
│   │   │   └── contactMailHtml.ts
│   │   ├── paths.ts
│   │   ├── seo.ts
│   │   └── forge.ts
│   ├── templates/
│   │   └── email/
│   │       └── contact-message.html
│   ├── layouts/
│   │   └── Layout.astro      # SEO: meta tags, Open Graph
│   ├── i18n/
│   │   ├── i18n.ts
│   │   └── locales/          # fr.json, en.json
│   ├── pages/
│   │   ├── index.astro       # Home page
│   │   ├── mentions-legales.astro
│   │   ├── politique-de-confidentialite.astro
│   │   ├── conditions-generales.astro
│   │   ├── robots.txt.ts
│   │   └── en/
│   │       └── [...slug].astro  # /en/ only when ENABLE_MULTILANG=true
│   └── styles/
│       └── global.css        # Tailwind + Armenian theme + animations
├── astro.config.mjs          # SEO: site URL and base path
├── AGENTS.md                 # Base Codex instructions
├── AGENTS.project.md         # Project-specific Codex instructions
└── .cursor/rules/            # Cursor AI rules
```

Blog pages (generated only when `FORGE_ARTICLES_ENABLED=true` and the locale is in `publishedLocales`): `src/pages/blog/[...slug].astro` and `src/pages/en/blog/[...slug].astro`. `/en/blog` also requires `ENABLE_MULTILANG=true`. On ARM Services both are off (`ENABLE_MULTILANG=false`, articles `false`, `publishedLocales` = `['fr']`), so there is no blog page and no `/en/` URL.

---

## Forge content

Forge is the CMS (a separate repository). This site only displays content. Three blocks can be connected, **independently**:

| Variable | `true` | `false`, or unreachable API |
| --- | --- | --- |
| `FORGE_FAQ_ENABLED` | `GET /faqs` | `Faq.*` strings in `fr.json` / `en.json` |
| `FORGE_REVIEWS_ENABLED` | `GET /reviews` (model rating 1–5) | `Reviews.r*` strings, 5 stars |
| `FORGE_ARTICLES_ENABLED` | `GET /articles` and `GET /articles/:slug` → `/blog` and `/blog/[slug]`. `/en/blog` only if `ENABLE_MULTILANG=true` and `en` is in `publishedLocales` | those pages are not generated |

**ARM Services imports nothing**: all three flags stay `false` (`.env` and GitHub Actions secrets). FAQ and reviews come from `fr.json`. `/blog` is not generated.

`FORGE_URL` and `FORGE_API_TOKEN` are shared. Another site can publish a blog (`ARTICLES=true`) without CMS reviews (`REVIEWS=false`).

Reads happen **at build time**. In production, the same names are GitHub Actions secrets (`deploy.yml`). For this site they must stay empty or `false`. Hero, services, process, areas, legal pages, phone, and quote stay in this repository.

## Languages and hreflang

The rule for one language and for several languages is **`MULTILANG.md`**. Codex, Claude, Cursor, and GitHub Copilot follow that file.

ARM Services publishes French only. Some brochure sites publish French and English; this one does not.

`src/site.config.ts` sets `publishedLocales` to `['fr']`. hreflang may list only those languages. On every page the head contains:

- `hreflang="fr"` → the French URL for that page
- `hreflang="x-default"` → the same French URL

There is no `hreflang="en"`. `og:locale:alternate` is omitted. JSON-LD `inLanguage` is `fr-FR` only.

`ENABLE_MULTILANG=false` (this site) generates no `/en/` URL and hides the hero switcher. hreflang stays `fr` and `x-default`. Legal URLs use the French slug: `/mentions-legales`, `/politique-de-confidentialite`, `/conditions-generales`. The old English slugs (`/legal-notice`, `/privacy-policy`, `/terms-of-service`) redirect to those French URLs.

`ENABLE_MULTILANG=true` generates `/en/` (home and legal pages) and shows the switcher. English legal URLs keep the English slug: `/en/legal-notice`, `/en/privacy-policy`, `/en/terms-of-service`. hreflang lists `en` only when `'en'` is also in `publishedLocales`. `/en/blog` exists only when articles are enabled and English is published.

A blog article that exists in only one published locale does not advertise the missing translation: `/blog/mon-article` does not point at `/en/blog/mon-article` when that slug was not returned for English.

Forge stays off on this site (`FORGE_FAQ_ENABLED`, `FORGE_REVIEWS_ENABLED`, and `FORGE_ARTICLES_ENABLED` are all `false`), so no blog URLs are generated today. The hreflang rule above still applies to the home page and the legal pages, and to the blog if articles are turned on later.

## Multilang: how and why

One Astro project publishes either French alone or French and English. ARM Services publishes French. The next brochure site uses the same files and changes two switches. Cursor repeats that setup with the agent `.cursor/agents/brochure-multilang.md` and the skill `.cursor/skills/brochure-multilang/SKILL.md`. `MULTILANG.md` remains the URL rule.

### Why the English file and the English URLs are separate

`en.json` holds the English sentences. `ENABLE_MULTILANG` decides whether `/en/` pages are built. A French-only site still needs the sentences, so the day the flag becomes `true` the pages already have copy.

`getFixedT` falls back to French (`fallbackLng: 'fr'` in `src/i18n/i18n.ts`). A key that exists only in `fr.json` would show French on an English URL. Every new or changed French key is therefore written in `en.json` in the same change, including when `ENABLE_MULTILANG=false`.

The public site stays French until the build is asked for English. `getStaticPaths()` in `src/pages/en/[...slug].astro` returns an empty list unless `ENABLE_MULTILANG` is the string `true`. The route file stays in the repository, and no `/en/` HTML is emitted. hreflang goes through a second check, `isPublishedLocale()` in `src/lib/seo.ts`: English is announced only when `'en'` is also in `publishedLocales`. One switch alone does not publish English. On ARM Services the head stays `fr` and `x-default`, both pointing at the French URL.

### How a page is chosen

Visible strings go through `getFixedT(locale)`. Section components take `locale`. The French home is `src/pages/index.astro` with `locale` set to `'fr'`. The English home and the three English legal pages are one catch-all, `src/pages/en/[...slug].astro`, which renders the same components with `locale` set to `'en'`.

French lives at the root. There is no `/fr/` prefix. English, when it is published, lives under `/en/`. The slug follows the language of the page: `/politique-de-confidentialite/` in French, `/en/privacy-policy/` in English. Links use `legalPath()` in `src/lib/paths.ts`, which adds `en/` only when the flag is on. The hero can always import `LanguageSwitcher.astro`; the component renders nothing while the flag is off.

`/legal-notice`, `/privacy-policy`, and `/terms-of-service` at the root redirect 301 to the French slugs (`astro.config.mjs`). Those redirects stay after English is turned on, because English occupies `/en/`, and the root keeps the French address.

`.env` is gitignored. GitHub Pages runs `pnpm run build` from `.github/workflows/deploy.yml`. A bilingual site adds `ENABLE_MULTILANG` to that step’s environment. The local file alone does not change the production build.

### What the next site changes

| Job | French only (this site) | French and English |
|---|---|---|
| Basic i18n | `getFixedT`, `locale` on each section, both JSON files | same |
| English sentences | `en.json` filled, no `/en/` URL | `en.json` filled |
| Publish `/en/` | `publishedLocales: ['fr']`, `ENABLE_MULTILANG=false` | `publishedLocales: ['fr', 'en']`, `ENABLE_MULTILANG=true` |

## Configuration

### Astro configuration (`astro.config.mjs`)

Update `site` and `base` for deployment:

```javascript
// SEO: Custom domain
const site = 'https://arm-services-demenagement.fr';
const base = '/';

// OR for GitHub Pages without a custom domain:
// const site = 'https://heavensal.github.io';
// const base = '/arm-services-astro';
```

### SEO configuration (`src/layouts/Layout.astro`)

Default title and description are set in the layout:

```typescript
const {
  title = 'ARM Services | Déménagement Marseille & France — Devis gratuit',
  description = 'ARM Services, déménagement à Marseille...',
  ogImage = 'android-chrome-512x512.png',
} = Astro.props;
```

---

## Components

### Component architecture

Landing sections are standalone Astro components:

```astro
---
/**
 * ComponentName — short description of the section.
 */
interface Props {
  phone?: string;
  // other optional props
}

const { phone = "06 43 09 65 97" } = Astro.props;
---

<section class="..." aria-label="Section description">
  <!-- Content -->
</section>
```

### Component list

| Component | Description |
|-----------|-------------|
| `Hero.astro` | Full-screen banner with image, SEO H1, CTAs |
| `TrustBar.astro` | Trust bar (key figures) |
| `Services.astro` | Grid of services offered |
| `Process.astro` | Moving process steps |
| `Areas.astro` | Service areas |
| `WhyUs.astro` | Why choose us |
| `Reviews.astro` | Customer testimonials |
| `QuoteCTA.astro` | Quote call to action |
| `FinalCTA.astro` | Final contact CTA |
| `Footer.astro` | Footer with legal links |

### Create a new component

1. Create `src/components/NewSection.astro`
2. Import it and add it in `src/pages/index.astro`

---

## SEO configuration

The following files and elements need an update for SEO:

### 1. Site URL (`astro.config.mjs`)

```javascript
// SEO: Update the production domain
const site = 'https://arm-services-demenagement.fr';
const base = '/';
```

### 2. Meta tags (`src/layouts/Layout.astro`)

The layout sets these automatically:
- Title and description
- Canonical URL
- Open Graph (type, title, description, url, locale, site_name, image)
- Twitter Cards

### 3. Static files (`public/`)

- `site.webmanifest` — PWA manifest
- `android-chrome-512x512.png` — default OG image
- `favicon.svg`, `favicon.ico` — favicons

---

## Style conventions

### Tailwind CSS — strict rules

This project uses **Tailwind CSS 4** with strict conventions.

#### Do: use native Tailwind classes

```astro
<div class="flex items-center justify-between gap-4 px-6 py-4">
  <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">Title</h2>
  <button class="rounded-lg bg-orange-armenian px-4 py-2 text-white hover:brightness-95">
    Click
  </button>
</div>
```

#### Do not: use arbitrary values

```astro
<!-- FORBIDDEN: arbitrary values with brackets -->
<div class="w-[347px] mt-[23px] text-[#1a2b3c]">
```

#### Do not: use inline styles

```astro
<!-- FORBIDDEN: inline styles -->
<div style="margin-top: 23px; color: #1a2b3c;">
```

### Animations

#### 1. First: native Tailwind animations

```astro
<div class="animate-pulse">Loading...</div>
```

#### 2. Next: Tailwind transitions

```astro
<button class="transition-colors duration-200 hover:bg-orange-600">
  Hover me
</button>
```

#### 3. If needed: keyframes in `global.css`

The project already uses custom animations (`fade-in`, `services-reveal`) defined in `global.css`. Follow the existing pattern and include `prefers-reduced-motion`.

### Color palette (Armenian theme)

Defined in `global.css` via `@theme`:

- **Orange**: `orange-armenian` (`#F2A800`) — CTAs, primary accents
- **Red**: `red-armenian` (`#D90012`) — secondary accents
- **Blue**: `blue-armenian` (`#0033A0`) — tertiary accents
- **Background**: `gray-900`, `gray-100` (alternating sections)
- **Text**: `gray-900` (headings), `gray-600` (body), `white` (on dark backgrounds)

---

## Deployment

### GitHub Pages

The `.github/workflows/deploy.yml` workflow builds and deploys on push to `main`.

1. **Repository** → **Settings** → **Pages**: source **GitHub Actions**
2. Set `site` and `base` in `astro.config.mjs`
3. **Settings** → **Secrets and variables** → **Actions**: add **`PUBLIC_CONTACT_FORM_URL`**, **`PUBLIC_CONTACT_FORM_TOKEN`**, and, if a CMS block is on, **`FORGE_URL`**, **`FORGE_API_TOKEN`**, **`FORGE_FAQ_ENABLED`**, **`FORGE_REVIEWS_ENABLED`**, **`FORGE_ARTICLES_ENABLED`** (`true` or `false`). The workflow injects them at `pnpm run build`.

The contact form needs **`PUBLIC_CONTACT_FORM_URL`** (for example `https://forge.1344.fr/api/v1/send_form`) and **`PUBLIC_CONTACT_FORM_TOKEN`** in `.env` (GitHub Actions secrets for deployment). Forge must allow the site in **CORS**.

### Custom domain

To use a custom domain:

1. Configure the domain in the GitHub Pages settings
2. Update `astro.config.mjs`:
   ```javascript
   const site = 'https://arm-services-demenagement.fr';
   const base = '/';
   ```

---

## Commands

| Command | Action |
|----------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview the build |
| `pnpm astro add [integration]` | Add an Astro integration |

---

## Documentation

- [Astro documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/)
