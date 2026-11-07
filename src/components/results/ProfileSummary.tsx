import { BUDGETS, EXPERIENCE, GOALS, INTERESTS, SKILLS, TIMES, WORK_STYLES, labelFor } from '@shared/questions'
import type { Answers } from '@shared/types'
import { cn } from '../../lib/cn'

export function profileRows(a: Answers): [string, string][] {
  return [
    ['Goal', labelFor(GOALS, a.goal)],
    ['Budget', labelFor(BUDGETS, a.budget)],
    ['Time', `${labelFor(TIMES, a.time)}${a.time === 'full-time' ? '' : ' / week'}`],
    ['Skills', a.skills.map((s) => labelFor(SKILLS, s)).join(', ')],
    ['Interests', a.interests.map((s) => labelFor(INTERESTS, s)).join(', ')],
    ['Work style', labelFor(WORK_STYLES, a.workStyle)],
    ['Experience', labelFor(EXPERIENCE, a.experience)],
  ]
}

export function ProfileSummary({ answers, className }: { answers: Answers; className?: string }) {
  return (
    <dl className={cn('grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {profileRows(answers).map(([k, v]) => (
        <div key={k} className="min-w-0">
          <dt className="text-xs text-subtle">{k}</dt>
          <dd className="mt-1 text-sm font-medium leading-snug text-fg">{v}</dd>
        </div>
      ))}
    </dl>
  )
}
