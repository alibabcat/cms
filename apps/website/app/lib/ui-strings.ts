import type { Locale } from './payload';

/**
 * Static UI strings that aren't editable in the CMS (buttons, generic labels).
 * Keyed by a stable id, then by locale.
 */
export const UI_STRINGS = {
  backToHome: { fa: 'بازگشت به صفحه اصلی', en: 'Back to home' },
} as const;

export type UiStringKey = keyof typeof UI_STRINGS;

/** Returns the localized UI string for the given key. */
export function t(locale: Locale, key: UiStringKey): string {
  return UI_STRINGS[key][locale];
}
