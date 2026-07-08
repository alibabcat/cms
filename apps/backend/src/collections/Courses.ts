import type { CollectionConfig } from 'payload'
import { slugField, slugHook } from '../fields/slug'

export const Courses: CollectionConfig = {
  slug: 'courses',
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
      en: 'Course',
      fa: 'دوره',
    },
    plural: {
      en: 'Courses',
      fa: 'دوره‌ها',
    },
  },
  fields: [
    slugField,
    {
      name: 'title',
      type: 'text',
      required: true,
      localized:true,
      label: {
        en: 'Title',
        fa: 'عنوان',
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
      name: 'instructor',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Instructor',
        fa: 'مدرس',
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
      name: 'basePrice',
      type: 'number',
      localized: true,
      required: true,
      label: {
        en: 'Base Price',
        fa: 'قیمت پایه',
      },
    },
    {
      name: 'priceRangeLabel',
      type: 'text',
      localized: true,
      label: {
        en: 'Price Range Label',
        fa: 'برچسب محدوده قیمت',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      localized: true,
      relationTo: 'media',
      required: true,
      label: {
        en: 'Image',
        fa: 'تصویر',
      },
    },
    {
      name: 'category',
      type: 'select',
      localized: true,
      options: [
        { label: 'Management', value: 'management' },
        { label: 'Programming', value: 'programming' },
        { label: 'Language', value: 'language' },
      ],
      required: true,
      label: {
        en: 'Category',
        fa: 'دسته‌بندی',
      },
    },
    {
      name: 'syllabus',
      type: 'array',
      localized: true,
      label: {
        en: 'Syllabus',
        fa: 'سرفصل',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          localized: true,
          required: true,
          label: {
            en: 'Item',
            fa: 'آیتم',
          },
        },
      ],
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
      name: 'addons',
      type: 'array',
      localized: true,
      label: {
        en: 'Addons',
        fa: 'افزودنی‌ها',
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          localized: true,
          required: true,
          label: {
            en: 'ID',
            fa: 'شناسه',
          },
        },
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
          name: 'price',
          type: 'number',
          localized: true,
          required: true,
          label: {
            en: 'Price',
            fa: 'قیمت',
          },
        },
        {
          name: 'priceLabel',
          type: 'text',
          localized: true,
          required: true,
          label: {
            en: 'Price Label',
            fa: 'برچسب قیمت',
          },
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
          required: true,
          label: {
            en: 'Description',
            fa: 'توضیحات',
          },
        },
      ],
    },
  ],
}
