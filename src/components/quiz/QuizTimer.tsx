import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/utils'

interface QuizTimerProps {
  minutes: number
  onTimeout: () => void
}

export function QuizTimer({ minutes, onTimeout }: QuizTimerProps) {
  const totalSeconds = minutes * 60
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id)
          onTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [onTimeout])

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const low = secondsLeft <= 30

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold tabular-nums',
        low ? 'bg-error/15 text-error' : 'bg-slate-100 text-secondary',
      )}
      aria-label={`${mins} minutes ${secs} seconds remaining`}
    >
      <Clock className="h-4 w-4" />
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </span>
  )
}