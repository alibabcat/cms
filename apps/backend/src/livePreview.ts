import type { LivePreviewConfig } from 'payload'

// The public site (Next.js). Override with WEBSITE_URL in production.
export const WEBSITE_URL = process.env.WEBSITE_URL || 'http://localhost:5001'

// Maps a collection slug to the front-end detail route for a given document.
// `team-members` is keyed by its numeric `memberId` (the route uses Number(id));
// every other collection is keyed by the Payload document id.
const detailPathBySlug: Record<string, (data: Record<string, any>) => string> = {
  'blog-posts': (d) => `/blog/${d?.id ?? ''}`,
  courses: (d) => `/courses/${d?.id ?? ''}`,
  'psychology-courses': (d) => `/psychology/${d?.id ?? ''}`,
  'signal-packages': (d) => `/signals/${d?.id ?? ''}`,
  'market-symbols': (d) => `/symbols/${d?.id ?? ''}`,
  'team-members': (d) => `/team/${d?.memberId ?? ''}`,
}

// Maps a global slug to the front-end page it previews against.
const pathByGlobalSlug: Record<string, string> = {
  about: '/about',
  'home-page': '/',
}

export const livePreviewGlobals = ['institute', 'navigation', 'social', 'about', 'home-page']
export const livePreviewCollections = Object.keys(detailPathBySlug)

export const livePreview: LivePreviewConfig = {
  breakpoints: [
    { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
    { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
    { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
  ],
  url: ({ data, collectionConfig, globalConfig, locale }) => {
    const slug = collectionConfig?.slug
    const builder = slug ? detailPathBySlug[slug] : undefined
    // Collections use their detail route; globals use their mapped page;
    // anything unmapped previews against the home page.
    const path = builder
      ? builder(data)
      : (globalConfig?.slug && pathByGlobalSlug[globalConfig.slug]) || '/'
    const params = new URLSearchParams()
    // Signals the front-end to enter preview mode (uncached reads + RefreshOnSave).
    params.set('preview', 'true')
    if (locale?.code) params.set('locale', locale.code)
    return `${WEBSITE_URL}${path}?${params.toString()}`
  },
}
