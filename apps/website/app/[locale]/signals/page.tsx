import SignalsClient from '@/components/SignalsClient'
import { getSignalPackages } from '@/lib/payload'
import { getServerLocale } from '@/lib/locale'

export default async function SignalsPage() {
  const locale = await getServerLocale()
  let packages: Awaited<ReturnType<typeof getSignalPackages>> = []
  try {
    packages = await getSignalPackages({ locale })
  } catch {
    packages = []
  }
  return <SignalsClient packages={packages} />
}
