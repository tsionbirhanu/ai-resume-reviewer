import { Sparkles } from 'lucide-react'

import type { ResumeReviewResult } from '@/types/review'

type AiSummaryCardProps = {
  result: ResumeReviewResult
}

export function AiSummaryCard({ result }: AiSummaryCardProps) {
  const summary = buildSummary(result)

  return (
    <section className="rounded-md border bg-card p-6 shadow-sm">
      <div className="flex gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase text-primary">
            AI summary
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">
            {summary.title}
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">{summary.copy}</p>
        </div>
      </div>
    </section>
  )
}

function buildSummary(result: ResumeReviewResult) {
  const primaryStrength = result.strengths[0]
  const primaryGap = result.missingSkills[0]

  if (result.overallScore >= 80) {
    return {
      title: 'Strong match with targeted refinement opportunities.',
      copy: `${primaryStrength} The biggest improvement area is ${primaryGap ?? 'making the strongest evidence easier to scan'}.`,
    }
  }

  if (result.overallScore >= 50) {
    return {
      title: 'Promising overlap, but the resume needs sharper evidence.',
      copy: `${primaryStrength} Prioritize closing ${primaryGap ?? 'the most role-critical gaps'} before applying.`,
    }
  }

  return {
    title: 'Low-confidence match based on the current resume evidence.',
    copy: `${primaryStrength} The review found major gaps such as ${primaryGap ?? 'missing role-critical evidence'}, so revisions should focus on factual proof before wording polish.`,
  }
}
