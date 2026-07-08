import type { SeedContext } from '../lib/context'
import { MARKET_SYMBOLS, MARKET_SYMBOLS_EN } from '../constants'

export async function seedMarketSymbols(
  { payload }: SeedContext,
  iconIdByTicker: Map<string, string>,
): Promise<void> {
  for (let i = 0; i < MARKET_SYMBOLS.length; i++) {
    const faItem = MARKET_SYMBOLS[i]
    const enItem = MARKET_SYMBOLS_EN[i]
    try {
      const doc = await payload.create({
        collection: 'market-symbols',
        data: {
          ticker: faItem.ticker,
          name: faItem.name,
          // seedIcons created one icon per ticker, so this is always present
          icon: iconIdByTicker.get(faItem.ticker)!,
          price: faItem.price,
          change: faItem.change,
          isPositive: faItem.isPositive,
          description: faItem.description,
          characteristics: faItem.characteristics?.map((c: any) => ({
            label: c.label,
            value: c.value,
          })),
          technicalSummary: faItem.technicalSummary,
          chartImage: faItem.chartImage,
        },
      })
      await payload.update({
        collection: 'market-symbols',
        id: doc.id,
        locale: 'en',
        data: {
          ticker: enItem.ticker,
          name: enItem.name,
          price: enItem.price,
          change: enItem.change,
          isPositive: enItem.isPositive,
          description: enItem.description,
          characteristics: enItem.characteristics?.map((c: any) => ({
            label: c.label,
            value: c.value,
          })),
          technicalSummary: enItem.technicalSummary,
          chartImage: enItem.chartImage,
        },
      })
    } catch (e: any) {
      console.error(`❌ MarketSymbol "${faItem.ticker}" failed:`, e.message)
    }
  }
  console.log('✅ Market Symbols seeded')
}
