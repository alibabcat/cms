import type { CollectionConfig } from 'payload'
import { resolveAutomaticDiscount, validateCoupon } from '../lib/discounts'

export const Discounts: CollectionConfig = {
  slug: 'discounts',
  access: {
    read: () => true,
  },
  endpoints: [
    {
      // POST /api/discounts/validate  { code?: string, subtotal: number }
      path: '/validate',
      method: 'post',
      handler: async (req) => {
        const body = typeof req.json === 'function' ? await req.json() : {}
        const subtotal = Number(body?.subtotal)
        const code: string | undefined = body?.code

        if (!Number.isFinite(subtotal) || subtotal < 0) {
          return Response.json({ valid: false, message: '`subtotal` must be a non-negative number.' }, { status: 400 })
        }

        const result = code
          ? await validateCoupon(req.payload, code, subtotal)
          : await resolveAutomaticDiscount(req.payload, subtotal)

        if (!result) {
          return Response.json({ valid: false, reason: 'not_found', message: 'No applicable discount.', subtotal })
        }

        return Response.json(result, { status: result.valid ? 200 : 200 })
      },
    },
  ],
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'type', 'value', 'active', 'expiresAt'],
  },
  labels: {
    singular: {
      en: 'Discount',
      fa: 'تخفیف',
    },
    plural: {
      en: 'Discounts',
      fa: 'تخفیف‌ها',
    },
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: {
          en: 'Coupon code customers enter at checkout. Leave matching an automatic rule blank if not code-based.',
          fa: 'کد تخفیفی که مشتری در پرداخت وارد می‌کند.',
        },
      },
      hooks: {
        // Normalise codes so "SUMMER10" and "summer10" match.
        beforeValidate: [({ value }) => (typeof value === 'string' ? value.trim().toUpperCase() : value)],
      },
      label: {
        en: 'Code',
        fa: 'کد',
      },
    },
    {
      name: 'mode',
      type: 'select',
      required: true,
      defaultValue: 'coupon',
      options: [
        { label: { en: 'Coupon code', fa: 'کد تخفیف' }, value: 'coupon' },
        { label: { en: 'Automatic', fa: 'خودکار' }, value: 'automatic' },
      ],
      admin: {
        description: {
          en: 'Coupon = applied when the code is entered. Automatic = applied whenever the rules below match.',
          fa: 'کد = با وارد کردن کد. خودکار = هر زمان شرایط زیر برقرار باشد.',
        },
      },
      label: {
        en: 'Mode',
        fa: 'حالت',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'percentage',
      options: [
        { label: { en: 'Percentage', fa: 'درصدی' }, value: 'percentage' },
        { label: { en: 'Fixed amount', fa: 'مبلغ ثابت' }, value: 'fixed' },
      ],
      label: {
        en: 'Discount Type',
        fa: 'نوع تخفیف',
      },
    },
    {
      name: 'value',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: {
          en: 'Percentage (e.g. 10 = 10%) or fixed amount off, depending on type.',
          fa: 'درصد (مثلاً ۱۰ = ۱۰٪) یا مبلغ ثابت، بسته به نوع.',
        },
      },
      label: {
        en: 'Value',
        fa: 'مقدار',
      },
    },
    {
      name: 'minOrderTotal',
      type: 'number',
      min: 0,
      admin: {
        description: {
          en: 'Minimum order subtotal required for this discount to apply. Leave blank for no minimum.',
          fa: 'حداقل مبلغ سفارش برای اعمال تخفیف. خالی = بدون حداقل.',
        },
      },
      label: {
        en: 'Minimum Order Total',
        fa: 'حداقل مبلغ سفارش',
      },
    },
    {
      name: 'maxDiscountAmount',
      type: 'number',
      min: 0,
      admin: {
        condition: (data) => data?.type === 'percentage',
        description: {
          en: 'Cap on the discount amount for percentage discounts. Leave blank for no cap.',
          fa: 'سقف مبلغ تخفیف برای تخفیف درصدی. خالی = بدون سقف.',
        },
      },
      label: {
        en: 'Max Discount Amount',
        fa: 'حداکثر مبلغ تخفیف',
      },
    },
    {
      name: 'usageLimit',
      type: 'number',
      min: 0,
      admin: {
        description: {
          en: 'Total number of times this discount can be redeemed. Leave blank for unlimited.',
          fa: 'تعداد دفعات قابل استفاده. خالی = نامحدود.',
        },
      },
      label: {
        en: 'Usage Limit',
        fa: 'محدودیت استفاده',
      },
    },
    {
      name: 'usageCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: {
          en: 'How many times this discount has been redeemed.',
          fa: 'تعداد دفعات استفاده‌شده.',
        },
      },
      label: {
        en: 'Usage Count',
        fa: 'تعداد استفاده',
      },
    },
    {
      name: 'startsAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
      label: {
        en: 'Starts At',
        fa: 'شروع از',
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
      label: {
        en: 'Expires At',
        fa: 'انقضا در',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Active',
        fa: 'فعال',
      },
    },
  ],
}
