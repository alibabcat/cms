import type { SeedContext } from '../lib/context'
import { SAMPLE_COURSES, SAMPLE_COURSES_EN } from '../constants'

export async function seedCourses({ payload, getMediaId }: SeedContext): Promise<void> {
  for (let i = 0; i < SAMPLE_COURSES.length; i++) {
    const faItem = SAMPLE_COURSES[i]
    const enItem = SAMPLE_COURSES_EN[i]
    try {
      const imageId = await getMediaId(faItem.image, faItem.title)
      const imageIdEn = await getMediaId(enItem.image, enItem.title)
      const doc = await payload.create({
        collection: 'courses',
        data: {
          title: faItem.title,
          description: faItem.description,
          instructor: faItem.instructor,
          duration: faItem.duration,
          price: faItem.price,
          basePrice: faItem.basePrice ?? 0,
          priceRangeLabel: faItem.priceRangeLabel,
          image: imageId,
          category: faItem.category as any,
          syllabus: faItem.syllabus?.map((s: any) => ({ item: s })) ?? [],
          features: faItem.features?.map((f: any) => ({ feature: f })) ?? [],
          addons: faItem.addons?.map((a: any) => ({
            id: a.id,
            title: a.title,
            price: a.price,
            priceLabel: a.priceLabel,
            description: a.description,
          })) ?? [],
        } as any,
      })
      await payload.update({
        collection: 'courses',
        id: doc.id,
        locale: 'en',
        data: {
          title: enItem.title,
          description: enItem.description,
          instructor: enItem.instructor,
          duration: enItem.duration,
          price: enItem.price,
          basePrice: enItem.basePrice ?? 0,
          priceRangeLabel: enItem.priceRangeLabel,
          image: imageIdEn,
          category: enItem.category as any,
          syllabus: enItem.syllabus?.map((s: any) => ({ item: s })) ?? [],
          features: enItem.features?.map((f: any) => ({ feature: f })) ?? [],
          addons: enItem.addons?.map((a: any) => ({
            id: a.id,
            title: a.title,
            price: a.price,
            priceLabel: a.priceLabel,
            description: a.description,
          })) ?? [],
        } as any,
      })
    } catch (e: any) {
      console.error(`❌ Course "${faItem.title}" failed:`, e.message)
    }
  }
  console.log('✅ Courses seeded')
}
