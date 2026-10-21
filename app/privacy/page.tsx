import type { Metadata } from 'next'
import { EyeOff, FileText, Lock, RefreshCw, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Transparency',
  description: 'Understand how Kitchen Audit Hub handles public hygiene inspection records and protects consumer privacy.',
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-10 max-w-4xl">
      <PageHeader
        eyebrow="Transparency & Trust"
        title="Privacy Policy & Public Data Disclosure"
        description="Kitchen Audit Hub is designed to make public health inspection data transparent, accessible, and respectful of consumer privacy."
      />

      <div className="flex flex-col gap-6">
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </span>
            <h2 className="text-lg font-bold">1. Public Health Inspection Data</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All inspection scores, letter grades, and violation summaries displayed on Kitchen Audit Hub are derived from official municipal health inspection reports and public food safety audits (such as FSSAI &amp; GHMC public health drives in Hyderabad).
          </p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Our mission is consumer transparency: translating dense bureaucratic PDF logs and complex violation matrices into plain-language ratings so everyday consumers can order food with confidence.
          </p>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <EyeOff className="size-5" />
            </span>
            <h2 className="text-lg font-bold">2. Zero Consumer Tracking</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We believe that checking whether a restaurant is clean should never require sacrificing your personal privacy:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>We do not require consumer accounts, logins, or social profile integration.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>We do not use invasive third-party tracking pixels or advertising trackers.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Your search queries and filter selections are processed ephemerally on-demand.</span>
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lock className="size-5" />
            </span>
            <h2 className="text-lg font-bold">3. Local Device Preferences</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Any settings you customize (such as your preferred Hyderabad locality, minimum health score thresholds, or notification read status) are stored exclusively in your browser&apos;s local storage. This data never leaves your device.
          </p>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <RefreshCw className="size-5" />
            </span>
            <h2 className="text-lg font-bold">4. Restaurant Re-Audits &amp; Corrections</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Kitchen Audit Hub strongly encourages continuous hygiene improvements. If a restaurant has resolved citations from a previous inspection (e.g. repaired refrigeration units, replaced grease traps, or received a clean follow-up audit), managers may submit verified re-inspection certificates for expedited record updates.
          </p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Contact <strong className="text-foreground">audits@kitchenaudithub.in</strong> with your official municipal inspection certificate number.
          </p>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="size-5" />
            </span>
            <h2 className="text-lg font-bold">5. Updates &amp; Contact</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This policy was last updated in October 2026. For questions regarding public data disclosures or our consumer privacy standards, write to us at <strong className="text-foreground">privacy@kitchenaudithub.in</strong>.
          </p>
        </section>
      </div>
    </div>
  )
}
