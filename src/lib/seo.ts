import { siteConfig } from '../site.config';

export type SiteLocale = 'fr' | 'en';

const localeOrder: readonly SiteLocale[] = ['fr', 'en'];

/** True when this brochure site publishes that language. ARM Services: French only. */
export function isPublishedLocale(locale: SiteLocale): boolean {
	return siteConfig.publishedLocales.some((published) => published === locale);
}

/**
 * Open Graph alternate locale.
 * Omitted on a single-language site so the head does not advertise a translation that is not published.
 */
export function publishedOgLocaleAlternate(pageLocale: SiteLocale): 'fr_FR' | 'en_US' | undefined {
	if (!isPublishedLocale('fr') || !isPublishedLocale('en')) return undefined;
	return pageLocale === 'fr' ? 'en_US' : 'fr_FR';
}

/** Canonical home URLs for FR / EN (using Astro `site` + `base`). */
export function getAlternateLanguageUrls(
	site: URL | undefined,
): { fr: string; en: string } | undefined {
	if (!site) return undefined;
	const base = import.meta.env.BASE_URL;
	const fr = new URL(base, site).href;
	const en = new URL(`${base}en/`, site).href;
	return { fr, en };
}

/** Build absolute URL for a path segment (e.g. `legal-notice`, `en/legal-notice`). */
export function absolutePageUrl(
	site: URL | undefined,
	pathFromBase: string,
): string | undefined {
	if (!site) return undefined;
	const base = import.meta.env.BASE_URL;
	const clean = pathFromBase.startsWith('/') ? pathFromBase.slice(1) : pathFromBase;
	return new URL(base + clean, site).href;
}

/** JSON-LD for home (Organization + WebSite). */
export function buildLandingJsonLd(alternates: {
	fr: string;
	en: string;
}): Record<string, unknown> {
	const orgId = `${alternates.fr}#organization`;
	const organization: Record<string, unknown> = {
		'@type': 'Organization',
		'@id': orgId,
		name: siteConfig.name,
		url: alternates.fr,
		email: siteConfig.contact.email,
		telephone: siteConfig.contact.phone,
	};
	if (siteConfig.sameAs.length > 0) {
		organization.sameAs = [...siteConfig.sameAs];
	}
	return {
		'@context': 'https://schema.org',
		'@graph': [
			organization,
			{
				'@type': 'WebSite',
				'@id': `${alternates.fr}#website`,
				url: alternates.fr,
				name: siteConfig.name,
				inLanguage: siteConfig.publishedLocales.map((locale) =>
					locale === 'fr' ? 'fr-FR' : 'en-US',
				),
				publisher: { '@id': orgId },
			},
		],
	};
}

/**
 * hreflang for the locales in `siteConfig.publishedLocales` only.
 * `x-default` repeats the site default (French on ARM Services).
 * A URL is included only when the caller passes it: a missing translation must not be announced.
 */
export function buildAlternateLanguages(
	urls: Partial<Record<SiteLocale, string | undefined>>,
): { hreflang: string; href: string }[] | undefined {
	const entries: { hreflang: string; href: string }[] = [];
	for (const locale of localeOrder) {
		const href = urls[locale];
		if (!href || !isPublishedLocale(locale)) continue;
		entries.push({ hreflang: locale, href });
	}
	const fallback = urls[siteConfig.lang];
	if (fallback && isPublishedLocale(siteConfig.lang)) {
		entries.push({ hreflang: 'x-default', href: fallback });
	}
	return entries.length ? entries : undefined;
}

export function buildHomeAlternateLanguages(
	alternates: { fr: string; en: string } | undefined,
): { hreflang: string; href: string }[] | undefined {
	if (!alternates) return undefined;
	return buildAlternateLanguages(alternates);
}

export function buildLegalAlternateLanguages(
	frUrl: string | undefined,
	enUrl: string | undefined,
): { hreflang: string; href: string }[] | undefined {
	return buildAlternateLanguages({ fr: frUrl, en: enUrl });
}
