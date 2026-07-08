import { notFound } from 'next/navigation'
import { getTeamMemberById } from '@/lib/payload'
import { parsePreviewParams } from '@/lib/preview'
import { getServerLocale } from '@/lib/locale'
import { RefreshOnSave } from '@/components/RefreshOnSave'
import TeamDetail from '@/components/TeamDetail'

export default async function TeamMemberPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const { preview, locale: previewLocale } = parsePreviewParams(await searchParams)
  const locale = previewLocale ?? (await getServerLocale())
  const member = await getTeamMemberById(Number(slug), { locale, draft: preview })
  if (!member) notFound()
  return (
    <>
      <TeamDetail member={member} />
      {preview && <RefreshOnSave />}
    </>
  )
}
