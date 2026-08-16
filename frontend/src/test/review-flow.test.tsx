import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ReviewPage } from '@/pages/ReviewPage'

const resumeText =
  'Jordan Lee full-stack engineer with React TypeScript Python FastAPI Pydantic pytest Tailwind accessibility and API design experience building checkout workflows and backend services.'

const jobDescription =
  'We are hiring a Full-Stack Engineer to build customer-facing SaaS workflows with React, TypeScript, Python API development, FastAPI, accessible responsive interfaces, backend contracts, testing, reliability, and product collaboration.'

const validApiResponse = {
  success: true,
  data: {
    overallScore: 88,
    atsScore: 82,
    skillsMatchScore: 91,
    experienceMatchScore: 84,
    strengths: ['Strong evidence for the target stack.'],
    matchedSkills: ['React', 'FastAPI'],
    missingSkills: ['SaaS domain language'],
    keywordAnalysis: {
      matchedKeywords: ['React'],
      missingKeywords: ['SaaS'],
      notes: 'Good keyword coverage.',
    },
    sectionReviews: [
      { section: 'Experience', score: 86, feedback: 'Relevant evidence.' },
    ],
    bulletImprovements: [
      {
        original: 'Built APIs.',
        improved: 'Built FastAPI services.',
        reason: 'More specific.',
      },
    ],
    recommendations: ['Add a targeted summary.'],
  },
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  cleanup()
})

describe('review flow', () => {
  it('shows required field validation on submit', async () => {
    const user = userEvent.setup()
    renderReviewPage()

    await user.click(screen.getByRole('button', { name: 'Analyze Resume' }))

    expect(
      await screen.findByText('Paste at least 100 characters from the job description.'),
    ).toBeInTheDocument()
  })

  it('shows invalid file handling', async () => {
    const user = userEvent.setup()
    renderReviewPage()
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const oversizedPdf = new File([new Uint8Array(6 * 1024 * 1024)], 'resume.pdf', {
      type: 'application/pdf',
    })

    await user.upload(input, oversizedPdf)

    expect(screen.getByText('Choose a PDF that is 5MB or smaller.')).toBeInTheDocument()
  })

  it('renders loading state while the real fetch is pending', async () => {
    const user = userEvent.setup()
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve(
                  new Response(JSON.stringify(validApiResponse), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                  }),
                ),
              50,
            ),
          ),
      ),
    )
    renderReviewPage()

    await fillTextMode(user)
    await user.click(screen.getByRole('button', { name: 'Analyze Resume' }))

    expect(screen.getByRole('status')).toHaveTextContent('Analyzing your resume')
  })

  it('renders results for a valid API response', async () => {
    const user = userEvent.setup()
    mockFetch(validApiResponse, 200)
    renderReviewPage()

    await fillTextMode(user)
    await user.click(screen.getByRole('button', { name: 'Analyze Resume' }))

    expect(await screen.findByText('Analysis complete')).toBeInTheDocument()
    expect(screen.getByText('Overall Match')).toBeInTheDocument()
    expect(screen.getByText('Estimated ATS compatibility')).toBeInTheDocument()
    expect(screen.getByText('Bullet improvements')).toBeInTheDocument()
    expect(screen.getByText('Start another analysis')).toBeInTheDocument()
  })

  it('renders friendly API error state', async () => {
    const user = userEvent.setup()
    mockFetch(
      {
        success: false,
        error: {
          code: 'AI_PROVIDER_ERROR',
          message: 'The AI provider could not complete the request.',
        },
      },
      502,
    )
    renderReviewPage()

    await fillTextMode(user)
    await user.click(screen.getByRole('button', { name: 'Analyze Resume' }))

    expect(
      await screen.findByText('AI review is temporarily unavailable'),
    ).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Gemini could not complete the analysis.',
    )
  })
})

function renderReviewPage() {
  render(
    <MemoryRouter initialEntries={['/review']}>
      <ReviewPage />
    </MemoryRouter>,
  )
}

async function fillTextMode(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Paste text instead' }))
  fireEvent.change(screen.getByLabelText('Resume text'), {
    target: { value: resumeText },
  })
  fireEvent.change(screen.getByLabelText('Target role'), {
    target: { value: jobDescription },
  })
}

function mockFetch(payload: unknown, status: number) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => {
      return new Response(JSON.stringify(payload), {
        status,
        headers: { 'Content-Type': 'application/json' },
      })
    }),
  )
}
