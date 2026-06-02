import { cn } from '@/lib/cn'
import type { HTMLAttributes, ReactNode } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fa: ReactNode
  en?: ReactNode
  level?: 1 | 2 | 3
  align?: 'start' | 'center'
  tone?: 'ink' | 'paper'
  /**
   * Opt-out of the v3 refinements (tighter tracking, leading hairline
   * before the English subtitle, inline-flex subtitle). Falls back to
   * the exact original Heading markup — used by the products pages so
   * they are pixel-identical to the pre-refinement build.
   */
  bare?: boolean
}

/**
 * Section heading per brand book — Persian title with a small Latin
 * subtitle underneath. Levels 1–3 share the same composition but scale.
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

  if (bare) {
    // Original (legacy) Heading — exact pre-refinement markup.
    const sizes: Record<1 | 2 | 3, string> = {
      1: 'text-[42px] sm:text-[58px] leading-[1.05] tracking-tight',
      2: 'text-[30px] sm:text-[40px] leading-[1.1] tracking-tight',
      3: 'text-[22px] sm:text-[26px] leading-[1.2]',
    }
    return (
      <div
        className={cn(
          'flex flex-col gap-1.5',
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
              'font-en-display italic text-[14px] sm:text-[16px]',
              tone === 'ink' ? 'text-ink-3' : 'text-paper/60',
            )}
            style={{ unicodeBidi: 'isolate' }}
          >
            {en}
          </div>
        )}
      </div>
    )
  }

  // Refined v3 Heading — tighter optical letter-spacing + leading
  // hairline before the English subtitle.
  const sizes: Record<1 | 2 | 3, string> = {
    1: 'text-[42px] sm:text-[58px] leading-[1.05] tracking-[-0.025em]',
    2: 'text-[30px] sm:text-[40px] leading-[1.1] tracking-[-0.02em]',
    3: 'text-[22px] sm:text-[26px] leading-[1.2] tracking-[-0.012em]',
  }
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
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
            'inline-flex items-center gap-2.5 font-en-display italic text-[14px] sm:text-[16px]',
            tone === 'ink' ? 'text-ink-3' : 'text-mist/75',
          )}
          style={{ unicodeBidi: 'isolate' }}
        >
          <span
            aria-hidden
            className={cn(
              'h-px w-3',
              tone === 'ink' ? 'bg-ink-4/70' : 'bg-mist/35',
            )}
          />
          <span>{en}</span>
        </div>
      )}
    </div>
  )
}
