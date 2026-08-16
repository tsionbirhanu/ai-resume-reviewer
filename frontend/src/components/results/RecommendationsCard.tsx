type RecommendationsCardProps = {
  recommendations: string[]
}

export function RecommendationsCard({
  recommendations,
}: RecommendationsCardProps) {
  const groups = [
    { title: 'High priority', items: recommendations.slice(0, 2), tone: 'bg-red-50 border-red-200 text-red-950' },
    { title: 'Medium priority', items: recommendations.slice(2, 5), tone: 'bg-amber-50 border-amber-200 text-amber-950' },
    { title: 'Optional polish', items: recommendations.slice(5), tone: 'bg-slate-50 border-slate-200 text-slate-800' },
  ]

  return (
    <section className="app-card rounded-xl p-6">
      <p className="section-label">Recommendations</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className={`rounded-xl border p-4 ${group.tone}`}>
            <h3 className="font-semibold tracking-normal">{group.title}</h3>
            {group.items.length ? (
              <ol className="mt-3 grid list-decimal gap-3 pl-5 text-sm leading-6">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-sm leading-6">No items returned.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
