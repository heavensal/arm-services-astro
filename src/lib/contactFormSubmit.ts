import { ContactPhotoError, resizeContactPhotos } from './resizeContactPhotos';

export type ContactFields = {
	lastName: string;
	firstName: string;
	email: string;
	phone: string;
	company: string;
	message: string;
};

type SendConfig = {
	apiUrl: string;
	apiToken: string;
	subject: string;
};

export function readContactFields(form: HTMLFormElement): ContactFields {
	const data = new FormData(form);
	return {
		lastName: String(data.get('lastName') || '').trim(),
		firstName: String(data.get('firstName') || '').trim(),
		email: String(data.get('email') || '').trim(),
		phone: String(data.get('phone') || '').trim(),
		company: String(data.get('company') || '').trim(),
		message: String(data.get('message') || '').trim(),
	};
}

export function holdAtLeast(started: number, minMs: number): Promise<void> {
	const left = minMs - (Date.now() - started);
	if (left <= 0) return Promise.resolve();
	return new Promise((resolve) => window.setTimeout(resolve, left));
}

export async function postContactForm(config: SendConfig, fields: ContactFields, files: File[]): Promise<void> {
	const attachments = await resizeContactPhotos(files);
	const response = await fetch(config.apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.apiToken}`,
		},
		signal: AbortSignal.timeout(25000),
		body: JSON.stringify({
			from_email: fields.email,
			from_name: `${fields.firstName} ${fields.lastName}`.trim(),
			subject: config.subject,
			fields: {
				nom: fields.lastName,
				prénom: fields.firstName,
				email: fields.email,
				téléphone: fields.phone,
				Société: fields.company,
				"Message d'informations": fields.message || '—',
			},
			attachments,
		}),
	});
	if (!response.ok) throw new Error('contact-send');
}
