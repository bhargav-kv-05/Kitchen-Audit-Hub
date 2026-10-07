import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GradeChip } from '@/components/health-grade-badge'
import { formatDate } from '@/lib/grades'
import { restaurants } from '@/lib/restaurants'

export function RecentInspections() {
  const recent = [...restaurants]
    .sort((a, b) => b.lastInspectionDate.localeCompare(a.lastInspectionDate))
    .slice(0, 5)

  return (
    <section aria-labelledby="recent-heading" className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="recent-heading" className="text-lg font-bold">
          Latest Inspections
        </h2>
        <Link href="/inspections" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View all <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <ul className="divide-y divide-border">
        {recent.map((r) => (
          <li key={r.id}>
            <Link href={`/restaurants/${r.id}`} className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted">
              <GradeChip grade={r.grade} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{r.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {r.inspectionHistory[0].type} · {formatDate(r.lastInspectionDate)}
                </p>
              </div>
              <span className="font-heading text-sm font-bold">{r.healthScore}%</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
