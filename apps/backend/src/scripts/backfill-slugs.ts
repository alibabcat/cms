/**
 * One-off backfill: give every existing document in the localized detail
 * collections a `slug` if it is missing or empty.
 *
 * Strategy per document:
 *   1. Try the EN-locale value of the source field (title / name / ticker) —
 *      English guarantees a URL-safe ASCII slug.
 *   2. Fall back to the fa/default value, then to `doc-<id>`.
 *   3. De-duplicate against existing slugs in the same collection.
 *
 * Run with:  pnpm --filter backend exec tsx src/scripts/backfill-slugs.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { slugify } from '../utils/slugify'

type Locale = 'en' | 'fa'

const COLLECTIONS: { slug: string; sourceField: string }[] = [
  { slug: 'blog-posts', sourceField: 'title' },
  { slug: 'courses', sourceField: 'title' },
  { slug: 'psychology-courses', sourceField: 'title' },
  { slug: 'signal-packages', sourceField: 'title' },
  { slug: 'market-symbols', sourceField: 'ticker' },
  { slug: 'team-members', sourceField: 'name' },
]

async function fetchField(
  payload: any,
  collection: string,
  id: string,
  field: string,
  locale: Locale,
): Promise<string> {
  try {
    const doc = await payload.findByID({
      collection,
      id,
      depth: 0,
      locale,
      overrideAccess: true,
    })
    const value = doc?.[field]
    return typeof value === 'string' ? value : ''
  } catch {
    return ''
  }
}

async function uniqueSlug(
  payload: any,
  collection: string,
  base: string,
  selfId: string,
): Promise<string> {
  let candidate = base
  let suffix = 1
  for (let i = 0; i < 50; i++) {
    const { docs } = await payload.find({
      collection,
      where: { slug: { equals: candidate } },
      limit: 2,
      depth: 0,
      overrideAccess: true,
    })
    const clash = docs.find((d: any) => String(d.id) !== String(selfId))
    if (!clash) return candidate
    suffix += 1
    candidate = `${base}-${suffix}`
  }
  return candidate
}

async function backfill() {
  const payload = await getPayload({ config })
  let updated = 0

  for (const { slug: collection, sourceField } of COLLECTIONS) {
    const { docs } = await payload.find({
      collection,
      limit: 0,
      depth: 0,
      overrideAccess: true,
      // Read without a locale filter so the document's stored slug (non-localized)
      // is returned directly.
    })
    const total = docs.length
    console.log(`\n[${collection}] ${total} documents`)

    for (const doc of docs) {
      const current = typeof doc.slug === 'string' ? doc.slug.trim() : ''
      if (current) continue

      const id = String(doc.id)
      const en = await fetchField(payload, collection, id, sourceField, 'en')
      const fa = await fetchField(payload, collection, id, sourceField, 'fa')
      const base =
        slugify(en) || slugify(fa) || `doc-${id}`
      const slug = await uniqueSlug(payload, collection, base, id)

      await payload.update({
        collection,
        id,
        data: { slug },
        overrideAccess: true,
      })
      updated += 1
      console.log(`  ${id} -> ${slug}`)
    }
  }

  console.log(`\nDone. Slugs written for ${updated} document(s).`)
  process.exit(0)
}

backfill().catch((err) => {
  console.error(err)
  process.exit(1)
})
