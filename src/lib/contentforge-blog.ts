import type { Locale } from '../i18n/i18n';
import { isPublishedLocale } from './seo';
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

const indexPromises = new Map<Locale, Promise<CmsArticleSummary[] | null>>();
const articlePromises = new Map<string, Promise<CmsArticle | null>>();

/** Article index, or null when the request failed. An empty array is a successful CMS with no posts. */
async function loadArticleIndex(locale: Locale): Promise<CmsArticleSummary[] | null> {
	let pending = indexPromises.get(locale);
	if (!pending) {
		pending = (async () => {
			const payload = await fetchContentforge('articles', locale);
			if (payload == null) return null;
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

/** True when this locale is published, the index loaded, and, for an article, that slug exists there. */
async function publishesBlogPath(locale: Locale, slug?: string): Promise<boolean> {
	if (!isArticlesEnabled() || !isPublishedLocale(locale)) return false;
	const posts = await loadArticleIndex(locale);
	if (!posts) return false;
	if (!slug) return true;
	return posts.some((post) => post.slug === slug);
}

/** True when /blog is generated for this locale. */
export function isBlogPublished(locale: Locale): Promise<boolean> {
	return publishesBlogPath(locale);
}

/**
 * Blog paths hreflang may announce.
 * French-only sites omit `en`. A slug that exists in only one published locale omits the other.
 */
export async function publishedBlogPaths(
	article: { slug: string } | null,
): Promise<{ fr?: string; en?: string }> {
	const slug = article?.slug;
	const paths: { fr?: string; en?: string } = {};
	if (await publishesBlogPath('fr', slug)) paths.fr = slug ? `blog/${slug}` : 'blog';
	if (await publishesBlogPath('en', slug)) paths.en = slug ? `en/blog/${slug}` : 'en/blog';
	return paths;
}

/** Static paths for /blog and /blog/[slug]. Empty when articles are off, the locale is unpublished, or the index request failed. */
export async function blogStaticPaths(locale: Locale): Promise<BlogPath[]> {
	if (!isArticlesEnabled() || !isPublishedLocale(locale)) return [];
	const posts = await loadArticleIndex(locale);
	if (!posts) return [];
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
