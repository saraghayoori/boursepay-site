import { cn } from '@/lib/cn'
import type { HTMLAttributes, ReactNode } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fa: ReactNode
  en?: ReactNode
  level?: 1 | 2 | 3
  align?: 'start' | 'center'
  tone?: 'ink' | 'paper'
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
  className,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  const sizes: Record<1 | 2 | 3, string> = {
    1: 'text-[42px] sm:text-[58px] leading-[1.05] tracking-tight',
    2: 'text-[30px] sm:text-[40px] leading-[1.1] tracking-tight',
    3: 'text-[22px] sm:text-[26px] leading-[1.2]',
  }
  return (
    <div className={cn('flex flex-col gap-1.5', align === 'center' && 'items-center text-center', className)}>
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
