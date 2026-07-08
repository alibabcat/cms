import CoursesClient from '@/components/CoursesClient'
import { getCourses } from '@/lib/payload'
import { getServerLocale } from '@/lib/locale'

export default async function CoursesPage() {
  const locale = await getServerLocale()
  let courses: Awaited<ReturnType<typeof getCourses>> = []
  try {
    courses = await getCourses({ locale })
  } catch {
    courses = []
  }
  return <CoursesClient courses={courses} />
}
