import type {
  ReviewApiError,
  ReviewApiResponse,
  ResumeReviewResult,
} from '@/types/review'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? getDefaultApiBaseUrl()

type ReviewPayload = {
  resumeFile: File | null
  resumeText?: string
  jobDescription: string
}

export async function submitResumeReview({
  resumeFile,
  resumeText,
  jobDescription,
}: ReviewPayload): Promise<ResumeReviewResult> {
  const formData = new FormData()

  if (resumeFile) {
    formData.append('resume', resumeFile)
  } else if (resumeText?.trim()) {
    formData.append('resume_text', resumeText.trim())
  }

  formData.append('job_description', jobDescription.trim())

  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}/api/review`, {
      method: 'POST',
      body: formData,
    })
  } catch {
    throw createFriendlyError({
      code: 'NETWORK_ERROR',
      status: 0,
      fallbackMessage:
        'The browser could not reach the review API. Make sure the backend is running on port 8000.',
    })
  }

  let payload: ReviewApiResponse | undefined

  try {
    payload = (await response.json()) as ReviewApiResponse
  } catch {
    throw createFriendlyError({
      code: 'INVALID_RESPONSE',
      status: response.status,
      fallbackMessage: 'The review API returned a response the app could not read.',
    })
  }

  if (!response.ok || !payload.success) {
    const errorCode = payload.success ? 'HTTP_ERROR' : payload.error.code
    const fallbackMessage = payload.success
      ? 'The review request could not be completed.'
      : payload.error.message

    throw createFriendlyError({
      code: errorCode,
      status: response.status,
      fallbackMessage,
    })
  }

  return payload.data
}

function createFriendlyError({
  code,
  fallbackMessage,
  status,
}: {
  code: string
  fallbackMessage: string
  status?: number
}): ReviewApiError {
  const errorMap: Record<string, Omit<ReviewApiError, 'code' | 'status'>> = {
    NETWORK_ERROR: {
      title: 'Backend connection failed',
      message:
        'Start the FastAPI server, then try again. Your resume has not been analyzed yet.',
    },
    INVALID_INPUT: {
      title: 'Check the inputs',
      message: fallbackMessage,
    },
    PAYLOAD_TOO_LARGE: {
      title: 'Resume PDF is too large',
      message: 'Upload a PDF that is 5MB or smaller, or paste the resume text instead.',
    },
    UNUSABLE_TEXT: {
      title: 'Resume text could not be read',
      message:
        'The PDF may be scanned or image-only. Try exporting a text-based PDF or paste the resume text instead.',
    },
    VALIDATION_ERROR: {
      title: 'The form needs a little more detail',
      message: 'Check the highlighted fields and try again.',
    },
    AI_PROVIDER_ERROR: {
      title: 'AI review is temporarily unavailable',
      message:
        'Gemini could not complete the analysis. Wait a moment, then retry with the same inputs.',
    },
    INTERNAL_SERVER_ERROR: {
      title: 'Server error',
      message:
        'The backend hit an unexpected issue. The response did not include private details.',
    },
    INVALID_RESPONSE: {
      title: 'Unexpected API response',
      message: fallbackMessage,
    },
  }

  return {
    code,
    status,
    ...(errorMap[code] ?? {
      title: 'Review failed',
      message: fallbackMessage,
    }),
  }
}

function getDefaultApiBaseUrl() {
  if (typeof window === 'undefined') {
    return 'http://localhost:8000'
  }

  const hostname = window.location.hostname || 'localhost'
  return `http://${hostname}:8000`
}
