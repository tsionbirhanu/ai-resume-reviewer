const steps = [
  {
    number: '01',
    title: 'Upload resume',
    copy: 'Use a PDF file or switch to pasted text when your source is already clean.',
  },
  {
    number: '02',
    title: 'Add job description',
    copy: 'Paste the actual posting so scoring is grounded in the role, not vague career advice.',
  },
  {
    number: '03',
    title: 'Get personalized analysis',
    copy: 'Review match scores, evidence-backed gaps, keyword coverage, and focused next edits.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-[#c27200]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
            Three inputs. One practical read on fit.
          </h2>
        </div>
        <div className="mt-12 divide-y border-y lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {steps.map((step) => (
            <article key={step.number} className="px-0 py-8 lg:px-8">
              <span className="text-sm font-semibold text-primary">
                {step.number}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-normal">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-muted-foreground">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
