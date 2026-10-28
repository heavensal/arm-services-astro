const DEFAULT_URL = 'https://forge.1344.fr/api/v1';

/**
 * Each flag gates one Forge resource at build time.
 * Forge starts a rebuild only when the Website marks that same type as imported.
 */

/** FAQ from Forge. Off: the section uses fr.json / en.json. */
export function isFaqEnabled(): boolean {
	return import.meta.env.FORGE_FAQ_ENABLED === 'true';
}

/** Reviews from Forge. Off: the section uses fr.json / en.json. */
export function isReviewsEnabled(): boolean {
	return import.meta.env.FORGE_REVIEWS_ENABLED === 'true';
}

/** Blog pages from Forge. Off: /blog is not generated. */
export function isArticlesEnabled(): boolean {
	return import.meta.env.FORGE_ARTICLES_ENABLED === 'true';
}

/** Build a Forge API URL. Uses FORGE_URL, otherwise the production host. */
export function forgeApiUrl(path: string, locale?: string): string {
	const base = import.meta.env.FORGE_URL || DEFAULT_URL;
	const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	const url = `${cleanBase}/${cleanPath}`;
	if (!locale) return url;
	return `${url}?locale=${encodeURIComponent(locale)}`;
}

export async function fetchForge(path: string, locale?: string): Promise<unknown | null> {
	const apiToken = import.meta.env.FORGE_API_TOKEN;
	if (typeof apiToken !== 'string' || apiToken.length === 0) return null;
	try {
		const response = await fetch(forgeApiUrl(path, locale), {
			headers: {
				Authorization: `Bearer ${apiToken}`,
				Accept: 'application/json',
			},
		});
		if (!response.ok) return null;
		return await response.json();
	} catch (error) {
		console.error(`Forge request failed: ${path}`, error);
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
