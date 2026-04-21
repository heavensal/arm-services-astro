import i18next, { type i18n } from 'i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

const resources = {
	en: { translation: en },
	fr: { translation: fr },
};

const instances = new Map<Locale, i18n>();

/**
 * Fixed translation function for the given locale (static build).
 */
export function getFixedT(locale: Locale) {
	let instance = instances.get(locale);
	if (!instance) {
		instance = i18next.createInstance();
		instance.init({
			lng: locale,
			fallbackLng: 'fr',
			resources,
			interpolation: { escapeValue: false },
			returnObjects: true,
		});
		instances.set(locale, instance);
	}
	return instance.getFixedT(locale);
}

/**
 * Controls the FR/EN switcher in the hero only.
 * English routes remain available for SEO and direct links when this is false.
 */
export function isMultilangEnabled(): boolean {
	return import.meta.env.ENABLE_MULTILANG === 'true';
}
