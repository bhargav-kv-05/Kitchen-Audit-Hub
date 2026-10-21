import { AlertOctagon, CheckCircle2, CircleDot } from 'lucide-react'
import type { InspectionOutcome, ViolationStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const TONES = {
  good: 'bg-grade-a/10 text-grade-a',
  warn: 'bg-grade-c/10 text-grade-c',
  bad: 'bg-grade-f/10 text-grade-f',
}

const OUTCOME_TONE: Record<InspectionOutcome, keyof typeof TONES> = {
  Passed: 'good',
  Conditional: 'warn',
  Failed: 'bad',
}

const VIOLATION_TONE: Record<ViolationStatus, keyof typeof TONES> = {
  Resolved: 'good',
  Open: 'warn',
  Critical: 'bad',
}

const ICON = { good: CheckCircle2, warn: CircleDot, bad: AlertOctagon }

export function StatusBadge({ status, className }: { status: InspectionOutcome | ViolationStatus; className?: string }) {
  const tone = status in OUTCOME_TONE ? OUTCOME_TONE[status as InspectionOutcome] : VIOLATION_TONE[status as ViolationStatus]
  const Icon = ICON[tone]
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap', TONES[tone], className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {status}
    </span>
  )
}
