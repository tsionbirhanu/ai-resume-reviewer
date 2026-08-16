import { ArrowLeft, FileCheck2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function WorkspaceHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
        </Button>
        <p className="hidden items-center gap-2 text-sm font-semibold text-muted-foreground sm:flex">
          <FileCheck2 className="size-4 text-primary" aria-hidden="true" />
          Resume match workspace
        </p>
      </div>
    </header>
  )
}
