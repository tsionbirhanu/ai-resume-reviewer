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
    <ol className="app-card grid min-w-0 gap-2 rounded-xl p-2 sm:grid-cols-3">
      {steps.map((step) => {
        const Icon = step.icon
        const StatusIcon = step.active ? CheckCircle2 : Circle

        return (
          <li
            key={step.label}
            className={`flex min-w-0 items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
              step.active
                ? 'bg-primary/[0.07] text-foreground'
                : 'bg-muted/45 text-muted-foreground'
            }`}
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-card shadow-sm ring-1 ring-border">
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
