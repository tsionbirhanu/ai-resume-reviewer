import { Info } from 'lucide-react'

export function Disclaimer() {
  return (
    <aside className="flex gap-3 rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
      <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <p>
        AI-generated feedback is informational and should be reviewed by you
        before making resume changes. It is not a hiring decision or exact ATS
        simulation.
      </p>
    </aside>
  )
}
