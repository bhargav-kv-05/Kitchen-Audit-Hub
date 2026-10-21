'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, MapPin, Navigation, X } from 'lucide-react'
import { FilterSelect } from '@/components/filter-select'
import { HealthGradeBadge, StatusPill } from '@/components/health-grade-badge'
import { GRADE_OPTIONS, LOCATION_OPTIONS } from '@/lib/filters'
import { GRADE_META } from '@/lib/grades'
import { restaurants, LOCALITIES } from '@/lib/restaurants'
import type { Grade, Restaurant } from '@/lib/types'
import { cn } from '@/lib/utils'

// Dynamic import for Leaflet map to guarantee zero SSR hydration issues
const RealMap = dynamic(() => import('@/components/map/real-map').then((mod) => mod.RealMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[440px] sm:min-h-[520px] w-full items-center justify-center rounded-2xl border border-border bg-card">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <span className="size-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
        <p className="text-sm font-semibold">Loading Hyderabad Interactive Map...</p>
      </div>
    </div>
  ),
})

export function RestaurantMap() {
  const focus = useSearchParams().get('focus')
  const [selectedId, setSelectedId] = useState<string | null>(
    focus && restaurants.some((r) => r.id === focus) ? focus : null,
  )
  const [grade, setGrade] = useState<Grade | 'all'>('all')
  const [locality, setLocality] = useState<string>('all')

  const visible = useMemo(
    () =>
      restaurants
        .filter((r) => (grade === 'all' || r.grade === grade) && (locality === 'all' || r.locality === locality))
        .sort((a, b) => a.distance - b.distance),
    [grade, locality],
  )

  const selected = restaurants.find((r) => r.id === selectedId) ?? null

  return (
    <div className="flex flex-col gap-4">
      {/* Locality Quick-Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        <button
          type="button"
          onClick={() => setLocality('all')}
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all',
            locality === 'all'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'border border-border bg-card text-foreground hover:bg-muted'
          )}
        >
          <MapPin className="size-3" />
          All Hyderabad ({restaurants.length})
        </button>
        {LOCALITIES.map((loc) => {
          const count = restaurants.filter((r) => r.locality === loc).length
          return (
            <button
              key={loc}
              type="button"
              onClick={() => setLocality(loc)}
              className={cn(
                'inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all',
                locality === loc
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'border border-border bg-card text-foreground hover:bg-muted'
              )}
            >
              {loc} ({count})
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 lg:h-[calc(100dvh-15rem)] lg:min-h-[580px] lg:grid-cols-[minmax(300px,380px)_1fr]">
        {/* Left Sidebar Restaurant List */}
        <aside className="order-2 flex min-h-0 flex-col rounded-2xl border border-border bg-card shadow-sm lg:order-1">
          <div className="flex items-end justify-between gap-3 border-b border-border p-4">
            <div>
              <p className="text-sm font-bold">{visible.length} Food Places</p>
              <p className="text-xs text-muted-foreground">Click any to zoom in</p>
            </div>
            <FilterSelect label="Grade" value={grade} options={GRADE_OPTIONS} onChange={setGrade} className="w-36" />
          </div>

          <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2" aria-label="Restaurants on the map">
            {visible.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(r.id)}
                  aria-pressed={r.id === selectedId}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                    r.id === selectedId && 'bg-secondary ring-1 ring-primary/30',
                  )}
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                    <Image src={r.image || '/placeholder.svg'} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{r.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {r.cuisine} · {r.locality}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Navigation className="size-3" aria-hidden="true" />
                      {r.distance} km · {r.healthScore}%
                    </span>
                  </span>
                  <HealthGradeBadge grade={r.grade} size="sm" />
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Real Interactive Map View */}
        <section
          aria-label="Map of restaurants"
          className="relative order-1 h-[460px] overflow-hidden rounded-2xl border border-border shadow-sm sm:h-[540px] lg:order-2 lg:h-auto"
        >
          <RealMap
            restaurants={visible}
            selectedId={selectedId}
            onSelect={setSelectedId}
            activeLocality={locality}
          />

          {/* Floating Selected Restaurant Popup Card */}
          {selected && <MapPopup restaurant={selected} onClose={() => setSelectedId(null)} />}

          {/* Map Legend */}
          <MapLegend />
        </section>
      </div>
    </div>
  )
}

function MapPopup({ restaurant: r, onClose }: { restaurant: Restaurant; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label={r.name}
      className="absolute inset-x-3 bottom-3 z-[500] animate-fade-up overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:inset-x-auto sm:bottom-auto sm:top-4 sm:left-4 sm:w-80"
    >
      <div className="relative h-32">
        <Image src={r.image || '/placeholder.svg'} alt={`Food at ${r.name}`} fill sizes="320px" className="object-cover" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-full bg-card/90 shadow-sm backdrop-blur hover:bg-card"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
        <HealthGradeBadge grade={r.grade} size="md" className="absolute -bottom-5 left-4 shadow-md ring-2 ring-card" />
      </div>
      <div className="p-4 pt-7">
        <h3 className="font-heading text-lg font-bold">{r.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {r.cuisine} · {r.address}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/50 pt-2.5">
          <StatusPill grade={r.grade} />
          <span className="text-xs font-semibold">
            {r.healthScore}% · {r.distance} km
          </span>
        </div>
        <Link
          href={`/restaurants/${r.id}`}
          className="mt-3.5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-primary text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-sm"
        >
          View Full Audit &amp; AI Summary
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function MapLegend() {
  return (
    <div className="absolute right-4 bottom-4 z-[400] hidden rounded-xl border border-border bg-card/95 p-3 shadow-md backdrop-blur sm:block">
      <p className="mb-2 text-xs font-semibold text-muted-foreground">Hygiene Grade</p>
      <ul className="flex flex-col gap-1.5">
        {(Object.keys(GRADE_META) as Grade[]).map((g) => (
          <li key={g} className="flex items-center gap-2 text-xs font-medium">
            <span className={cn('size-3 rounded-full', GRADE_META[g].bg)} aria-hidden="true" />
            {g === 'FAILED' ? 'Failed' : g} · {GRADE_META[g].status}
          </li>
        ))}
      </ul>
    </div>
  )
}
