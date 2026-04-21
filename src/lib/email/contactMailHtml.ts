/**
 * HTML body matching `src/templates/email/contact-message.html`.
 * For use by an external POST handler + nodemailer (not used in this static site).
 */
export interface ArmContactMailFields {
	fullName: string;
	email: string;
	phone: string;
	company: string;
	message: string;
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function buildArmContactEmailHtml(fields: ArmContactMailFields): string {
	const fullName = escapeHtml(fields.fullName);
	const email = escapeHtml(fields.email);
	const phone = escapeHtml(fields.phone);
	const company = escapeHtml(fields.company || '—');
	const message = escapeHtml(fields.message || '(vide)');

	return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Nouvelle demande — ARM Services</title>
</head>
<body style="margin:0;font-family:system-ui,sans-serif;background:#f9fafb;color:#111827;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;padding:24px;">
<tr>
<td style="background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
<h1 style="margin:0 0 16px;font-size:20px;">Demande de contact / devis</h1>
<p style="margin:0 0 8px;font-size:14px;color:#4b5563;"><strong>Nom et prénom :</strong> ${fullName}</p>
<p style="margin:0 0 8px;font-size:14px;color:#4b5563;"><strong>Email :</strong> <a href="${encodeURI('mailto:' + fields.email)}" style="color:#F2A800;">${email}</a></p>
<p style="margin:0 0 8px;font-size:14px;color:#4b5563;"><strong>Téléphone :</strong> ${phone}</p>
<p style="margin:0 0 8px;font-size:14px;color:#4b5563;"><strong>Société :</strong> ${company}</p>
<p style="margin:16px 0 8px;font-size:14px;color:#4b5563;"><strong>Message :</strong></p>
<div style="font-size:14px;color:#111827;white-space:pre-wrap;border-left:4px solid #F2A800;padding-left:12px;">${message}</div>
</td>
</tr>
<tr>
<td style="padding:16px 8px;font-size:12px;color:#6b7280;text-align:center;">
Message envoyé depuis le formulaire arm-services-demenagement.fr
</td>
</tr>
</table>
</body>
</html>`;
}
