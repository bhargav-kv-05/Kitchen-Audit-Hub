import { ChefHat, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30 [clip-path:polygon(50%_0,100%_14%,100%_60%,50%_100%,0_60%,0_14%)]',
        className,
      )}
    >
      <ChefHat className="size-5" strokeWidth={2.2} />
      <span className="absolute bottom-1.5 inline-flex size-3.5 items-center justify-center rounded-full bg-grade-b text-foreground">
        <Check className="size-2.5" strokeWidth={3.5} />
      </span>
    </span>
  )
}

export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      {!collapsed && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="font-heading text-[15px] font-extrabold tracking-tight text-foreground">
            KITCHEN AUDIT HUB
          </span>
          <span className="truncate text-[11px] font-medium text-muted-foreground">
            {'Food Safety • Hygiene • Compliance'}
          </span>
        </span>
      )}
    </span>
  )
}
