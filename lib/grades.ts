import type { Grade, InspectionStatus } from './types'

export function gradeFromScore(score: number): Grade {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  return 'FAILED'
}

export function statusFromGrade(grade: Grade): InspectionStatus {
  return GRADE_META[grade].status
}

export const GRADE_META: Record<
  Grade,
  {
    label: string
    status: InspectionStatus
    range: string
    description: string
    text: string
    bg: string
    soft: string
    ring: string
    border: string
  }
> = {
  A: {
    label: 'A',
    status: 'Excellent',
    range: '90–100',
    description: 'Outstanding compliance with food safety standards. Minimal or no violations found.',
    text: 'text-grade-a',
    bg: 'bg-grade-a',
    soft: 'bg-grade-a/10',
    ring: 'ring-grade-a/30',
    border: 'border-grade-a/30',
  },
  B: {
    label: 'B',
    status: 'Good',
    range: '80–89',
    description: 'Good overall practices with a few minor issues that should be addressed.',
    text: 'text-grade-b-foreground',
    bg: 'bg-grade-b',
    soft: 'bg-grade-b/15',
    ring: 'ring-grade-b/40',
    border: 'border-grade-b/40',
  },
  C: {
    label: 'C',
    status: 'Needs Improvement',
    range: '70–79',
    description: 'Several violations found. A follow-up inspection is typically scheduled.',
    text: 'text-grade-c',
    bg: 'bg-grade-c',
    soft: 'bg-grade-c/10',
    ring: 'ring-grade-c/30',
    border: 'border-grade-c/30',
  },
  FAILED: {
    label: 'F',
    status: 'Critical',
    range: 'Below 70',
    description: 'Critical violations that pose a risk to public health. Immediate action required.',
    text: 'text-grade-f',
    bg: 'bg-grade-f',
    soft: 'bg-grade-f/10',
    ring: 'ring-grade-f/30',
    border: 'border-grade-f/30',
  },
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}
