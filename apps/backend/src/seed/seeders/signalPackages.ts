import type { SeedContext } from '../lib/context'
import { SIGNAL_PACKAGES, SIGNAL_PACKAGES_EN } from '../constants'

export async function seedSignalPackages({ payload }: SeedContext): Promise<void> {
  for (let i = 0; i < SIGNAL_PACKAGES.length; i++) {
    const faItem = SIGNAL_PACKAGES[i]
    const enItem = SIGNAL_PACKAGES_EN[i]
    try {
      const doc = await payload.create({
        collection: 'signal-packages',
        data: {
          title: faItem.title,
          duration: faItem.duration,
          price: faItem.price,
          priceNum: faItem.priceNum,
          isPopular: faItem.isPopular ?? false,
          features: faItem.features?.map((f: any) => ({ feature: f })) ?? [],
          description: faItem.description,
          longDescription: faItem.longDescription || '',
        } as any,
      })
      await payload.update({
        collection: 'signal-packages',
        id: doc.id,
        locale: 'en',
        data: {
          title: enItem.title,
          duration: enItem.duration,
          price: enItem.price,
          priceNum: enItem.priceNum,
          isPopular: enItem.isPopular ?? false,
          features: enItem.features?.map((f: any) => ({ feature: f })) ?? [],
          description: enItem.description,
          longDescription: enItem.longDescription || '',
        } as any,
      })
    } catch (e: any) {
      console.error(`❌ SignalPackage "${faItem.title}" failed:`, e.message)
    }
  }
  console.log('✅ Signal Packages seeded')
}
