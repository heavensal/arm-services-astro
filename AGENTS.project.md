# Codex ARM Services Project Instructions

Project-specific instructions for ARM Services.
These complement the base instructions in `AGENTS.md`.

## First Steps

**READ THE README.md FIRST** to understand:
- How to configure the project (`astro.config.mjs`, `Layout.astro`, `public/` static assets)
- Component patterns and usage
- SEO configuration and `// SEO:` markers in code
- Legal pages (English slugs, FR + `en/` routes), i18n JSON, `.env` / ContentForge / **`PUBLIC_CONTACT_FORM_URL`** + **`PUBLIC_CONTACT_FORM_TOKEN`**
- Tailwind styling conventions, Armenian theme, and `global.css` animations

## Project Context

- This is the landing page for ARM Services, a moving company based in Marseille.
- The company provides moving and delivery services throughout France.
- The website targets individual and professional clients seeking reliable moving services.
- Primary conversion goal: phone calls and quote requests.

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | SEO: Site URL and base path (see `// SEO:` comments) |
| `src/layouts/Layout.astro` | SEO: Meta tags, Open Graph, default title/description |
| `src/site.config.ts` | SEO/contact/social single source of truth |
| `src/pages/index.astro` | French homepage (`LandingHome`) |
| `src/pages/en/index.astro` | English homepage |
| `src/pages/legal-notice.astro` / `en/legal-notice.astro` | Legal notice |
| `src/pages/privacy-policy.astro` / `en/privacy-policy.astro` | Privacy |
| `src/pages/terms-of-service.astro` / `en/terms-of-service.astro` | Terms (CGV) |
| `src/i18n/locales/*.json` | All landing + legal copy |
| `src/lib/seo.ts`, `src/lib/paths.ts` | hreflang helpers, JSON-LD |
| `src/lib/contentforge.ts` | FAQ API base URL |
| `ContactFormDialog.astro` | Modal form: `POST` ContentForge `{ from_email, from_name, subject, message, fields }` + `Authorization: Bearer` to `PUBLIC_CONTACT_FORM_URL` |
| `src/templates/email/contact-message.html` | Reference HTML for outbound email (placeholders) |
| `src/lib/email/contactMailHtml.ts` | `buildArmContactEmailHtml()` for external mailer |
| `.env` / `.env.example` | `ENABLE_MULTILANG`, `CONTENTFORGE_*`, **`PUBLIC_CONTACT_FORM_URL`**, **`PUBLIC_CONTACT_FORM_TOKEN`** |
| `src/styles/global.css` | Tailwind theme (Armenian colors) and animations |
| `src/components/` | Landing page sections |
| `public/` | Favicons, manifest, default OG image |

## Contact form (static / GitHub Pages)

The site is **static**: email sending uses **ContentForge** (`PUBLIC_CONTACT_FORM_URL`, e.g. `…/api/v1/send_form`) with **`PUBLIC_CONTACT_FORM_TOKEN`** (Bearer). Configure **CORS** for `https://arm-services-demenagement.fr` and `http://localhost:4321` in dev. **SMTP** variables in `.env.example` document the **Rails** environment, not Astro.

## SEO Markers

Comments marked `// SEO:` flag values to update for production or a new domain:
- `astro.config.mjs` — `site` and `base`
- When changing site identity, also review `Layout.astro` defaults and `public/` (manifest, OG image)

## Creating New Landing Sections

1. Add `src/components/NewSection.astro` following the component pattern below (one section ≈ one concern, keep files under ~150 lines).
2. Register strings in **`fr.json` and `en.json`** (keep ARM tone and facts).
3. Import the section in **`LandingHome.astro`** inside `<main id="main-content">` in the desired order.
4. Pass **`locale`** (and `phone` when needed) consistently with sibling sections.
5. Use semantic HTML, `aria-label` / headings as appropriate, and respect Tailwind rules in `AGENTS.md`.

## Component Architecture

Landing sections take **`locale`** and use **`getFixedT(locale)`** for copy:

```astro
---
import { getFixedT, type Locale } from '../i18n/i18n';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = getFixedT(locale);
---

<section class="..." aria-label={t('Section.aria')}>
  <!-- {t('Section.title')} -->
</section>
```

## Conversion Focus

- Every section should guide visitors toward contacting ARM Services
- Primary CTA: Phone call (`tel:` link)
- Secondary CTA: Quote request (`#devis` anchor)
- Emphasize trust signals: experience, insurance, professionalism

## Brand Positioning

- Professional but approachable moving service
- Emphasis on reliability, insurance coverage, and expertise
- Armenian heritage reflected in color scheme
- Clear, straightforward communication style

## Visual Direction

- Clean, professional design with alternating section backgrounds
- Armenian color palette as accent colors
- High-quality imagery of moving operations
- Strong visual hierarchy for CTAs

## Tailwind Styling

**STRICT RULES** (see `AGENTS.md` for details):
- Native Tailwind classes ONLY
- NO arbitrary values like `w-[347px]` or `text-[#color]`
- NO inline styles
- Animations: Tailwind native → transitions → existing keyframes → new keyframes (last resort)

## Color Palette (Armenian Theme)

Defined in `src/styles/global.css`:

- **Orange** : `orange-armenian` (`#F2A800`) — Primary CTAs, main accents
- **Red** : `red-armenian` (`#D90012`) — Secondary accents
- **Blue** : `blue-armenian` (`#0033A0`) — Tertiary accents
- **Background** : `gray-900` (dark sections), `gray-100` (light sections)
- **Text** : `gray-900` (headings), `gray-600` (body), `white` (on dark)

## Animations

The project uses custom animations in `global.css`:
- `fade-in` with delay variants (`fade-in-delay-1`, `-2`, `-3`)
- `services-reveal` for scroll-triggered card reveals

Always respect `prefers-reduced-motion` when adding new animations.
