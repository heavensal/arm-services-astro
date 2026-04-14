# Copilot Astro Base Template Instructions

When suggesting or generating code for this repository, follow these instructions.

## First Steps

**READ THE README.md FIRST.** It contains essential documentation about:
- Project structure and file organization
- Component patterns and usage
- SEO configuration
- Tailwind styling conventions

## Architecture and Components

- Follow the existing codebase patterns and keep changes small and targeted.
- Reuse existing components, utilities, and styles whenever possible.
- Prefer straightforward, maintainable solutions over abstraction.
- Each component should represent one section focused on a single subject, theme, or customer conversion step.
- Create a separate component whenever a new subject, theme, or conversion step is introduced.
- Do not exceed 150 lines of code per file.
- Refactor as soon as a generated feature would push a file beyond 150 lines of code.

## Tailwind CSS — STRICT RULES

This project uses **Tailwind CSS 4** with strict conventions.

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

### ❌ NEVER: Use Inline Styles

```astro
<!-- FORBIDDEN -->
<div style="margin-top: 23px;">
<div style={{ marginTop: '23px' }}>
```

### Animation Priority Order

1. **First**: Use native Tailwind animations (`animate-pulse`, `animate-spin`, `animate-bounce`)
2. **Second**: Use Tailwind transitions (`transition-colors`, `transition-transform`, `duration-200`)
3. **Third**: Use existing project animations (`fade-in`, `services-reveal`)
4. **Last resort only**: Create custom `@keyframes` in `global.css` (only if explicitly requested)

### Exception

Only deviate from these rules if the user **explicitly requests**:
- Arbitrary values for a specific use case
- Custom utility layers or design tokens
- Complex animations requiring keyframes

## SEO and Accessibility

- Preserve accessibility and responsive behavior.
- Every HTML generation must follow the best possible SEO and accessibility practices.
- Use semantic HTML elements (`<section>`, `<header>`, `<nav>`, `<main>`, `<footer>`).
- Include proper ARIA labels and landmark roles.

## Change Safety

- Avoid unnecessary dependencies or refactors.
- Do not replace existing user work unless specifically instructed.
