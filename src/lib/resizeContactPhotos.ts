const MAX_PHOTOS = 3;
const MAX_SOURCE_BYTES = 25 * 1024 * 1024;
const MAX_OUTPUT_BYTES = 900 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);

export type ContactPhoto = {
	filename: string;
	content_type: 'image/jpeg';
	data: string;
};

export type ContactPhotoCode = 'count' | 'type' | 'read' | 'size';

export class ContactPhotoError extends Error {
	readonly code: ContactPhotoCode;

	constructor(code: ContactPhotoCode) {
		super(code);
		this.name = 'ContactPhotoError';
		this.code = code;
	}
}

export async function resizeContactPhotos(files: File[]): Promise<ContactPhoto[]> {
	const selected = files.filter((file) => file.size > 0);
	if (selected.length > MAX_PHOTOS) throw new ContactPhotoError('count');

	const photos: ContactPhoto[] = [];
	for (let index = 0; index < selected.length; index += 1) {
		photos.push(await resizeOne(selected[index], index + 1));
	}
	return photos;
}

async function resizeOne(file: File, index: number): Promise<ContactPhoto> {
	if (file.size > MAX_SOURCE_BYTES) throw new ContactPhotoError('size');
	if (file.type && !ALLOWED_TYPES.has(file.type)) throw new ContactPhotoError('type');

	let bitmap: ImageBitmap;
	try {
		bitmap = await createImageBitmap(file);
	} catch {
		throw new ContactPhotoError('read');
	}

	const passes = [
		{ edge: 1600, quality: 0.72 },
		{ edge: 1280, quality: 0.6 },
		{ edge: 960, quality: 0.5 },
	];
	let data = '';
	try {
		for (const pass of passes) {
			data = encodeJpeg(bitmap, pass.edge, pass.quality);
			if (base64Bytes(data) <= MAX_OUTPUT_BYTES) break;
		}
	} finally {
		bitmap.close();
	}

	if (!data || base64Bytes(data) > MAX_OUTPUT_BYTES) throw new ContactPhotoError('size');
	return { filename: `photo-${index}.jpg`, content_type: 'image/jpeg', data };
}

function encodeJpeg(bitmap: ImageBitmap, edge: number, quality: number): string {
	const scale = Math.min(1, edge / Math.max(bitmap.width, bitmap.height));
	const width = Math.max(1, Math.round(bitmap.width * scale));
	const height = Math.max(1, Math.round(bitmap.height * scale));
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const context = canvas.getContext('2d');
	if (!context) throw new ContactPhotoError('read');
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, width, height);
	context.drawImage(bitmap, 0, 0, width, height);
	const dataUrl = canvas.toDataURL('image/jpeg', quality);
	const comma = dataUrl.indexOf(',');
	return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

function base64Bytes(data: string): number {
	const padding = data.endsWith('==') ? 2 : data.endsWith('=') ? 1 : 0;
	return Math.floor((data.length * 3) / 4) - padding;
}
