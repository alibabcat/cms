import type { GlobalConfig } from 'payload'

export const Social: GlobalConfig = {
  slug: 'social',
  access: {
    read: () => true,
  },
  label: {
    en: 'Social',
    fa: 'شبکه‌های اجتماعی',
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      localized: true,
      label: {
        en: 'Links',
        fa: 'لینک‌ها',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: {
            en: 'Platform',
            fa: 'پلتفرم',
          },
          options: [
            { label: 'Telegram', value: 'telegram' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X (Twitter)', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Aparat', value: 'aparat' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Website', value: 'website' },
          ],
        },
        {
          name: 'icon',
          type: 'relationship',
          relationTo: 'icons',
          required: false,
          label: {
            en: 'Icon',
            fa: 'آیکون',
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: false,
          label: {
            en: 'Label',
            fa: 'برچسب',
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
    },
  ],
}
