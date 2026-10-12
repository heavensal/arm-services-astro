import { isMultilangEnabled, type Locale } from '../i18n/i18n';

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
	blog: 'blog',
} as const;

/** `en/` only when `.env` turns English routes on. A French-only site never links under `/en/`. */
export function localePathPrefix(locale: Locale): string {
	return locale === 'en' && isMultilangEnabled() ? 'en/' : '';
}

export function homePathForLocale(locale: Locale): string {
	return localePathPrefix(locale) === 'en/' ? pageRoutes.englishHome : pageRoutes.home;
}
