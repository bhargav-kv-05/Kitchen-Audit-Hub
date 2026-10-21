import { CUISINES, LOCALITIES } from './restaurants'
import type { Cuisine, Grade, InspectionStatus, Restaurant } from './types'

export type SortKey = 'rating' | 'recent' | 'closest' | 'compliant'

export interface Filters {
  query: string
  grade: Grade | 'all'
  location: string
  cuisine: Cuisine | 'all'
  status: InspectionStatus | 'all'
  minScore: '0' | '70' | '80' | '90' | '95'
  sort: SortKey
}

export const DEFAULT_FILTERS: Filters = {
  query: '',
  grade: 'all',
  location: 'all',
  cuisine: 'all',
  status: 'all',
  minScore: '0',
  sort: 'rating',
}

export const GRADE_OPTIONS = [
  { value: 'all', label: 'All grades' },
  { value: 'A', label: 'Grade A' },
  { value: 'B', label: 'Grade B' },
  { value: 'C', label: 'Grade C' },
  { value: 'FAILED', label: 'Failed' },
] as const

export const LOCATION_OPTIONS = [{ value: 'all', label: 'All locations' }, ...LOCALITIES.map((l) => ({ value: l, label: l }))]

export const CUISINE_OPTIONS = [
  { value: 'all' as const, label: 'All cuisines' },
  ...CUISINES.map((c) => ({ value: c, label: c })),
]

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Needs Improvement', label: 'Needs Improvement' },
  { value: 'Critical', label: 'Critical' },
] as const

export const SCORE_OPTIONS = [
  { value: '0', label: 'Any score' },
  { value: '70', label: '70+' },
  { value: '80', label: '80+' },
  { value: '90', label: '90+' },
  { value: '95', label: '95+' },
] as const

export const SORT_OPTIONS = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'recent', label: 'Recently Inspected' },
  { value: 'closest', label: 'Closest' },
  { value: 'compliant', label: 'Most Compliant' },
] as const

function openViolations(r: Restaurant) {
  return r.violations.filter((v) => v.status !== 'Resolved').length
}

export function matchesQuery(r: Restaurant, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [r.name, r.cuisine, r.city, r.locality, r.address].some((f) => f.toLowerCase().includes(q))
}

export function applyFilters(list: Restaurant[], f: Filters) {
  const min = Number(f.minScore)
  const filtered = list.filter(
    (r) =>
      matchesQuery(r, f.query) &&
      (f.grade === 'all' || r.grade === f.grade) &&
      (f.location === 'all' || r.locality === f.location) &&
      (f.cuisine === 'all' || r.cuisine === f.cuisine) &&
      (f.status === 'all' || r.inspectionStatus === f.status) &&
      r.healthScore >= min,
  )

  return filtered.sort((a, b) => {
    switch (f.sort) {
      case 'recent':
        return b.lastInspectionDate.localeCompare(a.lastInspectionDate)
      case 'closest':
        return a.distance - b.distance
      case 'compliant':
        return openViolations(a) - openViolations(b) || b.healthScore - a.healthScore
      default:
        return b.healthScore - a.healthScore
    }
  })
}

export function activeFilterCount(f: Filters) {
  return (['grade', 'location', 'cuisine', 'status'] as const).filter((k) => f[k] !== 'all').length + (f.minScore !== '0' ? 1 : 0)
}
