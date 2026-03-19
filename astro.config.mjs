// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://heavensal.github.io',
	base: '/arm-services-astro',
	output: 'static',
	vite: {
		plugins: [tailwind()],
	},
});
