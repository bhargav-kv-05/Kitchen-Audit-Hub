import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DetailHero } from '@/components/restaurant-detail/detail-hero'
import { HealthSection } from '@/components/restaurant-detail/health-section'
import { InspectionHistory } from '@/components/restaurant-detail/inspection-history'
import { ViolationsList } from '@/components/restaurant-detail/violations-list'
import { RestaurantCard } from '@/components/restaurant-card'
import { getRestaurant, restaurants } from '@/lib/restaurants'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const r = getRestaurant(id)
  if (!r) return { title: 'Restaurant not found' }
  return {
    title: `${r.name} · Grade ${r.grade === 'FAILED' ? 'F' : r.grade}`,
    description: `${r.name} in ${r.locality}, ${r.city} scored ${r.healthScore}% on its latest health inspection.`,
  }
}

export default async function RestaurantDetailPage({ params }: Props) {
  const { id } = await params
  const restaurant = getRestaurant(id)
  if (!restaurant) notFound()

  const similar = restaurants
    .filter((r) => r.id !== restaurant.id && (r.cuisine === restaurant.cuisine || r.locality === restaurant.locality))
    .slice(0, 3)

  return (
    <div className="flex flex-col gap-8">
      <DetailHero restaurant={restaurant} />
      <HealthSection restaurant={restaurant} />
      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <InspectionHistory history={restaurant.inspectionHistory} />
        <ViolationsList violations={restaurant.violations} />
      </div>
      {similar.length > 0 && (
        <section aria-labelledby="similar-heading">
          <h2 id="similar-heading" className="mb-5 text-2xl font-extrabold">
            Nearby &amp; Similar
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
