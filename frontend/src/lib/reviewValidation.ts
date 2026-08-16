import { z } from 'zod'

export const reviewFormSchema = z
  .object({
    resumeMode: z.enum(['file', 'text']),
    resumeText: z.string().optional(),
    jobDescription: z
      .string()
      .trim()
      .min(100, 'Paste at least 100 characters from the job description.'),
  })
  .superRefine((values, context) => {
    if (values.resumeMode === 'text') {
      const text = values.resumeText?.trim() ?? ''

      if (text.length < 50) {
        context.addIssue({
          code: 'custom',
          path: ['resumeText'],
          message: 'Paste at least 50 characters from your resume.',
        })
      }
    }
  })

export type ReviewFormValues = z.infer<typeof reviewFormSchema>
