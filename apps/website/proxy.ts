import { NextResponse, type NextRequest } from 'next/server'

const LOCALES = ['fa', 'en'] as const
type Locale = (typeof LOCALES)[number]
const DEFAULT_LOCALE: Locale = 'fa'

function isLocale(value: string | undefined): value is Locale {
  return value === 'fa' || value === 'en'
}

/**
 * Every URL must live under a locale prefix (/fa or /en). Requests without one
 * are permanently redirected to the default locale (/fa) + the rest of their
 * path. Requests with a valid locale are forwarded with an `x-locale` request
 * header (read by the root layout) and the `locale` cookie kept in sync.
 *
 * The under-construction gate deliberately does NOT live here: Next.js inlines
 * module-scope `process.env` reads into the proxy bundle at build time, so a
 * runtime-only env var (set on the host, absent during `next build`) would
 * never be seen. The root layout applies that gate instead, using the
 * `x-pathname` header set below.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]

  if (!isLocale(first)) {
    const url = req.nextUrl.clone()
    url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url, 308)
  }

  const locale = first
  const res = NextResponse.next()
  // Server components read this to know the locale without touching the URL
  // segment themselves.
  res.headers.set('x-locale', locale)
  // Server components cannot read the current pathname; expose it so the root
  // layout can apply the under-construction gate and hide chrome.
  res.headers.set('x-pathname', pathname)
  res.cookies.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return res
}

export const config = {
  // Run on all routes except: Next internals, API, and any path containing a
  // dot (static files, /sitemap.xml, /robots.txt, favicon, etc.).
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)'],
}
