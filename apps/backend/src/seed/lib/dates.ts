// ---------------------------------------------------------------------------
// Date normalization: the source data mixes Jalali strings, Persian digits and
// free-form phrases ("Starts after interview"), which `new Date()` can't parse.
// The English values are Gregorian, so we derive the absolute instant from the
// English counterpart and store it in both locales. Relative phrases ("Today",
// "N days ago") are resolved against the run time; anything non-date -> null.
// ---------------------------------------------------------------------------
export function parseSeedDate(value?: string | null): string | null {
  if (!value) return null
  const v = value.trim()
  const lower = v.toLowerCase()

  if (lower === 'today') return new Date().toISOString()

  const rel = lower.match(/^(\d+)\s+days?\s+ago$/)
  if (rel) {
    const d = new Date()
    d.setDate(d.getDate() - parseInt(rel[1], 10))
    return d.toISOString()
  }

  const parsed = new Date(v)
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString()

  // Free-form, non-date text (e.g. "Starts after interview")
  return null
}
