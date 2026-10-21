import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/dashboard/hero'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { GradeDistribution } from '@/components/dashboard/grade-distribution'
import { RecentInspections } from '@/components/dashboard/recent-inspections'
import { RestaurantCard } from '@/components/restaurant-card'
import { getTopRestaurants } from '@/lib/restaurants'

export default function DashboardPage() {
  const top = getTopRestaurants(6)

  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <StatsGrid />

      <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <section aria-labelledby="top-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 id="top-heading" className="text-2xl font-extrabold">
                Top Rated Restaurants
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">Highest health scores from the latest inspections near you.</p>
            </div>
            <Link href="/restaurants" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Browse all <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
            {top.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} priority={i < 2} />
            ))}
          </div>
        </section>

        <aside className="flex flex-col gap-6" aria-label="Inspection insights">
          <GradeDistribution />
          <RecentInspections />
        </aside>
      </div>
    </div>
  )
}
