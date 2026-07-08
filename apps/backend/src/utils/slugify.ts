/**
 * Convert arbitrary text into a URL-safe, ASCII-only slug.
 *
 * Non-localized (one slug per document, shared across locales) so the same
 * slug identifies a piece of content in every language; the locale lives in the
 * URL prefix instead. Persian/Arabic characters are stripped (they are not
 * ASCII-safe) — callers should prefer an English source string so the result is
 * non-empty, otherwise the hook/backfill falls back to a doc-derived slug.
 */
export function slugify(value: unknown): string {
  return String(value ?? '')
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}
