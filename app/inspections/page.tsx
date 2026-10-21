import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { InspectionsTable } from '@/components/inspections/inspections-table'

export const metadata: Metadata = {
  title: 'Inspections',
  description: 'Browse the latest official restaurant health inspections, scores and outcomes.',
}

export default function InspectionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Inspections"
        title="Latest Inspections"
        description="Every routine, follow-up and complaint inspection on record, newest first."
      />
      <InspectionsTable />
    </div>
  )
}
