import { ContactPhotoError, resizeContactPhotos, type ContactPhotoCode } from './resizeContactPhotos';

type FormUi = Record<'sending' | 'success' | 'error' | 'errorNetwork' | 'errorConfig' | 'errorPhotosCount' | 'errorPhotosType' | 'errorPhotosRead' | 'errorPhotosSize', string>;

type FormConfig = {
	apiUrl: string;
	apiToken: string;
	subject: string;
	ui: FormUi;
};

const photoErrors: Record<ContactPhotoCode, keyof FormUi> = {
	count: 'errorPhotosCount',
	type: 'errorPhotosType',
	read: 'errorPhotosRead',
	size: 'errorPhotosSize',
};

export function initArmContactForm(): void {
	const config = readConfig();
	const dialog = document.getElementById('arm-contact-dialog');
	const form = document.getElementById('arm-contact-form');
	const statusEl = document.getElementById('arm-contact-status');
	const submitBtn = document.getElementById('arm-contact-submit');
	const photoInput = document.getElementById('arm-contact-photos');
	if (!config || !(form instanceof HTMLFormElement) || !(dialog instanceof HTMLDialogElement)) return;
	if (form.dataset.ready === 'true') return;
	form.dataset.ready = 'true';

	const setStatus = (kind: 'ok' | 'err' | 'warn', text: string) => {
		if (!statusEl) return;
		statusEl.textContent = text;
		statusEl.classList.remove(
			'hidden',
			'bg-green-50',
			'border-green-200',
			'text-green-900',
			'bg-red-50',
			'border-red-200',
			'text-red-900',
			'bg-amber-50',
			'border-amber-200',
			'text-amber-900',
		);
		if (kind === 'ok') statusEl.classList.add('bg-green-50', 'border-green-200', 'text-green-900');
		else if (kind === 'err') statusEl.classList.add('bg-red-50', 'border-red-200', 'text-red-900');
		else statusEl.classList.add('bg-amber-50', 'border-amber-200', 'text-amber-900');
	};
	const hideStatus = () => statusEl?.classList.add('hidden');

	document.querySelectorAll('[data-arm-contact-open]').forEach((btn) => {
		btn.addEventListener('click', () => {
			hideStatus();
			dialog.showModal();
			document.body.style.overflow = 'hidden';
			dialog.focus({ preventScroll: true });
			requestAnimationFrame(() => {
				const active = document.activeElement;
				if (dialog.contains(active) && active instanceof HTMLElement && active.matches('input, textarea, select')) {
					dialog.focus({ preventScroll: true });
				}
			});
		});
	});

	document.querySelectorAll('[data-arm-contact-close]').forEach((btn) => {
		btn.addEventListener('click', () => dialog.close());
	});

	dialog.addEventListener('close', () => {
		form.reset();
		hideStatus();
		document.body.style.overflow = '';
	});

	photoInput?.addEventListener('change', () => {
		if (!(photoInput instanceof HTMLInputElement)) return;
		const count = Array.from(photoInput.files ?? []).filter((file) => file.size > 0).length;
		if (count > 3) {
			photoInput.value = '';
			setStatus('err', config.ui.errorPhotosCount);
		} else {
			hideStatus();
		}
	});

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (!config.apiUrl || !config.apiToken) {
			setStatus('warn', config.ui.errorConfig);
			return;
		}

		const data = new FormData(form);
		const lastName = String(data.get('lastName') || '').trim();
		const firstName = String(data.get('firstName') || '').trim();
		const email = String(data.get('email') || '').trim();
		const phone = String(data.get('phone') || '').trim();
		const company = String(data.get('company') || '').trim();
		const message = String(data.get('message') || '').trim();
		const files = Array.from(data.getAll('photos')).filter((value): value is File => value instanceof File);

		if (submitBtn instanceof HTMLButtonElement) submitBtn.disabled = true;
		setStatus('warn', config.ui.sending);

		try {
			const photos = await resizeContactPhotos(files);
			const response = await fetch(config.apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${config.apiToken}`,
				},
				signal: AbortSignal.timeout(25000),
				body: JSON.stringify({
					from_email: email,
					from_name: `${firstName} ${lastName}`.trim(),
					subject: config.subject,
					fields: {
						nom: lastName,
						prénom: firstName,
						email,
						téléphone: phone,
						Société: company,
						"Message d'informations": message || '—',
					},
					attachments: photos,
				}),
			});
			if (!response.ok) {
				setStatus('err', config.ui.error);
				return;
			}
			setStatus('ok', config.ui.success);
			form.reset();
		} catch (error) {
			if (error instanceof ContactPhotoError) setStatus('err', config.ui[photoErrors[error.code]]);
			else setStatus('err', config.ui.errorNetwork);
		} finally {
			if (submitBtn instanceof HTMLButtonElement) submitBtn.disabled = false;
		}
	});
}

function readConfig(): FormConfig | null {
	const node = document.getElementById('arm-contact-config');
	if (!node?.textContent) return null;
	return JSON.parse(node.textContent) as FormConfig;
}
