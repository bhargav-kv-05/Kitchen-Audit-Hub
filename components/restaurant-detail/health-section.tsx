import { Bug, Hand, Refrigerator, Sparkles, Thermometer, UserCheck } from 'lucide-react'
import { ScoreRing } from '@/components/score-ring'
import { StatusPill } from '@/components/health-grade-badge'
import { GRADE_META, gradeFromScore } from '@/lib/grades'
import { CATEGORY_LABELS } from '@/lib/restaurants'
import type { CategoryScores, Restaurant } from '@/lib/types'
import { cn } from '@/lib/utils'

const ICONS: Record<keyof CategoryScores, typeof Hand> = {
  foodHandling: Hand,
  kitchenHygiene: Sparkles,
  temperatureControl: Thermometer,
  foodStorage: Refrigerator,
  pestControl: Bug,
  employeeHygiene: UserCheck,
}

export function HealthSection({ restaurant }: { restaurant: Restaurant }) {
  const meta = GRADE_META[restaurant.grade]
  const entries = Object.entries(restaurant.categories) as Array<[keyof CategoryScores, number]>

  return (
    <section aria-labelledby="health-heading" className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h2 id="health-heading" className="text-xl font-bold">
        Health &amp; Safety
      </h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className={cn('flex flex-col items-center gap-3 rounded-2xl p-6 text-center', meta.soft)}>
          <p className="text-sm font-semibold text-muted-foreground">Overall Health Score</p>
          <ScoreRing score={restaurant.healthScore} grade={restaurant.grade} />
          <StatusPill grade={restaurant.grade} className="text-sm" />
        </div>

        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {entries.map(([key, value], i) => {
            const Icon = ICONS[key]
            const barMeta = GRADE_META[gradeFromScore(value)]
            return (
              <li key={key}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {CATEGORY_LABELS[key]}
                  </span>
                  <span className="font-heading text-sm font-bold">{value}%</span>
                </div>
                <div
                  className="h-2.5 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-label={CATEGORY_LABELS[key]}
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={cn('h-full origin-left animate-grow-x rounded-full', barMeta.bg)}
                    style={{ width: `${value}%`, animationDelay: `${i * 90}ms` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
