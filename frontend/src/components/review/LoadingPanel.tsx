import { BrainCircuit, FileSearch, ListChecks } from 'lucide-react'

const checks = [
  {
    icon: FileSearch,
    label: 'Reading resume evidence',
  },
  {
    icon: BrainCircuit,
    label: 'Comparing against role requirements',
  },
  {
    icon: ListChecks,
    label: 'Preparing focused next steps',
  },
]

export function LoadingPanel() {
  return (
    <aside
      className="motion-rise-in rounded-md border bg-[#0f172a] p-5 text-white shadow-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-start gap-4">
        <span className="relative flex size-11 items-center justify-center rounded-md bg-white text-[#0f172a]">
          <span className="absolute inset-0 animate-ping rounded-md bg-white/30" />
          <BrainCircuit className="relative size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold tracking-normal">
            Analyzing your resume
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            The AI is checking evidence, skills, ATS terms, and practical
            improvements. Keep this page open while the review is prepared.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {checks.map((check) => {
          const Icon = check.icon

          return (
            <div
              key={check.label}
              className="flex items-center gap-3 rounded-md border border-white/15 px-3 py-3 text-sm text-slate-200"
            >
              <Icon className="size-4 text-[#f2b84b]" aria-hidden="true" />
              {check.label}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
