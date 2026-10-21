import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { SearchBar } from '@/components/search-bar'
import { HealthGradeBadge } from '@/components/health-grade-badge'

const QUICK = ['Banjara Hills', 'Indian', 'Healthy', 'Jubilee Hills']

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card">
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Verified inspection records
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl xl:text-6xl">
            Know the Kitchen
            <br />
            <span className="text-primary">Before You Order.</span>
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-base text-muted-foreground sm:text-lg">
            Check restaurant health ratings, hygiene scores, and inspection records before ordering food.
          </p>
          <SearchBar size="lg" submitLabel="Search" placeholder="Search a restaurant, area or cuisine" className="mt-8 max-w-xl" />
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Popular:</span>
            {QUICK.map((q) => (
              <Link
                key={q}
                href={`/restaurants?q=${encodeURIComponent(q)}`}
                className="rounded-full border border-border px-3 py-1 font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {q}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative hidden h-full min-h-[420px] lg:block">
          <Image
            src="/images/hero-kitchen.png"
            alt="Chef in a clean professional kitchen carefully plating a dish"
            fill
            priority
            sizes="45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/10 to-transparent" />
          <div className="absolute right-6 bottom-6 flex items-center gap-3 rounded-2xl bg-card/95 p-3 pr-5 shadow-xl backdrop-blur">
            <HealthGradeBadge grade="A" size="md" />
            <div>
              <p className="text-sm font-bold">The Healthy Table</p>
              <p className="text-xs text-muted-foreground">Scored 99% · Inspected Oct 05</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
