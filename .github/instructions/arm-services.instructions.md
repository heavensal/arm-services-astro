# Copilot ARM Services Project Instructions

Project-specific instructions for GitHub Copilot.
These complement the base instructions in `.github/copilot-instructions.md`.

## First Steps

**READ THE README.md FIRST** to understand:
- How to configure the project (`astro.config.mjs`, `Layout.astro`)
- Component patterns and usage
- SEO configuration
- Tailwind styling conventions and Armenian theme

## Project Context

- Landing page for ARM Services, moving company based in Marseille
- Services: moving and delivery throughout France
- Target: individual and professional clients
- Conversion goal: phone calls and quote requests

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | SEO: Site URL and base path |
| `src/layouts/Layout.astro` | SEO: Meta tags, Open Graph |
| `src/pages/index.astro` | Homepage, phone number |
| `src/styles/global.css` | Tailwind theme + animations |

## Component Architecture

Components are standalone Astro files:

```astro
---
interface Props {
  phone?: string;
}

const { phone = "06 43 09 65 97" } = Astro.props;
---

<section class="..." aria-label="Description">
  <!-- Content -->
</section>
```

## Brand Positioning

- Professional but approachable moving service
- Emphasis on reliability, insurance, expertise
- Armenian heritage in color scheme
- Clear, straightforward communication

## Visual Direction

- Clean, professional design
- Alternating section backgrounds
- Armenian colors as accents
- Strong CTA visual hierarchy

## Tailwind Styling

**STRICT RULES**:
- Native Tailwind classes ONLY
- NO arbitrary values like `w-[347px]` or `text-[#color]`
- NO inline styles
- Animations: Tailwind native → transitions → existing keyframes → new keyframes (last resort)

## Color Palette (Armenian Theme)

- **Orange**: `orange-armenian` (`#F2A800`) — Primary CTAs
- **Red**: `red-armenian` (`#D90012`) — Secondary
- **Blue**: `blue-armenian` (`#0033A0`) — Tertiary
- **Background**: `gray-900` / `gray-100`
- **Text**: `gray-900` / `gray-600` / `white`

## Conversion Focus

- Primary CTA: `bg-orange-armenian text-white hover:brightness-95`
- Secondary CTA: `border-2 border-orange-armenian hover:bg-orange-armenian`
- Phone link: `tel:` href format
