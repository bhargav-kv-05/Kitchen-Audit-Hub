'use client'

import { useEffect, useState } from 'react'
import { Bell, Check, Database, Laptop, MapPin, Moon, RefreshCw, ShieldAlert, Sliders, Sun } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/page-header'
import { LOCALITIES } from '@/lib/restaurants'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const [defaultLocality, setDefaultLocality] = useState('All Locations')
  const [minScore, setMinScore] = useState('0')
  const [highlightHighRisk, setHighlightHighRisk] = useState(true)
  const [verifiedOnly, setVerifiedOnly] = useState(true)
  const [savedLocally, setSavedLocally] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('system')

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'system'
    setCurrentTheme(stored)
  }, [])

  const handleThemeChange = (t: string) => {
    setCurrentTheme(t)
    localStorage.setItem('theme', t)
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (t === 'dark' || (t === 'system' && prefersDark)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    toast.success(`Theme set to ${t.charAt(0).toUpperCase() + t.slice(1)}`)
  }

  const handleSave = () => {
    setSavedLocally(true)
    toast.success('Consumer preferences saved', {
      description: 'Your default filters and safety display settings have been updated.',
    })
    setTimeout(() => setSavedLocally(false), 2000)
  }

  const handleResetFilters = () => {
    setDefaultLocality('All Locations')
    setMinScore('0')
    setHighlightHighRisk(true)
    setVerifiedOnly(true)
    toast('Preferences reset to default values')
  }

  const handleClearCache = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear()
        sessionStorage.clear()
      } catch (e) {
        console.error(e)
      }
    }
    toast.success('Search cache cleared successfully')
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <PageHeader
        eyebrow="Preferences"
        title="Settings & Display Preferences"
        description="Configure your default search parameters, hygiene alert badges, and local transparency settings."
      />

      <div className="flex flex-col gap-6">
        {/* Locality & Discovery Defaults */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold">Default Search & Discovery</h2>
              <p className="text-xs text-muted-foreground">Customize how the restaurant explorer opens by default.</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="pref-locality" className="block text-sm font-semibold mb-2">
                Default Hyderabad Locality
              </label>
              <select
                id="pref-locality"
                value={defaultLocality}
                onChange={(e) => setDefaultLocality(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="All Locations">All Locations (Hyderabad Citywide)</option>
                {LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-muted-foreground">Filters directory and maps to this locality on start.</p>
            </div>

            <div>
              <label htmlFor="pref-min-score" className="block text-sm font-semibold mb-2">
                Minimum Baseline Score
              </label>
              <select
                id="pref-min-score"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-background px-3.5 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="0">Any Score (Show All Places)</option>
                <option value="70">70+ (Conditional Pass or Better)</option>
                <option value="80">80+ (Grade B or Higher)</option>
                <option value="90">90+ (Grade A Only)</option>
              </select>
              <p className="mt-1.5 text-xs text-muted-foreground">Automatically filters out scores below this threshold.</p>
            </div>
          </div>
        </section>

        {/* Theme & Appearance Section */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sun className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold">Theme & Appearance</h2>
              <p className="text-xs text-muted-foreground">Select your preferred color theme for the portal.</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { id: 'light', label: 'Light Mode', icon: Sun },
              { id: 'dark', label: 'Dark Mode', icon: Moon },
              { id: 'system', label: 'System Default', icon: Laptop },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleThemeChange(id)}
                className={cn(
                  'flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-sm font-semibold',
                  currentTheme === id
                    ? 'border-primary bg-primary/10 text-primary shadow-sm'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Safety & Warning Alerts */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldAlert className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold">Health Safety & Warning Badges</h2>
              <p className="text-xs text-muted-foreground">Control visibility of critical violations and alerts.</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-start justify-between gap-4 p-3.5 rounded-2xl hover:bg-muted/50 cursor-pointer transition-colors border border-border/50">
              <div>
                <span className="text-sm font-semibold text-foreground">Highlight High-Risk Establishments</span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Display prominent alert banners on restaurants with Grade C or Failed inspection records.
                </p>
              </div>
              <input
                type="checkbox"
                checked={highlightHighRisk}
                onChange={(e) => setHighlightHighRisk(e.target.checked)}
                className="mt-1 size-4 rounded accent-primary cursor-pointer"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-3.5 rounded-2xl hover:bg-muted/50 cursor-pointer transition-colors border border-border/50">
              <div>
                <span className="text-sm font-semibold text-foreground">Official Audit Verification Filter</span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Require official FSSAI / GHMC municipal inspection certificates for ratings display.
                </p>
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="mt-1 size-4 rounded accent-primary cursor-pointer"
              />
            </label>
          </div>
        </section>

        {/* Cache & Local Storage */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Database className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold">Local Storage & Privacy</h2>
              <p className="text-xs text-muted-foreground">Manage data cached on this browser device.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-xs font-semibold hover:bg-muted transition-colors"
            >
              <RefreshCw className="size-3.5" />
              Reset All Filters
            </button>
            <button
              type="button"
              onClick={handleClearCache}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
            >
              Clear Local Cache
            </button>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            {savedLocally ? <Check className="size-4" /> : null}
            {savedLocally ? 'Saved!' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  )
}
