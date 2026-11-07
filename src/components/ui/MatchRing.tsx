import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

export function MatchRing({ score, size = 56, className, animate = true }: { score: number; size?: number; className?: string; animate?: boolean }) {
  const stroke = size >= 56 ? 4 : 3
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - score / 100)
  return (
    <div className={cn('relative shrink-0', className)} style={{ width: size, height: size }} aria-label={`${score}% match`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(148 163 184 / 0.14)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#38BDF8"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={animate ? { strokeDashoffset: c } : false}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-semibold tabular-nums text-fg"
        style={{ fontSize: size * 0.27 }}
      >
        {score}
        <span className="text-muted" style={{ fontSize: size * 0.17 }}>%</span>
      </span>
    </div>
  )
}
