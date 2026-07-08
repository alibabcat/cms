'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:5000'

/**
 * Mounted on pages rendered inside Payload's Live Preview iframe. It listens for
 * "document saved" messages from the admin (at PAYLOAD_URL) and refreshes the
 * route so server components refetch and the preview reflects the change.
 */
export function RefreshOnSave() {
  const router = useRouter()
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={PAYLOAD_URL} />
}
