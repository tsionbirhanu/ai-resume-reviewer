import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function WorkspaceHeader() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
        </Button>
        <p className="text-sm font-medium text-muted-foreground">
          Resume match workspace
        </p>
      </div>
    </header>
  )
}
