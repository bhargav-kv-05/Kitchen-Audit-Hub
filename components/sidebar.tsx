'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import { Logo } from '@/components/logo'
import { NAV_ITEMS, isActive } from '@/lib/nav'
import { useSaved } from '@/lib/use-saved'
import { cn } from '@/lib/utils'

interface SidebarNavProps {
  collapsed?: boolean
  onNavigate?: () => void
}

export function SidebarNav({ collapsed = false, onNavigate }: SidebarNavProps) {
  const pathname = usePathname()
  const { saved } = useSaved()

  const footerItems = [
    { label: 'Settings', icon: Settings },
    { label: 'Profile', icon: UserRound },
  ]

  return (
    <div className="flex h-full flex-col">
      <div className={cn('flex h-20 items-center border-b border-sidebar-border', collapsed ? 'justify-center px-2' : 'px-5')}>
        <Link href="/" onClick={onNavigate} className="rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none" aria-label="Kitchen Audit Hub home">
          <Logo collapsed={collapsed} />
        </Link>
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-5">
        {!collapsed && (
          <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">Menu</p>
        )}
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  title={collapsed ? label : undefined}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                    collapsed && 'justify-center px-0',
                    active
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  )}
                >
                  <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                  {collapsed ? (
                    <span className="sr-only">{label}</span>
                  ) : (
                    <span className="flex-1 truncate">{label}</span>
                  )}
                  {!collapsed && href === '/saved' && saved.length > 0 && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                        active ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-secondary text-secondary-foreground',
                      )}
                    >
                      {saved.length}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border px-3 py-4">
        <ul className="flex flex-col gap-1">
          {footerItems.map(({ label, icon: Icon }) => (
            <li key={label}>
              <button
                type="button"
                title={collapsed ? label : undefined}
                onClick={() => toast(`${label} is coming soon`, { description: 'This section will be available in a future update.' })}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                  collapsed && 'justify-center px-0',
                )}
              >
                <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                {collapsed ? <span className="sr-only">{label}</span> : <span>{label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
