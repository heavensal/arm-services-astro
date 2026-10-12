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
		'Déménageur à Marseille et partout en France. Devis gratuit 30 jours au 06 43 09 65 97. Assurance des biens, lundi–samedi 8 h–19 h.',

	lang: 'fr',
	locale: 'fr_FR',

	/**
	 * Languages this site publishes, and therefore the only ones hreflang may list.
	 * ARM Services is French-only, so this stays `['fr']`.
	 * A bilingual brochure site adds `'en'` and sets `ENABLE_MULTILANG=true`.
	 * Without that flag, no `/en/` URL is generated or linked.
	 */
	publishedLocales: ['fr'] as readonly ('fr' | 'en')[],

	/** Browser theme color (mobile) — Armenian orange */
	themeColor: '#F2A800',

	contact: {
		email: 'contact@arm-services-demenagement.fr',
		/** Display format for FR/EN pages */
		phone: '06 43 09 65 97',
		phoneE164: '+33643096597',
	},

	/** Registry facts. Street address is for legal pages only, not the footer. */
	legal: {
		name: 'ARM SERVICES',
		form: 'SAS',
		siren: '938 889 334',
		siret: '93888933400018',
		vatId: 'FR56938889334',
		naf: '49.41A',
		foundingDate: '2024-12-18',
		director: 'Henrik Yeghiazaryan',
		directorRole: 'Président',
		address: {
			street: '35 chemin de la Maternelle',
			postalCode: '13011',
			city: 'Marseille',
			country: 'FR',
		},
	},

	/** Phone hours. The quote form stays available around the clock. */
	hours: {
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		opens: '08:00',
		closes: '19:00',
	},

	/** SIRET without prefix (for structured display in copy) */
	legalId: '938 889 334 00018',

	capitalSocial: '6 300 €',

	tiktokUrl: 'https://www.tiktok.com/@arm.services86',
	tiktokHandle: '@arm.services86',

	yoojo: {
		profileUrl: 'https://yoojo.fr/jobber/henrik-marseille-3493387',
		rating: 5,
		/** Seuil affiché « Plus de X avis » (profil Yoojo : 36+ avis, note 5,0) */
		reviewCountMin: 30,
	},

	/** @example '@armservices' — leave empty if unused */
	twitterHandle: '' as string,

	sameAs: [
		'https://www.tiktok.com/@arm.services86',
		'https://yoojo.fr/jobber/henrik-marseille-3493387',
	] as string[],

	ogImageWidth: 1200,
	ogImageHeight: 630,
	/** Path under public/ or absolute URL after deploy */
	ogImageUrl: 'og.jpg',
} as const;
