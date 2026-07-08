import type { CollectionConfig } from 'payload'
import { slugField, slugHook } from '../fields/slug'

export const SignalPackages: CollectionConfig = {
  slug: 'signal-packages',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [slugHook('title')],
  },
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: {
      en: 'Signal Package',
      fa: 'بسته سیگنال',
    },
    plural: {
      en: 'Signal Packages',
      fa: 'بسته‌های سیگنال',
    },
  },
  fields: [
    slugField,
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Title',
        fa: 'عنوان',
      },
    },
    {
      name: 'duration',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Duration',
        fa: 'مدت',
      },
    },
    {
      name: 'price',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Price',
        fa: 'قیمت',
      },
    },
    {
      name: 'priceNum',
      type: 'number',
      localized: true,
      required: true,
      label: {
        en: 'Price Number',
        fa: 'عدد قیمت',
      },
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      localized: true,
      label: {
        en: 'Is Popular',
        fa: 'محبوب',
      },
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      label: {
        en: 'Features',
        fa: 'ویژگی‌ها',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          localized: true,
          required: true,
          label: {
            en: 'Feature',
            fa: 'ویژگی',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
      label: {
        en: 'Description',
        fa: 'توضیحات',
      },
    },
    {
      name: 'longDescription',
      type: 'textarea',
      localized: true,
      required: true,
      label: {
        en: 'Long Description',
        fa: 'توضیحات طولانی',
      },
    },
  ],
}
