import { getServerLocale } from '@/lib/locale'
import NotFoundView from '@/components/NotFoundView'
import { HideChrome } from '@/components/ChromeVisibility'

export default async function LocaleNotFound() {
  const locale = await getServerLocale()
  return (
    <>
      <HideChrome />
      <NotFoundView locale={locale} />
    </>
  )
}
