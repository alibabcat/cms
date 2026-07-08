import type { Metadata } from 'next';
import type { Locale } from './payload';
import { LOCALES, DEFAULT_LOCALE } from './locale-constants';

export { LOCALES, DEFAULT_LOCALE };

/** Public site origin used for absolute canonical/hreflang URLs. */
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5001'
).replace(/\/$/, '');

/**
 * Prefix a locale-free path with the locale segment.
 *   localizedPath('/', 'en')      -> '/en'
 *   localizedPath('/blog', 'fa')  -> '/fa/blog'
 *   localizedPath('blog/x', 'en') -> '/en/blog/x'
 */
export function localizedPath(path: string, locale: Locale): string {
  if (!path || path === '/') return `/${locale}`;
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${withSlash}`;
}

/** Absolute URL for a locale-free path in a given locale. */
export function localizedUrl(path: string, locale: Locale): string {
  return `${SITE_ORIGIN}${localizedPath(path, locale)}`;
}

/**
 * Swap the leading locale segment of a pathname for `target`.
 * Used by the language switcher to jump to the same page in the other locale.
 *   switchLocalePath('/fa/blog/x', 'en') -> '/en/blog/x'
 *   switchLocalePath('/blog/x', 'en')     -> '/en/blog/x'
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && (parts[0] === 'fa' || parts[0] === 'en')) {
    parts[0] = target;
  } else {
    parts.unshift(target);
  }
  return `/${parts.join('/')}`;
}

/**
 * Next.js metadata alternates: self-referencing canonical + hreflang pairs for
 * both locales and an `x-default` pointing at the default (fa) version.
 *
 * `path` is a locale-free path such as '/blog' or '/blog/some-slug'.
 */
export function buildAlternates(path: string, locale: Locale): Pick<Metadata, 'alternates'> {
  return {
    alternates: {
      canonical: localizedUrl(path, locale),
      languages: {
        fa: localizedUrl(path, 'fa'),
        en: localizedUrl(path, 'en'),
        'x-default': localizedUrl(path, DEFAULT_LOCALE),
      },
    },
  };
}
