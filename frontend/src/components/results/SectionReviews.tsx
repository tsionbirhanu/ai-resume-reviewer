import type { SectionReview } from '@/types/review'

type SectionReviewsProps = {
  sections: SectionReview[]
}

export function SectionReviews({ sections }: SectionReviewsProps) {
  if (!sections.length) {
    return null
  }

  return (
    <section>
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase text-primary">
          Section reviews
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal">
          Resume sections
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <article key={section.section} className="app-card panel-hover rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-normal">
                {section.section}
              </h3>
              <span className="rounded-full bg-muted px-2.5 py-1 text-sm font-semibold">
                {section.score}
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.max(0, Math.min(100, section.score))}%` }}
              />
            </div>
            <p className="mt-4 leading-7 text-muted-foreground">
              {section.feedback}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
