import { notFound } from 'next/navigation'
import { getPsychologyCourseById, getTeamMembers } from '@/lib/payload'
import { parsePreviewParams } from '@/lib/preview'
import { getServerLocale } from '@/lib/locale'
import { RefreshOnSave } from '@/components/RefreshOnSave'
import PsychologyDetail from '@/components/PsychologyDetail'

export default async function PsychologyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const { preview, locale: previewLocale } = parsePreviewParams(await searchParams)
  const locale = previewLocale ?? (await getServerLocale())
  const course = await getPsychologyCourseById(slug, { locale, draft: preview })
  if (!course) notFound()

  let teamMembers: Awaited<ReturnType<typeof getTeamMembers>> = []
  try {
    teamMembers = await getTeamMembers({ locale })
  } catch {
    teamMembers = []
  }

  return (
    <>
      <PsychologyDetail course={course} teamMembers={teamMembers} />
      {preview && <RefreshOnSave />}
    </>
  )
}
