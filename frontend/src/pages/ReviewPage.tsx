import { useState } from 'react'

import { ResultsDashboard } from '@/components/results/ResultsDashboard'
import { ReviewForm } from '@/components/review/ReviewForm'
import { WorkspaceHeader } from '@/components/review/WorkspaceHeader'
import type { ResumeReviewResult } from '@/types/review'

export function ReviewPage() {
  const [result, setResult] = useState<ResumeReviewResult | null>(null)
  const [formKey, setFormKey] = useState(0)

  function handleReset() {
    setResult(null)
    setFormKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WorkspaceHeader />
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
        {result ? (
          <ResultsDashboard result={result} onReset={handleReset} />
        ) : (
          <>
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase text-primary">
                Review workspace
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
                Compare your resume to the role.
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Add one resume source and the target job description. The
                workspace validates your inputs before analysis begins.
              </p>
            </div>
            <ReviewForm key={formKey} onResult={setResult} />
          </>
        )}
      </main>
    </div>
  )
}
