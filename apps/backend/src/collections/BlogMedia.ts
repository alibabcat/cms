import type { CollectionConfig } from 'payload'

/**
 * A dedicated media library for blog post imagery, kept separate from the
 * general `media` collection.
 */
export const BlogMedia: CollectionConfig = {
  slug: 'blog-media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
  },
  labels: {
    singular: {
      en: 'Blog Media',
      fa: 'رسانه وبلاگ',
    },
    plural: {
      en: 'Blog Media',
      fa: 'رسانه‌های وبلاگ',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Alt Text',
        fa: 'متن جایگزین',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      label: {
        en: 'Caption',
        fa: 'عنوان',
      },
    },
  ],
  upload: true,
}
