'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const ChromeVisibilityContext = createContext<{
  hidden: boolean
  setHidden: (hidden: boolean) => void
} | null>(null)

export function ChromeVisibilityProvider({
  children,
  initialHidden = false,
}: {
  children: React.ReactNode
  initialHidden?: boolean
}) {
  const [hidden, setHidden] = useState(initialHidden)
  return (
    <ChromeVisibilityContext.Provider value={{ hidden, setHidden }}>
      {children}
    </ChromeVisibilityContext.Provider>
  )
}

export function useChromeHidden(): boolean {
  const ctx = useContext(ChromeVisibilityContext)
  if (!ctx) throw new Error('useChromeHidden must be used within a ChromeVisibilityProvider')
  return ctx.hidden
}

/** Mount anywhere in a page (server or client) to hide the Header/Footer while it's on screen. */
export function HideChrome() {
  const ctx = useContext(ChromeVisibilityContext)
  if (!ctx) throw new Error('HideChrome must be used within a ChromeVisibilityProvider')
  const { setHidden } = ctx

  useEffect(() => {
    setHidden(true)
    return () => setHidden(false)
  }, [setHidden])

  return null
}
