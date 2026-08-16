import { ArrowRight, CheckCircle2, ShieldCheck, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

import heroImage from '@/assets/resume-match-hero.png'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground shadow-sm">
            <CheckCircle2 className="size-4 text-[#d08700]" aria-hidden="true" />
            Evidence-first resume matching
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
          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-primary" aria-hidden="true" />
              Role-specific, not generic advice
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-700" aria-hidden="true" />
              Facts preserved in rewrite suggestions
            </div>
          </div>
        </div>

        <div className="relative rounded-[1.5rem] border bg-card p-3 shadow-[0_30px_90px_hsl(222_47%_9%/0.14)]">
          <div className="absolute -left-3 top-10 hidden h-24 w-2 rounded-full bg-[#d08700] lg:block" />
          <img
            src={heroImage}
            alt="Resume and job description match analysis preview"
            className="relative aspect-[16/11] w-full rounded-[1rem] border object-cover"
          />
        </div>
      </div>
    </section>
  )
}
