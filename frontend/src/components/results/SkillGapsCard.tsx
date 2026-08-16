import { MinusCircle, PlusCircle } from 'lucide-react'

type SkillGapsCardProps = {
  matchedSkills: string[]
  missingSkills: string[]
}

export function SkillGapsCard({
  matchedSkills,
  missingSkills,
}: SkillGapsCardProps) {
  return (
    <section className="rounded-md border bg-card p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase text-primary">Skill gaps</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold">
            <PlusCircle className="size-5 text-emerald-700" aria-hidden="true" />
            Matched skills
          </div>
          <ChipGroup values={matchedSkills} tone="matched" empty="No matched skills returned." />
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold">
            <MinusCircle className="size-5 text-[#c27200]" aria-hidden="true" />
            Missing or weakly evidenced skills
          </div>
          <ChipGroup values={missingSkills} tone="missing" empty="No missing skills returned." />
        </div>
      </div>
    </section>
  )
}

function ChipGroup({
  empty,
  tone,
  values,
}: {
  empty: string
  tone: 'matched' | 'missing'
  values: string[]
}) {
  const classes =
    tone === 'matched'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
      : 'border-amber-200 bg-amber-50 text-amber-950'

  if (!values.length) {
    return <p className="text-sm text-muted-foreground">{empty}</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <span key={value} className={`rounded-md border px-3 py-1.5 text-sm ${classes}`}>
          {value}
        </span>
      ))}
    </div>
  )
}
