import { redirect } from 'next/navigation'
import { getServerLocale } from '@/lib/locale'
import { SITE_ORIGIN } from '@/lib/i18n'
import UnderConstruction from '@/components/UnderConstruction'
import { HideChrome } from '@/components/ChromeVisibility'

/**
 * /info is served by a separate custom domain. This route permanently
 * redirects there when INFO_REDIRECT_URL is set (see the root .env). If the
 * env var is missing it falls back to the under-construction page so the route
 * never 500s in dev/preview.
 */
export default async function InfoRedirect() {
  const target = (process.env.INFO_REDIRECT_URL || '').trim()
  if (target) {
    redirect(target)
  }
  const locale = await getServerLocale()
  const progress = Number(process.env.UNDER_CONSTRUCTION_PERCENT) || 75
  return (
    <>
      <HideChrome />
      <UnderConstruction locale={locale} progress={progress} />
    </>
  )
}
