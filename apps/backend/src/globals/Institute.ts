import type { GlobalConfig } from 'payload'

export const Institute: GlobalConfig = {
  slug: 'institute',
  access: {
    read: () => true,
  },
  label: {
    en: 'Institute Settings',
    fa: 'تنظیمات موسسه',
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
      name: 'fullName',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Full Name',
        fa: 'نام کامل',
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
      name: 'address',
      type: 'textarea',
      localized: true,
      required: false,
      label: {
        en: 'Address',
        fa: 'آدرس',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: false,
          admin: {
            width: '50%',
            step: 0.000001,
            description: {
              en: 'Map latitude, e.g. 35.759 (used for the OpenStreetMap on the contact page).',
              fa: 'عرض جغرافیایی نقشه، مثلا ۳۵.۷۵۹ (برای نمایش نقشه در صفحه تماس).',
            },
          },
          label: {
            en: 'Latitude',
            fa: 'عرض جغرافیایی',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          required: false,
          admin: {
            width: '50%',
            step: 0.000001,
            description: {
              en: 'Map longitude, e.g. 51.421.',
              fa: 'طول جغرافیایی نقشه، مثلا ۵۱.۴۲۱.',
            },
          },
          label: {
            en: 'Longitude',
            fa: 'طول جغرافیایی',
          },
        },
      ],
    },
    {
      name: 'email',
      type: 'text',
      required: false,
      label: {
        en: 'Email',
        fa: 'ایمیل',
      },
    },
    {
      name: 'tel',
      type: 'text',
      required: false,
      label: {
        en: 'Phone',
        fa: 'تلفن',
      },
    },
  ],
}
