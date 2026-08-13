import type { QuizQuestion } from '@/types/quiz'
import { cn } from '@/utils'

interface QuizQuestionProps {
  question: QuizQuestion
  index: number
  selected: number | null
  onSelect: (optionIndex: number) => void
}

const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F']

export function QuizQuestion({ question, index, selected, onSelect }: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-heading text-xl font-semibold text-secondary">
          <span className="text-primary">{index + 1}.</span> {question.question}
        </h2>
      </div>

      <div role="radiogroup" aria-label="Answer choices" className="space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selected === i
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(i)}
              className={cn(
                'flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition',
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50',
              )}
            >
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                  isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-secondary',
                )}
              >
                {optionLabels[i]}
              </span>
              <span className={cn('flex-1', isSelected ? 'font-medium text-secondary' : 'text-slate-700')}>
                {option}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}