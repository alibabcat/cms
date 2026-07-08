import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  label: {
    en: 'About Page',
    fa: 'صفحه درباره ما',
  },
  fields: [
    {
      type: 'collapsible',
      label: {
        en: 'Hero',
        fa: 'سربرگ',
      },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: {
              en: 'Main heading. The highlighted word below is appended in the accent colour.',
              fa: 'عنوان اصلی. کلمه برجسته در ادامه با رنگ تاکیدی نمایش داده می‌شود.',
            },
          },
          label: { en: 'Title', fa: 'عنوان' },
        },
        {
          name: 'heroHighlight',
          type: 'text',
          localized: true,
          label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
        },
        {
          name: 'heroSubtitle',
          type: 'textarea',
          localized: true,
          label: { en: 'Subtitle', fa: 'زیرعنوان' },
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      localized: true,
      label: { en: 'Values', fa: 'ارزش‌ها' },
      admin: {
        description: {
          en: 'The value cards shown in the grid.',
          fa: 'کارت‌های ارزش‌ها که در شبکه نمایش داده می‌شوند.',
        },
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'target',
          options: [
            { label: { en: 'Target', fa: 'هدف' }, value: 'target' },
            { label: { en: 'Users / Community', fa: 'جامعه' }, value: 'users' },
            { label: { en: 'Globe / Global', fa: 'جهانی' }, value: 'globe' },
            { label: { en: 'Award / Quality', fa: 'کیفیت' }, value: 'award' },
            { label: { en: 'Shield', fa: 'سپر' }, value: 'shield' },
            { label: { en: 'Trending Up', fa: 'رشد' }, value: 'trending-up' },
          ],
          label: { en: 'Icon', fa: 'آیکون' },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Title', fa: 'عنوان' },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
          label: { en: 'Description', fa: 'توضیحات' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: { en: 'Team Section', fa: 'بخش تیم' },
      fields: [
        {
          name: 'teamHeading',
          type: 'text',
          localized: true,
          label: { en: 'Heading', fa: 'عنوان' },
        },
        {
          name: 'teamHighlight',
          type: 'text',
          localized: true,
          label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: { en: 'Story', fa: 'داستان' },
      fields: [
        {
          name: 'storyHeading',
          type: 'text',
          localized: true,
          label: { en: 'Heading', fa: 'عنوان' },
        },
        {
          name: 'storyContent',
          type: 'richText',
          localized: true,
          label: { en: 'Content', fa: 'محتوا' },
        },
      ],
    },
  ],
}
