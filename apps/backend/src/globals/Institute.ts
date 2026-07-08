import type { GlobalConfig } from 'payload'

export const Institute: GlobalConfig = {
  slug: 'institute',
  access: {
    read: () => true,
  },
  label: {
    en: 'Institute',
    fa: 'موسسه',
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
