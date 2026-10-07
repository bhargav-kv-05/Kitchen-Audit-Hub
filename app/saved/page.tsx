import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SavedList } from '@/components/saved/saved-list'

export const metadata: Metadata = {
  title: 'Saved Restaurants',
  description: 'Your shortlist of restaurants and their latest health grades.',
}

export default function SavedPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Saved" title="Your Saved Restaurants" description="Saved on this device so you can check back on their grades anytime." />
      <SavedList />
    </div>
  )
}
