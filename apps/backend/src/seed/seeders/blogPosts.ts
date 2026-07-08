import type { SeedContext } from '../lib/context'
import { parseSeedDate } from '../lib/dates'
import { textToLexical } from '../lib/richText'
import { BLOG_POSTS, BLOG_POSTS_EN } from '../constants'

export async function seedBlogPosts(
  { payload, getMediaId }: SeedContext,
  categoryIdByFaName: Map<string, string>,
): Promise<void> {
  for (let i = 0; i < BLOG_POSTS.length; i++) {
    const faItem = BLOG_POSTS[i]
    const enItem = BLOG_POSTS_EN[i]
    try {
      const imageId = await getMediaId(faItem.image, faItem.title, 'blog-media')
      const imageIdEn = await getMediaId(enItem.image, enItem.title, 'blog-media')
      const authorImageId = faItem.authorImage
        ? await getMediaId(faItem.authorImage, faItem.author || faItem.title, 'blog-media')
        : undefined
      const authorImageIdEn = enItem.authorImage
        ? await getMediaId(enItem.authorImage, enItem.author || enItem.title, 'blog-media')
        : undefined
      const doc = await payload.create({
        collection: 'blog-posts',
        data: {
          title: faItem.title,
          excerpt: faItem.excerpt,
          image: imageId,
          date: parseSeedDate(enItem.date),
          time: faItem.time,
          author: faItem.author,
          authorRole: faItem.authorRole,
          authorImage: authorImageId,
          category: categoryIdByFaName.get(faItem.category),
          relatedSymbol: faItem.relatedSymbol,
          content: textToLexical(faItem.content, 'rtl'),
        } as any,
      })
      await payload.update({
        collection: 'blog-posts',
        id: doc.id,
        locale: 'en',
        data: {
          title: enItem.title,
          excerpt: enItem.excerpt,
          image: imageIdEn,
          date: parseSeedDate(enItem.date),
          time: enItem.time,
          author: enItem.author,
          authorRole: enItem.authorRole,
          authorImage: authorImageIdEn,
          relatedSymbol: enItem.relatedSymbol,
          content: textToLexical(enItem.content, 'ltr'),
        } as any,
      })
    } catch (e: any) {
      console.error(`❌ BlogPost "${faItem.title}" failed:`, e.message)
    }
  }
  console.log('✅ Blog Posts seeded')
}
