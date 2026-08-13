import { BookOpen, Award, FileCheck, GraduationCap, type LucideIcon } from 'lucide-react'
import type { ActivityType } from '@/types/student'
import { Card } from '@/components/ui/Card'

const typeIcons: Record<ActivityType, { icon: LucideIcon; className: string }> = {
  lesson: { icon: BookOpen, className: 'bg-primary/10 text-primary' },
  quiz: { icon: FileCheck, className: 'bg-accent/15 text-accent' },
  course: { icon: GraduationCap, className: 'bg-success/15 text-success' },
  certificate: { icon: Award, className: 'bg-error/15 text-error' },
}

interface ActivityCardProps {
  title: string
  description: string
  date: string
  type: ActivityType
}

export function ActivityCard({ title, description, date, type }: ActivityCardProps) {
  const { icon: Icon, className } = typeIcons[type]

  return (
    <li>
      <Card className="flex items-start gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${className}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-heading text-sm font-semibold text-secondary">{title}</h4>
            <span className="shrink-0 text-xs text-muted">{date}</span>
          </div>
          <p className="mt-0.5 truncate text-sm text-muted">{description}</p>
        </div>
      </Card>
    </li>
  )
}