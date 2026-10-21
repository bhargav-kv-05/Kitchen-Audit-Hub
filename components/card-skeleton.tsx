function Bone({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <Bone className="aspect-[16/10] rounded-none" />
      <div className="flex flex-col gap-4 p-5">
        <Bone className="h-5 w-2/3" />
        <Bone className="h-4 w-1/2" />
        <Bone className="h-2 w-full rounded-full" />
        <div className="flex justify-between border-t border-border pt-4">
          <Bone className="h-6 w-24 rounded-full" />
          <Bone className="h-5 w-20" />
        </div>
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Loading restaurants">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export { Bone }
