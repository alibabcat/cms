import { headers } from 'next/headers';
import type { Locale } from './payload';
import { resolveLocale } from './locale-constants';

export { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, resolveLocale, dirForLocale } from './locale-constants';

/**
 * Resolves the locale for the current request. The locale lives in the URL
 * prefix (/fa, /en); middleware reads that segment and injects it as the
 * `x-locale` request header, which is the single source of truth here.
 */
export async function getServerLocale(): Promise<Locale> {
  const h = await headers();
  return resolveLocale(h.get('x-locale'));
}
