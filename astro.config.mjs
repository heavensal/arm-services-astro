// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
//
// IMPORTANT — `site` + `base` doivent correspondre à l’URL où le site est réellement servi
// (sinon plus de CSS/JS : les fichiers sont cherchés au mauvais chemin).
//
// A) Domaine personnalisé (GitHub Pages « Custom domain » ou Nginx en racine) :
const site = 'https://arm-services-demenagement.fr';
const base = '/';
//
// B) Démo uniquement sur GitHub Pages sans domaine perso :
//    https://heavensal.github.io/arm-services-astro/
// const site = 'https://heavensal.github.io';
// const base = '/arm-services-astro';
//
// https://docs.astro.build/en/reference/configuration-reference/#base
export default defineConfig({
	site,
	base,
	output: 'static',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwind()],
	},
});
