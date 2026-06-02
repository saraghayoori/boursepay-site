import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/cn'

interface OrnamentCurveProps {
  /** Visual variant of the curve composition */
  variant?: 'sweep' | 'arch' | 'wave' | 'rise'
  /** Stroke color via inherited currentColor */
  className?: string
  /** SVG width — height auto-derives by aspect ratio */
  width?: number
  /** Override path stroke width */
  strokeWidth?: number
  /** Show the accent dot that lands at the end of the curve */
  dot?: boolean
  /** Color tone for the dot */
  dotTone?: 'sky' | 'coral' | 'indigo' | 'emerald'
  /** Animation duration in seconds */
  duration?: number
  /** Delay before the draw starts */
  delay?: number
  /** Re-animate every time it enters the viewport (default: once) */
  once?: boolean
}

/**
 * Elegant single-curve ornament — a thin line that draws itself in on
 * scroll, optionally followed by a small accent dot that "lands" at
 * the curve's endpoint. Used as a side decoration to break the rhythm
 * between sections without adding visual noise.
 *
 * The four variants are intentionally different shapes so the same
 * component reads differently depending on context:
 *
 *  - `sweep`: a long gentle right-to-left arc, good for transitions
 *  - `arch`: a symmetric bridge, good above big quotes/statements
 *  - `wave`: a soft S-curve, good beside vertical lists/timelines
 *  - `rise`: a quarter-arc rising up — echoes the ArcMotif signature
 *
 * Stroke uses `currentColor` so the wrapper can set the tone via
 * Tailwind's text-* utilities. The dot has its own tone prop because
 * accent colour and line colour often differ (e.g. sky line with a
 * coral landing dot — a brand-book pattern).
 */
export default function OrnamentCurve({
  variant = 'sweep',
  className,
  width = 240,
  strokeWidth = 1.2,
  dot = true,
  dotTone = 'sky',
  duration = 1.8,
  delay = 0.1,
  once = true,
}: OrnamentCurveProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once, amount: 0.4 })

  const paths: Record<
    NonNullable<OrnamentCurveProps['variant']>,
    { viewBox: string; aspect: number; d: string; cx: number; cy: number }
  > = {
    sweep: {
      viewBox: '0 0 240 80',
      aspect: 240 / 80,
      d: 'M 4 60 Q 80 4, 160 28 T 236 16',
      cx: 236,
      cy: 16,
    },
    arch: {
      viewBox: '0 0 240 80',
      aspect: 240 / 80,
      d: 'M 4 70 Q 120 -10, 236 70',
      cx: 120,
      cy: 14,
    },
    wave: {
      viewBox: '0 0 240 80',
      aspect: 240 / 80,
      d: 'M 4 40 C 60 4, 100 76, 160 40 S 220 4, 236 28',
      cx: 236,
      cy: 28,
    },
    rise: {
      viewBox: '0 0 200 200',
      aspect: 1,
      d: 'M 8 192 A 184 184 0 0 1 192 8',
      cx: 192,
      cy: 8,
    },
  }

  const p = paths[variant]
  const height = Math.round(width / p.aspect)

  const dotFill = {
    sky: 'fill-sky',
    coral: 'fill-coral',
    indigo: 'fill-indigo',
    emerald: 'fill-emerald',
  } as const

  // Brand-book easing: long slow ease-out so the line "forms" rather
  // than zips. Matches the ArcMotif easing for visual cohesion.
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <svg
      ref={ref}
      viewBox={p.viewBox}
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('pointer-events-none select-none', className)}
      aria-hidden
    >
      <motion.path
        d={p.d}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration, delay, ease }}
      />
      {dot && (
        <motion.circle
          cx={p.cx}
          cy={p.cy}
          r="3.2"
          stroke="none"
          className={dotFill[dotTone]}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.45,
            delay: delay + duration * 0.85,
            ease,
          }}
        />
      )}
    </svg>
  )
}
