import { notFound } from 'next/navigation'
import { getSignalPackageById, getSignalHistory } from '@/lib/payload'
import { parsePreviewParams } from '@/lib/preview'
import { getServerLocale } from '@/lib/locale'
import { RefreshOnSave } from '@/components/RefreshOnSave'
import SubscriptionDetailPage from '@/components/SubscriptionDetailPage'

export default async function SignalDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const { preview, locale: previewLocale } = parsePreviewParams(await searchParams)
  const locale = previewLocale ?? (await getServerLocale())
  const pkg = await getSignalPackageById(slug, { locale, draft: preview })
  if (!pkg) notFound()

  let recentSignals: Awaited<ReturnType<typeof getSignalHistory>> = []
  try {
    recentSignals = await getSignalHistory({ locale, limit: 6 })
  } catch {
    recentSignals = []
  }

  return (
    <>
      <SubscriptionDetailPage pkg={pkg} recentSignals={recentSignals} />
      {preview && <RefreshOnSave />}
    </>
  )
}
