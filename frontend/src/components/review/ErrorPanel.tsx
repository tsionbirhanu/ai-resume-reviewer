import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { ReviewApiError } from '@/types/review'

type ErrorPanelProps = {
  error: ReviewApiError
  onDismiss: () => void
}

export function ErrorPanel({ error, onDismiss }: ErrorPanelProps) {
  return (
    <section
      className="motion-rise-in rounded-xl border border-red-200 bg-red-50 p-5 text-red-950 shadow-sm"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
            <AlertTriangle className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase text-red-700">
              {error.status ? `Error ${error.status}` : error.code}
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-normal">
              {error.title}
            </h2>
            <p className="mt-2 leading-7 text-red-800">{error.message}</p>
          </div>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onDismiss}>
          Dismiss
        </Button>
      </div>
    </section>
  )
}
