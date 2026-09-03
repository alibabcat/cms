import { NextResponse, type NextRequest } from 'next/server'

const LOCALES = ['fa', 'en'] as const
type Locale = (typeof LOCALES)[number]
const DEFAULT_LOCALE: Locale = 'fa'

function isLocale(value: string | undefined): value is Locale {
  return value === 'fa' || value === 'en'
}

// When UNDER_CONSTRUCTION=true, every route is redirected to the under-
// construction page except the ones in this set. `info` still redirects to
// the custom domain (INFO_REDIRECT_URL); `under-construction` is the
// destination itself and must be bypassed to avoid a redirect loop.
const UNDER_CONSTRUCTION_BYPASS = new Set(['info', 'under-construction'])

// Routes that never show the site header/footer/AIChat. The root layout reads
// this header to hide chrome during SSR (no client-side flash).
const HIDE_CHROME_ROUTES = new Set(['under-construction', 'info'])
const UNDER_CONSTRUCTION = process.env.UNDER_CONSTRUCTION === 'true'

/**
 * Every URL must live under a locale prefix (/fa or /en). Requests without one
 * are permanently redirected to the default locale (/fa) + the rest of their
 * path. Requests with a valid locale are forwarded with an `x-locale` request
 * header (read by the root layout) and the `locale` cookie kept in sync.
 *
 * In under-construction mode, every non-bypassed route is redirected to
 * /[locale]/under-construction (307, temporary).
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
  const second = segments[1]

  if (UNDER_CONSTRUCTION && !(second && UNDER_CONSTRUCTION_BYPASS.has(second))) {
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}/under-construction`
    return NextResponse.redirect(url, 307)
  }

  const res = NextResponse.next()
  // Server components read this to know the locale without touching the URL
  // segment themselves.
  res.headers.set('x-locale', locale)
  // Tell the root layout to skip header/footer/AIChat for chrome-less routes.
  if (second && HIDE_CHROME_ROUTES.has(second)) {
    res.headers.set('x-hide-chrome', '1')
  }
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
