import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Background tone of the section.
   * - `paper` : opaque white (`bg-paper`) — for content "islands"
   * - `tint`  : opaque cool wash (`bg-cloud`) — kept for legacy callers
   * - `dark`  : opaque navy (`bg-navy-1`) — for closing CTA-style sections
   * - `none`  : **transparent** — lets the scroll-driven page background
   *            show through. Use for sections that should "breathe" with
   *            the Mercury-style ambient color shift on HomePage.
   */
  tone?: 'paper' | 'tint' | 'dark' | 'none'
  spacing?: 'normal' | 'tight' | 'loose'
}

export default function Section({
  tone = 'paper',
  spacing = 'normal',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative',
        tone === 'paper' && 'bg-paper text-ink',
        tone === 'tint' && 'bg-cloud text-ink',
        tone === 'dark' && 'bg-navy-1 text-paper',
        tone === 'none' && 'text-ink',
        spacing === 'tight' && 'py-12 sm:py-16',
        spacing === 'normal' && 'py-20 sm:py-28',
        spacing === 'loose' && 'py-28 sm:py-40',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  )
}
