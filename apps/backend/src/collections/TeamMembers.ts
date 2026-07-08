import type { CollectionConfig } from 'payload'
import { slugField, slugHook } from '../fields/slug'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [slugHook('name')],
  },
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: {
      en: 'Team Member',
      fa: 'عضو تیم',
    },
    plural: {
      en: 'Team Members',
      fa: 'اعضای تیم',
    },
  },
  fields: [
    slugField,
    {
      name: 'memberId',
      type: 'number',
      localized: true,
      required: true,
      unique: true,
      label: {
        en: 'Member ID',
        fa: 'شناسه عضو',
      },
    },
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
      name: 'role',
      type: 'text',
      localized: true,
      required: true,
      label: {
        en: 'Role',
        fa: 'نقش',
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
      name: 'bio',
      type: 'textarea',
      localized: true,
      required: true,
      label: {
        en: 'Bio',
        fa: 'بیوگرافی کوتاه',
      },
    },
    {
      name: 'fullBio',
      type: 'textarea',
      localized: true,
      required: true,
      label: {
        en: 'Full Bio',
        fa: 'بیوگرافی کامل',
      },
    },
    {
      name: 'specialties',
      type: 'array',
      localized: true,
      label: {
        en: 'Specialties',
        fa: 'تخصص‌ها',
      },
      fields: [
        {
          name: 'specialty',
          type: 'text',
          localized: true,
          required: true,
          label: {
            en: 'Specialty',
            fa: 'تخصص',
          },
        },
      ],
    },
  ],
}
