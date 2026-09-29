import { CalendarDays, Clock } from 'lucide-react'
import { formatDate } from '@/lib/format'
import type { Essay } from '@/lib/types'

export function EssayMeta({ essay, className = '' }: { essay: Pick<Essay, 'publishedAt' | 'readingMinutes'>; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-subtle ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="size-3.5" />
        <time dateTime={essay.publishedAt}>{formatDate(essay.publishedAt)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3.5" />
        {essay.readingMinutes} min de lectura
      </span>
    </div>
  )
}
