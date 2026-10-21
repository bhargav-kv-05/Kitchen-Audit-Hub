'use client'

import { useCallback, useState } from 'react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { SidebarNav } from '@/components/sidebar'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-out lg:block',
          collapsed ? 'w-20' : 'w-64',
        )}
      >
        <SidebarNav collapsed={collapsed} />
      </aside>
      <MobileNav open={mobileOpen} onClose={closeMobile} />

      <div className={cn('flex min-h-dvh flex-col transition-[padding] duration-300 ease-out', collapsed ? 'lg:pl-20' : 'lg:pl-64')}>
        <Header collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} onOpenMobile={() => setMobileOpen(true)} />
        <main id="main" className="flex-1 animate-fade-up px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
