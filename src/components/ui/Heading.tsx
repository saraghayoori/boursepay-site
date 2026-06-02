import { cn } from '@/lib/cn'
import type { HTMLAttributes, ReactNode } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fa: ReactNode
  en?: ReactNode
  level?: 1 | 2 | 3
  align?: 'start' | 'center'
  tone?: 'ink' | 'paper'
  /**
   * Opt-out of the v3 refinements (tighter tracking and leading hairline
   * before the English subtitle). Falls back to the original Heading
   * appearance — used by the products pages.
   */
  bare?: boolean
}

/**
 * Section heading per brand book — Persian title with a small Latin
 * subtitle underneath.
 *
 * Refinements:
 * - Tighter optical letter-spacing on display sizes (matches the
 *   brand-book h1/h2 specimens).
 * - English subtitle is preceded by a delicate 12px hairline marker —
 *   a quiet editorial cue that reads as "this is a label, not a
 *   continuation of the title".
 * - When `tone="paper"` (on dark surfaces) the English subtitle uses a
 *   warmer mist colour instead of plain transparency for better depth.
 */
export default function Heading({
  fa,
  en,
  level = 2,
  align = 'start',
  tone = 'ink',
  bare = false,
  className,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  // Refined (default) sizes use tighter optical tracking from the brand
  // book. `bare` falls back to the original `tracking-tight` rhythm.
  const sizesRefined: Record<1 | 2 | 3, string> = {
    1: 'text-[42px] sm:text-[58px] leading-[1.05] tracking-[-0.025em]',
    2: 'text-[30px] sm:text-[40px] leading-[1.1] tracking-[-0.02em]',
    3: 'text-[22px] sm:text-[26px] leading-[1.2] tracking-[-0.012em]',
  }
  const sizesLegacy: Record<1 | 2 | 3, string> = {
    1: 'text-[42px] sm:text-[58px] leading-[1.05] tracking-tight',
    2: 'text-[30px] sm:text-[40px] leading-[1.1] tracking-tight',
    3: 'text-[22px] sm:text-[26px] leading-[1.2]',
  }
  const sizes = bare ? sizesLegacy : sizesRefined
  return (
    <div
      className={cn(
        'flex flex-col',
        bare ? 'gap-1.5' : 'gap-2',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Tag
        className={cn(
          'font-display font-bold',
          sizes[level],
          tone === 'ink' ? 'text-ink' : 'text-paper',
        )}
        {...rest}
      >
        {fa}
      </Tag>
      {en && (
        <div
          className={cn(
            'inline-flex items-center font-en-display italic text-[14px] sm:text-[16px]',
            !bare && 'gap-2.5',
            tone === 'ink'
              ? bare
                ? 'text-ink-3'
                : 'text-ink-3'
              : bare
              ? 'text-paper/60'
              : 'text-mist/75',
          )}
          style={{ unicodeBidi: 'isolate' }}
        >
          {!bare && (
            <span
              aria-hidden
              className={cn(
                'h-px w-3',
                tone === 'ink' ? 'bg-ink-4/70' : 'bg-mist/35',
              )}
            />
          )}
          <span>{en}</span>
        </div>
      )}
    </div>
  )
}
