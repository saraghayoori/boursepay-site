import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/cn'

interface FlourishLineProps {
  /** Visual variant — each is a hand-tuned, purposeful shape, not a generic squiggle */
  variant?:
    | 'underline'    // a low arc that sits BENEATH a phrase, like a hand-drawn highlight
    | 'bridge'       // a long shallow connector across negative space between two anchors
    | 'tide'         // a soft wave used as a backdrop beneath numbers/headings
    | 'descend'      // a downward sweep from a top-right anchor to a bottom-left node
    | 'ascend'       // a rising sweep, low-left → high-right
  className?: string
  /** Width in px — height auto-derives by viewBox ratio */
  width?: number
  strokeWidth?: number
  /** Optional accent dot drawn at the curve's endpoint */
  dot?: boolean
  dotTone?: 'sky' | 'coral' | 'indigo'
  duration?: number
  delay?: number
  once?: boolean
}

/**
 * FlourishLine — purposeful curve ornament.
 *
 * Unlike a generic "squiggle ornament", each variant of this
 * component has a *role* it plays in the layout:
 *
 *   - `underline` is drawn directly under a phrase or heading. It
 *     should be width-matched to that phrase. Use it as a hand-drawn
 *     emphasis under «یک حوزه‌ی مستقل» on the Manifesto, or under a
 *     section title's accent word.
 *   - `bridge` spans empty horizontal space between two visual
 *     anchors — e.g. between a heading and a CTA button — to "carry
 *     the eye" forward. Long and shallow.
 *   - `tide` is a soft wave that sits *behind* a big display number
 *     or heading. Use it as a backdrop accent inside data cards.
 *   - `descend` sweeps top-right → bottom-left, used to flow into a
 *     content block from above. Anchor it from a top-right corner
 *     and let it land on something concrete.
 *   - `ascend` is the inverse — bottom-left → top-right — used to
 *     "lift the eye" out of a section into the next.
 *
 * The line draws itself in with the brand-book draw easing (long
 * ease-out 0.16, 1, 0.3, 1) when scrolled into view; the accent dot
 * lands ~85% through the draw. Stroke colour inherits from
 * currentColor so the wrapper sets the tone with text-* utilities.
 *
 * Don't drop these into random corners. They are anchors, not
 * decorations.
 */
export default function FlourishLine({
  variant = 'underline',
  className,
  width = 200,
  strokeWidth = 1.2,
  dot = false,
  dotTone = 'coral',
  duration = 1.4,
  delay = 0.1,
  once = true,
}: FlourishLineProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once, amount: 0.5 })

  const shapes: Record<
    NonNullable<FlourishLineProps['variant']>,
    { viewBox: string; aspect: number; d: string; cx: number; cy: number }
  > = {
    // Low shallow arc — sits ON the baseline like a pen stroke under
    // a word. End points are at y=10 (near baseline), apex sags down
    // to y=20.
    underline: {
      viewBox: '0 0 200 28',
      aspect: 200 / 28,
      d: 'M 6 10 Q 100 26, 194 10',
      cx: 194,
      cy: 10,
    },
    // Long shallow connector. End points are at the two opposite
    // corners; the curve sags very slightly.
    bridge: {
      viewBox: '0 0 320 40',
      aspect: 320 / 40,
      d: 'M 8 22 C 80 4, 240 36, 312 18',
      cx: 312,
      cy: 18,
    },
    // Soft wave behind a number — broad and gentle. Two crests, one
    // trough. Sits low in the viewBox so the number above has air.
    tide: {
      viewBox: '0 0 200 60',
      aspect: 200 / 60,
      d: 'M 4 42 C 40 22, 80 56, 120 38 S 180 22, 196 36',
      cx: 196,
      cy: 36,
    },
    // Top-right to bottom-left sweep. Apex pulled toward the
    // top-right corner.
    descend: {
      viewBox: '0 0 240 160',
      aspect: 240 / 160,
      d: 'M 232 12 Q 180 80, 8 150',
      cx: 8,
      cy: 150,
    },
    // Inverse of descend — bottom-left to top-right.
    ascend: {
      viewBox: '0 0 240 160',
      aspect: 240 / 160,
      d: 'M 8 150 Q 80 80, 232 10',
      cx: 232,
      cy: 10,
    },
  }

  const s = shapes[variant]
  const height = Math.round(width / s.aspect)

  const dotFill = {
    sky: 'fill-sky',
    coral: 'fill-coral',
    indigo: 'fill-indigo',
  } as const

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <svg
      ref={ref}
      viewBox={s.viewBox}
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
        d={s.d}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration, delay, ease }}
      />
      {dot && (
        <motion.circle
          cx={s.cx}
          cy={s.cy}
          r={2.6}
          stroke="none"
          className={dotFill[dotTone]}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + duration * 0.85,
            ease,
          }}
        />
      )}
    </svg>
  )
}
