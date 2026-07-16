'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * A thin progress bar at the top of the viewport that animates while a
 * same-tab internal navigation is in flight. There is no App Router "route
 * change started" event, so we approximate it: a capturing click listener
 * starts the bar the instant an internal link is clicked, and the bar
 * completes once `pathname` actually changes.
 *
 * Deliberately not using `useSearchParams` here — it forces a Suspense
 * boundary / opts pages out of static rendering, which this global,
 * layout-mounted component should never do.
 */
/** Path comparison ignoring a trailing slash, so '/fa/blog/' === '/fa/blog'. */
const normalizePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

/** Hard ceiling on how long the bar may run if a navigation never lands. */
const FAILSAFE_MS = 10_000

const RouteLoadingBar: React.FC = () => {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = () => {
    if (trickleRef.current) clearInterval(trickleRef.current)
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    if (failsafeRef.current) clearTimeout(failsafeRef.current)
  }

  const start = () => {
    clearTimers()
    setVisible(true)
    setProgress(15)
    trickleRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? prev : prev + (90 - prev) * 0.1))
    }, 200)
    // A navigation that never changes `pathname` would otherwise trickle
    // forever, since `finish` is only driven by that change.
    failsafeRef.current = setTimeout(() => finish(), FAILSAFE_MS)
  }

  const finish = () => {
    clearTimers()
    setProgress(100)
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, 300)
  }

  // Complete the bar whenever the route actually changes.
  useEffect(() => {
    finish()
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Start the bar as soon as an internal link is clicked, before navigation
  // completes — this is what makes it feel instant rather than lagging.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      const samePath = url.pathname === window.location.pathname && url.search === window.location.search
      if (samePath) return

      start()
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed top-0 inset-x-0 z-[100] h-[3px] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-primary-500 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1, transitionProperty: 'width, opacity', transitionDuration: progress === 100 ? '300ms' : '200ms' }}
      />
    </div>
  )
}

export default RouteLoadingBar
