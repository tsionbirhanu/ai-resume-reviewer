import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ErrorPanel } from '@/components/review/ErrorPanel'
import { JobDescriptionInput } from '@/components/review/JobDescriptionInput'
import { LoadingPanel } from '@/components/review/LoadingPanel'
import { ReviewProgress } from '@/components/review/ReviewProgress'
import { ResumeInput } from '@/components/review/ResumeInput'
import { Button } from '@/components/ui/button'
import { submitResumeReview } from '@/lib/api'
import {
  reviewFormSchema,
  type ReviewFormValues,
} from '@/lib/reviewValidation'
import type { ResumeReviewResult, ReviewApiError } from '@/types/review'

type ReviewFormProps = {
  onResult: (result: ResumeReviewResult) => void
}

export function ReviewForm({ onResult }: ReviewFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [apiError, setApiError] = useState<ReviewApiError>()
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      resumeMode: 'file',
      resumeText: '',
      jobDescription: '',
    },
  })

  const resumeMode = watch('resumeMode')
  const resumeText = watch('resumeText') ?? ''
  const jobDescription = watch('jobDescription') ?? ''
  const hasResume =
    resumeMode === 'file' ? Boolean(selectedFile) : resumeText.trim().length >= 50
  const hasJobDescription = jobDescription.trim().length >= 100

  function handleModeChange(mode: 'file' | 'text') {
    setValue('resumeMode', mode, { shouldValidate: true })
    setFileError(undefined)
    setApiError(undefined)
    if (mode === 'text') {
      setSelectedFile(null)
    } else {
      clearErrors('resumeText')
    }
  }

  function handleFileChange(file: File | null) {
    setApiError(undefined)

    if (!file) {
      setSelectedFile(null)
      setFileError(undefined)
      return
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setSelectedFile(null)
      setFileError('Choose a PDF file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setSelectedFile(null)
      setFileError('Choose a PDF that is 5MB or smaller.')
      return
    }

    setSelectedFile(file)
    setFileError(undefined)
  }

  async function onSubmit(values: ReviewFormValues) {
    setApiError(undefined)

    if (resumeMode === 'file' && !selectedFile) {
      setFileError('Upload a PDF resume or switch to pasted text.')
      return
    }

    setIsAnalyzing(true)
    try {
      const result = await submitResumeReview({
        resumeFile: resumeMode === 'file' ? selectedFile : null,
        resumeText: resumeMode === 'text' ? values.resumeText : undefined,
        jobDescription: values.jobDescription,
      })
      onResult(result)
    } catch (error) {
      setApiError(error as ReviewApiError)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const submitDisabled = isSubmitting || isAnalyzing

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid min-w-0 gap-6">
      {apiError ? (
        <ErrorPanel error={apiError} onDismiss={() => setApiError(undefined)} />
      ) : null}

      <ReviewProgress
        hasResume={hasResume}
        hasJobDescription={hasJobDescription}
        isAnalyzing={isAnalyzing}
      />

      <div
        className="grid min-w-0 gap-6 lg:grid-cols-2 lg:items-start"
        data-testid="review-input-grid"
      >
        <ResumeInput
          mode={resumeMode}
          selectedFile={selectedFile}
          textLength={resumeText.trim().length}
          textRegistration={register('resumeText')}
          resumeTextError={errors.resumeText?.message}
          fileError={fileError}
          onModeChange={handleModeChange}
          onFileChange={handleFileChange}
        />
        <JobDescriptionInput
          characterCount={jobDescription.trim().length}
          registration={register('jobDescription')}
          error={errors.jobDescription?.message}
        />
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="app-card rounded-xl p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-normal">
                Ready to compare
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Check your inputs, then start the resume analysis when you are
                ready.
              </p>
            </div>
            <Button type="submit" className="h-12 px-6" disabled={submitDisabled}>
              {submitDisabled ? 'Analyzing Resume' : 'Analyze Resume'}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
        {isAnalyzing ? <LoadingPanel /> : null}
      </div>
    </form>
  )
}
