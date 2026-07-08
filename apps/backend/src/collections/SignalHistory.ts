import type { CollectionConfig } from 'payload'

export const SignalHistory: CollectionConfig = {
  slug: 'signal-history',
  admin: {
    useAsTitle: 'symbol',
  },
  labels: {
    singular: {
      en: 'Signal History',
      fa: 'تاریخچه سیگنال',
    },
    plural: {
      en: 'Signal Histories',
      fa: 'تاریخچه‌های سیگنال',
    },
  },
  fields: [
    {
      name: 'symbol',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Symbol',
        fa: 'نماد',
      },
    },
    {
      name: 'type',
      type: 'select',
      localized: true,
      options: [
        { label: 'BUY', value: 'BUY' },
        { label: 'SELL', value: 'SELL' },
      ],
      required: true,
      label: {
        en: 'Type',
        fa: 'نوع',
      },
    },
    {
      name: 'entryPrice',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Entry Price',
        fa: 'قیمت ورود',
      },
    },
    {
      name: 'exitPrice',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Exit Price',
        fa: 'قیمت خروج',
      },
    },
    {
      name: 'pips',
      type: 'number',
      localized: true,
      required: true,
      label: {
        en: 'Pips',
        fa: 'پیپ',
      },
    },
    {
      name: 'result',
      type: 'select',
      localized: true,
      options: [
        { label: 'TP', value: 'TP' },
        { label: 'SL', value: 'SL' },
      ],
      required: true,
      label: {
        en: 'Result',
        fa: 'نتیجه',
      },
    },
    {
      name: 'date',
      type: 'date',
      localized: true,
      required: true,
      label: {
        en: 'Date',
        fa: 'تاریخ',
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
  ],
}
