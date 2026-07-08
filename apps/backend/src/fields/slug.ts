import type { CollectionConfig, Field } from 'payload'
import { slugify } from '../utils/slugify'

/**
 * The shared slug field. Non-localized + unique so one ASCII slug identifies a
 * document across all locales (the locale lives in the URL prefix). It is NOT
 * marked `required` at the schema level so legacy documents without a slug can
 * still be read/written until the backfill runs; the beforeChange hook below
 * guarantees every saved document ends up with a non-empty, unique slug.
 */
export const slugField: Field = {
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  label: {
    en: 'URL Slug',
    fa: 'نامک (آدرس)',
  },
  admin: {
    position: 'sidebar',
    description: {
      en: 'URL-friendly identifier (ASCII, e.g. "gold-analysis"). Auto-generated from the title if left blank.',
      fa: 'شناسه آدرس‌پسند (انگلیسی، مثال: gold-analysis). در صورت خالی بودن از عنوان ساخته می‌شود.',
    },
  },
}

type BeforeChangeHook = NonNullable<CollectionConfig['hooks']>['beforeChange'][number]

/**
 * Collection-level beforeChange hook that ensures a document always has a slug.
 *
 * Order of preference:
 *   1. An existing slug (editor-provided or previously generated).
 *   2. slugify of the incoming `titleField` value (URL-safe when ASCII).
 *   3. `doc-<id>` (or `doc-<timestamp>` on create) as a last-resort fallback.
 *
 * Collisions against existing documents are resolved by appending `-2`, `-3`, …
 */
export function slugHook(titleField: string): BeforeChangeHook {
  return async ({ data, req, originalDoc, operation, collection }) => {
    const doc = data as Record<string, unknown> | undefined
    if (!doc) return data

    const existing = typeof doc.slug === 'string' ? doc.slug.trim() : ''
    if (existing) {
      doc.slug = slugify(existing) || existing
      return data
    }

    const id = (originalDoc?.id ?? doc.id ?? Date.now()) as string | number
    let slug = slugify(doc[titleField]) || `doc-${id}`

    const slugColl = collection?.slug
    if (req.payload && slugColl) {
      slug = await resolveUnique(req.payload, slugColl, slug, String(id))
    }

    doc.slug = slug
    return data
  }
}

/** Appends `-n` until the slug does not collide with another document. */
async function resolveUnique(
  payload: { find: (args: any) => Promise<{ docs: any[] }> },
  collectionSlug: string,
  base: string,
  selfId: string,
): Promise<string> {
  let candidate = base
  let suffix = 1
  // Bounded loop — in practice collisions are rare.
  for (let i = 0; i < 50; i++) {
    try {
      const { docs } = await payload.find({
        collection: collectionSlug,
        where: { slug: { equals: candidate } },
        limit: 2,
        depth: 0,
        overrideAccess: true,
      })
      const clash = docs.find((d) => String(d.id) !== String(selfId))
      if (!clash) return candidate
      suffix += 1
      candidate = `${base}-${suffix}`
    } catch {
      return candidate
    }
  }
  return candidate
}
