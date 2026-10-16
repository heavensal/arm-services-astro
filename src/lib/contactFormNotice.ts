const SUCCESS_HOLD_MS = 2600;
const LEAVE_MS = 280;

export type ContactNotice = {
	showSending: () => void;
	showSuccess: () => Promise<void>;
	hide: () => void;
};

export function createContactNotice(root: HTMLElement): ContactNotice {
	const sending = root.querySelector<HTMLElement>('[data-arm-notice-sending]');
	const success = root.querySelector<HTMLElement>('[data-arm-notice-success]');
	let generation = 0;

	const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const present = (mode: 'sending' | 'success') => {
		sending?.classList.toggle('hidden', mode !== 'sending');
		success?.classList.toggle('hidden', mode !== 'success');
		root.hidden = false;
		root.setAttribute('aria-busy', mode === 'sending' ? 'true' : 'false');
		root.classList.remove('is-leaving', 'is-success');
		if (mode === 'success') {
			void root.offsetWidth;
			root.classList.add('is-success');
			success?.classList.remove('arm-contact-success-play');
			void success?.offsetWidth;
			success?.classList.add('arm-contact-success-play');
		}
		document.body.style.overflow = 'hidden';
		root.focus({ preventScroll: true });
	};

	const hideNow = () => {
		generation += 1;
		root.hidden = true;
		root.classList.remove('is-leaving', 'is-success');
		root.setAttribute('aria-busy', 'false');
		success?.classList.remove('arm-contact-success-play');
		const dialog = document.getElementById('arm-contact-dialog');
		if (!(dialog instanceof HTMLDialogElement) || !dialog.open) document.body.style.overflow = '';
	};

	const hideAnimated = () =>
		new Promise<void>((resolve) => {
			if (root.hidden) {
				resolve();
				return;
			}
			if (reduced()) {
				hideNow();
				resolve();
				return;
			}
			const id = generation;
			root.classList.add('is-leaving');
			window.setTimeout(() => {
				if (id === generation) hideNow();
				resolve();
			}, LEAVE_MS);
		});

	const dismiss = () => {
		generation += 1;
		void hideAnimated();
	};

	root.addEventListener('click', () => {
		if (root.classList.contains('is-success')) dismiss();
	});

	document.addEventListener('keydown', (event) => {
		if (root.hidden) return;
		if (event.key === 'Tab') event.preventDefault();
		if (event.key === 'Escape' && root.classList.contains('is-success')) {
			event.preventDefault();
			dismiss();
		}
	});

	return {
		showSending() {
			generation += 1;
			present('sending');
		},
		async showSuccess() {
			const id = ++generation;
			present('success');
			await wait(reduced() ? 700 : SUCCESS_HOLD_MS);
			if (id !== generation) return;
			await hideAnimated();
		},
		hide() {
			hideNow();
		},
	};
}

function wait(ms: number): Promise<void> {
	return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function closeContactDialog(dialog: HTMLDialogElement): Promise<void> {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduced || !dialog.open) {
		dialog.close();
		dialog.classList.remove('arm-contact-dialog-leave');
		return Promise.resolve();
	}
	dialog.classList.add('arm-contact-dialog-leave');
	return new Promise((resolve) => {
		window.setTimeout(() => {
			dialog.close();
			dialog.classList.remove('arm-contact-dialog-leave');
			resolve();
		}, 360);
	});
}
