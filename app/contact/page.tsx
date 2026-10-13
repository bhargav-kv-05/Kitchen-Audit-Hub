'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Mail, MapPin, MessageSquare, Phone, Send, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/page-header'
import { LOCALITIES } from '@/lib/restaurants'

export default function ContactPage() {
  const [restaurantName, setRestaurantName] = useState('')
  const [locality, setLocality] = useState(LOCALITIES[0])
  const [category, setCategory] = useState('Unsafe Food Storage / Cold Chain')
  const [details, setDetails] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!restaurantName.trim() || !details.trim()) {
      toast.error('Please provide the restaurant name and observation details.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      toast.success('Inspection Lead Logged!', {
        description: `Thank you for protecting public health. Your report for ${restaurantName} has been recorded for auditor verification.`,
      })
    }, 600)
  }

  const handleReset = () => {
    setRestaurantName('')
    setDetails('')
    setContactEmail('')
    setSubmitted(false)
  }

  return (
    <div className="flex flex-col gap-10 max-w-5xl">
      <PageHeader
        eyebrow="Consumer Action"
        title="Report a Kitchen Concern & Contact Us"
        description="Notice unsafe food handling, pest issues, or hygiene violations in Hyderabad? Help keep consumers safe by submitting an inspection lead."
      />

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Form Section */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-grade-a/10 text-grade-a mb-4">
                <CheckCircle2 className="size-8" />
              </span>
              <h2 className="text-2xl font-bold">Report Submitted Successfully</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                Your report for <span className="font-semibold text-foreground">{restaurantName}</span> has been logged. Our data team reviews consumer leads weekly against official FSSAI / GHMC inspection logs.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <ShieldAlert className="size-5 text-primary" />
                <h2 className="text-lg font-bold">Submit a Hygiene Observation</h2>
              </div>

              <div>
                <label htmlFor="rest-name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Restaurant / Cloud Kitchen Name *
                </label>
                <input
                  id="rest-name"
                  type="text"
                  required
                  placeholder="e.g. Street Wok Express, Pista House, etc."
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="locality-select" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Hyderabad Area *
                  </label>
                  <select
                    id="locality-select"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="category-select" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Concern Category *
                  </label>
                  <select
                    id="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="Unsafe Food Storage / Cold Chain">Food Storage / Cold Chain</option>
                    <option value="Pest Infestation / Rodent Signs">Pest / Rodent Activity</option>
                    <option value="Unsanitary Food Preparation Area">Unsanitary Prep Area</option>
                    <option value="Cross-Contamination Hazard">Cross-Contamination Hazard</option>
                    <option value="Expired Raw Materials">Expired Ingredients</option>
                    <option value="General Hygiene Concern">General Hygiene Concern</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="details" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Detailed Observations *
                </label>
                <textarea
                  id="details"
                  required
                  rows={4}
                  placeholder="Describe what you observed (e.g. ambient chicken thawing, uncleaned grease traps, missing staff gloves, etc.)..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-3.5 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 resize-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Your Email / Phone (Optional for follow-up)
                </label>
                <input
                  id="contact-email"
                  type="text"
                  placeholder="name@example.com or phone number"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="size-4" />
                {isSubmitting ? 'Logging Lead...' : 'Submit Inspection Lead'}
              </button>
            </form>
          )}
        </section>

        {/* Info Column */}
        <div className="flex flex-col gap-6">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-base font-bold flex items-center gap-2">
              <AlertCircle className="size-4 text-primary" />
              How Reports Are Handled
            </h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Kitchen Audit Hub collects consumer reports to identify recurring hygiene risks. We cross-reference reports with municipal food safety schedules to flag kitchens for re-audit.
            </p>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              Direct Contact
            </h3>
            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">General Inquiries:</strong> contact@kitchenaudithub.in
              </p>
              <p>
                <strong className="text-foreground">Auditor Coordination:</strong> audits@kitchenaudithub.in
              </p>
              <p>
                <strong className="text-foreground">City:</strong> Hyderabad, Telangana
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-secondary/50 p-6">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              Emergency Food Safety
            </h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              For acute food poisoning emergencies requiring immediate municipal enforcement, contact the GHMC Food Safety Wing Toll-Free Helpline: <span className="font-semibold text-foreground">040-21111111</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
