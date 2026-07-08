import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
  },
  labels: {
    singular: {
      en: 'User',
      fa: 'کاربر',
    },
    plural: {
      en: 'Users',
      fa: 'کاربران',
    },
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Name',
        fa: 'نام',
      },
    },
  ],
}
