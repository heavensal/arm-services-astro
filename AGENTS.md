# Codex Astro Base Template Instructions

These instructions apply to Codex and other agentic coding tools that read `AGENTS.md`.
They are reusable base instructions for Astro projects.

## First Steps

**READ THE README.md FIRST.** It contains essential documentation about:
- Project structure and file organization
- Component patterns and usage
- SEO configuration (`astro.config.mjs`, `Layout.astro`, `public/` assets)
- Legal pages under `src/pages/` (`legal-notice`, `privacy-policy`, `terms-of-service`, plus `en/` mirrors)
- i18n (`src/i18n/locales/`, `getFixedT(locale)`) and optional ContentForge FAQ
- Styling guidelines, Armenian theme, and animations in `src/styles/global.css`

Also read **`AGENTS.project.md`** for ARM Services–specific context (conversion, palette, component workflow).

## Content and Language

- All user-facing strings live in **`src/i18n/locales/fr.json`** and **`en.json`**, loaded via **`getFixedT(locale)`**.
- Section components take a required **`locale: 'fr' | 'en'`** prop (see `LandingHome.astro`).
- **`ENABLE_MULTILANG`** (`.env`): when `false`, the FR/EN switcher is hidden; English routes (`/en/`, legal pages under `en/`) remain available for SEO and direct links.
- Keep component and variable names in English.

## Architecture and Components

- Follow the existing project structure, code style, and component patterns.
- Keep changes focused and minimal.
- Reuse existing components and styling patterns before introducing new ones.
- Avoid unnecessary abstractions, helpers, or dependencies.
- Each component should represent one section focused on a single subject, theme, or customer conversion step.
- Create a separate component whenever a new subject, theme, or conversion step is introduced.
- Do not exceed 150 lines of code per file.
- Refactor as soon as a generated feature would push a file beyond 150 lines of code.

## Tailwind CSS — STRICT RULES

This project uses **Tailwind CSS 4** with strict conventions:

### ✅ ALWAYS: Use Native Tailwind Classes Only

```astro
<div class="flex items-center gap-4 px-6 py-4 text-gray-900">
<button class="rounded-lg bg-orange-armenian px-4 py-2 hover:brightness-95">
```

### ❌ NEVER: Use Arbitrary Values (Brackets)

```astro
<!-- FORBIDDEN -->
<div class="w-[347px] mt-[23px] text-[#1a2b3c] bg-[rgb(255,0,0)]">
```

### ❌ NEVER: Use Inline Styles (except existing full-bleed background images)

```astro
<!-- FORBIDDEN -->
<div style="margin-top: 23px;">
<div style={{ marginTop: '23px' }}>
```

The Quote CTA section may keep a single `background-image` inline style for a dynamic asset URL; do not add new inline layout or typography styles.

### Animation Priority Order

1. **First**: Use native Tailwind animations (`animate-pulse`, `animate-spin`, `animate-bounce`)
2. **Second**: Use Tailwind transitions (`transition-colors`, `transition-transform`, `duration-200`)
3. **Third**: Use existing project animations (`fade-in`, `services-reveal` defined in `global.css`)
4. **Last resort only**: Create new custom `@keyframes` in `global.css` (only if explicitly requested)

When adding keyframes, always include `prefers-reduced-motion` media query.

### If User Requests Non-Standard Styling

Only deviate from these rules if the user **explicitly requests**:
- Arbitrary values for a specific use case
- Custom utility layers or design tokens
- Complex animations requiring keyframes

## SEO and Accessibility

- Preserve responsive behavior and accessibility.
- Every HTML generation must follow the best possible SEO and accessibility practices.
- Use semantic HTML elements (`<section>`, `<header>`, `<nav>`, `<main>`, `<footer>`).
- Include proper ARIA labels and landmark roles.
- Ensure all interactive elements have focus states.

## Change Safety

- Do not perform large refactors unless explicitly requested.
- Do not overwrite user changes unless explicitly asked to do so.
- Keep existing file structure and naming conventions.
