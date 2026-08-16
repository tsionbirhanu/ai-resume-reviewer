import { ArrowRight, Quote } from 'lucide-react'

import type { BulletImprovement } from '@/types/review'

type BulletImprovementsProps = {
  improvements: BulletImprovement[]
}

export function BulletImprovements({ improvements }: BulletImprovementsProps) {
  if (!improvements.length) {
    return (
      <section className="app-card rounded-xl p-6">
        <p className="text-sm font-semibold uppercase text-primary">
          Bullet improvements
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal">
          No bullet rewrites returned
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          The AI did not identify a specific bullet rewrite for this response.
          Use the recommendations below for next edits.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border bg-[#0b1220] p-5 text-white shadow-[0_24px_80px_hsl(222_47%_9%/0.2)] sm:p-7">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-[#f2b84b]">
          Bullet improvements
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal">
          Rewrite moments that preserve the facts.
        </h2>
      </div>
      <div className="grid gap-5">
        {improvements.map((improvement, index) => (
          <article
            key={`${improvement.original}-${index}`}
            className="overflow-hidden rounded-xl border border-white/15 bg-white text-foreground shadow-xl shadow-black/10"
          >
            <div className="grid lg:grid-cols-[1fr_auto_1fr]">
              <BulletPanel
                eyebrow="Original"
                text={improvement.original}
                muted
              />
              <div className="hidden items-center justify-center border-x bg-[#0b1220] px-4 text-white lg:flex">
                <ArrowRight className="size-5" aria-hidden="true" />
              </div>
              <BulletPanel eyebrow="Improved" text={improvement.improved} />
            </div>
            <div className="border-t bg-[#fffaf0] px-5 py-4">
              <div className="flex gap-3">
                <Quote className="mt-1 size-5 shrink-0 text-[#c27200]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold uppercase text-[#9a5a00]">
                    Why this works
                  </p>
                  <p className="mt-1 leading-7 text-slate-800">
                    {improvement.reason}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function BulletPanel({
  eyebrow,
  muted = false,
  text,
}: {
  eyebrow: string
  muted?: boolean
  text: string
}) {
  return (
    <div className={`p-5 ${muted ? 'bg-slate-50' : 'bg-white'}`}>
      <p className="text-sm font-semibold uppercase text-muted-foreground">
        {eyebrow}
      </p>
      <p className="mt-3 text-lg leading-8">{text}</p>
    </div>
  )
}
