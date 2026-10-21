import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Eye, HeartPulse, Scale, ShieldCheck, Target, Users } from 'lucide-react'
import { HealthGradeBadge } from '@/components/health-grade-badge'
import type { Grade } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About',
  description: 'Kitchen Audit Hub helps people discover restaurant health information in a simple, visual way.',
}

const REASONS = [
  { icon: HeartPulse, title: 'Protects public health', text: 'Regular checks catch unsafe practices before they lead to foodborne illness.' },
  { icon: Eye, title: 'Builds transparency', text: 'Published results let diners make informed choices about where they eat.' },
  { icon: Scale, title: 'Raises standards', text: 'Visible grades motivate kitchens to keep improving their safety practices.' },
]

const GRADES: Grade[] = ['A', 'B', 'C', 'FAILED']

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-2">
        <div className="p-6 sm:p-10">
          <p className="mb-3 text-sm font-semibold text-primary">About Kitchen Audit Hub</p>
          <h1 className="text-balance text-3xl font-extrabold sm:text-5xl">Making Food Safety Easier to Understand</h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            Kitchen Audit Hub helps people discover restaurant health information in a simple, visual way — so you can
            choose where to eat with confidence.
          </p>
          <Link
            href="/restaurants"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore restaurants
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="relative h-64 lg:h-full lg:min-h-[420px]">
          <Image src="/images/hero-kitchen.jpg" alt="A clean, professional restaurant kitchen" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="mission-heading" className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Target className="size-6" aria-hidden="true" />
          </span>
          <h2 id="mission-heading" className="mt-5 text-2xl font-extrabold">Our Mission</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Official inspection reports are often buried in dense PDFs and government portals. We turn them into clear
            grades, scores and plain-language summaries anyone can understand at a glance.
          </p>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {[
              { icon: ShieldCheck, text: 'Data sourced from official inspections' },
              { icon: Users, text: 'Built for diners, families and travellers' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 font-medium">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="how-heading" className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </span>
          <h2 id="how-heading" className="mt-5 text-2xl font-extrabold">How Ratings Work</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Inspectors score six areas — from food handling to pest control — for a total out of 100. That score
            becomes a simple letter grade.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {GRADES.map((g) => (
              <HealthGradeBadge key={g} grade={g} size="lg" />
            ))}
          </div>
          <Link href="/health-ratings" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Learn about each grade
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      </div>

      <section aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-2xl font-extrabold sm:text-3xl">Why Inspections Matter</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl bg-secondary/60 p-6">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
