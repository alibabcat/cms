import React from 'react'
import Link from 'next/link'
import { Construction, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Locale } from '@/lib/payload'
import { getRoute } from '@/lib/navigation'

const TEXT = {
  fa: {
    badge: 'در دست ساخت',
    title: 'این صفحه به‌زودی آماده می‌شود',
    subtitle:
      'تیم کیاوش در حال آماده‌سازی این بخش است. لطفاً کمی بعد دوباره سر بزنید.',
    cta: 'بازگشت به صفحه اصلی',
  },
  en: {
    badge: 'Under Construction',
    title: 'This page is coming soon',
    subtitle:
      'The Kiavosh team is putting this section together. Please check back a little later.',
    cta: 'Back to home',
  },
} as const

/**
 * Placeholder shown for routes whose content is not ready yet. Bilingual and
 * theme-aware; the back arrow flips automatically in RTL via logical rendering.
 */
export default function UnderConstruction({ locale }: { locale: Locale }) {
  const t = TEXT[locale]
  const BackArrow = locale === 'en' ? ArrowLeft : ArrowRight

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full text-center flex flex-col items-center gap-8">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-2xl" aria-hidden />
          <div className="relative w-24 h-24 rounded-3xl bg-surface border border-border shadow-xl flex items-center justify-center">
            <Construction className="w-12 h-12 text-primary-500" />
          </div>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-500 text-sm font-bold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          {t.badge}
        </span>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">
            {t.title}
          </h1>
          <p className="text-muted text-base sm:text-lg leading-8">{t.subtitle}</p>
        </div>

        <Link
          href={getRoute('home', locale)}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold transition-colors shadow-lg shadow-primary-500/20"
        >
          <BackArrow className="w-5 h-5 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
          {t.cta}
        </Link>
      </div>
    </section>
  )
}
