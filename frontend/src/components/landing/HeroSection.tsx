import { ArrowRight, FileSearch, ShieldCheck, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

import heroImage from '@/assets/resume-match-hero.png'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-24">
        <div className="max-w-3xl">
          <p className="section-label mb-5 inline-flex items-center gap-2">
            <FileSearch className="size-4" aria-hidden="true" />
            Evidence-first resume review
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            Know exactly how well your resume matches the job.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Upload a PDF or paste your resume, add the role you want, and get AI
            feedback on strengths, skill gaps, ATS keywords, and the next
            improvements that matter.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 px-5 text-base">
              <Link to="/review">
                Analyze My Resume
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-5 text-base">
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>
          <div className="mt-10 grid max-w-xl gap-3 border-y py-5 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center gap-2.5">
              <Target className="size-4 text-primary" aria-hidden="true" />
              Role-specific, not generic advice
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 text-emerald-700" aria-hidden="true" />
              Facts preserved in rewrite suggestions
            </div>
          </div>
        </div>

        <div className="app-card relative rounded-xl p-3">
          <img
            src={heroImage}
            alt="Resume and job description match analysis preview"
            className="relative aspect-[16/11] w-full rounded-lg border object-cover"
          />
          <div className="grid border-t bg-card sm:grid-cols-3">
            {[
              ['88', 'Match score'],
              ['ATS', 'Compatibility estimate'],
              ['Next', 'Focused improvements'],
            ].map(([value, label]) => (
              <div key={label} className="border-t px-4 py-4 sm:border-l sm:border-t-0 first:sm:border-l-0">
                <p className="text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
