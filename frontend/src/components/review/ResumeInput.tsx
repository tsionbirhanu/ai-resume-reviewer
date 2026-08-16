import { FileText, UploadCloud, X } from 'lucide-react'
import { useRef, useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ResumeMode = 'file' | 'text'

type ResumeInputProps = {
  mode: ResumeMode
  selectedFile: File | null
  textRegistration: UseFormRegisterReturn<'resumeText'>
  resumeTextError?: string
  fileError?: string
  onModeChange: (mode: ResumeMode) => void
  onFileChange: (file: File | null) => void
}

export function ResumeInput({
  mode,
  selectedFile,
  textRegistration,
  resumeTextError,
  fileError,
  onModeChange,
  onFileChange,
}: ResumeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleFile(file: File | undefined) {
    onFileChange(file ?? null)
  }

  return (
    <section className="rounded-md border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-normal">Resume</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Upload a PDF or paste clean resume text.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onModeChange(mode === 'file' ? 'text' : 'file')}
        >
          {mode === 'file' ? 'Paste text instead' : 'Upload PDF instead'}
        </Button>
      </div>

      {mode === 'file' ? (
        <div className="mt-5">
          <button
            type="button"
            className={cn(
              'flex min-h-64 w-full flex-col items-center justify-center rounded-md border border-dashed bg-background px-5 py-8 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isDragging && 'border-primary bg-muted',
              fileError && 'border-red-500',
            )}
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setIsDragging(false)
              handleFile(event.dataTransfer.files[0])
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
            {selectedFile ? (
              <>
                <span className="mb-4 flex size-14 items-center justify-center rounded-md bg-foreground text-background">
                  <FileText className="size-7" aria-hidden="true" />
                </span>
                <span className="max-w-full truncate text-base font-semibold">
                  {selectedFile.name}
                </span>
                <span className="mt-2 text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB selected
                </span>
              </>
            ) : (
              <>
                <span className="mb-4 flex size-14 items-center justify-center rounded-md bg-muted text-primary">
                  <UploadCloud className="size-7" aria-hidden="true" />
                </span>
                <span className="text-base font-semibold">
                  Drop your PDF here
                </span>
                <span className="mt-2 text-sm text-muted-foreground">
                  or click to browse. PDF only, up to 5MB.
                </span>
              </>
            )}
          </button>
          {selectedFile ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => onFileChange(null)}
            >
              <X className="size-4" aria-hidden="true" />
              Remove file
            </Button>
          ) : null}
          {fileError ? (
            <p className="mt-3 text-sm font-medium text-red-600">{fileError}</p>
          ) : null}
        </div>
      ) : (
        <div className="mt-5">
          <label htmlFor="resume-text" className="text-sm font-medium">
            Resume text
          </label>
          <textarea
            id="resume-text"
            className={cn(
              'mt-2 min-h-64 w-full rounded-md border bg-background px-4 py-3 leading-7 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20',
              resumeTextError && 'border-red-500',
            )}
            placeholder="Paste your resume text here. Include experience, projects, education, and skills sections when possible."
            {...textRegistration}
          />
          {resumeTextError ? (
            <p className="mt-2 text-sm font-medium text-red-600">
              {resumeTextError}
            </p>
          ) : null}
        </div>
      )}
    </section>
  )
}
