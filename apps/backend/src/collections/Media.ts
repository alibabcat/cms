import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      en: 'Media',
      fa: 'رسانه',
    },
    plural: {
      en: 'Media',
      fa: 'رسانه‌ها',
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
  ],
  upload: true,
}
