import type { CollectionConfig } from 'payload'

export const Icons: CollectionConfig = {
  slug: 'icons',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: {
      en: 'Icon',
      fa: 'آیکون',
    },
    plural: {
      en: 'Icons',
      fa: 'آیکون‌ها',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Name',
        fa: 'نام',
      },
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: {
        en: 'Value',
        fa: 'شناسه',
      },
      admin: {
        description: {
          en: 'Stable, locale-independent identifier (e.g. "xauusd").',
          fa: 'شناسه ثابت و مستقل از زبان (مثلاً «xauusd»).',
        },
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: {
        en: 'URL',
        fa: 'آدرس',
      },
    },
  ],
}
