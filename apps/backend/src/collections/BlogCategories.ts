import type { CollectionConfig } from 'payload'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: {
      en: 'Blog Category',
      fa: 'دسته‌بندی وبلاگ',
    },
    plural: {
      en: 'Blog Categories',
      fa: 'دسته‌بندی‌های وبلاگ',
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
          en: 'Stable, locale-independent identifier (e.g. "technical-analysis").',
          fa: 'شناسه ثابت و مستقل از زبان (مثلاً «technical-analysis»).',
        },
      },
    },
  ],
}
