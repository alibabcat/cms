import React from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import './globals.css'
import { ThemeProvider } from '../components/ThemeContext'
import { CalendarProvider } from '../components/CalendarContext'
import { LanguageProvider } from '../components/LanguageContext'
import { resolveLocale, dirForLocale } from './lib/locale'
import { getNavItems } from './lib/payload'
import { SITE_ORIGIN } from './lib/i18n'
import {
  isChromeLess,
  shouldRedirectToUnderConstruction,
  underConstructionPath,
} from './lib/under-construction'
import GoogleAnalytics from '../components/GoogleAnalytics'
import RouteLoadingBar from '../components/RouteLoadingBar'
import Footer from '../components/Footer'
import { ChromeVisibilityProvider } from '../components/ChromeVisibility'
import SiteChrome from '../components/SiteChrome'

const SITE_META = {
  fa: {
    title: 'موسسه کیاوش | مرجع تخصصی استراتژی پاندولیسم',
    description:
      'موسسه آموزشی کیاوش | تنها مرجع تخصصی استراتژی معاملاتی پاندولیسم (Pendulism) در ایران. آموزش ترید، سیگنال دهی طلا و ارز دیجیتال.',
    keywords:
      'پاندولیسم, استراتژی پاندولیسم, آموزش ترید, سیگنال طلا, کیاوش, فارکس, ارز دیجیتال, Pendulism Strategy',
  },
  en: {
    title: 'Kiavosh Institute | Pendulism Trading Strategy',
    description:
      'Kiavosh Educational Institute | The specialized home of the Pendulism trading strategy. Trading education, gold and crypto signals.',
    keywords:
      'Pendulism, Pendulism strategy, trading education, gold signals, Kiavosh, forex, crypto, سیگنال طلا',
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers()
  const locale = resolveLocale(h.get('x-locale'))
  const meta = SITE_META[locale]
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The locale is resolved from a request header injected by the proxy
  // (which guarantees the path is under /fa or /en). This lets the root layout
  // — the only layout allowed to render <html>/<body> — set lang/dir per locale.
  const h = await headers()
  const locale = resolveLocale(h.get('x-locale'))
  const pathname = h.get('x-pathname') ?? '/'

  // Runtime (not build-time) under-construction gate — see lib/under-construction.
  if (shouldRedirectToUnderConstruction(pathname)) {
    redirect(underConstructionPath(locale))
  }

  const hideChrome = isChromeLess(pathname)
  const navItems = hideChrome ? [] : await getNavItems({ locale })
  return (
    <html lang={locale} dir={dirForLocale(locale)} className="dark">
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary-500 selection:text-white transition-colors duration-300">
        <GoogleAnalytics />
        <RouteLoadingBar />
        <ThemeProvider>
          <CalendarProvider>
            <LanguageProvider initialLocale={locale}>
              <ChromeVisibilityProvider initialHidden={hideChrome}>
                <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden transition-colors duration-300">
                  <SiteChrome navItems={navItems} footer={<Footer />}>
                    {children}
                  </SiteChrome>
                </div>
              </ChromeVisibilityProvider>
            </LanguageProvider>
          </CalendarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
