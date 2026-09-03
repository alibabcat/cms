import React from 'react'
import { notFound } from 'next/navigation'
import { LOCALES, isLocale } from '../lib/locale'

/** Pre-render both locales so /fa and /en are statically generated. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Unknown locale segments 404 here rather than via `dynamicParams = false`,
  // which would also reject the pages below that render dynamically.
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return children
}
