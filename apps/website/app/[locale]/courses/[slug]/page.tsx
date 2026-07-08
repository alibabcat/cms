import { notFound } from 'next/navigation'
import { getCourseById } from '@/lib/payload'
import { parsePreviewParams } from '@/lib/preview'
import { getServerLocale } from '@/lib/locale'
import { RefreshOnSave } from '@/components/RefreshOnSave'
import CourseDetail from '@/components/CourseDetail'

export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const { preview, locale: previewLocale } = parsePreviewParams(await searchParams)
  const locale = previewLocale ?? (await getServerLocale())
  const course = await getCourseById(slug, { locale, draft: preview })
  if (!course) notFound()
  return (
    <>
      <CourseDetail course={course} />
      {preview && <RefreshOnSave />}
    </>
  )
}
