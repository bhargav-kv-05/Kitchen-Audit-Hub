import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { RestaurantExplorer } from '@/components/restaurants/restaurant-explorer'

export const metadata: Metadata = {
  title: 'Restaurants',
  description: 'Explore local restaurants and check their latest health and compliance ratings.',
}

export default async function RestaurantsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const initialQuery = typeof q === 'string' ? q : ''

  return (
    <>
      <PageHeader
        eyebrow="Hyderabad · 12 listed"
        title="Restaurants"
        description="Explore local restaurants and check their latest health and compliance ratings."
      />
      <RestaurantExplorer key={initialQuery} initialQuery={initialQuery} />
    </>
  )
}
