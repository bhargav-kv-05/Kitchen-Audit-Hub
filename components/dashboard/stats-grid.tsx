import { AlertTriangle, Award, ClipboardCheck, Store } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATS = [
  { label: 'Total Restaurants', value: '248', note: '+12 this month', icon: Store, tone: 'bg-secondary text-primary' },
  { label: 'Grade A Restaurants', value: '186', note: '75% of all listings', icon: Award, tone: 'bg-grade-a/10 text-grade-a' },
  { label: 'Recent Inspections', value: '42', note: 'In the last 30 days', icon: ClipboardCheck, tone: 'bg-grade-b/15 text-grade-b-foreground' },
  { label: 'Average Health Score', value: '94%', note: 'Up 2.1% from last quarter', icon: AlertTriangle, tone: 'bg-grade-c/10 text-grade-c' },
]

export function StatsGrid() {
  return (
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        Platform statistics
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ label, value, note, icon: Icon, tone }, i) => (
          <li
            key={label}
            className="flex animate-fade-up items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className={cn('inline-flex size-12 shrink-0 items-center justify-center rounded-xl', tone)}>
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <p className="mt-0.5 font-heading text-3xl font-extrabold tracking-tight">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{note}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
