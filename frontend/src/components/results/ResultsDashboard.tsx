import { RotateCcw } from 'lucide-react'

import { AiSummaryCard } from '@/components/results/AiSummaryCard'
import { BulletImprovements } from '@/components/results/BulletImprovements'
import { Disclaimer } from '@/components/results/Disclaimer'
import { KeywordAnalysisCard } from '@/components/results/KeywordAnalysisCard'
import { MatchOverview } from '@/components/results/MatchOverview'
import { RecommendationsCard } from '@/components/results/RecommendationsCard'
import { SectionReviews } from '@/components/results/SectionReviews'
import { SkillGapsCard } from '@/components/results/SkillGapsCard'
import { StrengthsCard } from '@/components/results/StrengthsCard'
import { Button } from '@/components/ui/button'
import type { ResumeReviewResult } from '@/types/review'

type ResultsDashboardProps = {
  result: ResumeReviewResult
  onReset: () => void
}

export function ResultsDashboard({ onReset, result }: ResultsDashboardProps) {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 rounded-md border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">
            Analysis complete
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">
            Resume match dashboard
          </h1>
        </div>
        <Button type="button" variant="outline" onClick={onReset}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Start another analysis
        </Button>
      </div>

      <MatchOverview result={result} />
      <AiSummaryCard result={result} />
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <StrengthsCard strengths={result.strengths} />
        <SkillGapsCard
          matchedSkills={result.matchedSkills}
          missingSkills={result.missingSkills}
        />
      </div>
      <KeywordAnalysisCard keywordAnalysis={result.keywordAnalysis} />
      <SectionReviews sections={result.sectionReviews} />
      <BulletImprovements improvements={result.bulletImprovements} />
      <RecommendationsCard recommendations={result.recommendations} />
      <Disclaimer />
    </div>
  )
}
