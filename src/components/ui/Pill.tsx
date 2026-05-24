import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'b2b' | 'b2c' | 'success'
}

export default function Pill({
  tone = 'default',
  className,
  children,
  ...rest
}: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5',
        'text-[11px] font-en-body font-semibold tracking-wider uppercase',
        tone === 'default' && 'bg-cloud text-ink-2',
        tone === 'b2b' && 'bg-mist text-indigo',
        tone === 'b2c' && 'bg-coral-soft text-coral',
        tone === 'success' && 'bg-emerald/10 text-emerald',
        className,
      )}
      style={{ unicodeBidi: 'isolate' }}
      {...rest}
    >
      {children}
    </span>
  )
}
