import { blogPosts } from '../data/blogPosts.js';
import { blogCategories } from '../data/blogCategories.js';

/**
 * Check if a post is currently live based on the hands-off auto-publishing rule:
 * status === 'published' OR (status === 'scheduled' AND publishDate <= NOW())
 */
export function isPostLive(post, now = new Date()) {
  if (!post) return false;
  if (post.status === 'published') return true;
  if (post.status === 'scheduled' && post.publishDate) {
    const pubDate = new Date(post.publishDate);
    return pubDate <= now;
  }
  return false;
}

/**
 * Returns all live posts sorted by publishDate descending (newest first).
 */
export function getLivePosts(now = new Date()) {
  return blogPosts
    .filter(post => isPostLive(post, now))
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

/**
 * Returns upcoming scheduled posts for editorial previews.
 */
export function getScheduledPosts(now = new Date()) {
  return blogPosts
    .filter(post => post.status === 'scheduled' && new Date(post.publishDate) > now)
    .sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
}

/**
 * Get all posts regardless of status (e.g. for sitemap generation or admin audit).
 */
export function getAllPosts() {
  return [...blogPosts];
}

/**
 * Get post by slug. By default only returns live posts unless includeScheduled is true.
 */
export function getPostBySlug(slug, includeScheduled = false) {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return null;
  if (includeScheduled || isPostLive(post)) return post;
  return null;
}

/**
 * Get posts by category slug.
 */
export function getLivePostsByCategory(categorySlug, now = new Date()) {
  return getLivePosts(now).filter(p => p.categorySlug === categorySlug);
}

/**
 * Get all categories enriched with live post counts.
 */
export function getCategoriesWithCounts(now = new Date()) {
  const live = getLivePosts(now);
  return blogCategories.map(cat => ({
    ...cat,
    count: live.filter(p => p.categorySlug === cat.slug).length,
    totalScheduled: blogPosts.filter(p => p.categorySlug === cat.slug && p.status === 'scheduled').length
  }));
}

/**
 * Search live posts by keyword (title, excerpt, tags, content).
 */
export function searchLivePosts(query, categorySlug = null, now = new Date()) {
  let list = getLivePosts(now);
  if (categorySlug && categorySlug !== 'all') {
    list = list.filter(p => p.categorySlug === categorySlug);
  }
  if (!query || !query.trim()) return list;

  const q = query.toLowerCase().trim();
  return list.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    (p.content && p.content.toLowerCase().includes(q))
  );
}

/**
 * Get related posts within the same category, excluding the current article.
 */
export function getRelatedPosts(currentSlug, categorySlug, limit = 3) {
  const live = getLivePosts();
  return live
    .filter(p => p.slug !== currentSlug && p.categorySlug === categorySlug)
    .slice(0, limit);
}
