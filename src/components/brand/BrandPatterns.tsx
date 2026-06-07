import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * Brand-book §26 patterns:
 *
 *   - ParallelCurves     — three parallel quadratic curves with a dot
 *                          sitting ON each curve at its midpoint.
 *                          Used as a section background at low opacity.
 *   - CornerArcsWithDots — arcs sweeping out from a chosen corner,
 *                          with a sky-tinted dot ON each arc.
 *                          Used inside cards / blocks as a "flow" mark.
 *   - BigNumberCorner    — huge faint display-weight number in the
 *                          corner of a card (font 64px, opacity 0.06)
 *                          per §26-04 "Inside-card decorations". Use
 *                          it to give stepped lists / featured rows
 *                          rhythmic visual numbering.
 *
 * All patterns animate the curves in with the brand-book draw
 * easing (0.16, 1, 0.3, 1) and are decorative (`pointer-events: none`,
 * `aria-hidden`). Stroke uses `currentColor` so the wrapper sets
 * the tone with text-* utilities.
 */

const ease = [0.16, 1, 0.3, 1] as const

// ---------------------------------------------------------------------
// 1. Parallel curves with midpoint dots
// ---------------------------------------------------------------------

interface ParallelCurvesProps {
  /** Width in px — height derives from viewBox ratio */
  width?: number
  /** Number of parallel curves (default 3) */
  count?: 2 | 3 | 4 | 5
  /** Stroke width */
  strokeWidth?: number
  /** Path opacity (low for background, higher for accent) */
  opacity?: number
  /** Dot tone */
  dotTone?: 'indigo' | 'sky' | 'navy'
  /** Animate on view */
  animate?: boolean
  /** Draw duration in seconds */
  duration?: number
  /** Base delay before first curve starts */
  delay?: number
  className?: string
}

export function ParallelCurves({
  width = 280,
  count = 3,
  strokeWidth = 1,
  opacity = 0.45,
  dotTone = 'indigo',
  animate = true,
  duration = 1.6,
  delay = 0.1,
  className,
}: ParallelCurvesProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const active = animate ? inView : true

  const W = 200
  const H = 150
  const aspect = W / H
  const height = Math.round(width / aspect)

  // Generate `count` parallel curves stacked vertically.
  // Each curve is a Q-spline from x=0 to x=W with the apex of the
  // curve pulled UP by `apexOffset`. Stacking spacing = stride.
  const stride = 30
  const startTop = 70 - (count - 3) * 15 // shift composition up as count grows
  const curves = Array.from({ length: count }, (_, i) => {
    const baseY = startTop + i * stride
    const apex = baseY - 70
    return {
      d: `M 0 ${baseY} Q ${W / 2} ${apex}, ${W} ${baseY - 40}`,
      // Midpoint of a quadratic Bezier with control point at (W/2, apex)
      // is at t=0.5 → (W/2, (baseY+apex)/2 + (baseY-40)/4 approx).
      // We compute it numerically for accuracy.
      midX: W / 2,
      midY: 0.25 * baseY + 0.5 * apex + 0.25 * (baseY - 40),
    }
  })

  const dotFill =
    dotTone === 'sky'
      ? 'var(--color-sky)'
      : dotTone === 'navy'
      ? 'var(--color-navy-1)'
      : 'var(--color-indigo)'

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeOpacity={opacity}
      className={cn('pointer-events-none select-none', className)}
      aria-hidden
    >
      {curves.map((c, i) => (
        <motion.path
          key={`pc-${i}`}
          d={c.d}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? {
                  pathLength: 1,
                  opacity: 1,
                }
              : {}
          }
          transition={{ duration, delay: delay + i * 0.18, ease }}
        />
      ))}
      {curves.map((c, i) => (
        <motion.circle
          key={`pc-dot-${i}`}
          cx={c.midX}
          cy={c.midY}
          r={3}
          fill={dotFill}
          stroke="none"
          initial={{ opacity: 0, scale: 0 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + duration * 0.7 + i * 0.18,
            ease,
          }}
        />
      ))}
    </svg>
  )
}

// ---------------------------------------------------------------------
// 2. Corner arcs with a sky dot ON each arc
// ---------------------------------------------------------------------

interface CornerArcsWithDotsProps {
  /** Which corner the arcs sweep out from */
  anchor?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  /** Number of arcs */
  count?: 2 | 3 | 4
  /** Width in px (height matches — square) */
  size?: number
  /** Stroke width */
  strokeWidth?: number
  /** Stroke opacity */
  opacity?: number
  /** Dot tone for the dot ON each arc */
  dotTone?: 'sky' | 'indigo' | 'coral'
  animate?: boolean
  duration?: number
  delay?: number
  className?: string
}

export function CornerArcsWithDots({
  anchor = 'bottom-left',
  count = 3,
  size = 240,
  strokeWidth = 1.2,
  opacity = 0.55,
  dotTone = 'sky',
  animate = true,
  duration = 1.8,
  delay = 0.1,
  className,
}: CornerArcsWithDotsProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const active = animate ? inView : true

  // Base composition — arcs from bottom-left corner of a 200x200 box.
  // Each arc has a sky dot at its midpoint (t=0.5).
  const VB = 200
  const arcs = Array.from({ length: count }, (_, i) => {
    const r = 80 + i * 40
    // Path: from (0, 200) sweeping up to (r, 200-r)
    return {
      r,
      d: `M 0 ${VB} A ${r} ${r} 0 0 1 ${r} ${VB - r}`,
      // Midpoint of a 90° arc from (0,200) → (r, 200-r) is at
      // (r-r/√2, 200-r/√2) approximately — i.e. 45° along the arc.
      midX: r - r / Math.SQRT2,
      midY: VB - r / Math.SQRT2,
    }
  })

  // Flip the composition to match the anchor.
  const transforms: Record<NonNullable<CornerArcsWithDotsProps['anchor']>, string> = {
    'bottom-left': '',
    'bottom-right': `translate(${VB} 0) scale(-1 1)`,
    'top-left': `translate(0 ${VB}) scale(1 -1)`,
    'top-right': `translate(${VB} ${VB}) scale(-1 -1)`,
  }

  const dotFill =
    dotTone === 'sky'
      ? 'var(--color-sky)'
      : dotTone === 'coral'
      ? 'var(--color-coral)'
      : 'var(--color-indigo)'

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VB} ${VB}`}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeOpacity={opacity}
      className={cn('pointer-events-none select-none', className)}
      aria-hidden
    >
      <g transform={transforms[anchor]}>
        {arcs.map((a, i) => (
          <motion.path
            key={`ca-${i}`}
            d={a.d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration, delay: delay + i * 0.18, ease }}
          />
        ))}
        {arcs.map((a, i) => (
          <motion.circle
            key={`ca-dot-${i}`}
            cx={a.midX}
            cy={a.midY}
            r={3.4}
            fill={dotFill}
            stroke="none"
            initial={{ opacity: 0, scale: 0 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: delay + duration * 0.7 + i * 0.18,
              ease,
            }}
          />
        ))}
      </g>
    </svg>
  )
}

// ---------------------------------------------------------------------
// 3. Big faint number in card corner — brand book §26-04
// ---------------------------------------------------------------------

interface BigNumberCornerProps {
  /** Number to render (will be Persian-localised) */
  n: number | string
  /** Position within the parent card */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** Font size in px (default 64 per brand book) */
  size?: number
  /** Opacity (default 0.06 per brand book) */
  opacity?: number
  /** Colour tone for the number */
  tone?: 'indigo' | 'navy' | 'sky'
  className?: string
}

/**
 * Brand-book §26-04 "Inside-card decoration · Big Number Corner".
 * Renders a huge faint display-weight number in the chosen corner of
 * the parent card. The parent MUST be `position: relative` and have
 * `overflow: hidden` for the bleed.
 *
 * Default font-size 64px with opacity 0.06 — these are the exact
 * specs from the brand book. The number is rendered as Persian
 * digits via `Intl.NumberFormat('fa-IR')` so it matches the rest of
 * the site.
 */
export function BigNumberCorner({
  n,
  position = 'top-left',
  size = 64,
  opacity = 0.06,
  tone = 'indigo',
  className,
}: BigNumberCornerProps) {
  const fa =
    typeof n === 'number'
      ? new Intl.NumberFormat('fa-IR', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }).format(n)
      : n

  const positionClasses: Record<NonNullable<BigNumberCornerProps['position']>, string> = {
    'top-left': 'top-4 left-5',
    'top-right': 'top-4 right-5',
    'bottom-left': 'bottom-4 left-5',
    'bottom-right': 'bottom-4 right-5',
  }

  const toneColor =
    tone === 'navy'
      ? 'var(--color-navy-1)'
      : tone === 'sky'
      ? 'var(--color-sky)'
      : 'var(--color-indigo)'

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute font-display font-bold leading-none tracking-tight select-none',
        positionClasses[position],
        className,
      )}
      style={{
        fontSize: size,
        opacity,
        color: toneColor,
        // Number tabular alignment per brand book §24-03
        fontFeatureSettings: '"tnum" 1',
        // Negative tracking matches the brand book sample (-0.04em)
        letterSpacing: '-0.04em',
        // Persian/Arabic numbers are wider; isolate so RTL parent
        // doesn't reverse the number.
        unicodeBidi: 'isolate',
      }}
    >
      {fa}
    </div>
  )
}
