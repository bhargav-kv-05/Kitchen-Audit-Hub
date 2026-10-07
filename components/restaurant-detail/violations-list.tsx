import { ShieldCheck } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { formatDate } from '@/lib/grades'
import type { Violation } from '@/lib/types'
import { cn } from '@/lib/utils'

const ACCENT = { Resolved: 'bg-grade-a', Open: 'bg-grade-c', Critical: 'bg-grade-f' }

export function ViolationsList({ violations }: { violations: Violation[] }) {
  const open = violations.filter((v) => v.status !== 'Resolved').length

  return (
    <section aria-labelledby="violations-heading" className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="violations-heading" className="text-xl font-bold">
            Violations
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {violations.length} recorded · {open === 0 ? 'all resolved' : `${open} still open`}
          </p>
        </div>
      </div>

      {violations.length === 0 ? (
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-grade-a/10 p-4 text-sm font-medium text-grade-a">
          <ShieldCheck className="size-5" aria-hidden="true" />
          No violations on record.
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {violations.map((v) => (
            <li key={v.id} className="relative flex gap-4 overflow-hidden rounded-xl border border-border p-4 pl-5">
              <span className={cn('absolute inset-y-0 left-0 w-1', ACCENT[v.status])} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{v.title}</h3>
                  <StatusBadge status={v.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">Noted {formatDate(v.date)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
