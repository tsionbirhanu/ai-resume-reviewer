import type { KeywordAnalysis } from '@/types/review'

type KeywordAnalysisCardProps = {
  keywordAnalysis: KeywordAnalysis
}

export function KeywordAnalysisCard({
  keywordAnalysis,
}: KeywordAnalysisCardProps) {
  const recommendedKeywords = keywordAnalysis.missingKeywords.slice(0, 8)

  return (
    <section className="rounded-md border bg-card p-6 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">
            Keyword analysis
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">
            Evidence-aware keyword coverage
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            {keywordAnalysis.notes}
          </p>
        </div>
        <div className="grid gap-4">
          <KeywordGroup
            title="Matched"
            values={keywordAnalysis.matchedKeywords}
            className="border-emerald-200 bg-emerald-50 text-emerald-900"
          />
          <KeywordGroup
            title="Missing"
            values={keywordAnalysis.missingKeywords}
            className="border-slate-200 bg-slate-50 text-slate-800"
          />
          <KeywordGroup
            title="Recommended if accurate"
            values={recommendedKeywords}
            className="border-amber-200 bg-amber-50 text-amber-950"
          />
        </div>
      </div>
    </section>
  )
}

function KeywordGroup({
  className,
  title,
  values,
}: {
  className: string
  title: string
  values: string[]
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      {values.length ? (
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <span key={`${title}-${value}`} className={`rounded-md border px-2.5 py-1 text-sm ${className}`}>
              {value}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">None returned.</p>
      )}
    </div>
  )
}
