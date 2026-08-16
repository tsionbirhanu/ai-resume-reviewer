import { ShieldCheck } from 'lucide-react'

export function TrustNote() {
  return (
    <section className="bg-[#0f172a] text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-[48px_1fr]">
        <span className="flex size-12 items-center justify-center rounded-md bg-white text-[#0f172a]">
          <ShieldCheck className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">
            AI-assisted feedback, not a hiring decision.
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-300">
            The review is a structured second opinion. It is not an exact ATS
            simulation, does not predict hiring outcomes, and should be checked
            against your real experience before you edit your resume.
          </p>
        </div>
      </div>
    </section>
  )
}
