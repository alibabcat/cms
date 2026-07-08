import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
  },
  label: {
    en: 'Navigation',
    fa: 'ناوبری',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      localized: true,
      label: {
        en: 'Items',
        fa: 'آیتم‌ها',
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
          name: 'id',
          type: 'text',
          required: true,
          label: {
            en: 'ID',
            fa: 'شناسه',
          },
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: false,
          label: {
            en: 'Image',
            fa: 'تصویر',
          },
        },
        {
          name: 'subItems',
          type: 'array',
          label: {
            en: 'Sub Items',
            fa: 'آیتم‌های فرعی',
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
              name: 'id',
              type: 'text',
              required: true,
              label: {
                en: 'ID',
                fa: 'شناسه',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'quickLinks',
      type: 'array',
      localized: true,
      label: {
        en: 'Quick Access',
        fa: 'دسترسی سریع',
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
          name: 'id',
          type: 'text',
          required: true,
          label: {
            en: 'ID',
            fa: 'شناسه',
          },
        },
      ],
    },
    {
      name: 'services',
      type: 'array',
      localized: true,
      label: {
        en: 'Services & Resources',
        fa: 'خدمات و منابع',
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
          name: 'id',
          type: 'text',
          required: true,
          label: {
            en: 'ID',
            fa: 'شناسه',
          },
        },
      ],
    },
  ],
}
