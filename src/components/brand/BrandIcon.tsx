import { cn } from '@/lib/cn'

/**
 * Boorspay brand icon set — §28 "Iconography" of the brand book.
 *
 * Spec (all 16 icons in this file must follow):
 *   - 24×24 view-box grid
 *   - 2px padding from edges (paths stay within 2-22)
 *   - 1.5px stroke at 24px (scales proportionally)
 *   - stroke-linecap: round, stroke-linejoin: round
 *   - Single colour (inherits currentColor)
 *
 * These are the exact glyphs Sara approved in the brand book — not
 * generic Feather/Lucide icons. Using the brand icons everywhere
 * ensures every page feels native to Boorspay.
 *
 * Add new icons by extending `paths` below using the same conventions.
 */

const paths = {
  // §28 icon: پرداختِ آنی — instant payment (two segments + chevron)
  payment: (
    <g>
      <path d="M3 12 L9 12 M15 12 L21 12" />
      <path d="M9 8 L13 12 L9 16" />
    </g>
  ),
  // کارت — payment card
  card: (
    <g>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 10 L21 10" />
      <path d="M7 15 L11 15" />
    </g>
  ),
  // صندوق — investment fund (bar chart silhouette)
  fund: (
    <g>
      <path d="M3 19 L21 19" />
      <path d="M4 19 L4 8 L7 8 L7 19" />
      <path d="M10 19 L10 5 L13 5 L13 19" />
      <path d="M16 19 L16 11 L19 11 L19 19" />
    </g>
  ),
  // بانک — bank building
  bank: (
    <g>
      <path d="M3 21 L21 21" />
      <path d="M3 10 L21 10" />
      <path d="M5 10 L5 21 M9 10 L9 21 M15 10 L15 21 M19 10 L19 21" />
      <path d="M12 3 L21 8 L3 8 Z" />
    </g>
  ),
  // زمانِ آنی — instant timing (clock)
  clock: (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 L12 12 L15 14" />
    </g>
  ),
  // امنیت — security shield
  shield: <path d="M12 2 L4 6 L4 12 C 4 16 8 20 12 22 C 16 20 20 16 20 12 L20 6 Z" />,
  // گزارش — report
  report: (
    <g>
      <path d="M4 7 L20 7" />
      <path d="M4 12 L20 12" />
      <path d="M4 17 L14 17" />
      <path d="M17 16 L19 18 L22 14" />
    </g>
  ),
  // تأیید — checkmark in circle
  check: (
    <g>
      <path d="M8 12 L11 15 L16 9" />
      <circle cx="12" cy="12" r="9" />
    </g>
  ),
  // ممتاز — premium star
  star: <path d="M12 3 L13.5 8.5 L19 9 L14.5 12.5 L16 18 L12 14.5 L8 18 L9.5 12.5 L5 9 L10.5 8.5 Z" />,
  // بسته — package (3D cube)
  package: (
    <g>
      <path d="M21 16 L21 8 L12 3 L3 8 L3 16 L12 21 L21 16 Z" />
      <path d="M12 12 L21 8 M12 12 L12 21 M12 12 L3 8" />
    </g>
  ),
  // رشد — growth (trend up)
  growth: (
    <g>
      <path d="M3 17 L9 11 L13 14 L21 6" />
      <path d="M16 6 L21 6 L21 11" />
    </g>
  ),
  // انتقال — transfer (two vertical bars + horizontals)
  transfer: (
    <g>
      <path d="M6 4 L6 20" />
      <path d="M18 4 L18 20" />
      <path d="M6 8 L18 8" />
      <path d="M6 14 L18 14" />
    </g>
  ),
  // اتصال — connection (two circles joined)
  connect: (
    <g>
      <circle cx="9" cy="9" r="4" />
      <circle cx="17" cy="17" r="3" />
      <path d="M12 12 L15 15" />
    </g>
  ),
  // سند — document
  document: (
    <g>
      <path d="M4 9 L9 4 L20 4 L20 15 L15 20 L4 20 Z" />
      <path d="M9 4 L9 9 L4 9" />
      <path d="M15 20 L15 15 L20 15" />
    </g>
  ),
  // امضا — signed document
  signed: (
    <g>
      <path d="M7 4 L17 4 L20 7 L20 20 L4 20 L4 7 Z" />
      <path d="M8 12 L12 16 L16 10" />
    </g>
  ),
  // روند — trend chart
  trend: (
    <g>
      <path d="M4 12 L7 9 L11 13 L17 7 L20 10" />
      <path d="M4 20 L20 20" />
    </g>
  ),
} as const

export type BrandIconName = keyof typeof paths

interface BrandIconProps {
  name: BrandIconName
  size?: number
  className?: string
  /** Override stroke-width (default scales with size from 1.5 @ 24px) */
  strokeWidth?: number
  /** Optional aria-label; otherwise icon is decorative */
  label?: string
}

export default function BrandIcon({
  name,
  size = 24,
  className,
  strokeWidth,
  label,
}: BrandIconProps) {
  // Stroke width scales proportionally: 1.5 @ 24px.
  const sw = strokeWidth ?? Math.max(1, (1.5 * size) / 24)
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {paths[name]}
    </svg>
  )
}
