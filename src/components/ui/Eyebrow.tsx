import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'sky' | 'accent' | 'ink'
  /**
   * Opt-out of the v3 refinements (leading hairline + dot, wider
   * tracking, inline-flex layout). Falls back to the original plain
   * Eyebrow — used by the products pages.
   */
  bare?: boolean
}

/**
 * Small uppercase Latin overline that sits above section titles.
 * Always Latin/English per brand book — uses DM Sans with wide tracking.
 *
 * Refined: a tiny brand-mark composed of a 24px hairline + a 3px dot
 * leads the text. This is the same visual rhythm used on the brand book
 * page-meta rows and gives every section an instant editorial signature.
 *
 * `bare` produces exactly the original markup so pages that opted out
 * are pixel-identical to the pre-refinement build.
 */
export default function Eyebrow({
  tone = 'sky',
  bare = false,
  className,
  children,
  ...rest
}: EyebrowProps) {
  if (bare) {
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
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 font-en-body text-[11px] uppercase tracking-[0.2em] font-medium',
        tone === 'sky' && 'text-sky',
        tone === 'accent' && 'text-accent',
        tone === 'ink' && 'text-ink-3',
        className,
      )}
      style={{ unicodeBidi: 'isolate' }}
      {...rest}
    >
      <span aria-hidden className="inline-flex items-center gap-1.5">
        <span
          className={cn(
            'h-px w-6',
            tone === 'sky' && 'bg-sky/60',
            tone === 'accent' && 'bg-accent/55',
            tone === 'ink' && 'bg-ink-4/70',
          )}
        />
        <span
          className={cn(
            'h-[3px] w-[3px] rounded-full',
            tone === 'sky' && 'bg-sky',
            tone === 'accent' && 'bg-accent',
            tone === 'ink' && 'bg-ink-3',
          )}
        />
      </span>
      <span>{children}</span>
    </div>
  )
}
