import type { UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'

type JobDescriptionInputProps = {
  registration: UseFormRegisterReturn<'jobDescription'>
  error?: string
}

export function JobDescriptionInput({
  registration,
  error,
}: JobDescriptionInputProps) {
  return (
    <section className="rounded-md border bg-card p-5 shadow-sm">
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
          'mt-2 min-h-[22rem] w-full rounded-md border bg-background px-4 py-3 leading-7 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20',
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
        <p id="job-description-description" className="mt-2 text-sm text-muted-foreground">
          Minimum 100 characters. More context produces a better comparison.
        </p>
      ) : null}
    </section>
  )
}
