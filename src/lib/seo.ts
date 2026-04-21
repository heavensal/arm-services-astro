import { siteConfig } from '../site.config';

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
				inLanguage: ['fr-FR', 'en-US'],
				publisher: { '@id': orgId },
			},
		],
	};
}

/** hreflang entries: FR + EN always published for ARM (SEO), independent of language switcher UI. */
export function buildHomeAlternateLanguages(
	alternates: { fr: string; en: string } | undefined,
): { hreflang: string; href: string }[] | undefined {
	if (!alternates) return undefined;
	return [
		{ hreflang: 'fr', href: alternates.fr },
		{ hreflang: 'en', href: alternates.en },
		{ hreflang: 'x-default', href: alternates.fr },
	];
}

export function buildLegalAlternateLanguages(
	frUrl: string | undefined,
	enUrl: string | undefined,
): { hreflang: string; href: string }[] | undefined {
	if (!frUrl || !enUrl) return undefined;
	return [
		{ hreflang: 'fr', href: frUrl },
		{ hreflang: 'en', href: enUrl },
		{ hreflang: 'x-default', href: frUrl },
	];
}
