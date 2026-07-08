import type { CollectionConfig } from 'payload'
import { slugField, slugHook } from '../fields/slug'

export const PsychologyCourses: CollectionConfig = {
  slug: 'psychology-courses',
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
      en: 'Psychology Course',
      fa: 'دوره روانشناسی',
    },
    plural: {
      en: 'Psychology Courses',
      fa: 'دوره‌های روانشناسی',
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
      name: 'type',
      type: 'select',
      localized: true,
      options: [
        { label: 'Public', value: 'Public' },
        { label: 'Private', value: 'Private' },
        { label: 'Hybrid', value: 'Hybrid' },
      ],
      required: true,
      label: {
        en: 'Type',
        fa: 'نوع',
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
      name: 'sessionCount',
      type: 'number',
      localized: true,
      required: true,
      label: {
        en: 'Session Count',
        fa: 'تعداد جلسات',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      localized: true,
      required: false,
      label: {
        en: 'Start Date',
        fa: 'تاریخ شروع',
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
      name: 'isPopular',
      type: 'checkbox',
      localized: true,
      label: {
        en: 'Is Popular',
        fa: 'محبوب',
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
      name: 'longDescription',
      type: 'textarea',
      localized: true,
      required: true,
      label: {
        en: 'Long Description',
        fa: 'توضیحات طولانی',
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
      name: 'syllabus',
      type: 'array',
      localized: true,
      label: {
        en: 'Syllabus',
        fa: 'سرفصل',
      },
      fields: [
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
          name: 'topics',
          type: 'array',
          localized: true,
          label: {
            en: 'Topics',
            fa: 'موضوعات',
          },
          fields: [
            {
              name: 'topic',
              type: 'text',
              localized: true,
              required: true,
              label: {
                en: 'Topic',
                fa: 'موضوع',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'outcomes',
      type: 'array',
      localized: true,
      label: {
        en: 'Outcomes',
        fa: 'نتایج',
      },
      fields: [
        {
          name: 'outcome',
          type: 'text',
          localized: true,
          required: true,
          label: {
            en: 'Outcome',
            fa: 'نتیجه',
          },
        },
      ],
    },
  ],
}
