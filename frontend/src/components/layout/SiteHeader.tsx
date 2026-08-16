import { FileCheck2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3 font-semibold">
          <span className="flex size-10 items-center justify-center rounded-md bg-foreground text-background shadow-sm">
            <FileCheck2 className="size-5" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">AI Resume Reviewer</span>
        </Link>
        <div className="hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground md:flex">
          <Sparkles className="size-4 text-[#b66a00]" aria-hidden="true" />
          Evidence-first analysis
        </div>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <a href="/#how-it-works">How it works</a>
          </Button>
          <Button asChild size="sm">
            <Link to="/review">Analyze</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
