import { cn } from '@/lib/utils'

type ScoreRingProps = {
  score: number
  label: string
  description: string
  tone?: 'blue' | 'amber' | 'green' | 'slate'
}

const toneClasses = {
  blue: 'text-primary',
  amber: 'text-[#c27200]',
  green: 'text-emerald-700',
  slate: 'text-slate-700',
}

export function ScoreRing({
  score,
  label,
  description,
  tone = 'blue',
}: ScoreRingProps) {
  const clampedScore = Math.max(0, Math.min(100, score))
  const angle = clampedScore * 3.6

  return (
    <article className="rounded-md border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className="grid size-24 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(currentColor ${angle}deg, hsl(218 18% 88%) 0deg)`,
          }}
        >
          <div className="grid size-[4.7rem] place-items-center rounded-full bg-card">
            <span className={cn('text-2xl font-semibold', toneClasses[tone])}>
              {clampedScore}
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-normal">{label}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </article>
  )
}
