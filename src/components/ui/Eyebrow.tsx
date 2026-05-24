import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'sky' | 'accent' | 'ink'
}

/**
 * Small uppercase Latin overline that sits above section titles.
 * Always Latin/English per brand book — uses DM Sans with wide tracking.
 */
export default function Eyebrow({
  tone = 'sky',
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <div
      className={cn(
        'font-en-body text-[11px] uppercase tracking-[0.18em] font-medium',
        tone === 'sky' && 'text-sky',
        tone === 'accent' && 'text-accent',
        tone === 'ink' && 'text-ink-3',
        className,
      )}
      style={{ unicodeBidi: 'isolate' }}
      {...rest}
    >
      {children}
    </div>
  )
}
