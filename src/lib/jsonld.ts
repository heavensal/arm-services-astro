import fr from '../i18n/locales/fr.json';
import en from '../i18n/locales/en.json';
import { siteConfig } from '../site.config';

export type SchemaLocale = 'fr' | 'en';

const coverageLabel = new Set(['Toute la France sur devis', 'All of France on quotation']);

const services: Record<SchemaLocale, readonly string[]> = {
	fr: [
		'Déménagement particulier',
		'Déménagement entreprise',
		'Déménagement longue distance',
		'Transport de meubles',
		'Aide au chargement',
	],
	en: [
		'Residential moves',
		'Commercial moves',
		'Long-distance moves',
		'Furniture transport',
		'Loading help',
	],
};

function coverageCities(): { '@type': 'City'; name: string }[] {
	return fr.Areas.cities
		.filter((city) => !coverageLabel.has(city))
		.map((name) => ({ '@type': 'City', name }));
}

/** Homepage entity: service area, no street address (that address is only on the legal notice). */
export function buildHomeJsonLd(
	homeUrl: string,
	locale: SchemaLocale,
	inLanguage: string[],
): Record<string, unknown> {
	const orgId = `${homeUrl}#organization`;
	const logo = new URL('android-chrome-512x512.png', homeUrl).href;
	const copy = locale === 'fr' ? fr : en;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'MovingCompany',
				'@id': orgId,
				name: siteConfig.name,
				legalName: siteConfig.legal.name,
				url: homeUrl,
				description: copy.Hero.lead,
				email: siteConfig.contact.email,
				telephone: siteConfig.contact.phoneE164,
				vatID: siteConfig.legal.vatId,
				taxID: siteConfig.legal.siret,
				foundingDate: siteConfig.legal.foundingDate,
				image: new URL(siteConfig.ogImageUrl, homeUrl).href,
				logo,
				sameAs: [...siteConfig.sameAs],
				areaServed: [{ '@type': 'Country', name: 'France' }, ...coverageCities()],
				openingHoursSpecification: {
					'@type': 'OpeningHoursSpecification',
					dayOfWeek: [...siteConfig.hours.days],
					opens: siteConfig.hours.opens,
					closes: siteConfig.hours.closes,
				},
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: locale === 'fr' ? 'Prestations de déménagement' : 'Moving services',
					itemListElement: services[locale].map((name) => ({
						'@type': 'Offer',
						itemOffered: { '@type': 'Service', name },
					})),
				},
			},
			{
				'@type': 'WebSite',
				'@id': `${homeUrl}#website`,
				url: homeUrl,
				name: siteConfig.name,
				inLanguage,
				publisher: { '@id': orgId },
			},
		],
	};
}

/** Street address lives here because the legal notice is the page that shows it. */
export function buildLegalNoticeJsonLd(homeUrl: string): Record<string, unknown> {
	const { legal, contact } = siteConfig;
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${homeUrl}#organization`,
		name: siteConfig.name,
		legalName: legal.name,
		url: homeUrl,
		email: contact.email,
		telephone: contact.phoneE164,
		vatID: legal.vatId,
		taxID: legal.siret,
		foundingDate: legal.foundingDate,
		address: {
			'@type': 'PostalAddress',
			streetAddress: legal.address.street,
			postalCode: legal.address.postalCode,
			addressLocality: legal.address.city,
			addressCountry: legal.address.country,
		},
		employee: {
			'@type': 'Person',
			name: legal.director,
			jobTitle: legal.directorRole,
		},
	};
}
