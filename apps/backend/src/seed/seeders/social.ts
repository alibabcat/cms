import type { SeedContext } from '../lib/context'
import { SOCIAL_LINKS, SOCIAL_LINKS_EN } from '../constants'

export async function seedSocial({ payload }: SeedContext): Promise<void> {
  try {
    await payload.updateGlobal({
      slug: 'social',
      data: {
        links: SOCIAL_LINKS.map((link: any) => ({
          platform: link.platform,
          label: link.label,
          url: link.url,
        })),
      },
    })
    await payload.updateGlobal({
      slug: 'social',
      locale: 'en',
      data: {
        links: SOCIAL_LINKS_EN.map((link: any) => ({
          platform: link.platform,
          label: link.label,
          url: link.url,
        })),
      },
    })
    console.log('✅ Social seeded')
  } catch (e: any) {
    console.error('❌ Social failed:', e.message)
  }
}
