import type { Locale } from './payload'

/**
 * Route segments that stay reachable while the site is in under-construction
 * mode. `info` redirects out to INFO_REDIRECT_URL; `under-construction` is the
 * destination itself and must be reachable to avoid a redirect loop.
 */
const BYPASS_SEGMENTS = new Set(['info', 'under-construction'])

/** Routes that never render the site header/footer/AIChat. */
const CHROME_LESS_SEGMENTS = new Set(['info', 'under-construction'])

/** The second path segment (the first after the locale), e.g. '/fa/blog' -> 'blog'. */
export function routeSegment(pathname: string): string | undefined {
  return pathname.split('/').filter(Boolean)[1]
}

/**
 * Read at request time (not module scope) so the value comes from the real
 * runtime environment. Next.js inlines module-scope `process.env` reads into
 * the proxy/middleware bundle at build time, which is why this gate lives in a
 * server component instead of proxy.ts.
 */
export function isUnderConstruction(): boolean {
  return process.env.UNDER_CONSTRUCTION === 'true'
}

/** Progress percent shown on the under-construction page. */
export function underConstructionPercent(): number {
  return Number(process.env.UNDER_CONSTRUCTION_PERCENT) || 75
}

/** True when the given pathname should be redirected to the UC page. */
export function shouldRedirectToUnderConstruction(pathname: string): boolean {
  if (!isUnderConstruction()) return false
  const segment = routeSegment(pathname)
  return !(segment && BYPASS_SEGMENTS.has(segment))
}

/** True when the header/footer/AIChat must not render for this pathname. */
export function isChromeLess(pathname: string): boolean {
  const segment = routeSegment(pathname)
  return Boolean(segment && CHROME_LESS_SEGMENTS.has(segment))
}

/** Locale-prefixed path of the under-construction page. */
export function underConstructionPath(locale: Locale): string {
  return `/${locale}/under-construction`
}
