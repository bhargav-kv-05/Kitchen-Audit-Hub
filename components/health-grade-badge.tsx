import { GRADE_META } from '@/lib/grades'
import type { Grade } from '@/lib/types'
import { cn } from '@/lib/utils'

interface HealthGradeBadgeProps {
  grade: Grade
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SIZES = {
  sm: 'size-8 text-sm',
  md: 'size-11 text-lg',
  lg: 'size-14 text-2xl',
  xl: 'size-24 text-5xl',
}

export function HealthGradeBadge({ grade, size = 'md', className }: HealthGradeBadgeProps) {
  const meta = GRADE_META[grade]
  return (
    <span
      role="img"
      aria-label={`Health grade ${grade === 'FAILED' ? 'Failed' : grade}`}
      className={cn(
        'inline-flex shrink-0 animate-badge-pop items-center justify-center rounded-full font-heading font-extrabold text-white shadow-md ring-4 ring-white',
        meta.bg,
        grade === 'B' && 'text-foreground',
        SIZES[size],
        className,
      )}
    >
      {meta.label}
    </span>
  )
}

export function StatusPill({ grade, className }: { grade: Grade; className?: string }) {
  const meta = GRADE_META[grade]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        meta.soft,
        meta.text,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', meta.bg)} aria-hidden="true" />
      {meta.status}
    </span>
  )
}

export function GradeChip({ grade }: { grade: Grade }) {
  const meta = GRADE_META[grade]
  return (
    <span className={cn('inline-flex min-w-9 items-center justify-center rounded-md px-2 py-0.5 text-xs font-bold', meta.soft, meta.text)}>
      {grade === 'FAILED' ? 'F' : grade}
    </span>
  )
}
