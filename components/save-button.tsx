'use client'

import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { useSaved } from '@/lib/use-saved'
import { cn } from '@/lib/utils'

interface SaveButtonProps {
  id: string
  name: string
  variant?: 'icon' | 'full'
  className?: string
}

export function SaveButton({ id, name, variant = 'icon', className }: SaveButtonProps) {
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(id)

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const nowSaved = toggle(id)
    if (nowSaved) toast.success(`Saved ${name}`, { description: 'Find it anytime in Saved Restaurants.' })
    else toast(`Removed ${name} from saved`)
  }

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        className={cn(
          'inline-flex h-11 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
          saved
            ? 'border-grade-f/30 bg-grade-f/10 text-grade-f hover:bg-grade-f/15'
            : 'border-border bg-card text-foreground hover:bg-muted',
          className,
        )}
      >
        <Heart className={cn('size-4', saved && 'fill-current')} aria-hidden="true" />
        {saved ? 'Saved' : 'Save Restaurant'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full bg-card/90 shadow-sm backdrop-blur transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
        saved ? 'text-grade-f' : 'text-foreground',
        className,
      )}
    >
      <Heart className={cn('size-4', saved && 'fill-current')} aria-hidden="true" />
      <span className="sr-only">{saved ? `Remove ${name} from saved` : `Save ${name}`}</span>
    </button>
  )
}
