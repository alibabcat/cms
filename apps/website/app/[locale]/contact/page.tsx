import ContactClient from '@/components/ContactClient'
import { getInstitute } from '@/lib/payload'
import { getServerLocale } from '@/lib/locale'

export default async function ContactPage() {
  const locale = await getServerLocale()
  const institute = await getInstitute({ locale })
  return <ContactClient institute={institute} />
}
