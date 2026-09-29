import type { Metadata } from 'next'
import { CommunityGuidelinesClient } from './client'

export const metadata: Metadata = {
  title: 'Community Guidelines | The Room Residence',
  description: 'House rules and living guidelines for all The Room Residence tenants in Sibu.',
  alternates: { canonical: '/community-guidelines' },
}

export default function CommunityGuidelinesPage() {
  return <CommunityGuidelinesClient />
}