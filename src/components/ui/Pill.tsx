import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'b2b' | 'b2c' | 'success'
  /**
   * Opt-out of the v3 refinements (hairline border, tighter padding,
   * wider tracking). Falls back to the original Pill — used by the
   * products pages.
   */
  bare?: boolean
}

/**
 * Tiny status/category pill. Latin uppercase with wide tracking — used
 * for category tags (B2B/B2C), product roles, and short status labels.
 *
 * Refinements:
 * - Adds a hairline border in the tone's own colour at low opacity for
 *   crisper definition on busy surfaces (e.g. dark product banners).
 * - Slightly more vertical padding so the cap-height has room.
 * - Tracking widened to .16em — the brand-book pills use this tracking.
 */
export default function Pill({
  tone = 'default',
  bare = false,
  className,
  children,
  ...rest
}: PillProps) {
  if (bare) {
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
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px]',
        'text-[10.5px] font-en-body font-semibold tracking-[0.16em] uppercase',
        'border',
        tone === 'default' && 'bg-cloud text-ink-2 border-hairline',
        tone === 'b2b' && 'bg-mist/60 text-indigo border-indigo/15',
        tone === 'b2c' && 'bg-coral-soft text-coral border-coral/20',
        tone === 'success' && 'bg-emerald/10 text-emerald border-emerald/20',
        className,
      )}
      style={{ unicodeBidi: 'isolate' }}
      {...rest}
    >
      {children}
    </span>
  )
}
