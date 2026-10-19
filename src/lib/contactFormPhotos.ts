const MAX_PHOTOS = 3;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);

export type PhotoPickCode = 'count' | 'type';

type SelectedPhoto = {
	id: string;
	file: File;
	url: string;
};

export type ContactPhotoStore = {
	files: () => File[];
	clear: () => void;
};

export function bindContactPhotos(
	input: HTMLInputElement,
	list: HTMLUListElement,
	emptyLabel: HTMLElement,
	pickButton: HTMLButtonElement,
	onError: (code: PhotoPickCode) => void,
	onChange: () => void,
): ContactPhotoStore {
	let photos: SelectedPhoto[] = [];
	const removeLabel = list.dataset.removeLabel ?? '';
	const previewTemplate = list.dataset.previewLabel ?? '';

	const render = () => {
		list.replaceChildren();
		emptyLabel.hidden = photos.length > 0;
		photos.forEach((photo, index) => {
			const item = document.createElement('li');
			item.className = 'relative';
			const img = document.createElement('img');
			img.src = photo.url;
			img.alt = previewTemplate.replaceAll('__INDEX__', String(index + 1));
			img.className = 'aspect-square w-full rounded-lg object-cover';
			const button = document.createElement('button');
			button.type = 'button';
			button.className =
				'absolute top-1 right-1 flex size-7 items-center justify-center rounded-full bg-gray-900 text-base leading-none font-bold text-white hover:bg-red-armenian focus:outline-none focus-visible:ring-2 focus-visible:ring-white';
			button.setAttribute('aria-label', removeLabel);
			button.textContent = '×';
			button.addEventListener('click', () => remove(photo.id));
			item.append(img, button);
			list.append(item);
		});
	};

	const remove = (id: string) => {
		const photo = photos.find((item) => item.id === id);
		if (photo) URL.revokeObjectURL(photo.url);
		photos = photos.filter((item) => item.id !== id);
		input.value = '';
		render();
		onChange();
	};

	const clear = () => {
		photos.forEach((photo) => URL.revokeObjectURL(photo.url));
		photos = [];
		input.value = '';
		render();
	};

	pickButton.addEventListener('click', () => input.click());
	input.addEventListener('change', () => {
		const incoming = Array.from(input.files ?? []).filter((file) => file.size > 0);
		input.value = '';
		if (incoming.length === 0) return;
		if (incoming.some((file) => file.type && !ALLOWED_TYPES.has(file.type))) {
			onError('type');
			return;
		}
		if (photos.length + incoming.length > MAX_PHOTOS) {
			onError('count');
			return;
		}
		for (const file of incoming) {
			photos.push({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) });
		}
		render();
		onChange();
		list.scrollIntoView({ block: 'nearest' });
	});

	return { files: () => photos.map((photo) => photo.file), clear };
}
