import type { Locale } from './payload';
import { localizedPath } from './i18n';

/** Locale-free paths for the navigable pages (locale is prepended at lookup time). */
export const NAV_ROUTES: Record<string, string> = {
  home: '/',
  'courses-page': '/courses',
  'psychology-page': '/psychology',
  'symbols-page': '/symbols',
  'long-term-analysis': '/analysis',
  'signals-page': '/signals',
  'blog-page': '/blog',
  'about-page': '/about',
  'contact-page': '/contact',
}

/** Locale-free path for a nav page id (e.g. 'blog-page' -> '/blog'). */
export function getRouteBase(pageId: string): string {
  return NAV_ROUTES[pageId] ?? '/'
}

/** Locale-prefixed path for a nav page id (e.g. 'blog-page','en' -> '/en/blog'). */
export function getRoute(pageId: string, locale: Locale): string {
  return localizedPath(getRouteBase(pageId), locale)
}
