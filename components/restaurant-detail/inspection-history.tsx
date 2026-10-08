import { GradeChip } from '@/components/health-grade-badge'
import { StatusBadge } from '@/components/status-badge'
import { formatDate } from '@/lib/grades'
import type { Inspection } from '@/lib/types'

export function InspectionHistory({ history }: { history: Inspection[] }) {
  return (
    <section aria-labelledby="history-heading" className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="p-6 pb-4 sm:px-8">
        <h2 id="history-heading" className="text-xl font-bold">
          Inspection History
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Every official inspection on record, most recent first.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-y border-border bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-6 py-3 sm:pl-8">Date</th>
              <th scope="col" className="px-4 py-3">Inspection Type</th>
              <th scope="col" className="px-4 py-3">Score</th>
              <th scope="col" className="px-4 py-3">Grade</th>
              <th scope="col" className="px-4 py-3">Violations</th>
              <th scope="col" className="px-6 py-3 sm:pr-8">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {history.map((h) => (
              <tr key={h.id} className="transition-colors hover:bg-muted/40">
                <td className="px-6 py-4 font-medium whitespace-nowrap sm:pl-8">{formatDate(h.date)}</td>
                <td className="px-4 py-4">{h.type}</td>
                <td className="px-4 py-4 font-heading font-bold">{h.score}%</td>
                <td className="px-4 py-4">
                  <GradeChip grade={h.grade} />
                </td>
                <td className="px-4 py-4">{h.violations}</td>
                <td className="px-6 py-4 sm:pr-8">
                  <StatusBadge status={h.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
