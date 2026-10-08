import { Suspense } from 'react'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { RestaurantMap } from '@/components/map/restaurant-map'
import { Bone } from '@/components/card-skeleton'

export const metadata: Metadata = {
  title: 'Map',
  description: 'See restaurants near you, color-coded by their latest health inspection grade.',
}

export default function MapPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Map" title="Restaurants Near You" description="Tap a marker to see a restaurant's grade and latest score." />
      <Suspense fallback={<Bone className="h-[560px] w-full rounded-2xl" />}>
        <RestaurantMap />
      </Suspense>
    </div>
  )
}
