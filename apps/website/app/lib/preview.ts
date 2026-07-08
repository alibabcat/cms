import type { Locale } from '@/lib/payload'

type SearchParams = Record<string, string | string[] | undefined>

/**
 * Parses Live Preview hints from a page's searchParams: `?preview` enables
 * uncached reads + the RefreshOnSave listener; `?locale=en|fa` selects locale.
 */
export function parsePreviewParams(sp: SearchParams | undefined): {
  preview: boolean
  locale: Locale | undefined
} {
  const preview = sp?.preview !== undefined
  const raw = Array.isArray(sp?.locale) ? sp?.locale[0] : sp?.locale
  const locale: Locale | undefined = raw === 'en' ? 'en' : raw === 'fa' ? 'fa' : undefined
  return { preview, locale }
}
