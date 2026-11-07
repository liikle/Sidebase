import { DIFFICULTY_LABEL } from '@shared/ideas'
import type { Difficulty as D } from '@shared/types'
import { cn } from '../../lib/cn'

export function DifficultyMeter({ level, className, showLabel = true }: { level: D; className?: string; showLabel?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)} title={`Difficulty: ${DIFFICULTY_LABEL[level]}`}>
      <span className="flex items-end gap-[3px]" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn('w-[4px] rounded-full', i <= level ? 'bg-accent' : 'bg-white/12')}
            style={{ height: 5 + i * 3 }}
          />
        ))}
      </span>
      {showLabel && <span>{DIFFICULTY_LABEL[level]}</span>}
    </span>
  )
}
