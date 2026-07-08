import type { SeedContext } from '../lib/context'

// Blog categories referenced by Blog Posts. Defined here (rather than in the
// localized blog data) because a category is a single document carrying both
// locale names, keyed by a stable, locale-independent `value`.
const BLOG_CATEGORIES = [
  { value: 'technical-analysis', fa: 'تحلیل تکنیکال', en: 'Technical Analysis' },
  { value: 'educational', fa: 'آموزشی', en: 'Educational' },
  { value: 'psychology', fa: 'روانشناسی', en: 'Psychology' },
  { value: 'long-term-analysis', fa: 'تحلیل بلند مدت', en: 'Long-term Analysis' },
]

/**
 * Seeds blog categories idempotently (find-or-create) and returns a map from the
 * Farsi category name (as used in the source blog data) to the category doc id,
 * so Blog Posts can resolve their `category` relationship.
 */
export async function seedBlogCategories({ payload }: SeedContext): Promise<Map<string, string>> {
  const categoryIdByFaName = new Map<string, string>()
  for (const cat of BLOG_CATEGORIES) {
    try {
      const existing = await payload.find({
        collection: 'blog-categories',
        where: { value: { equals: cat.value } },
        limit: 1,
      })
      let id: string
      if (existing.docs.length > 0) {
        id = String(existing.docs[0].id)
      } else {
        const doc = await payload.create({
          collection: 'blog-categories',
          data: { name: cat.fa, value: cat.value },
        })
        await payload.update({
          collection: 'blog-categories',
          id: doc.id,
          locale: 'en',
          data: { name: cat.en },
        })
        id = String(doc.id)
      }
      categoryIdByFaName.set(cat.fa, id)
    } catch (e: any) {
      console.error(`❌ BlogCategory "${cat.fa}" failed:`, e.message)
    }
  }
  console.log('✅ Blog Categories seeded')
  return categoryIdByFaName
}
