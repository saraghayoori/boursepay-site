import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

interface ArcMotifProps {
  /** Number of concentric arcs (default 5 — like the brand cover). */
  count?: number
  /** Stroke color. Defaults to currentColor so it inherits. */
  color?: string
  /** Anchor side — arcs sweep outward from this corner. */
  anchor?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  /** Whether to show the small accent dot on the outermost arc. */
  dot?: boolean
  className?: string
  /** Width:height ratio is 1:1 by default. */
  size?: number
  /**
   * Whether to "draw" the arcs in with a staggered stroke animation
   * — the brand-book cover motion. Defaults to true. Pass `false`
   * for already-on-screen / always-static decorations.
   */
  animate?: boolean
}

/**
 * Concentric quarter-arcs — the signature Boorspay motif.
 * Each arc represents a step on the journey from "entering the
 * capital market" to "liquidity". Use as background decoration on
 * Hero, product covers, callouts.
 *
 * Motion: arcs are drawn in one after another with a 150 ms stagger
 * and a long ease-out curve, matching the brand-book cover. This is
 * `cubic-bezier(0.16, 1, 0.3, 1)` over ~3.4 s — slow enough that
 * the viewer perceives the curves *forming*, not popping. The accent
 * dot fades in after the outermost arc completes.
 */
export default function ArcMotif({
  count = 5,
  color,
  anchor = 'bottom-right',
  dot = true,
  className,
  size = 500,
  animate = true,
}: ArcMotifProps) {
  const arcs = Array.from({ length: count }, (_, i) => {
    const r = 100 + i * 80
    const opacity = 0.18 + (count - i) * 0.12
    return { r, opacity }
  })

  // RTL layout: "bottom-right" in LTR space = arcs sweep from the corner.
  // For RTL, we mirror the anchor to feel right.
  const transforms: Record<NonNullable<ArcMotifProps['anchor']>, string> = {
    'bottom-right': 'translate(0, 0)',
    'bottom-left': 'translate(0, 0) scale(-1, 1) translate(-100%, 0)',
    'top-right': 'translate(0, 0) scale(1, -1) translate(0, -100%)',
    'top-left': 'translate(0, 0) scale(-1, -1) translate(-100%, -100%)',
  }

  // Brand-book draw-arc easing: long ease-out so the curve forms slowly.
  const drawEase = [0.16, 1, 0.3, 1] as const
  const drawDuration = 2.6

  return (
    <svg
      viewBox="0 0 600 600"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('pointer-events-none select-none', className)}
      style={{ color }}
      aria-hidden
    >
      <g
        transform="translate(0 600)"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        style={{ transform: transforms[anchor] }}
      >
        {arcs.map(({ r, opacity }, i) => {
          // Outer arcs (drawn first) start the animation immediately;
          // each inner arc waits an extra 150ms.
          const delay = (count - 1 - i) * 0.15
          return animate ? (
            <motion.path
              key={i}
              d={`M 0 ${-r + 100} A ${r} ${r} 0 0 1 ${r} -100`}
              opacity={opacity}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: drawDuration, delay, ease: drawEase }}
            />
          ) : (
            <path
              key={i}
              d={`M 0 ${-r + 100} A ${r} ${r} 0 0 1 ${r} -100`}
              opacity={opacity}
            />
          )
        })}
        {dot && (
          animate ? (
            <motion.circle
              cx={arcs[0]!.r * 0.74}
              cy={-arcs[0]!.r * 0.7}
              r="5"
              fill="currentColor"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: drawDuration + 0.1, ease: drawEase }}
            />
          ) : (
            <circle
              cx={arcs[0]!.r * 0.74}
              cy={-arcs[0]!.r * 0.7}
              r="5"
              fill="currentColor"
            />
          )
        )}
      </g>
    </svg>
  )
}
