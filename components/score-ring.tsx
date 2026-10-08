import { GRADE_META } from '@/lib/grades'
import type { Grade } from '@/lib/types'
import { cn } from '@/lib/utils'

const RADIUS = 52
const CIRC = 2 * Math.PI * RADIUS

export function ScoreRing({ score, grade, className }: { score: number; grade: Grade; className?: string }) {
  const meta = GRADE_META[grade]
  return (
    <div className={cn('relative size-40 shrink-0', className)}>
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={RADIUS} fill="none" strokeWidth="10" className="stroke-muted" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className={cn('animate-ring-fill', meta.text)}
          stroke="currentColor"
          strokeDasharray={CIRC}
          style={{ '--ring-offset': `${CIRC * (1 - score / 100)}`, '--ring-circ': `${CIRC}` } as React.CSSProperties}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-4xl font-extrabold tracking-tight">{score}</span>
        <span className="text-xs font-medium text-muted-foreground">out of 100</span>
      </div>
    </div>
  )
}
