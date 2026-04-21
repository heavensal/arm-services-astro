const DEFAULT_URL = 'https://contentforge.1344.fr/api/v1';

/**
 * When `"true"`, FAQ (and future API-driven blocks) may fetch from ContentForge.
 * Otherwise i18n fallback is used. A valid `CONTENTFORGE_API_TOKEN` is still required to call the API.
 */
export function isContentforgeEnabled(): boolean {
	return import.meta.env.CONTENTFORGE_ENABLED === 'true';
}

/**
 * Build full Contentforge API URL for a given endpoint path.
 * Uses CONTENTFORGE_URL env variable with fallback to default.
 */
export function contentforgeApiUrl(path: string): string {
	const base = import.meta.env.CONTENTFORGE_URL || DEFAULT_URL;
	const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	return `${cleanBase}/${cleanPath}`;
}
