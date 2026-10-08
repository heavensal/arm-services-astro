import type { Locale } from '../i18n/i18n';
import { asList, fetchContentforge, isArticlesEnabled } from './contentforge';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface CmsArticleSummary {
	title: string;
	slug: string;
	description: string;
	publishedAt: string | null;
}

export interface CmsArticle extends CmsArticleSummary {
	contentHtml: string;
}

export interface BlogPath {
	params: { slug: string | undefined };
	props: {
		article: CmsArticle | null;
		posts: CmsArticleSummary[];
	};
}

function readSummary(item: unknown): CmsArticleSummary | null {
	if (!item || typeof item !== 'object') return null;
	const article = item as {
		title?: unknown;
		slug?: unknown;
		description?: unknown;
		published_at?: unknown;
	};
	if (typeof article.title !== 'string' || article.title.length === 0) return null;
	if (typeof article.slug !== 'string' || !SLUG.test(article.slug)) return null;
	return {
		title: article.title,
		slug: article.slug,
		description: typeof article.description === 'string' ? article.description : '',
		publishedAt: typeof article.published_at === 'string' ? article.published_at : null,
	};
}

const indexPromises = new Map<Locale, Promise<CmsArticleSummary[]>>();
const articlePromises = new Map<string, Promise<CmsArticle | null>>();

async function loadArticleIndex(locale: Locale): Promise<CmsArticleSummary[]> {
	let pending = indexPromises.get(locale);
	if (!pending) {
		pending = (async () => {
			const payload = await fetchContentforge('articles', locale);
			if (payload == null) return [];
			return asList(payload).flatMap((item) => {
				const summary = readSummary(item);
				return summary ? [summary] : [];
			});
		})();
		indexPromises.set(locale, pending);
	}
	return pending;
}

export async function fetchArticle(slug: string, locale: Locale): Promise<CmsArticle | null> {
	if (!SLUG.test(slug)) return null;
	const cacheKey = `${locale}:${slug}`;
	let pending = articlePromises.get(cacheKey);
	if (!pending) {
		pending = (async () => {
			const payload = await fetchContentforge(`articles/${slug}`, locale);
			const summary = readSummary(payload);
			if (!summary || summary.slug !== slug) return null;
			const contentHtml =
				payload &&
				typeof payload === 'object' &&
				typeof (payload as { content_html?: unknown }).content_html === 'string'
					? (payload as { content_html: string }).content_html
					: '';
			return { ...summary, contentHtml };
		})();
		articlePromises.set(cacheKey, pending);
	}
	return pending;
}

/** Static paths for /blog and /blog/[slug]. Empty when the articles flag is off. */
export async function blogStaticPaths(locale: Locale): Promise<BlogPath[]> {
	if (!isArticlesEnabled()) return [];
	const posts = await loadArticleIndex(locale);
	const index: BlogPath = {
		params: { slug: undefined },
		props: { article: null, posts },
	};
	const pages: BlogPath[] = [];
	for (const post of posts) {
		const article = await fetchArticle(post.slug, locale);
		if (!article) continue;
		pages.push({
			params: { slug: article.slug },
			props: { article, posts },
		});
	}
	return [index, ...pages];
}

export function formatCmsDate(iso: string | null, locale: Locale): string | null {
	if (!iso) return null;
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return null;
	return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date);
}
