import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/cn'

interface OrnamentDotsProps {
  /** Visual composition of the dot cluster */
  variant?: 'constellation' | 'trail' | 'orbit' | 'scatter'
  /** Color tone for the dots */
  tone?: 'sky' | 'indigo' | 'coral' | 'mist'
  /** Optional opacity multiplier for low-contrast backgrounds (0..1) */
  opacity?: number
  className?: string
  /** Width in px — height auto-derives */
  width?: number
  /** Re-animate every time it enters the viewport */
  once?: boolean
}

interface Dot {
  cx: number
  cy: number
  r: number
  /** Per-dot opacity multiplier (0..1) so the cluster has visual hierarchy */
  o?: number
  /** Per-dot animation delay in seconds */
  delay?: number
  /** Whether this dot keeps drifting after appearing */
  drift?: boolean
}

/**
 * Subtle dot composition that fades/scales in on scroll. Used as
 * accent decoration on the empty side of editorial sections — never
 * the focal element, always atmospheric.
 *
 * The four variants are deliberately spaced compositions, not random:
 *
 *  - `constellation`: 5 dots in a loose triangle, like the brand-mark
 *    dot on the ArcMotif but multiplied. Good for negative space corners.
 *  - `trail`: 4 dots along a diagonal, each smaller than the last —
 *    suggests motion/direction. Good beside text columns.
 *  - `orbit`: 3 dots arranged around an implied center, two small + one
 *    accent. Good as a brand-book corner mark.
 *  - `scatter`: 7 dots in an asymmetric spray. Good for hero-level
 *    atmosphere.
 *
 * After the initial appear-animation, dots marked `drift: true` keep
 * a slow infinite vertical bob — gives the composition a hint of life
 * without being distracting.
 */
export default function OrnamentDots({
  variant = 'constellation',
  tone = 'sky',
  opacity = 1,
  className,
  width = 160,
  once = true,
}: OrnamentDotsProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once, amount: 0.3 })

  const fill = {
    sky: 'fill-sky',
    indigo: 'fill-indigo',
    coral: 'fill-coral',
    mist: 'fill-mist',
  } as const

  const compositions: Record<
    NonNullable<OrnamentDotsProps['variant']>,
    { viewBox: [number, number]; dots: Dot[] }
  > = {
    constellation: {
      viewBox: [160, 120],
      dots: [
        { cx: 24, cy: 32, r: 2.5, o: 1, delay: 0, drift: true },
        { cx: 70, cy: 18, r: 4, o: 0.9, delay: 0.12 },
        { cx: 120, cy: 50, r: 3, o: 0.85, delay: 0.24, drift: true },
        { cx: 50, cy: 80, r: 2.2, o: 0.7, delay: 0.36 },
        { cx: 100, cy: 100, r: 2.8, o: 0.6, delay: 0.48, drift: true },
      ],
    },
    trail: {
      viewBox: [180, 60],
      dots: [
        { cx: 12, cy: 12, r: 3.5, o: 1, delay: 0 },
        { cx: 60, cy: 24, r: 2.8, o: 0.78, delay: 0.1 },
        { cx: 108, cy: 38, r: 2.2, o: 0.55, delay: 0.2 },
        { cx: 156, cy: 50, r: 1.6, o: 0.35, delay: 0.3 },
      ],
    },
    orbit: {
      viewBox: [120, 120],
      dots: [
        { cx: 28, cy: 60, r: 2, o: 0.7, delay: 0 },
        { cx: 92, cy: 60, r: 2, o: 0.7, delay: 0.12 },
        { cx: 60, cy: 28, r: 4, o: 1, delay: 0.24, drift: true },
      ],
    },
    scatter: {
      viewBox: [220, 140],
      dots: [
        { cx: 18, cy: 28, r: 2.4, o: 0.6, delay: 0 },
        { cx: 70, cy: 12, r: 3, o: 0.9, delay: 0.08 },
        { cx: 140, cy: 36, r: 4, o: 1, delay: 0.16, drift: true },
        { cx: 200, cy: 20, r: 2, o: 0.5, delay: 0.24 },
        { cx: 50, cy: 80, r: 2.8, o: 0.75, delay: 0.32, drift: true },
        { cx: 120, cy: 100, r: 2.2, o: 0.55, delay: 0.4 },
        { cx: 188, cy: 116, r: 3.4, o: 0.85, delay: 0.48, drift: true },
      ],
    },
  }

  const c = compositions[variant]
  const [vbW, vbH] = c.viewBox
  const height = Math.round(width * (vbH / vbW))

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={width}
      height={height}
      className={cn('pointer-events-none select-none', className)}
      style={{ opacity }}
      aria-hidden
    >
      {c.dots.map((d, i) => {
        // Two-stage motion:
        //  - appear: scale 0→1, opacity 0→o, with per-dot delay
        //  - drift (optional): infinite y bob after appear completes
        const appearTransition = {
          duration: 0.55,
          delay: d.delay ?? 0,
          ease: [0.22, 1, 0.36, 1] as const,
        }
        return (
          <motion.circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            className={fill[tone]}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              inView
                ? d.drift
                  ? {
                      opacity: d.o ?? 1,
                      scale: 1,
                      y: [0, -4, 0],
                    }
                  : { opacity: d.o ?? 1, scale: 1 }
                : {}
            }
            transition={
              d.drift && inView
                ? {
                    opacity: appearTransition,
                    scale: appearTransition,
                    y: {
                      duration: 4.5 + i * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (d.delay ?? 0) + 0.6,
                    },
                  }
                : appearTransition
            }
          />
        )
      })}
    </svg>
  )
}
