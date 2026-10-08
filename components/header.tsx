'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, MapPin, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { toast } from 'sonner'
import { SearchBar } from '@/components/search-bar'
import { LOCALITIES } from '@/lib/restaurants'
import { cn } from '@/lib/utils'

const NOTIFICATIONS = [
  { id: 1, title: 'New inspection: The Healthy Table', body: 'Scored 99% — Grade A', time: '2d ago' },
  { id: 2, title: 'Critical alert: Street Wok', body: 'Failed complaint inspection', time: '2w ago' },
  { id: 3, title: 'Bistro Étoile re-inspected', body: 'Maintained Grade A (96%)', time: '5d ago' },
]

interface HeaderProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onOpenMobile: () => void
}

export function Header({ collapsed, onToggleCollapse, onOpenMobile }: HeaderProps) {
  const [location, setLocation] = useState('Hyderabad')
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!notifOpen) return
    const onPointer = (e: PointerEvent) => {
      if (!notifRef.current?.contains(e.target as Node)) setNotifOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setNotifOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [notifOpen])

  const iconBtn =
    'inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/85 backdrop-blur-md">
      <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={onOpenMobile} className={cn(iconBtn, 'lg:hidden')}>
          <Menu className="size-5" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
        <button type="button" onClick={onToggleCollapse} className={cn(iconBtn, 'hidden lg:inline-flex')}>
          {collapsed ? <PanelLeftOpen className="size-[18px]" aria-hidden="true" /> : <PanelLeftClose className="size-[18px]" aria-hidden="true" />}
          <span className="sr-only">{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
        </button>

        <div className="min-w-0 flex-1 md:max-w-xl">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <label htmlFor="location-select" className="sr-only">
              Select location
            </label>
            <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-primary" aria-hidden="true" />
            <select
              id="location-select"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                toast.success(`Location set to ${e.target.value}`)
              }}
              className="h-10 appearance-none rounded-full border border-border bg-card pr-9 pl-9 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="Hyderabad">Hyderabad</option>
              {LOCALITIES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          </div>

          <div className="relative" ref={notifRef}>
            <button
              type="button"
              className={cn(iconBtn, 'relative')}
              aria-expanded={notifOpen}
              aria-haspopup="true"
              onClick={() => setNotifOpen((o) => !o)}
            >
              <Bell className="size-[18px]" aria-hidden="true" />
              <span className="absolute top-2 right-2.5 size-2 rounded-full bg-grade-f ring-2 ring-card" />
              <span className="sr-only">Notifications, 3 new</span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] origin-top-right animate-in fade-in zoom-in-95 rounded-2xl border border-border bg-popover p-2 shadow-xl">
                <p className="px-3 pt-2 pb-1 text-sm font-semibold">Notifications</p>
                <ul>
                  {NOTIFICATIONS.map((n) => (
                    <li key={n.id} className="rounded-xl px-3 py-2.5 hover:bg-muted">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {n.body} · {n.time}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => toast('Signed in as Aarav Mehta', { description: 'Profile settings are coming soon.' })}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-secondary-foreground ring-2 ring-card transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <span aria-hidden="true">AM</span>
            <span className="sr-only">Account: Aarav Mehta</span>
          </button>
        </div>
      </div>
    </header>
  )
}
