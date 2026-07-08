import type { SeedContext } from '../lib/context'
import { parseSeedDate } from '../lib/dates'
import { PAST_VIP_SIGNALS, PAST_VIP_SIGNALS_EN } from '../constants'

export async function seedSignalHistory({ payload }: SeedContext): Promise<void> {
  for (let i = 0; i < PAST_VIP_SIGNALS.length; i++) {
    const faItem = PAST_VIP_SIGNALS[i]
    const enItem = PAST_VIP_SIGNALS_EN[i]
    try {
      const doc = await payload.create({
        collection: 'signal-history',
        data: {
          symbol: faItem.symbol,
          type: faItem.type,
          entryPrice: faItem.entryPrice,
          exitPrice: faItem.exitPrice,
          pips: faItem.pips,
          result: faItem.result,
          // every signal-history entry has a real (Gregorian) date
          date: parseSeedDate(enItem.date)!,
          description: faItem.description,
        },
      })
      await payload.update({
        collection: 'signal-history',
        id: doc.id,
        locale: 'en',
        data: {
          symbol: enItem.symbol,
          type: enItem.type,
          entryPrice: enItem.entryPrice,
          exitPrice: enItem.exitPrice,
          pips: enItem.pips,
          result: enItem.result,
          // every signal-history entry has a real (Gregorian) date
          date: parseSeedDate(enItem.date)!,
          description: enItem.description,
        },
      })
    } catch (e: any) {
      console.error(`❌ SignalHistory "${faItem.symbol}" failed:`, e.message)
    }
  }
  console.log('✅ Signal History seeded')
}
