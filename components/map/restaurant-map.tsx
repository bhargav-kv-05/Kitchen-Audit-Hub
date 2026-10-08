'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, LocateFixed, Minus, Navigation, Plus, X } from 'lucide-react'
import { FilterSelect } from '@/components/filter-select'
import { HealthGradeBadge, StatusPill } from '@/components/health-grade-badge'
import { MapCanvas } from '@/components/map/map-canvas'
import { GRADE_OPTIONS } from '@/lib/filters'
import { GRADE_META } from '@/lib/grades'
import { restaurants } from '@/lib/restaurants'
import type { Grade, Restaurant } from '@/lib/types'
import { cn } from '@/lib/utils'

const ZOOM_LEVELS = [1, 1.25, 1.5]

export function RestaurantMap() {
  const focus = useSearchParams().get('focus')
  const [selectedId, setSelectedId] = useState<string | null>(
    focus && restaurants.some((r) => r.id === focus) ? focus : null,
  )
  const [grade, setGrade] = useState<Grade | 'all'>('all')
  const [zoom, setZoom] = useState(0)

  const visible = useMemo(
    () =>
      restaurants
        .filter((r) => grade === 'all' || r.grade === grade)
        .sort((a, b) => a.distance - b.distance),
    [grade],
  )
  const selected = visible.find((r) => r.id === selectedId) ?? null

  return (
    <div className="grid gap-6 lg:h-[calc(100dvh-13rem)] lg:min-h-[560px] lg:grid-cols-[minmax(300px,380px)_1fr]">
      <aside className="order-2 flex min-h-0 flex-col rounded-2xl border border-border bg-card shadow-sm lg:order-1">
        <div className="flex items-end justify-between gap-3 border-b border-border p-4">
          <p className="pb-2 text-sm font-semibold">
            {visible.length} nearby
          </p>
          <FilterSelect label="Grade" value={grade} options={GRADE_OPTIONS} onChange={setGrade} className="w-40" />
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
                  r.id === selectedId && 'bg-secondary hover:bg-secondary',
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

      <section
        aria-label="Map of restaurants"
        className="relative order-1 h-[440px] overflow-hidden rounded-2xl border border-border shadow-sm sm:h-[520px] lg:order-2 lg:h-auto"
      >
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `scale(${ZOOM_LEVELS[zoom]})`, transformOrigin: selected ? `${selected.mapPosition.x}% ${selected.mapPosition.y}%` : 'center' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedId(null)
          }}
        >
          <MapCanvas />
          <div className="absolute top-[50%] left-[47%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
            <span className="absolute inset-0 size-5 animate-ping rounded-full bg-primary/40" />
            <span className="relative block size-5 rounded-full border-[3px] border-white bg-primary shadow-md" />
          </div>
          {visible.map((r) => (
            <Marker key={r.id} restaurant={r} active={r.id === selectedId} onSelect={() => setSelectedId(r.id === selectedId ? null : r.id)} />
          ))}
        </div>

        {selected && <MapPopup restaurant={selected} onClose={() => setSelectedId(null)} />}

        <div className="absolute top-4 right-4 flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md">
          <MapControl label="Zoom in" disabled={zoom === ZOOM_LEVELS.length - 1} onClick={() => setZoom((z) => Math.min(z + 1, ZOOM_LEVELS.length - 1))}>
            <Plus className="size-4" />
          </MapControl>
          <MapControl label="Zoom out" disabled={zoom === 0} onClick={() => setZoom((z) => Math.max(z - 1, 0))}>
            <Minus className="size-4" />
          </MapControl>
          <MapControl
            label="Reset view"
            onClick={() => {
              setZoom(0)
              setSelectedId(null)
            }}
          >
            <LocateFixed className="size-4" />
          </MapControl>
        </div>

        <MapLegend />
      </section>
    </div>
  )
}

function Marker({ restaurant: r, active, onSelect }: { restaurant: Restaurant; active: boolean; onSelect: () => void }) {
  const meta = GRADE_META[r.grade]
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${r.name}, grade ${meta.label}`}
      aria-pressed={active}
      className={cn(
        'group absolute -translate-x-1/2 -translate-y-full transition-transform focus-visible:outline-none',
        active ? 'z-20 scale-125' : 'z-10 hover:scale-110',
      )}
      style={{ left: `${r.mapPosition.x}%`, top: `${r.mapPosition.y}%` }}
    >
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-full rounded-br-none border-[3px] border-white font-heading text-xs font-extrabold text-white shadow-lg rotate-45 group-focus-visible:ring-4 group-focus-visible:ring-ring/50',
          meta.bg,
          r.grade === 'B' && 'text-grade-b-foreground',
        )}
      >
        <span className="-rotate-45">{r.grade === 'FAILED' ? 'F' : r.grade}</span>
      </span>
    </button>
  )
}

function MapPopup({ restaurant: r, onClose }: { restaurant: Restaurant; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label={r.name}
      className="absolute inset-x-3 bottom-3 z-30 animate-fade-up overflow-hidden rounded-2xl border border-border bg-card shadow-xl sm:inset-x-auto sm:bottom-auto sm:top-4 sm:left-4 sm:w-80"
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
        <HealthGradeBadge grade={r.grade} size="md" className="absolute -bottom-5 left-4" />
      </div>
      <div className="p-4 pt-7">
        <h3 className="font-heading text-lg font-bold">{r.name}</h3>
        <p className="text-sm text-muted-foreground">
          {r.cuisine} · {r.address}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <StatusPill grade={r.grade} />
          <span className="text-sm font-semibold">
            {r.healthScore}% · {r.distance} km
          </span>
        </div>
        <Link
          href={`/restaurants/${r.id}`}
          className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View details
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function MapControl({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-10 items-center justify-center border-b border-border last:border-0 hover:bg-muted disabled:opacity-40"
    >
      {children}
    </button>
  )
}

function MapLegend() {
  return (
    <div className="absolute right-4 bottom-4 hidden rounded-xl border border-border bg-card/95 p-3 shadow-md backdrop-blur sm:block">
      <p className="mb-2 text-xs font-semibold text-muted-foreground">Health grade</p>
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
