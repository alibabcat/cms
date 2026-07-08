import React from 'react'
import Link from 'next/link'
import { Construction, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Locale } from '@/lib/payload'
import { getRoute } from '@/lib/navigation'

const TEXT = {
  fa: {
    badge: 'در دست ساخت',
    title: 'این وبسایت به‌زودی آماده می‌شود',
    subtitle:
      'تیم کیاوش در حال آماده‌سازی این بخش است. لطفاً کمی بعد دوباره سر بزنید.',
    progress: 'پیشرفت پروژه',
    cta: 'بازگشت به صفحه اصلی',
  },
  en: {
    badge: 'Under Construction',
    title: 'This Website is coming soon',
    subtitle:
      'The Kiawosch team is putting this section together. Please check back a little later.',
    progress: 'Project progress',
    cta: 'Back to home',
  },
} as const

/**
 * Placeholder shown for routes whose content is not ready yet. Bilingual and
 * theme-aware; decorative layers and the back arrow flip automatically in RTL
 * via logical rendering. Motion respects `prefers-reduced-motion`.
 */
export default function UnderConstruction({ locale }: { locale: Locale }) {
  const t = TEXT[locale]
  const BackArrow = locale === 'en' ? ArrowLeft : ArrowRight

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 py-24">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(var(--color-border)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-border)) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 75%)',
          }}
        />
        {/* Glow blobs */}
        <div className="absolute -top-24 start-1/4 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl uc-float" />
        <div
          className="absolute -bottom-16 end-1/4 h-80 w-80 rounded-full bg-primary-400/10 blur-3xl uc-float"
          style={{ animationDelay: '-3s' }}
        />
      </div>

      <div className="relative w-full max-w-xl text-center flex flex-col items-center gap-8">
        {/* Icon */}
        <div className="relative uc-fade-up">
          <span className="absolute inset-0 rounded-3xl bg-primary-500/30 uc-pulse-ring" />
          <span className="absolute -inset-3 rounded-[2rem] bg-[conic-gradient(from_0deg,transparent,rgb(var(--color-border)),transparent)] uc-spin-slow" />
          <div className="relative w-24 h-24 rounded-3xl bg-surface/80 backdrop-blur-sm border border-border shadow-2xl shadow-primary-500/10 flex items-center justify-center">
            <Construction className="w-11 h-11 text-primary-500" />
          </div>
        </div>

        {/* Badge */}
        <span className="uc-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-bold tracking-wide ring-1 ring-inset ring-primary-500/20" style={{ animationDelay: '0.05s' }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
          </span>
          {t.badge}
        </span>

        {/* Copy */}
        <div className="space-y-4 uc-fade-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground leading-tight tracking-tight">
            {t.title}
          </h1>
          <p className="text-muted text-base sm:text-lg leading-8 max-w-md mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs uc-fade-up space-y-2" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between text-xs font-semibold text-muted">
            <span>{t.progress}</span>
            <span dir="ltr" className="font-mono text-primary-500">75%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-border/60">
            <div className="relative h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600" style={{ width: '75%' }}>
              <span className="absolute inset-0 -skew-x-12 bg-white/30 blur-sm w-1/3 uc-shimmer" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={getRoute('home', locale)}
          className="uc-fade-up group inline-flex items-center gap-2 rounded-2xl bg-primary-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-primary-500/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{ animationDelay: '0.2s' }}
        >
          <BackArrow className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
          {t.cta}
        </Link>
      </div>
    </section>
  )
}
