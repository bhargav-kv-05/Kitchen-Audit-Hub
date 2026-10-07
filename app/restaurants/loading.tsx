import { Bone, GridSkeleton } from '@/components/card-skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Bone className="h-4 w-32" />
        <Bone className="h-10 w-64" />
        <Bone className="h-4 w-96 max-w-full" />
      </div>
      <Bone className="h-11 w-full rounded-full" />
      <GridSkeleton />
    </div>
  )
}
