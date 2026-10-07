'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import { RotateCcw, SearchX } from 'lucide-react'
import { SearchBar } from '@/components/search-bar'
import { FilterSelect } from '@/components/filter-select'
import { RestaurantCard } from '@/components/restaurant-card'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { restaurants } from '@/lib/restaurants'
import {
  CUISINE_OPTIONS,
  DEFAULT_FILTERS,
  GRADE_OPTIONS,
  LOCATION_OPTIONS,
  SCORE_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  activeFilterCount,
  applyFilters,
  type Filters,
} from '@/lib/filters'

export function RestaurantExplorer({ initialQuery = '' }: { initialQuery?: string }) {
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS, query: initialQuery })
  const deferred = useDeferredValue(filters)
  const results = useMemo(() => applyFilters(restaurants, deferred), [deferred])
  const activeCount = activeFilterCount(filters) + (filters.query ? 1 : 0)

  const set = <K extends keyof Filters>(key: K) => (value: Filters[K]) => setFilters((f) => ({ ...f, [key]: value }))
  const reset = () => setFilters(DEFAULT_FILTERS)

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-20 z-20 -mx-4 flex flex-col gap-4 border-b border-border bg-background/90 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <SearchBar
          value={filters.query}
          onChange={set('query')}
          placeholder="Search by name, cuisine, city or area — try “Banjara” or “Indian”"
        />
        <div className="-mx-1 flex items-end gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
          <FilterSelect label="Health Grade" value={filters.grade} options={GRADE_OPTIONS} onChange={set('grade')} />
          <FilterSelect label="Location" value={filters.location} options={LOCATION_OPTIONS} onChange={set('location')} />
          <FilterSelect label="Cuisine" value={filters.cuisine} options={CUISINE_OPTIONS} onChange={set('cuisine')} />
          <FilterSelect label="Inspection Status" value={filters.status} options={STATUS_OPTIONS} onChange={set('status')} />
          <FilterSelect label="Minimum Score" value={filters.minScore} options={SCORE_OPTIONS} onChange={set('minScore')} />
          <FilterSelect label="Sort by" value={filters.sort} options={SORT_OPTIONS} onChange={set('sort')} className="md:ml-auto" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing <span className="font-semibold text-foreground">{results.length}</span> of {restaurants.length} restaurants
        </p>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw aria-hidden="true" />
            Clear filters ({activeCount})
          </Button>
        )}
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No restaurants match your search"
          description="Try a different name, area or cuisine, or loosen a few filters to see more results."
          action={<Button onClick={reset}>Reset all filters</Button>}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((r, i) => (
            <div key={r.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              <RestaurantCard restaurant={r} priority={i < 3} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
