/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly ENABLE_MULTILANG?: string;
	readonly CONTENTFORGE_ENABLED?: string;
	readonly CONTENTFORGE_API_TOKEN?: string;
	readonly CONTENTFORGE_URL?: string;
	/** URL du backend qui reçoit le POST JSON du formulaire (exposée au client). */
	readonly PUBLIC_CONTACT_FORM_URL?: string;
	/** Bearer token ContentForge pour `Authorization: Bearer …` (exposé au client). */
	readonly PUBLIC_CONTACT_FORM_TOKEN?: string;
}
