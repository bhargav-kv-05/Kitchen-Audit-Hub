import type { Metadata } from 'next'
import { Bug, ClipboardList, Hand, Refrigerator, Search, Sparkles, Stamp, Thermometer, UserCheck } from 'lucide-react'
import { HealthGradeBadge } from '@/components/health-grade-badge'
import { PageHeader } from '@/components/page-header'
import { GRADE_META } from '@/lib/grades'
import { restaurants } from '@/lib/restaurants'
import type { Grade } from '@/lib/types'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Health Ratings',
  description: 'Learn what A, B, C and Failed health grades mean and how restaurants are evaluated.',
}

const CRITERIA = [
  { icon: Hand, title: 'Food Handling', text: 'Safe preparation, cross-contamination prevention and use of clean utensils.' },
  { icon: Sparkles, title: 'Kitchen Hygiene', text: 'Cleanliness of surfaces, equipment, floors and dishwashing areas.' },
  { icon: Refrigerator, title: 'Food Storage', text: 'Proper labelling, separation of raw and cooked food, and stock rotation.' },
  { icon: Thermometer, title: 'Temperature Control', text: 'Cold food below 5°C, hot food above 60°C, and accurate thermometers.' },
  { icon: Bug, title: 'Pest Control', text: 'No signs of pests, sealed entry points and a documented control plan.' },
  { icon: UserCheck, title: 'Employee Hygiene', text: 'Handwashing, clean uniforms, hair restraints and staff health checks.' },
]

const STEPS = [
  { icon: ClipboardList, title: 'Unannounced visit', text: 'Inspectors arrive without notice to see everyday conditions.' },
  { icon: Search, title: 'Six-area check', text: 'Each area is scored and violations are recorded with evidence.' },
  { icon: Stamp, title: 'Grade issued', text: 'The overall score maps to a grade that is published here.' },
]

const GRADES: Grade[] = ['A', 'B', 'C', 'FAILED']

export default function HealthRatingsPage() {
  const counts = GRADES.map((g) => restaurants.filter((r) => r.grade === g).length)

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        eyebrow="Health Ratings"
        title="Understanding Health Ratings"
        description="Every restaurant receives a letter grade based on its most recent official inspection score."
      />

      <section aria-label="Grade scale" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {GRADES.map((g, i) => {
          const meta = GRADE_META[g]
          return (
            <article
              key={g}
              className={cn('relative flex flex-col overflow-hidden rounded-3xl border bg-card p-6 shadow-sm', meta.border)}
            >
              <div className={cn('absolute inset-x-0 top-0 h-1.5', meta.bg)} aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <HealthGradeBadge grade={g} size="xl" />
                <span className={cn('rounded-full px-3 py-1 font-heading text-sm font-bold', meta.soft, meta.text)}>{meta.range}</span>
              </div>
              <h2 className="mt-6 text-2xl font-extrabold">{meta.status}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{meta.description}</p>
              <p className="mt-5 border-t border-border pt-4 text-sm font-medium">
                <span className="font-heading font-bold">{counts[i]}</span> restaurants currently rated {g === 'FAILED' ? 'Failed' : g}
              </p>
            </article>
          )
        })}
      </section>

      <section aria-labelledby="eval-heading" className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <h2 id="eval-heading" className="text-2xl font-extrabold sm:text-3xl">
          How restaurants are evaluated
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Inspectors score six key areas. Together they make up the overall health score out of 100.
        </p>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex gap-4 rounded-2xl bg-secondary/60 p-5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-primary">Step {i + 1}</p>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-border p-5 transition-shadow hover:shadow-md">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
