import { learningProcess } from '@/data/learningProcess'

export function LearningProcess() {
  return (
    <section className="bg-surface">
      <div className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">How It Works</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-secondary">
            Your learning journey
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {learningProcess.map((step, index) => (
            <li key={step.title} className="relative flex flex-col items-center gap-3 rounded-md bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-6 w-6" />
              </span>
              <span className="absolute left-4 top-4 text-xs font-bold text-primary/40">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading font-semibold text-secondary">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}