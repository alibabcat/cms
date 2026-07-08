import type { CollectionConfig } from 'payload'
import { slugField, slugHook } from '../fields/slug'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [slugHook('title')],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'authorUser', 'category', 'date'],
  },
  labels: {
    singular: {
      en: 'Blog Post',
      fa: 'پست وبلاگ',
    },
    plural: {
      en: 'Blog Posts',
      fa: 'پست‌های وبلاگ',
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
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      required: true,
      label: {
        en: 'Excerpt',
        fa: 'خلاصه',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      localized: true,
      relationTo: 'blog-media',
      required: true,
      label: {
        en: 'Cover Image',
        fa: 'تصویر کاور',
      },
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'blog-media',
      hasMany: true,
      label: {
        en: 'Gallery',
        fa: 'گالری',
      },
      admin: {
        description: {
          en: 'Additional images for this post.',
          fa: 'تصاویر بیشتر برای این پست.',
        },
      },
    },
    {
      name: 'date',
      localized: true,
      type: 'date',
      label: {
        en: 'Date',
        fa: 'تاریخ',
      },
    },
    {
      name: 'time',
      type: 'text',
      localized: true,
      label: {
        en: 'Time',
        fa: 'زمان',
      },
    },
    {
      name: 'authorUser',
      type: 'relationship',
      relationTo: 'users',
      // Auto-filled with the creating user; reference only, no special access.
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: 'sidebar',
        description: {
          en: 'The user account credited as this post’s author (reference only).',
          fa: 'حساب کاربری که به عنوان نویسنده این پست ثبت می‌شود (فقط جهت ارجاع).',
        },
      },
      label: {
        en: 'Author (account)',
        fa: 'نویسنده (حساب)',
      },
    },
    {
      name: 'author',
      type: 'text',
      localized: true,
      admin: {
        description: {
          en: 'Display name shown on the site. Leave blank to use the author account name.',
          fa: 'نام نمایشی در سایت. خالی بگذارید تا از نام حساب نویسنده استفاده شود.',
        },
      },
      label: {
        en: 'Author Display Name',
        fa: 'نام نمایشی نویسنده',
      },
    },
    {
      name: 'authorRole',
      type: 'text',
      localized: true,
      label: {
        en: 'Author Role',
        fa: 'نقش نویسنده',
      },
    },
    {
      name: 'authorImage',
      type: 'relationship',
      localized: true,
      relationTo: 'blog-media',
      label: {
        en: 'Author Image',
        fa: 'تصویر نویسنده',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'blog-categories',
      required: true,
      label: {
        en: 'Category',
        fa: 'دسته‌بندی',
      },
    },
    {
      name: 'relatedSymbol',
      type: 'text',
      localized: true,
      label: {
        en: 'Related Symbol',
        fa: 'نماد مرتبط',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      required: true,
      label: {
        en: 'Content',
        fa: 'محتوا',
      },
    },
  ],
}
