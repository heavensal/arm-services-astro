import type { Locale } from '../i18n/i18n';
import { asList, fetchForge, isFaqEnabled, isReviewsEnabled } from './forge';

export interface CmsFaq {
	question: string;
	answer: string;
	position: number;
}

/** Published FAQs, or null when the block is off or the API cannot be used. */
export async function fetchFaqs(locale: Locale): Promise<CmsFaq[] | null> {
	if (!isFaqEnabled()) return null;
	const payload = await fetchForge('faqs', locale);
	if (payload == null) return null;
	const items = asList(payload)
		.flatMap((item): CmsFaq[] => {
			if (!item || typeof item !== 'object') return [];
			const faq = item as { question?: unknown; answer?: unknown; position?: unknown };
			if (typeof faq.question !== 'string' || faq.question.length === 0) return [];
			if (typeof faq.answer !== 'string' || faq.answer.length === 0) return [];
			return [
				{
					question: faq.question,
					answer: faq.answer,
					position: typeof faq.position === 'number' ? faq.position : 0,
				},
			];
		})
		.sort((a, b) => a.position - b.position);
	return items.length ? items : null;
}

export interface CmsReview {
	author: string;
	content: string;
	rating: number;
}

/** Published reviews with a 1–5 rating, or null when the block is off or unusable. */
export async function fetchReviews(locale: Locale): Promise<CmsReview[] | null> {
	if (!isReviewsEnabled()) return null;
	const payload = await fetchForge('reviews', locale);
	if (payload == null) return null;
	const items = asList(payload).flatMap((item): CmsReview[] => {
		if (!item || typeof item !== 'object') return [];
		const review = item as { author?: unknown; content?: unknown; rating?: unknown };
		if (typeof review.author !== 'string' || review.author.length === 0) return [];
		if (typeof review.content !== 'string' || review.content.length === 0) return [];
		if (typeof review.rating !== 'number' || !Number.isInteger(review.rating)) return [];
		if (review.rating < 1 || review.rating > 5) return [];
		return [{ author: review.author, content: review.content, rating: review.rating }];
	});
	return items.length ? items : null;
}
