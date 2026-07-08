import type { Locale } from './payload';

/** Supported locales. `fa` (Persian) is the default and primary market. */
export const LOCALES: Locale[] = ['fa', 'en'];
export const DEFAULT_LOCALE: Locale = 'fa';

/** Cookie that stores the visitor's chosen content locale (kept in sync by middleware). */
export const LOCALE_COOKIE = 'locale';

/** True when the value is one of the supported locales. */
export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'fa' || value === 'en';
}

/** Coerce an arbitrary value into a supported locale (defaults to `fa`). */
export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Text direction for a locale. */
export function dirForLocale(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'en' ? 'ltr' : 'rtl';
}
