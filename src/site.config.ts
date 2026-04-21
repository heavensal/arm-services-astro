/**
 * Single source of truth for site metadata (SEO, contact, social).
 * Legal pages and JSON-LD reuse these values where relevant.
 *
 * SEO: Customize when branding or contact details change.
 */
export const siteConfig = {
	// SEO: Site identity
	name: 'ARM Services',
	tagline: 'Déménagement et livraison à Marseille & partout en France',

	// SEO: Meta description (default home / layout)
	defaultDescription:
		'ARM Services, déménagement à Marseille et partout en France sur devis. Devis gratuit au 06 43 09 65 97. Assurance incluse, équipe professionnelle.',

	lang: 'fr',
	locale: 'fr_FR',

	/** Browser theme color (mobile) — Armenian orange */
	themeColor: '#F2A800',

	contact: {
		email: 'contact@arm-services-demenagement.fr',
		/** Display format for FR/EN pages */
		phone: '06 43 09 65 97',
	},

	/** SIRET without prefix (for structured display in copy) */
	legalId: '938 889 334 00018',

	capitalSocial: '6 300 €',

	tiktokUrl: 'https://www.tiktok.com/@arm.services86',
	tiktokHandle: '@arm.services86',

	/** @example '@armservices' — leave empty if unused */
	twitterHandle: '' as string,

	sameAs: ['https://www.tiktok.com/@arm.services86'] as string[],

	ogImageWidth: 512,
	ogImageHeight: 512,
	/** Path under public/ or absolute URL after deploy */
	ogImageUrl: 'android-chrome-512x512.png',
} as const;
