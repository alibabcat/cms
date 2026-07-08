import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

import { createImageUploader } from './lib/images'
import type { SeedContext } from './lib/context'
import {
  seedInstitute,
  seedNavigation,
  seedSocial,
  seedSignalHistory,
  seedIcons,
  seedMarketSymbols,
  seedSignalPackages,
  seedPsychologyCourses,
  seedCourses,
  seedTeamMembers,
  seedBlogCategories,
  seedBlogPosts,
} from './seeders'

async function seed() {
  const payload = await getPayload({ config })
  const ctx: SeedContext = {
    payload,
    getMediaId: createImageUploader(payload),
  }

  // Globals
  await seedInstitute(ctx)
  await seedNavigation(ctx)
  await seedSocial(ctx)

  // Collections
  await seedSignalHistory(ctx)

  // Icons must exist before market symbols can reference them.
  const iconIdByTicker = await seedIcons(ctx)
  await seedMarketSymbols(ctx, iconIdByTicker)
  await seedSignalPackages(ctx)
  await seedPsychologyCourses(ctx)
  await seedCourses(ctx)
  await seedTeamMembers(ctx)

  // Blog categories must exist before posts can reference them.
  const categoryIdByFaName = await seedBlogCategories(ctx)
  await seedBlogPosts(ctx, categoryIdByFaName)

  console.log('\n🎉 All done!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed script crashed:', err)
  process.exit(1)
})
