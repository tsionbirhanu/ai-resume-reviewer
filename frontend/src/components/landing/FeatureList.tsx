import { ChartNoAxesCombined, ListChecks, Search, WandSparkles } from 'lucide-react'

const features = [
  {
    icon: ChartNoAxesCombined,
    title: 'Match scoring',
    copy: 'Overall, ATS, skills, and experience scores calibrated to the role requirements.',
  },
  {
    icon: Search,
    title: 'ATS keyword analysis',
    copy: 'Keyword coverage that rewards evidence, not empty repetition.',
  },
  {
    icon: ListChecks,
    title: 'Skill gap detection',
    copy: 'Clear separation between proven skills, missing requirements, and reasonable inference.',
  },
  {
    icon: WandSparkles,
    title: 'Bullet improvements',
    copy: 'Rewrite suggestions that sharpen the resume without inventing facts.',
  },
]

export function FeatureList() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="section-label">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
            Built for better decisions, not prettier dashboards.
          </h2>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">
            The review favors evidence, role context, and practical edits over
            generic career advice.
          </p>
        </div>
        <div className="grid gap-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <article
                key={feature.title}
                className="quiet-panel grid gap-4 rounded-xl p-5 transition-colors hover:border-primary/30 sm:grid-cols-[44px_1fr]"
              >
                <span className="flex size-11 items-center justify-center rounded-md bg-foreground text-background shadow-sm">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-normal">
                    {feature.title}
                  </h3>
                  <p className="mt-2 leading-7 text-muted-foreground">
                    {feature.copy}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
