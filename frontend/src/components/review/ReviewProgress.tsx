import { CheckCircle2, Circle, FileText, SendHorizontal, Target } from 'lucide-react'

type ReviewProgressProps = {
  hasResume: boolean
  hasJobDescription: boolean
  isAnalyzing: boolean
}

export function ReviewProgress({
  hasJobDescription,
  hasResume,
  isAnalyzing,
}: ReviewProgressProps) {
  const steps = [
    {
      active: hasResume,
      icon: FileText,
      label: 'Resume source',
      running: false,
    },
    {
      active: hasJobDescription,
      icon: Target,
      label: 'Target role',
      running: false,
    },
    {
      active: isAnalyzing,
      icon: SendHorizontal,
      label: 'Analysis',
      running: isAnalyzing,
    },
  ]

  return (
    <ol className="grid gap-3 rounded-xl border bg-card p-3 shadow-sm sm:grid-cols-3">
      {steps.map((step) => {
        const Icon = step.icon
        const StatusIcon = step.active ? CheckCircle2 : Circle

        return (
          <li
            key={step.label}
            className={`flex items-center gap-3 rounded-lg border px-3 py-3 transition-colors ${
              step.active
                ? 'border-primary/30 bg-primary/5 text-foreground'
                : 'border-transparent bg-muted/45 text-muted-foreground'
            }`}
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-card shadow-sm">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{step.label}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs">
                <StatusIcon className="size-3.5" aria-hidden="true" />
                {step.running ? 'Running' : step.active ? 'Ready' : 'Waiting'}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
