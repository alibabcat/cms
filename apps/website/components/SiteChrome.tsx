'use client'

import React from 'react'
import Header from './Header'
import AIChat from './AIChat'
import { useChromeHidden } from './ChromeVisibility'
import type { NavMenuItem } from '@/lib/payload'

export default function SiteChrome({
  navItems,
  footer,
  children,
}: {
  navItems: NavMenuItem[]
  footer: React.ReactNode
  children: React.ReactNode
}) {
  const hidden = useChromeHidden()

  if (hidden) {
    return <main className="flex-grow">{children}</main>
  }

  return (
    <>
      <Header navItems={navItems} />
      <main className="flex-grow">{children}</main>
      {footer}
      <AIChat />
    </>
  )
}
