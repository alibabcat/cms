import type { SeedContext } from '../lib/context'
import {
  INSTITUTE_NAME,
  INSTITUTE_FULL_NAME,
  INSTITUTE_DESCRIPTION,
  INSTITUTE_ADDRESS,
  INSTITUTE_EMAIL,
  INSTITUTE_TEL,
  INSTITUTE_NAME_EN,
  INSTITUTE_FULL_NAME_EN,
  INSTITUTE_DESCRIPTION_EN,
  INSTITUTE_ADDRESS_EN,
  INSTITUTE_EMAIL_EN,
  INSTITUTE_TEL_EN,
} from '../constants'

export async function seedInstitute({ payload }: SeedContext): Promise<void> {
  try {
    await payload.updateGlobal({
      slug: 'institute',
      data: {
        name: INSTITUTE_NAME,
        fullName: INSTITUTE_FULL_NAME,
        description: INSTITUTE_DESCRIPTION,
        address: INSTITUTE_ADDRESS,
        email: INSTITUTE_EMAIL,
        tel: INSTITUTE_TEL,
        // Jordan (Nelson Mandela Blvd), Tehran — non-localized, so set here only.
        latitude: 35.7719,
        longitude: 51.4185,
      },
    })
    await payload.updateGlobal({
      slug: 'institute',
      locale: 'en',
      data: {
        name: INSTITUTE_NAME_EN,
        fullName: INSTITUTE_FULL_NAME_EN,
        description: INSTITUTE_DESCRIPTION_EN,
        address: INSTITUTE_ADDRESS_EN,
        email: INSTITUTE_EMAIL_EN,
        tel: INSTITUTE_TEL_EN,
      },
    })
    console.log('✅ Institute seeded')
  } catch (e: any) {
    console.error('❌ Institute failed:', e.message)
  }
}
