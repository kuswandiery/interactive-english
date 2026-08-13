import { PlayCircle, Lock } from 'lucide-react'
import type { LessonStatus } from '@/types/student'
import { cn } from '@/utils'

interface VideoPlayerProps {
  title: string
  status: LessonStatus
  locked?: boolean
  className?: string
}

export function VideoPlayer({ title, status, locked = false, className }: VideoPlayerProps) {
  const isCompleted = status === 'completed'
  const isLocked = locked || status === 'locked'

  return (
    <div
      className={cn(
        'relative flex aspect-video items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-primary/20 to-primary/5',
        className,
      )}
    >
      <button
        type="button"
        aria-label={`${isLocked ? 'Locked' : 'Play'} ${title}`}
        disabled={isLocked}
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition',
          isLocked ? 'cursor-not-allowed opacity-60' : 'hover:scale-105',
        )}
      >
        {isLocked ? <Lock className="h-7 w-7" /> : <PlayCircle className="h-8 w-8" />}
      </button>

      <span className="absolute bottom-4 left-4 rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-white">
        {isLocked ? 'Locked lesson' : 'Video placeholder'}
      </span>

      {isCompleted && (
        <span className="absolute right-4 top-4 rounded-full bg-success px-3 py-1 text-xs font-semibold text-white">
          Completed
        </span>
      )}

      <span className="sr-only">Video is a placeholder and will be streamed in Phase 12.</span>
    </div>
  )
}