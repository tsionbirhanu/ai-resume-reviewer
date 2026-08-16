import type { UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'

type JobDescriptionInputProps = {
  characterCount: number
  registration: UseFormRegisterReturn<'jobDescription'>
  error?: string
}

export function JobDescriptionInput({
  characterCount,
  registration,
  error,
}: JobDescriptionInputProps) {
  return (
    <section className="app-card panel-hover rounded-xl p-5">
      <div>
        <h2 className="text-xl font-semibold tracking-normal">Job description</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Paste the role exactly as written for a grounded comparison.
        </p>
      </div>
      <label htmlFor="job-description" className="mt-5 block text-sm font-medium">
        Target role
      </label>
      <textarea
        id="job-description"
        aria-describedby={
          error ? 'job-description-error' : 'job-description-description'
        }
        aria-invalid={Boolean(error)}
        className={cn(
          'mt-2 min-h-[24rem] w-full rounded-xl border bg-muted/30 px-4 py-3 leading-7 outline-none transition-colors focus:border-primary focus:bg-card focus:ring-2 focus:ring-ring/20',
          error && 'border-red-500',
        )}
        placeholder="Paste the full job description, including responsibilities, required skills, preferred qualifications, and any domain-specific context."
        {...registration}
      />
      {error ? (
        <p
          id="job-description-error"
          className="mt-2 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      ) : (
        <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p id="job-description-description">
            Minimum 100 characters. More context produces a better comparison.
          </p>
          <span className="font-medium text-foreground">{characterCount} chars</span>
        </div>
      )}
    </section>
  )
}
