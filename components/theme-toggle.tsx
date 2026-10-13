'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Laptop, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const stored = (localStorage.getItem('theme') as Theme) || 'system'
    setTheme(stored)
    applyTheme(stored)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const current = localStorage.getItem('theme') as Theme
      if (current === 'system' || !current) {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const applyTheme = (t: Theme) => {
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (t === 'dark' || (t === 'system' && prefersDark)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const handleSelect = (t: Theme) => {
    setTheme(t)
    localStorage.setItem('theme', t)
    applyTheme(t)
    setOpen(false)
  }

  // Determine which icon to display on the button
  const isDarkEffective =
    mounted &&
    (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches))

  return (
    <div className={cn('relative', className)} ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle theme appearance"
        aria-expanded={open}
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        {isDarkEffective ? (
          <Moon className="size-[18px] text-primary transition-transform duration-200" aria-hidden="true" />
        ) : (
          <Sun className="size-[18px] text-primary transition-transform duration-200" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right animate-in fade-in zoom-in-95 rounded-2xl border border-border bg-popover p-1.5 shadow-xl z-50">
          <div className="flex flex-col gap-0.5">
            {[
              { key: 'light' as Theme, label: 'Light', icon: Sun },
              { key: 'dark' as Theme, label: 'Dark', icon: Moon },
              { key: 'system' as Theme, label: 'System', icon: Laptop },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSelect(key)}
                className={cn(
                  'flex items-center justify-between w-full rounded-xl px-3 py-2 text-xs font-semibold transition-colors',
                  theme === key
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </span>
                {theme === key && <Check className="size-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
