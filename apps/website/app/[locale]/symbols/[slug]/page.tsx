import { notFound } from 'next/navigation'
import { getMarketSymbolById } from '@/lib/payload'
import { parsePreviewParams } from '@/lib/preview'
import { getServerLocale } from '@/lib/locale'
import { RefreshOnSave } from '@/components/RefreshOnSave'
import SymbolDetail from '@/components/SymbolDetail'

export default async function SymbolDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const { preview, locale: previewLocale } = parsePreviewParams(await searchParams)
  const locale = previewLocale ?? (await getServerLocale())
  const symbol = await getMarketSymbolById(slug, { locale, draft: preview })
  if (!symbol) notFound()
  return (
    <>
      <SymbolDetail symbol={symbol} />
      {preview && <RefreshOnSave />}
    </>
  )
}
