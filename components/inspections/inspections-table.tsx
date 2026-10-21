'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ClipboardX, Search } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { FilterSelect } from '@/components/filter-select'
import { GradeChip } from '@/components/health-grade-badge'
import { StatusBadge } from '@/components/status-badge'
import { GRADE_OPTIONS } from '@/lib/filters'
import { formatDate } from '@/lib/grades'
import { restaurants } from '@/lib/restaurants'
import type { Grade, InspectionOutcome, InspectionType } from '@/lib/types'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 10

const TYPE_OPTIONS = [
  { value: 'all', label: 'All types' },
  { value: 'Routine', label: 'Routine' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'Complaint', label: 'Complaint' },
] as const satisfies ReadonlyArray<{ value: InspectionType | 'all'; label: string }>

const OUTCOME_OPTIONS = [
  { value: 'all', label: 'All outcomes' },
  { value: 'Passed', label: 'Passed' },
  { value: 'Conditional', label: 'Conditional' },
  { value: 'Failed', label: 'Failed' },
] as const satisfies ReadonlyArray<{ value: InspectionOutcome | 'all'; label: string }>

const ALL_INSPECTIONS = restaurants
  .flatMap((r) => r.inspectionHistory.map((inspection) => ({ ...inspection, restaurant: r })))
  .sort((a, b) => b.date.localeCompare(a.date))

export function InspectionsTable() {
  const [query, setQuery] = useState('')
  const [grade, setGrade] = useState<Grade | 'all'>('all')
  const [type, setType] = useState<InspectionType | 'all'>('all')
  const [outcome, setOutcome] = useState<InspectionOutcome | 'all'>('all')
  const [page, setPage] = useState(1)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL_INSPECTIONS.filter(
      (i) =>
        (!q || i.restaurant.name.toLowerCase().includes(q) || i.restaurant.locality.toLowerCase().includes(q)) &&
        (grade === 'all' || i.grade === grade) &&
        (type === 'all' || i.type === type) &&
        (outcome === 'all' || i.status === outcome),
    )
  }, [query, grade, type, outcome])

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const pageRows = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  const resetPage = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v)
    setPage(1)
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-6 lg:flex-row lg:items-end">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="inspection-search" className="text-xs font-semibold text-muted-foreground">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="inspection-search"
              type="search"
              value={query}
              onChange={(e) => resetPage(setQuery)(e.target.value)}
              placeholder="Restaurant or locality"
              className="h-10 w-full rounded-xl border border-border bg-card pr-3 pl-9 text-sm shadow-xs outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>
        </div>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 lg:pb-0">
          <FilterSelect label="Grade" value={grade} options={GRADE_OPTIONS} onChange={resetPage(setGrade)} />
          <FilterSelect label="Type" value={type} options={TYPE_OPTIONS} onChange={resetPage(setType)} />
          <FilterSelect label="Outcome" value={outcome} options={OUTCOME_OPTIONS} onChange={resetPage(setOutcome)} />
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="p-6">
          <EmptyState icon={ClipboardX} title="No inspections match" description="Try clearing a filter or searching for a different restaurant." />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <caption className="sr-only">Latest inspections, page {current} of {pageCount}</caption>
            <thead className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">Restaurant</th>
                <th scope="col" className="px-4 py-3">Inspection Date</th>
                <th scope="col" className="px-4 py-3">Type</th>
                <th scope="col" className="px-4 py-3">Score</th>
                <th scope="col" className="px-4 py-3">Grade</th>
                <th scope="col" className="px-4 py-3">Violations</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pageRows.map((i) => (
                <tr key={`${i.restaurant.id}-${i.id}`} className="transition-colors hover:bg-muted/40">
                  <td className="px-6 py-3">
                    <Link href={`/restaurants/${i.restaurant.id}`} className="flex items-center gap-3 font-semibold hover:text-primary">
                      <span className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                        <Image src={i.restaurant.image || '/placeholder.svg'} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                      <span>
                        <span className="block">{i.restaurant.name}</span>
                        <span className="block text-xs font-normal text-muted-foreground">{i.restaurant.locality}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(i.date)}</td>
                  <td className="px-4 py-3">{i.type}</td>
                  <td className="px-4 py-3 font-heading font-bold">{i.score}%</td>
                  <td className="px-4 py-3">
                    <GradeChip grade={i.grade} />
                  </td>
                  <td className="px-4 py-3">{i.violations}</td>
                  <td className="px-6 py-3">
                    <StatusBadge status={i.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <nav aria-label="Pagination" className="flex flex-col items-center justify-between gap-3 border-t border-border p-4 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{rows.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}</span>–
          <span className="font-semibold text-foreground">{Math.min(current * PAGE_SIZE, rows.length)}</span> of{' '}
          <span className="font-semibold text-foreground">{rows.length}</span> inspections
        </p>
        <div className="flex items-center gap-1">
          <PageButton label="Previous page" disabled={current === 1} onClick={() => setPage(current - 1)}>
            <ChevronLeft className="size-4" aria-hidden="true" />
          </PageButton>
          {Array.from({ length: pageCount }, (_, n) => n + 1).map((n) => (
            <PageButton key={n} label={`Page ${n}`} active={n === current} onClick={() => setPage(n)}>
              {n}
            </PageButton>
          ))}
          <PageButton label="Next page" disabled={current === pageCount} onClick={() => setPage(current + 1)}>
            <ChevronRight className="size-4" aria-hidden="true" />
          </PageButton>
        </div>
      </nav>
    </div>
  )
}

function PageButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40',
        active && 'bg-primary text-primary-foreground hover:bg-primary/90',
      )}
    >
      {children}
    </button>
  )
}
