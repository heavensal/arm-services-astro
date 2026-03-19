// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
//
// Production actuelle (GitHub Pages) :
//   https://heavensal.github.io/arm-services-astro/
//
// Noms de domaine à arbitrer / acheter (mise à jour `site` + redirections le jour venu) :
//   - https://arm-services-demenagement.fr
//   - https://arm-services.fr
export default defineConfig({
	site: 'https://heavensal.github.io',
	base: '/arm-services-astro',
	output: 'static',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwind()],
	},
});
