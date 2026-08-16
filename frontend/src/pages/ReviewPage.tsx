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
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {result ? (
          <ResultsDashboard result={result} onReset={handleReset} />
        ) : (
          <>
            <div className="mb-8 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
              <div className="min-w-0 max-w-3xl">
                <p className="section-label">Review workspace</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-normal break-words sm:text-5xl">
                  Compare your resume to the role.
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Add one resume source and the target job description. The
                  workspace validates your inputs before analysis begins.
                </p>
              </div>
              <div className="quiet-panel min-w-0 rounded-xl p-4">
                <p className="text-sm font-semibold text-foreground">
                  Private by design
                </p>
                <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
                  Resume content is sent only to your backend for this request
                  and is not stored by the app.
                </p>
              </div>
            </div>
            <ReviewForm key={formKey} onResult={setResult} />
          </>
        )}
      </main>
    </div>
  )
}
