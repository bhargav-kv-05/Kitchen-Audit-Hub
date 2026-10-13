'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Bell, Check, ChevronDown, MapPin, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { toast } from 'sonner'
import { SearchBar } from '@/components/search-bar'
import { ThemeToggle } from '@/components/theme-toggle'
import { LOCALITIES } from '@/lib/restaurants'
import { cn } from '@/lib/utils'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Critical Alert: Street Wok Express',
    body: 'Failed hygiene audit (56%) in Gachibowli — Urgent corrective action ordered',
    time: '2h ago',
    href: '/restaurants/street-wok-express-gachibowli',
    unread: true,
    tone: 'text-grade-f',
  },
  {
    id: 2,
    title: 'Top Hygiene Rating: Conçu Patisserie',
    body: 'Scored 99% (Grade A) in Jubilee Hills — Exemplary cold-chain standards',
    time: '1d ago',
    href: '/restaurants/concu-jubilee-hills',
    unread: true,
    tone: 'text-grade-a',
  },
  {
    id: 3,
    title: 'Inspection Notice: Shah Ghouse',
    body: 'Scored 76% (Grade C) — Conditional pass with sanitation improvement notice',
    time: '2d ago',
    href: '/restaurants/shah-ghouse-gachibowli',
    unread: true,
    tone: 'text-grade-c',
  },
  {
    id: 4,
    title: 'Audit Verified: Tatva Fine Dining',
    body: 'Maintained Grade A (98%) in Jubilee Hills — Zero food safety citations',
    time: '3d ago',
    href: '/restaurants/tatva-jubilee-hills',
    unread: false,
    tone: 'text-grade-a',
  },
]

interface HeaderProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onOpenMobile: () => void
}

export function Header({ collapsed, onToggleCollapse, onOpenMobile }: HeaderProps) {
  const [location, setLocation] = useState('Hyderabad')
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const notifRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
    toast.success('All notifications marked as read')
  }

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
          <ThemeToggle />

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
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2.5 size-2 rounded-full bg-grade-f ring-2 ring-card" />
              )}
              <span className="sr-only">Notifications, {unreadCount} unread</span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-88 max-w-[calc(100vw-2rem)] origin-top-right animate-in fade-in zoom-in-95 rounded-2xl border border-border bg-popover p-2 shadow-xl">
                <div className="flex items-center justify-between px-3 pt-2 pb-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">Hygiene Alerts</p>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-grade-f/15 px-2 py-0.5 text-[11px] font-semibold text-grade-f">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <ul className="mt-1 divide-y divide-border/40">
                  {notifications.map((n) => (
                    <li key={n.id}>
                      <Link
                        href={n.href}
                        onClick={() => setNotifOpen(false)}
                        className={cn(
                          'block rounded-xl px-3 py-2.5 transition-colors hover:bg-muted',
                          n.unread && 'bg-primary/5'
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn('text-xs font-bold', n.tone)}>{n.title}</p>
                          <span className="shrink-0 text-[10px] text-muted-foreground">{n.time}</span>
                        </div>
                        <p className="mt-1 text-xs text-foreground/80 leading-snug">{n.body}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
