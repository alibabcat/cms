import React from 'react'
import { Construction, TrendingUp } from 'lucide-react'
import type { Locale } from '@/lib/payload'
import { INSTITUTE_NAME } from '@/constants'

const TEXT = {
  fa: {
    badge: 'در دست ساخت',
    title: 'این وبسایت به‌زودی آماده می‌شود',
    subtitle:
      'تیم کیاوش در حال آماده‌سازی این بخش است. لطفاً کمی بعد دوباره سر بزنید.',
    progress: 'پیشرفت پروژه',
  },
  en: {
    badge: 'Under Construction',
    title: 'This Website is coming soon',
    subtitle:
      'The Kiawosch team is putting this section together. Please check back a little later.',
    progress: 'Project progress',
  },
} as const

/**
 * Placeholder shown for routes whose content is not ready yet. Bilingual and
 * theme-aware; decorative layers flip automatically in RTL via logical
 * rendering. Motion respects `prefers-reduced-motion`. The hosting page
 * should mount <HideChrome /> to hide the header/footer/AIChat.
 */
export default function UnderConstruction({
  locale,
  progress = 75,
}: {
  locale: Locale
  progress?: number
}) {
  const t = TEXT[locale]
  const pct = Math.max(0, Math.min(100, Math.round(progress)))

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
        {/* Brand logo */}
        <div className="uc-fade-up flex items-center gap-1.5 sm:gap-2 text-primary-500">
          <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
          <span className="font-extrabold text-lg sm:text-2xl tracking-tighter text-foreground">
            {INSTITUTE_NAME}<span className="text-primary-500">.CO</span>
          </span>
        </div>

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
            <span dir="ltr" className="font-mono text-primary-500">{pct}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-border/60">
            <div className="relative h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600" style={{ width: `${pct}%` }}>
              <span className="absolute inset-0 -skew-x-12 bg-white/30 blur-sm w-1/3 uc-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
