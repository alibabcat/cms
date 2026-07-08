import type { Metadata } from 'next'
import { getServerLocale } from '@/lib/locale'
import { buildAlternates } from '@/lib/i18n'
import UnderConstruction from '@/components/UnderConstruction'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  return {
    title: locale === 'en' ? 'Under Construction' : 'در دست ساخت',
    robots: { index: false, follow: false },
    ...buildAlternates('/under-construction', locale),
  }
}

export default async function UnderConstructionPage() {
  const locale = await getServerLocale()
  return <UnderConstruction locale={locale} />
}
