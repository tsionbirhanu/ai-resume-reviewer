export type KeywordAnalysis = {
  matchedKeywords: string[]
  missingKeywords: string[]
  notes: string
}

export type SectionReview = {
  section: string
  score: number
  feedback: string
}

export type BulletImprovement = {
  original: string
  improved: string
  reason: string
}

export type ResumeReviewResult = {
  overallScore: number
  atsScore: number
  skillsMatchScore: number
  experienceMatchScore: number
  strengths: string[]
  matchedSkills: string[]
  missingSkills: string[]
  keywordAnalysis: KeywordAnalysis
  sectionReviews: SectionReview[]
  bulletImprovements: BulletImprovement[]
  recommendations: string[]
}

export type ReviewSuccessResponse = {
  success: true
  data: ResumeReviewResult
}

export type ReviewErrorResponse = {
  success: false
  error: {
    code: string
    message: string
  }
}

export type ReviewApiResponse = ReviewSuccessResponse | ReviewErrorResponse

export type ReviewApiError = {
  code: string
  title: string
  message: string
  status?: number
}
