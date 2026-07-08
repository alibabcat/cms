import React from 'react'
import { LOCALES } from '../lib/locale'
import type { Locale } from '../lib/payload'

/** Pre-render both locales so /fa and /en are statically generated. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export const dynamicParams = false

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  return children
}
