import { ContactPhotoError, type ContactPhotoCode } from './resizeContactPhotos';
import { bindContactPhotos, type PhotoPickCode } from './contactFormPhotos';
import { closeContactDialog, createContactNotice } from './contactFormNotice';
import { holdAtLeast, postContactForm, readContactFields } from './contactFormSubmit';

type FormUi = Record<
	'error' | 'errorNetwork' | 'errorConfig' | 'errorPhotosCount' | 'errorPhotosType' | 'errorPhotosRead' | 'errorPhotosSize',
	string
>;

type FormConfig = {
	apiUrl: string;
	apiToken: string;
	subject: string;
	ui: FormUi;
};

const photoErrors: Record<ContactPhotoCode | PhotoPickCode, keyof FormUi> = {
	count: 'errorPhotosCount',
	type: 'errorPhotosType',
	read: 'errorPhotosRead',
	size: 'errorPhotosSize',
};

const SEND_HOLD_MS = 1300;

export function initArmContactForm(): void {
	const config = readConfig();
	const dialog = document.getElementById('arm-contact-dialog');
	const form = document.getElementById('arm-contact-form');
	const statusEl = document.getElementById('arm-contact-status');
	const submitBtn = document.getElementById('arm-contact-submit');
	const photoInput = document.getElementById('arm-contact-photos');
	const previewList = document.getElementById('arm-contact-previews');
	const emptyLabel = document.getElementById('arm-contact-photos-empty');
	const pickButton = document.querySelector('[data-arm-contact-pick]');
	const noticeRoot = document.getElementById('arm-contact-notice');
	if (!config || !(form instanceof HTMLFormElement) || !(dialog instanceof HTMLDialogElement)) return;
	if (!(photoInput instanceof HTMLInputElement) || !(previewList instanceof HTMLUListElement)) return;
	if (!(emptyLabel instanceof HTMLElement) || !(pickButton instanceof HTMLButtonElement)) return;
	if (!(noticeRoot instanceof HTMLElement) || form.dataset.ready === 'true') return;
	form.dataset.ready = 'true';

	const setStatus = (kind: 'err' | 'warn', text: string) => {
		if (!statusEl) return;
		statusEl.textContent = text;
		statusEl.classList.remove('hidden', 'border-red-200', 'bg-red-50', 'text-red-900', 'border-amber-200', 'bg-amber-50', 'text-amber-900');
		if (kind === 'err') statusEl.classList.add('border-red-200', 'bg-red-50', 'text-red-900');
		else statusEl.classList.add('border-amber-200', 'bg-amber-50', 'text-amber-900');
	};
	const hideStatus = () => statusEl?.classList.add('hidden');

	const notice = createContactNotice(noticeRoot);
	let preserveForm = false;
	let submitting = false;
	const photos = bindContactPhotos(
		photoInput,
		previewList,
		emptyLabel,
		pickButton,
		(code) => setStatus('err', config.ui[photoErrors[code]]),
		hideStatus,
	);

	const showFormError = (message: string) => {
		notice.hide();
		dialog.classList.remove('arm-contact-dialog-leave');
		if (!dialog.open) dialog.showModal();
		document.body.style.overflow = 'hidden';
		setStatus('err', message);
		statusEl?.focus();
	};

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

	dialog.addEventListener('cancel', (event) => {
		if (submitting) event.preventDefault();
	});

	dialog.addEventListener('close', () => {
		if (!preserveForm) {
			form.reset();
			photos.clear();
			hideStatus();
		}
		preserveForm = false;
		if (!submitting) document.body.style.overflow = '';
	});

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (submitting || !form.reportValidity()) return;
		if (!config.apiUrl || !config.apiToken) {
			setStatus('warn', config.ui.errorConfig);
			return;
		}

		const fields = readContactFields(form);
		submitting = true;
		preserveForm = true;
		if (submitBtn instanceof HTMLButtonElement) submitBtn.disabled = true;
		hideStatus();
		notice.showSending();
		const pendingClose = closeContactDialog(dialog);
		const started = Date.now();

		try {
			await postContactForm(config, fields, photos.files());
			await pendingClose;
			await holdAtLeast(started, SEND_HOLD_MS);
			form.reset();
			photos.clear();
			await notice.showSuccess();
		} catch (error) {
			await pendingClose;
			await holdAtLeast(started, SEND_HOLD_MS);
			const message = error instanceof ContactPhotoError ? config.ui[photoErrors[error.code]] : config.ui.errorNetwork;
			if (error instanceof Error && error.message === 'contact-send') showFormError(config.ui.error);
			else showFormError(message);
		} finally {
			submitting = false;
			if (submitBtn instanceof HTMLButtonElement) submitBtn.disabled = false;
		}
	});
}

function readConfig(): FormConfig | null {
	const node = document.getElementById('arm-contact-config');
	if (!node?.textContent) return null;
	return JSON.parse(node.textContent) as FormConfig;
}
