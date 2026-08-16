import { CheckCircle2 } from 'lucide-react'

type StrengthsCardProps = {
  strengths: string[]
}

export function StrengthsCard({ strengths }: StrengthsCardProps) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase text-emerald-800">Strengths</p>
      <div className="mt-5 grid gap-3">
        {strengths.map((strength) => (
          <div
            key={strength}
            className="panel-hover flex gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-emerald-950 shadow-sm"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" />
            <p className="leading-7">{strength}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
