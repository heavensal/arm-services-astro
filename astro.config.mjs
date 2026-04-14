// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * Astro configuration for ARM Services landing page.
 *
 * SEO: Update `site` and `base` when deploying to production.
 *
 * Deployment scenarios:
 * - Custom domain: site = 'https://arm-services-demenagement.fr', base = '/'
 * - GitHub Pages: site = 'https://heavensal.github.io', base = '/arm-services-astro'
 */

// SEO: Production site URL (affects canonical URLs, sitemap, Open Graph)
const site = 'https://arm-services-demenagement.fr';

// SEO: Base path ('/' for custom domain, '/repo-name' for GitHub Pages subdirectory)
const base = '/';

// Alternative for GitHub Pages without custom domain:
// const site = 'https://heavensal.github.io';
// const base = '/arm-services-astro';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	output: 'static',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwind()],
	},
});
