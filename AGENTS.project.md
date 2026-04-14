# Codex ARM Services Project Instructions

Project-specific instructions for ARM Services.
These complement the base instructions in `AGENTS.md`.

## First Steps

**READ THE README.md FIRST** to understand:
- How to configure the project (`astro.config.mjs`, `Layout.astro`)
- Component patterns and usage
- SEO configuration
- Tailwind styling conventions and Armenian theme

## Project Context

- This is the landing page for ARM Services, a moving company based in Marseille.
- The company provides moving and delivery services throughout France.
- The website targets individual and professional clients seeking reliable moving services.
- Primary conversion goal: phone calls and quote requests.

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | SEO: Site URL and base path |
| `src/layouts/Layout.astro` | SEO: Meta tags, Open Graph, default title/description |
| `src/pages/index.astro` | Homepage with phone number configuration |
| `src/styles/global.css` | Tailwind theme (Armenian colors) and animations |
| `src/components/` | Landing page sections |

## Component Architecture

Components are standalone Astro files with optional props:

```astro
---
/**
 * ComponentName — description of the section.
 */
interface Props {
  phone?: string;
}

const { phone = "06 43 09 65 97" } = Astro.props;
---

<section class="..." aria-label="Section description">
  <!-- Content -->
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
