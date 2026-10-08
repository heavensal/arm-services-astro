const DEFAULT_URL = 'https://contentforge.1344.fr/api/v1';

/**
 * Each flag gates one ContentForge resource at build time.
 * ContentForge starts a rebuild only when the Website marks that same type as imported.
 */

/** FAQ from ContentForge. Off: the section uses fr.json / en.json. */
export function isFaqEnabled(): boolean {
	return import.meta.env.CONTENTFORGE_FAQ_ENABLED === 'true';
}

/** Reviews from ContentForge. Off: the section uses fr.json / en.json. */
export function isReviewsEnabled(): boolean {
	return import.meta.env.CONTENTFORGE_REVIEWS_ENABLED === 'true';
}

/** Blog pages from ContentForge. Off: /blog is not generated. */
export function isArticlesEnabled(): boolean {
	return import.meta.env.CONTENTFORGE_ARTICLES_ENABLED === 'true';
}

/** Build a ContentForge API URL. Uses CONTENTFORGE_URL, otherwise the production host. */
export function contentforgeApiUrl(path: string, locale?: string): string {
	const base = import.meta.env.CONTENTFORGE_URL || DEFAULT_URL;
	const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	const url = `${cleanBase}/${cleanPath}`;
	if (!locale) return url;
	return `${url}?locale=${encodeURIComponent(locale)}`;
}

export async function fetchContentforge(path: string, locale?: string): Promise<unknown | null> {
	const apiToken = import.meta.env.CONTENTFORGE_API_TOKEN;
	if (typeof apiToken !== 'string' || apiToken.length === 0) return null;
	try {
		const response = await fetch(contentforgeApiUrl(path, locale), {
			headers: {
				Authorization: `Bearer ${apiToken}`,
				Accept: 'application/json',
			},
		});
		if (!response.ok) return null;
		return await response.json();
	} catch (error) {
		console.error(`ContentForge request failed: ${path}`, error);
		return null;
	}
}

export function asList(payload: unknown): unknown[] {
	if (Array.isArray(payload)) return payload;
	if (
		payload &&
		typeof payload === 'object' &&
		'data' in payload &&
		Array.isArray((payload as { data: unknown }).data)
	) {
		return (payload as { data: unknown[] }).data;
	}
	return [];
}
