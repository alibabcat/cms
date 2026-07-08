import type { SeedContext } from '../lib/context'
import { parseSeedDate } from '../lib/dates'
import { PSYCHOLOGY_COURSES, PSYCHOLOGY_COURSES_EN } from '../constants'

export async function seedPsychologyCourses({ payload, getMediaId }: SeedContext): Promise<void> {
  for (let i = 0; i < PSYCHOLOGY_COURSES.length; i++) {
    const faItem = PSYCHOLOGY_COURSES[i]
    const enItem = PSYCHOLOGY_COURSES_EN[i]
    try {
      const imageId = await getMediaId(faItem.image, faItem.title)
      const imageIdEn = await getMediaId(enItem.image, enItem.title)
      const doc = await payload.create({
        collection: 'psychology-courses',
        data: {
          title: faItem.title,
          price: faItem.price,
          type: faItem.type,
          image: imageId,
          duration: faItem.duration,
          sessionCount: faItem.sessionCount,
          startDate: parseSeedDate(enItem.startDate),
          instructor: faItem.instructor,
          isPopular: faItem.isPopular ?? false,
          description: faItem.description,
          longDescription: faItem.longDescription,
          features: faItem.features?.map((f: any) => ({ feature: f })),
          syllabus: faItem.syllabus?.map((s: any) => ({
            title: s.title,
            duration: s.duration,
            topics: s.topics?.map((t: any) => ({ topic: t })),
          })),
          outcomes: faItem.outcomes?.map((o: any) => ({ outcome: o })),
        },
      })
      await payload.update({
        collection: 'psychology-courses',
        id: doc.id,
        locale: 'en',
        data: {
          title: enItem.title,
          price: enItem.price,
          type: enItem.type,
          image: imageIdEn,
          duration: enItem.duration,
          sessionCount: enItem.sessionCount,
          startDate: parseSeedDate(enItem.startDate),
          instructor: enItem.instructor,
          isPopular: enItem.isPopular ?? false,
          description: enItem.description,
          longDescription: enItem.longDescription,
          features: enItem.features?.map((f: any) => ({ feature: f })),
          syllabus: enItem.syllabus?.map((s: any) => ({
            title: s.title,
            duration: s.duration,
            topics: s.topics?.map((t: any) => ({ topic: t })),
          })),
          outcomes: enItem.outcomes?.map((o: any) => ({ outcome: o })),
        },
      })
    } catch (e: any) {
      console.error(`❌ PsychologyCourse "${faItem.title}" failed:`, e.message)
    }
  }
  console.log('✅ Psychology Courses seeded')
}
