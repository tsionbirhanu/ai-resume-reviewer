import { ScoreRing } from '@/components/results/ScoreRing'
import type { ResumeReviewResult } from '@/types/review'

type MatchOverviewProps = {
  result: ResumeReviewResult
}

export function MatchOverview({ result }: MatchOverviewProps) {
  return (
    <section>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label">Match overview</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">
            Scorecard
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Scores are AI-generated estimates based on the supplied resume and job
          description.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ScoreRing
          score={result.overallScore}
          label="Overall Match"
          description="Holistic fit across role requirements and resume evidence."
        />
        <ScoreRing
          score={result.atsScore}
          label="Estimated ATS compatibility"
          description="Keyword and structure compatibility estimate, not an exact ATS result."
          tone="amber"
        />
        <ScoreRing
          score={result.skillsMatchScore}
          label="Skills Match"
          description="How well explicit skills align with the posting."
          tone="green"
        />
        <ScoreRing
          score={result.experienceMatchScore}
          label="Experience Match"
          description="How closely prior work maps to responsibilities."
          tone="slate"
        />
      </div>
    </section>
  )
}
