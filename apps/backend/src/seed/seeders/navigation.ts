import type { SeedContext } from '../lib/context'
import {
  NAV_ITEMS,
  NAV_ITEMS_EN,
  FOOTER_QUICK_LINKS,
  FOOTER_QUICK_LINKS_EN,
  FOOTER_SERVICES,
  FOOTER_SERVICES_EN,
} from '../constants'

const toLinks = (links: any[]) => links.map((l) => ({ label: l.label, id: l.id }))

export async function seedNavigation({ payload }: SeedContext): Promise<void> {
  try {
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        items: NAV_ITEMS.map((item: any) => ({
          label: item.label,
          id: item.id,
          subItems: item.subItems?.map((sub: any) => ({
            label: sub.label,
            id: sub.id,
          })),
        })),
        quickLinks: toLinks(FOOTER_QUICK_LINKS),
        services: toLinks(FOOTER_SERVICES),
      },
    })
    await payload.updateGlobal({
      slug: 'navigation',
      locale: 'en',
      data: {
        items: NAV_ITEMS_EN.map((item: any) => ({
          label: item.label,
          id: item.id,
          subItems: item.subItems?.map((sub: any) => ({
            label: sub.label,
            id: sub.id,
          })),
        })),
        quickLinks: toLinks(FOOTER_QUICK_LINKS_EN),
        services: toLinks(FOOTER_SERVICES_EN),
      },
    })
    console.log('✅ Navigation seeded')
  } catch (e: any) {
    console.error('❌ Navigation failed:', e.message)
  }
}
