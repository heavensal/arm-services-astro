/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly ENABLE_MULTILANG?: string;
	readonly FORGE_FAQ_ENABLED?: string;
	readonly FORGE_REVIEWS_ENABLED?: string;
	readonly FORGE_ARTICLES_ENABLED?: string;
	readonly FORGE_API_TOKEN?: string;
	readonly FORGE_URL?: string;
	/** Backend URL that receives the form JSON POST (exposed to the client). */
	readonly PUBLIC_CONTACT_FORM_URL?: string;
	/** Forge bearer token for `Authorization: Bearer …` (exposed to the client). */
	readonly PUBLIC_CONTACT_FORM_TOKEN?: string;
}
