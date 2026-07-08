import Link from 'next/link'
import { SearchX } from 'lucide-react'
import type { Locale } from '@/lib/payload'
import { getRoute } from '@/lib/navigation'

const TEXT = {
  fa: {
    code: '۴۰۴',
    title: 'صفحه مورد نظر پیدا نشد',
    subtitle: 'ممکن است آدرس اشتباه باشد یا این صفحه جابه‌جا شده باشد.',
    cta: 'بازگشت به صفحه اصلی',
  },
  en: {
    code: '404',
    title: 'Page not found',
    subtitle: "The page you're looking for doesn't exist or may have moved.",
    cta: 'Back to home',
  },
} as const

/** Standalone 404 view — rendered without the site Header/Footer via HideChrome. */
export default function NotFoundView({ locale }: { locale: Locale }) {
  const t = TEXT[locale]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full text-center flex flex-col items-center gap-8">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-2xl" aria-hidden />
          <div className="relative w-24 h-24 rounded-3xl bg-surface border border-border shadow-xl flex items-center justify-center">
            <SearchX className="w-12 h-12 text-primary-500" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-6xl font-black text-primary-500 tracking-tighter">{t.code}</p>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">{t.title}</h1>
          <p className="text-muted text-base sm:text-lg leading-8">{t.subtitle}</p>
        </div>

        <Link
          href={getRoute('home', locale)}
          className="px-6 py-3 rounded-xl bg-primary-500 text-white font-bold hover:opacity-90 transition-opacity"
        >
          {t.cta}
        </Link>
      </div>
    </section>
  )
}
