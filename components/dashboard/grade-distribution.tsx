import Link from 'next/link'
import { GRADE_META } from '@/lib/grades'
import type { Grade } from '@/lib/types'
import { cn } from '@/lib/utils'

const DISTRIBUTION: Array<{ grade: Grade; count: number }> = [
  { grade: 'A', count: 186 },
  { grade: 'B', count: 38 },
  { grade: 'C', count: 17 },
  { grade: 'FAILED', count: 7 },
]
const TOTAL = DISTRIBUTION.reduce((s, d) => s + d.count, 0)

export function GradeDistribution() {
  return (
    <section aria-labelledby="dist-heading" className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 id="dist-heading" className="text-lg font-bold">
          Grade Distribution
        </h2>
        <Link href="/health-ratings" className="text-sm font-semibold text-primary hover:underline">
          Rating guide
        </Link>
      </div>

      <div className="flex h-3 overflow-hidden rounded-full" aria-hidden="true">
        {DISTRIBUTION.map(({ grade, count }) => (
          <div key={grade} className={cn('h-full origin-left animate-grow-x', GRADE_META[grade].bg)} style={{ width: `${(count / TOTAL) * 100}%` }} />
        ))}
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3">
        {DISTRIBUTION.map(({ grade, count }) => {
          const meta = GRADE_META[grade]
          return (
            <li key={grade} className={cn('rounded-xl border p-3', meta.border, meta.soft)}>
              <p className={cn('text-xs font-semibold', meta.text)}>
                Grade {meta.label} · {meta.status}
              </p>
              <p className="mt-1 font-heading text-2xl font-extrabold">
                {count}
                <span className="ml-1 text-xs font-medium text-muted-foreground">{Math.round((count / TOTAL) * 100)}%</span>
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
