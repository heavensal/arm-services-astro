import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const base = import.meta.env.BASE_URL;
	const sitemapUrl = site
		? new URL(`${base}sitemap-index.xml`, site).href
		: '';

	const body = `User-agent: *
Allow: /
${sitemapUrl ? `\nSitemap: ${sitemapUrl}` : ''}`.trim();

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
