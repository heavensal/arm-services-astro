/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly ENABLE_MULTILANG?: string;
	readonly CONTENTFORGE_FAQ_ENABLED?: string;
	readonly CONTENTFORGE_REVIEWS_ENABLED?: string;
	readonly CONTENTFORGE_ARTICLES_ENABLED?: string;
	readonly CONTENTFORGE_API_TOKEN?: string;
	readonly CONTENTFORGE_URL?: string;
	/** Backend URL that receives the form JSON POST (exposed to the client). */
	readonly PUBLIC_CONTACT_FORM_URL?: string;
	/** ContentForge bearer token for `Authorization: Bearer …` (exposed to the client). */
	readonly PUBLIC_CONTACT_FORM_TOKEN?: string;
}
