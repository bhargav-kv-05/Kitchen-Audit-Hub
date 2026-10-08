import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarCheck, MapPin } from 'lucide-react'
import { HealthGradeBadge, StatusPill } from '@/components/health-grade-badge'
import { SaveButton } from '@/components/save-button'
import { GRADE_META, formatDate } from '@/lib/grades'
import type { Restaurant } from '@/lib/types'
import { cn } from '@/lib/utils'

export function RestaurantCard({ restaurant, priority = false }: { restaurant: Restaurant; priority?: boolean }) {
  const meta = GRADE_META[restaurant.grade]

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={restaurant.image || '/placeholder.svg'}
          alt={`Signature dish at ${restaurant.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            {restaurant.cuisine}
          </span>
          <SaveButton id={restaurant.id} name={restaurant.name} className="relative z-10" />
        </div>
        <HealthGradeBadge grade={restaurant.grade} size="lg" className="absolute -bottom-7 right-4 z-10" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 pt-5">
        <div className="pr-16">
          <h3 className="text-lg font-bold leading-snug">
            <Link href={`/restaurants/${restaurant.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {restaurant.name}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">
              {restaurant.locality} · {restaurant.distance} km
            </span>
          </p>
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Health score</span>
            <span className={cn('font-heading text-base font-bold', meta.text)}>{restaurant.healthScore}%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={restaurant.healthScore}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${restaurant.name} health score`}
          >
            <div className={cn('h-full origin-left animate-grow-x rounded-full', meta.bg)} style={{ width: `${restaurant.healthScore}%` }} />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4">
          <div className="flex flex-col gap-1.5">
            <StatusPill grade={restaurant.grade} />
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarCheck className="size-3.5" aria-hidden="true" />
              Inspected {formatDate(restaurant.lastInspectionDate)}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5">
            View Profile
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )
}
