import { Flame, Target, Trophy, BookOpen, Clock, Star, Medal, Rocket } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { cn } from '@/utils'
import type { Achievement } from '@/types/progress'

const iconMap = { flame: Flame, target: Target, trophy: Trophy, book: BookOpen, clock: Clock, star: Star, medal: Medal, rocket: Rocket }

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const Icon = iconMap[achievement.icon]

  return (
    <Card
      interactive
      padding="sm"
      className={cn('h-full', !achievement.unlocked && 'opacity-75')}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-md',
            achievement.unlocked
              ? 'bg-accent/15 text-accent'
              : 'bg-slate-100 text-muted',
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate font-semibold text-secondary">{achievement.title}</h4>
            {!achievement.unlocked && <Badge variant="muted">Locked</Badge>}
          </div>
          <p className="mt-0.5 text-xs text-muted">{achievement.description}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className={cn(
              'h-full rounded-full',
              achievement.unlocked ? 'bg-accent' : 'bg-slate-400',
            )}
            style={{ width: `${achievement.progress}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-muted">{achievement.progress}%</span>
      </div>
    </Card>
  )
}