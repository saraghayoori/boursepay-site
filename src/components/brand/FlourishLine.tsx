import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * Brand-correct "dot + curve + dot" ornament — follows the Boorspay
 * brand book §26 "Dot & Line · The Core Element" exactly:
 *
 *   "یک نقطه‌ی پُر، روی یک خط منحنی، در حال حرکت"
 *   (a solid dot, on a curve, in motion)
 *
 * Anatomy of every variant:
 *   1. Origin dot   — solid, indigo/navy, slightly larger (r=5-6)
 *   2. Curve        — a soft Q or T path, never sharp, 1.4–1.8px stroke
 *   3. Destination  — a sky-tinted dot with a faint halo ring (the
 *                     "arrival" mark)
 *
 * Variants correspond to the four base patterns from the brand book §26-02:
 *   - 'hop'        : one-step  — single curve, two endpoints
 *   - 'multi-hop'  : multi-step — curve with intermediate dots along it
 *   - 'branch'     : one source → three destinations
 *   - 'converge'   : three sources → one destination
 *
 * Use this when you want a brand-grade ornament. Don't use random
 * floating curves — the brand book is explicit that every curve must
 * begin and end with the proper dot anatomy.
 */

type Variant = 'hop' | 'multi-hop' | 'branch' | 'converge'

interface FlourishLineProps {
  variant?: Variant
  /** Optional hop shape — for variant='hop' only, otherwise ignored */
  hopShape?: 'arc' | 'descend' | 'ascend' | 'low-arc' | 'wide-arc'
  /** Width in px; height auto-derives from viewBox */
  width?: number
  /** Stroke width for the curve */
  strokeWidth?: number
  /** Origin dot colour */
  originTone?: 'indigo' | 'navy'
  /** Destination dot colour (and halo) */
  destTone?: 'sky' | 'coral' | 'indigo'
  /** Render the destination halo ring */
  halo?: boolean
  /** Path opacity (0..1) — use lower for background usage */
  pathOpacity?: number
  /** Dashed path (true) or solid (false) */
  dashed?: boolean
  /** Duration of the path-draw animation, seconds */
  duration?: number
  /** Delay before the animation starts, seconds */
  delay?: number
  /** Animate only on first view */
  once?: boolean
  className?: string
}

const ease = [0.22, 1, 0.36, 1] as const

/** Returns the path, viewBox, and dot coordinates for a given hop shape. */
function hopGeometry(shape: NonNullable<FlourishLineProps['hopShape']>) {
  switch (shape) {
    case 'arc':
      // Default brand-book hero curve: M 60 140 Q 240 30, 410 100 T 740 80
      return {
        viewBox: '0 0 800 200',
        aspect: 800 / 200,
        d: 'M 30 140 Q 240 30, 410 100 T 770 80',
        origin: { x: 30, y: 140 },
        dest: { x: 770, y: 80 },
        midDots: [] as Array<{ x: number; y: number }>,
      }
    case 'low-arc':
      // Shorter low arc — for inline use under a heading
      return {
        viewBox: '0 0 280 80',
        aspect: 280 / 80,
        d: 'M 16 50 Q 140 -10, 264 50',
        origin: { x: 16, y: 50 },
        dest: { x: 264, y: 50 },
        midDots: [],
      }
    case 'wide-arc':
      // Soft hat-shaped wide arc
      return {
        viewBox: '0 0 400 120',
        aspect: 400 / 120,
        d: 'M 20 100 Q 200 -10, 380 100',
        origin: { x: 20, y: 100 },
        dest: { x: 380, y: 100 },
        midDots: [],
      }
    case 'descend':
      // Sweep from top-right to bottom-left
      return {
        viewBox: '0 0 280 200',
        aspect: 280 / 200,
        d: 'M 264 24 Q 200 90, 16 180',
        origin: { x: 264, y: 24 },
        dest: { x: 16, y: 180 },
        midDots: [],
      }
    case 'ascend':
      // Sweep from bottom-left to top-right
      return {
        viewBox: '0 0 280 200',
        aspect: 280 / 200,
        d: 'M 16 180 Q 80 90, 264 20',
        origin: { x: 16, y: 180 },
        dest: { x: 264, y: 20 },
        midDots: [],
      }
  }
}

export default function FlourishLine({
  variant = 'hop',
  hopShape = 'arc',
  width = 320,
  strokeWidth = 1.6,
  originTone = 'indigo',
  destTone = 'sky',
  halo = true,
  pathOpacity = 1,
  dashed = false,
  duration = 1.6,
  delay = 0.2,
  once = true,
  className,
}: FlourishLineProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once, amount: 0.4 })

  const colors = {
    indigo: 'var(--color-indigo)',
    navy: 'var(--color-navy-1)',
    sky: 'var(--color-sky)',
    coral: 'var(--color-coral)',
  }
  const originColor = colors[originTone]
  const destColor = colors[destTone]

  // Build geometry for the selected variant.
  let geometry: {
    viewBox: string
    aspect: number
    /** Array of paths to draw (each animates independently with stagger) */
    paths: Array<{ d: string; from: { x: number; y: number }; to: { x: number; y: number } }>
    /** Dots that sit ON the curves (mid-step dots for multi-hop) */
    midDots: Array<{ x: number; y: number }>
  }

  if (variant === 'hop') {
    const h = hopGeometry(hopShape)
    geometry = {
      viewBox: h.viewBox,
      aspect: h.aspect,
      paths: [{ d: h.d, from: h.origin, to: h.dest }],
      midDots: h.midDots,
    }
  } else if (variant === 'multi-hop') {
    // origin (left) → 3 mid-dots along curve → destination (right)
    geometry = {
      viewBox: '0 0 400 120',
      aspect: 400 / 120,
      paths: [
        {
          d: 'M 20 80 Q 100 20, 200 60 T 380 40',
          from: { x: 20, y: 80 },
          to: { x: 380, y: 40 },
        },
      ],
      midDots: [
        { x: 110, y: 49 },
        { x: 200, y: 60 },
        { x: 290, y: 51 },
      ],
    }
  } else if (variant === 'branch') {
    // one origin (left), three branches to three destinations (right)
    geometry = {
      viewBox: '0 0 300 180',
      aspect: 300 / 180,
      paths: [
        { d: 'M 22 90 Q 130 90, 268 22', from: { x: 22, y: 90 }, to: { x: 268, y: 22 } },
        { d: 'M 22 90 Q 150 90, 268 90', from: { x: 22, y: 90 }, to: { x: 268, y: 90 } },
        { d: 'M 22 90 Q 130 90, 268 158', from: { x: 22, y: 90 }, to: { x: 268, y: 158 } },
      ],
      midDots: [],
    }
  } else {
    // converge: three sources (left) → one destination (right)
    geometry = {
      viewBox: '0 0 300 180',
      aspect: 300 / 180,
      paths: [
        { d: 'M 22 22 Q 130 90, 268 90', from: { x: 22, y: 22 }, to: { x: 268, y: 90 } },
        { d: 'M 22 90 Q 150 90, 268 90', from: { x: 22, y: 90 }, to: { x: 268, y: 90 } },
        { d: 'M 22 158 Q 130 90, 268 90', from: { x: 22, y: 158 }, to: { x: 268, y: 90 } },
      ],
      midDots: [],
    }
  }

  const height = Math.round(width / geometry.aspect)

  // For branch/converge, multiple origins or destinations need their
  // own dots, deduplicated by coordinate.
  const seen = new Set<string>()
  const allOrigins = geometry.paths
    .map((p) => p.from)
    .filter((pt) => {
      const k = `${pt.x},${pt.y}`
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
  const seen2 = new Set<string>()
  const allDests = geometry.paths
    .map((p) => p.to)
    .filter((pt) => {
      const k = `${pt.x},${pt.y}`
      if (seen2.has(k)) return false
      seen2.add(k)
      return true
    })

  return (
    <svg
      ref={ref}
      viewBox={geometry.viewBox}
      width={width}
      height={height}
      fill="none"
      className={cn('pointer-events-none select-none', className)}
      aria-hidden
    >
      {/* PATHS — drawn in with staggered animation */}
      {geometry.paths.map((p, i) => (
        <motion.path
          key={`path-${i}`}
          d={p.d}
          stroke={originColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={pathOpacity}
          strokeDasharray={dashed ? '3 6' : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            duration,
            delay: delay + i * 0.12,
            ease,
          }}
        />
      ))}

      {/* MID DOTS — placed ON the curve, for multi-step */}
      {geometry.midDots.map((d, i) => (
        <motion.circle
          key={`mid-${i}`}
          cx={d.x}
          cy={d.y}
          r={3}
          fill={originColor}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.85, scale: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + duration * 0.4 + i * 0.12,
            ease,
          }}
        />
      ))}

      {/* ORIGIN DOTS — solid filled, slightly bigger */}
      {allOrigins.map((o, i) => (
        <motion.circle
          key={`origin-${i}`}
          cx={o.x}
          cy={o.y}
          r={5}
          fill={originColor}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.35,
            delay: delay - 0.05,
            ease,
          }}
        />
      ))}

      {/* DESTINATION DOTS — solid sky + optional halo */}
      {allDests.map((d, i) => (
        <g key={`dest-${i}`}>
          {halo && (
            <motion.circle
              cx={d.x}
              cy={d.y}
              r={11}
              fill="none"
              stroke={destColor}
              strokeWidth={1}
              strokeOpacity={0.4}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: delay + duration * 0.85,
                ease,
              }}
            />
          )}
          <motion.circle
            cx={d.x}
            cy={d.y}
            r={5}
            fill={destColor}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: delay + duration * 0.78,
              ease,
            }}
          />
        </g>
      ))}
    </svg>
  )
}
