/** Internal link compatible with GitHub Pages (non-root `base` in astro.config.mjs). */
export function pageHref(path: string): string {
	const base = import.meta.env.BASE_URL;
	const clean = path.startsWith('/') ? path.slice(1) : path;
	return base + clean;
}

/** URL path segments (English filenames / slugs). */
export const pageRoutes = {
	home: '',
	englishHome: 'en/',
	legalNotice: 'legal-notice',
	privacyPolicy: 'privacy-policy',
	termsOfService: 'terms-of-service',
} as const;

export function homePathForLocale(locale: 'fr' | 'en'): string {
	return locale === 'fr' ? pageRoutes.home : pageRoutes.englishHome;
}
