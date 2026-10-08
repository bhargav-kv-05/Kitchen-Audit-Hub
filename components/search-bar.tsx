'use client'

import { useRouter } from 'next/navigation'
import { useId, useState } from "react"
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  size?: 'default' | 'lg'
  className?: string
  label?: string
  submitLabel?: string
}

/**
 * Controlled when `value`/`onChange` are passed; otherwise submits to /restaurants?q=.
 */
export function SearchBar({
  placeholder = 'Search restaurants, locations, cuisines...',
  value,
  onChange,
  size = 'default',
  className,
  label = 'Search restaurants',
  submitLabel,
}: SearchBarProps) {
  const router = useRouter()
  const inputId = useId()
  const [internal, setInternal] = useState('')
  const controlled = value !== undefined
  const current = controlled ? value : internal
  const setValue = (v: string) => (controlled ? onChange?.(v) : setInternal(v))

  return (
    <form
      role="search"
      className={cn('relative flex w-full items-center', className)}
      onSubmit={(e) => {
        e.preventDefault()
        if (controlled) return
        const q = current.trim()
        router.push(q ? `/restaurants?q=${encodeURIComponent(q)}` : '/restaurants')
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden="true"
        className={cn('pointer-events-none absolute left-4 text-muted-foreground', size === 'lg' ? 'size-5' : 'size-4')}
      />
      <input
        id={inputId}
        type="search"
        value={current}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          'w-full rounded-full border border-border bg-card text-foreground shadow-sm transition-shadow outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15 [&::-webkit-search-cancel-button]:hidden',
          size === 'lg' ? 'h-14 pr-36 pl-12 text-base' : 'h-11 pr-10 pl-11 text-sm',
          size === 'lg' && !submitLabel && 'pr-12',
        )}
      />
      {current && (
        <button
          type="button"
          onClick={() => setValue('')}
          className={cn(
            'absolute inline-flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
            size === 'lg' && submitLabel ? 'right-32' : 'right-2.5',
          )}
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
      {size === 'lg' && submitLabel && (
        <button
          type="submit"
          className="absolute right-2 h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {submitLabel}
        </button>
      )}
    </form>
  )
}
