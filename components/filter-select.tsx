'use client'

import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterSelectProps<T extends string> {
  label: string
  value: T
  options: ReadonlyArray<{ value: T; label: string }>
  onChange: (value: T) => void
  className?: string
}

export function FilterSelect<T extends string>({ label, value, options, onChange, className }: FilterSelectProps<T>) {
  const id = useId()
  const active = value !== options[0]?.value

  return (
    <div className={cn('flex shrink-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className={cn(
            'h-10 w-full min-w-36 cursor-pointer appearance-none rounded-xl border bg-card pr-9 pl-3 text-sm font-medium shadow-xs transition-colors outline-none focus:border-primary focus:ring-4 focus:ring-primary/15',
            active ? 'border-primary/50 text-primary' : 'border-border text-foreground',
          )}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>
    </div>
  )
}
