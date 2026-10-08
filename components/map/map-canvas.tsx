import { cn } from '@/lib/utils'

const MAJOR_ROADS_H = [22, 48, 74]
const MAJOR_ROADS_V = [26, 55, 82]
const MINOR_ROADS_H = [10, 35, 61, 88]
const MINOR_ROADS_V = [12, 40, 68, 93]

const AREA_LABELS = [
  { name: 'Jubilee Hills', x: 14, y: 30 },
  { name: 'Banjara Hills', x: 40, y: 58 },
  { name: 'Madhapur', x: 66, y: 28 },
  { name: 'Hitech City', x: 76, y: 52 },
  { name: 'Gachibowli', x: 70, y: 84 },
  { name: 'Kondapur', x: 88, y: 12 },
]

export function MapCanvas({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-[oklch(0.955_0.012_120)]', className)} aria-hidden="true">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(oklch(0.92 0.01 120) 1px, transparent 1px), linear-gradient(90deg, oklch(0.92 0.01 120) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="absolute top-[8%] left-[58%] h-[24%] w-[18%] rounded-[45%] bg-[oklch(0.88_0.07_150)]" />
      <div className="absolute top-[62%] left-[4%] h-[30%] w-[20%] rounded-[40%_60%_55%_45%] bg-[oklch(0.88_0.07_150)]" />
      <div className="absolute top-[36%] left-[30%] h-[10%] w-[10%] rounded-full bg-[oklch(0.9_0.06_150)]" />
      <div className="absolute top-[54%] left-[84%] h-[34%] w-[26%] rounded-[50%_40%_45%_55%] bg-[oklch(0.86_0.06_230)]" />
      <div className="absolute -top-[6%] left-[2%] h-[18%] w-[24%] rounded-[50%] bg-[oklch(0.86_0.06_230)]" />

      {MINOR_ROADS_H.map((y) => (
        <div key={`mh${y}`} className="absolute inset-x-0 h-1 bg-white/90" style={{ top: `${y}%` }} />
      ))}
      {MINOR_ROADS_V.map((x) => (
        <div key={`mv${x}`} className="absolute inset-y-0 w-1 bg-white/90" style={{ left: `${x}%` }} />
      ))}
      {MAJOR_ROADS_H.map((y) => (
        <div key={`h${y}`} className="absolute inset-x-0 h-2.5 border-y border-[oklch(0.88_0.04_80)] bg-[oklch(0.97_0.04_90)]" style={{ top: `${y}%` }} />
      ))}
      {MAJOR_ROADS_V.map((x) => (
        <div key={`v${x}`} className="absolute inset-y-0 w-2.5 border-x border-[oklch(0.88_0.04_80)] bg-[oklch(0.97_0.04_90)]" style={{ left: `${x}%` }} />
      ))}
      <div className="absolute top-1/2 left-1/2 h-3 w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-[28deg] border-y border-[oklch(0.85_0.06_70)] bg-[oklch(0.94_0.07_85)]" />

      {AREA_LABELS.map((a) => (
        <span
          key={a.name}
          className="absolute -translate-x-1/2 text-[11px] font-semibold tracking-wide text-foreground/40 uppercase"
          style={{ left: `${a.x}%`, top: `${a.y}%` }}
        >
          {a.name}
        </span>
      ))}
    </div>
  )
}
