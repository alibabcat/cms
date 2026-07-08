import type { SeedContext } from '../lib/context'
import { TEAM_MEMBERS, TEAM_MEMBERS_EN } from '../constants'

export async function seedTeamMembers({ payload, getMediaId }: SeedContext): Promise<void> {
  for (let i = 0; i < TEAM_MEMBERS.length; i++) {
    const faItem = TEAM_MEMBERS[i]
    const enItem = TEAM_MEMBERS_EN[i]
    try {
      const imageId = await getMediaId(faItem.image, faItem.name)
      const imageIdEn = await getMediaId(enItem.image, enItem.name)
      const doc = await payload.create({
        collection: 'team-members',
        data: {
          memberId: faItem.id,
          name: faItem.name,
          role: faItem.role,
          image: imageId,
          bio: faItem.bio,
          fullBio: faItem.fullBio || '',
          specialties: faItem.specialties?.map((s: any) => ({ specialty: s })) ?? [],
        } as any,
      })
      await payload.update({
        collection: 'team-members',
        id: doc.id,
        locale: 'en',
        data: {
          memberId: enItem.id,
          name: enItem.name,
          role: enItem.role,
          image: imageIdEn,
          bio: enItem.bio,
          fullBio: enItem.fullBio || '',
          specialties: enItem.specialties?.map((s: any) => ({ specialty: s })) ?? [],
        } as any,
      })
    } catch (e: any) {
      console.error(`❌ TeamMember "${faItem.name}" failed:`, e.message)
    }
  }
  console.log('✅ Team Members seeded')
}
