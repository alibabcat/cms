import type { CollectionConfig } from 'payload'
import { slugField, slugHook } from '../fields/slug'

export const MarketSymbols: CollectionConfig = {
  slug: 'market-symbols',
  access: {
    read: () => true,
  },
  hooks: {
    // `ticker` (e.g. "XAUUSD") is already ASCII and unique — ideal slug source.
    beforeChange: [slugHook('ticker')],
  },
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: {
      en: 'Market Symbol',
      fa: 'نماد بازار',
    },
    plural: {
      en: 'Market Symbols',
      fa: 'نمادهای بازار',
    },
  },
  fields: [
    slugField,
    {
      name: 'ticker',
      type: 'text',
      localized: true,
      required: true,
      unique: true,
      label: {
        en: 'Ticker',
        fa: 'نماد',
      },
    },
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
      name: 'icon',
      type: 'relationship',
      relationTo: 'icons',
      required: true,
      label: {
        en: 'Icon',
        fa: 'آیکون',
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
      name: 'change',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Change',
        fa: 'تغییر',
      },
    },
    {
      name: 'isPositive',
      type: 'checkbox',
      localized: true,
      label: {
        en: 'Is Positive',
        fa: 'مثبت است',
      },
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
      name: 'characteristics',
      type: 'array',
      localized: true,
      label: {
        en: 'Characteristics',
        fa: 'ویژگی‌ها',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: {
            en: 'Label',
            fa: 'برچسب',
          },
        },
        {
          name: 'value',
          type: 'text',
          localized: true,
          required: true,
          label: {
            en: 'Value',
            fa: 'مقدار',
          },
        },
      ],
    },
    {
      name: 'technicalSummary',
      type: 'textarea',
      localized: true,
      required: true,
      label: {
        en: 'Technical Summary',
        fa: 'خلاصه تکنیکال',
      },
    },
    {
      name: 'chartImage',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Chart Image',
        fa: 'تصویر نمودار',
      },
    },
  ],
}
