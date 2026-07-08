import { getTeamMembers, getAbout } from '@/lib/payload'
import { getServerLocale } from '@/lib/locale'
import AboutPageClient from '@/components/AboutPageClient'

export default async function AboutPage() {
  const locale = await getServerLocale()
  const [members, about] = await Promise.all([
    getTeamMembers({ locale }),
    getAbout({ locale }),
  ])
  return <AboutPageClient members={members} about={about} />
}
