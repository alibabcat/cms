import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { en } from '@payloadcms/translations/languages/en'
import { fa } from '@payloadcms/translations/languages/fa'


import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogMedia } from './collections/BlogMedia'
import { MarketSymbols } from './collections/MarketSymbols'
import { Icons } from './collections/Icons'
import { SignalPackages } from './collections/SignalPackages'
import { PsychologyCourses } from './collections/PsychologyCourses'
import { Courses } from './collections/Courses'
import { TeamMembers } from './collections/TeamMembers'
import { BlogPosts } from './collections/BlogPosts'
import { BlogCategories } from './collections/BlogCategories'
import { SignalHistory } from './collections/SignalHistory'
import { Discounts } from './collections/Discounts'

import { Institute } from './globals/Institute'
import { Navigation } from './globals/Navigation'
import { Social } from './globals/Social'
import { About } from './globals/About'
import { HomePage } from './globals/HomePage'

import { livePreview, livePreviewCollections, livePreviewGlobals, WEBSITE_URL } from './livePreview'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// The admin/API origin (this Next.js app). Defaults to the dev port (5000).
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000'

export default buildConfig({
  serverURL: SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      ...livePreview,
      collections: livePreviewCollections,
      globals: livePreviewGlobals,
    },
  },
  i18n: {
    supportedLanguages: { en, fa },
    fallbackLanguage: 'fa',
  },
   localization: {
    locales: ['en', 'fa'], // required
    defaultLocale: 'fa', // required
  },
  collections: [
    Users,
    Media,
    BlogMedia,
    Icons,
    MarketSymbols,
    SignalPackages,
    PsychologyCourses,
    Courses,
    TeamMembers,
    BlogPosts,
    BlogCategories,
    SignalHistory,
    Discounts,
  ],
  globals: [
    Institute,
    Navigation,
    Social,
    About,
    HomePage,
  ],
  cors: [SERVER_URL, WEBSITE_URL],
  csrf: [SERVER_URL, WEBSITE_URL],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    ecommercePlugin({
      // Reuse the existing Users collection as customers.
      customers: {
        slug: 'users',
      },
      // Must be enabled explicitly — the plugin does not default this on, but
      // orders/carts reference the products collection, so it has to exist.
      products: true,
      // No role system yet: treat any authenticated user as an admin/owner.
      access: {
        adminOnlyFieldAccess: ({ req }) => Boolean(req.user),
        adminOrPublishedStatus: ({ req }) => Boolean(req.user) || { _status: { equals: 'published' } },
        isAdmin: ({ req }) => Boolean(req.user),
        isAuthenticated: ({ req }) => Boolean(req.user),
        isDocumentOwner: ({ req }) => {
          if (!req.user) return false
          return { customer: { equals: req.user.id } }
        },
        publicAccess: () => true,
      },
      // Payments left disabled for now — add an adapter (e.g. stripeAdapter) here later.
    }),
  ],
})
