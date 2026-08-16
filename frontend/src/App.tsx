import { FileText } from 'lucide-react'

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-6 flex size-14 items-center justify-center rounded-md border bg-card">
          <FileText className="size-7 text-primary" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
          AI Resume Reviewer
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Phase 1 scaffold is running. Resume upload, job description input, and
          AI match analysis will be added in later phases.
        </p>
        <div className="mt-8 rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
          Frontend health: ready
        </div>
      </div>
    </main>
  )
}

export default App
