'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { RestaurantCard } from '@/components/restaurant-card'
import { restaurants } from '@/lib/restaurants'
import { useSaved } from '@/lib/use-saved'

export function SavedList() {
  const { saved } = useSaved()
  const list = restaurants.filter((r) => saved.includes(r.id))

  if (list.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="No saved restaurants yet."
        description="Tap the heart on any restaurant to keep it here for quick access."
        action={
          <Link
            href="/restaurants"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore Restaurants
          </Link>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {list.length} saved {list.length === 1 ? 'restaurant' : 'restaurants'}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </div>
  )
}
