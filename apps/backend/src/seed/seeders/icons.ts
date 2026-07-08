import type { SeedContext } from '../lib/context'
import { MARKET_SYMBOLS, MARKET_SYMBOLS_EN } from '../constants'

/**
 * Seeds icons idempotently (find-or-create) from the market symbol data — one
 * icon per ticker — and returns a map from ticker to the icon doc id, so Market
 * Symbols can resolve their `icon` relationship.
 */
export async function seedIcons({ payload }: SeedContext): Promise<Map<string, string>> {
  const iconIdByTicker = new Map<string, string>()
  for (let i = 0; i < MARKET_SYMBOLS.length; i++) {
    const faItem = MARKET_SYMBOLS[i]
    const enItem = MARKET_SYMBOLS_EN[i]
    const value = faItem.ticker.toLowerCase()
    try {
      const existing = await payload.find({
        collection: 'icons',
        where: { value: { equals: value } },
        limit: 1,
      })
      let id: string
      if (existing.docs.length > 0) {
        id = String(existing.docs[0].id)
      } else {
        const doc = await payload.create({
          collection: 'icons',
          data: { name: faItem.ticker, value, url: faItem.icon },
        })
        await payload.update({
          collection: 'icons',
          id: doc.id,
          locale: 'en',
          data: { name: enItem.ticker },
        })
        id = String(doc.id)
      }
      iconIdByTicker.set(faItem.ticker, id)
    } catch (e: any) {
      console.error(`❌ Icon "${faItem.ticker}" failed:`, e.message)
    }
  }
  console.log('✅ Icons seeded')
  return iconIdByTicker
}
