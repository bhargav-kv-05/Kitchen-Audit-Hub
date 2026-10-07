import Image from 'next/image'
import Link from 'next/link'
import { CalendarCheck, ChevronLeft, MapPin, Navigation, Utensils } from 'lucide-react'
import { HealthGradeBadge, StatusPill } from '@/components/health-grade-badge'
import { SaveButton } from '@/components/save-button'
import { formatDate } from '@/lib/grades'
import type { Restaurant } from '@/lib/types'

export function DetailHero({ restaurant: r }: { restaurant: Restaurant }) {
  const facts = [
    { icon: Utensils, label: 'Cuisine', value: r.cuisine },
    { icon: MapPin, label: 'Address', value: `${r.address}, ${r.city}` },
    { icon: Navigation, label: 'Distance', value: `${r.distance} km away` },
    { icon: CalendarCheck, label: 'Last Inspection', value: formatDate(r.lastInspectionDate) },
  ]

  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative aspect-[16/9] max-h-[440px] w-full sm:aspect-[21/8]">
        <Image src={r.image || '/placeholder.svg'} alt={`Food served at ${r.name}`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        <Link
          href="/restaurants"
          className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-card/90 px-3 py-1.5 text-sm font-semibold shadow-sm backdrop-blur transition-colors hover:bg-card"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          All restaurants
        </Link>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8">
          <div className="min-w-0 text-white">
            <p className="text-sm font-semibold text-white/80">
              {r.cuisine} · {r.locality}
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-white sm:text-5xl">{r.name}</h1>
          </div>
          <HealthGradeBadge grade={r.grade} size="xl" className="hidden sm:inline-flex" />
          <HealthGradeBadge grade={r.grade} size="lg" className="sm:hidden" />
        </div>
      </div>

      <div className="flex flex-col gap-6 p-5 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <dl className="grid flex-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
                <dd className="text-sm font-semibold">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col items-start gap-1 pr-2">
            <span className="text-xs font-medium text-muted-foreground">Health Score</span>
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl font-extrabold">{r.healthScore}%</span>
              <StatusPill grade={r.grade} />
            </div>
          </div>
          <SaveButton id={r.id} name={r.name} variant="full" />
          <Link
            href={`/map?focus=${r.id}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <MapPin className="size-4" aria-hidden="true" />
            View on Map
          </Link>
        </div>
      </div>
    </section>
  )
}
