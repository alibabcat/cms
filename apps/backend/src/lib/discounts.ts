import type { Payload } from 'payload'
import type { Discount } from '../payload-types'

export type DiscountEvaluation =
  | {
      valid: true
      discount: Discount
      subtotal: number
      discountAmount: number
      total: number
    }
  | {
      valid: false
      reason:
        | 'not_found'
        | 'inactive'
        | 'not_started'
        | 'expired'
        | 'usage_limit_reached'
        | 'below_minimum'
      message: string
    }

/**
 * Evaluate a single discount document against an order subtotal and return the
 * resulting amount off. Pure — does not touch the database. Used by both the
 * coupon endpoint and the automatic-discount resolver.
 */
export function evaluateDiscount(discount: Discount, subtotal: number, now = new Date()): DiscountEvaluation {
  if (!discount.active) {
    return { valid: false, reason: 'inactive', message: 'This discount is not active.' }
  }

  if (discount.startsAt && new Date(discount.startsAt) > now) {
    return { valid: false, reason: 'not_started', message: 'This discount is not active yet.' }
  }

  if (discount.expiresAt && new Date(discount.expiresAt) < now) {
    return { valid: false, reason: 'expired', message: 'This discount has expired.' }
  }

  if (
    typeof discount.usageLimit === 'number' &&
    discount.usageLimit > 0 &&
    (discount.usageCount ?? 0) >= discount.usageLimit
  ) {
    return { valid: false, reason: 'usage_limit_reached', message: 'This discount has reached its usage limit.' }
  }

  if (typeof discount.minOrderTotal === 'number' && subtotal < discount.minOrderTotal) {
    return {
      valid: false,
      reason: 'below_minimum',
      message: `Order subtotal must be at least ${discount.minOrderTotal}.`,
    }
  }

  let discountAmount =
    discount.type === 'percentage' ? (subtotal * discount.value) / 100 : discount.value

  if (
    discount.type === 'percentage' &&
    typeof discount.maxDiscountAmount === 'number' &&
    discount.maxDiscountAmount > 0
  ) {
    discountAmount = Math.min(discountAmount, discount.maxDiscountAmount)
  }

  // Never discount below zero or beyond the subtotal.
  discountAmount = Math.max(0, Math.min(discountAmount, subtotal))
  const total = Math.max(0, subtotal - discountAmount)

  return { valid: true, discount, subtotal, discountAmount, total }
}

/**
 * Look up a coupon by code and evaluate it against a subtotal.
 */
export async function validateCoupon(
  payload: Payload,
  code: string,
  subtotal: number,
): Promise<DiscountEvaluation> {
  const normalised = code.trim().toUpperCase()
  const { docs } = await payload.find({
    collection: 'discounts',
    where: {
      and: [{ code: { equals: normalised } }, { mode: { equals: 'coupon' } }],
    },
    limit: 1,
    overrideAccess: true,
  })

  const discount = docs[0]
  if (!discount) {
    return { valid: false, reason: 'not_found', message: 'Discount code not found.' }
  }

  return evaluateDiscount(discount, subtotal)
}

/**
 * Find the best automatic discount that applies to the given subtotal.
 * Returns the evaluation that produces the largest amount off, or null.
 */
export async function resolveAutomaticDiscount(
  payload: Payload,
  subtotal: number,
): Promise<DiscountEvaluation | null> {
  const { docs } = await payload.find({
    collection: 'discounts',
    where: {
      and: [{ mode: { equals: 'automatic' } }, { active: { equals: true } }],
    },
    limit: 100,
    overrideAccess: true,
  })

  let best: DiscountEvaluation | null = null
  for (const discount of docs) {
    const result = evaluateDiscount(discount, subtotal)
    if (result.valid && (!best || !best.valid || result.discountAmount > best.discountAmount)) {
      best = result
    }
  }

  return best
}
