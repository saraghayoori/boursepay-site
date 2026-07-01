import { motion } from 'motion/react'

/**
 * About hero visual — «موجِ پرداخت».
 *
 * Concept: a single core node (بورس‌پی) sending concentric arcs of
 * reach outward — the brand-book arc motif rendered large. Each arc
 * carries one of the three brand pillars (سریع · امن · تخصصی), so the
 * graphic *means* something without asserting any dated facts. A pulse
 * travels the widest arc to signal live movement.
 *
 * Built for the dark navy hero: sky arcs, paper labels, coral + emerald
 * accents. Deliberately distinct from every other hero on the site —
 * no timeline, no floating cards, no hub-and-spoke. Just a core, three
 * expanding arcs, and light.
 */

const ease = [0.22, 1, 0.36, 1] as const

const W = 440
const H = 420
const CX = 322
const CY = 298

interface Ring {
  r: number
  label: string
  sub: string
  delay: number
}

const rings: Ring[] = [
  { r: 96, label: 'سریع', sub: 'FAST', delay: 0.15 },
  { r: 158, label: 'امن', sub: 'SECURE', delay: 0.4 },
  { r: 220, label: 'تخصصی', sub: 'SPECIALIST', delay: 0.65 },
]

/** Quarter arc opening into the upper-left quadrant of the core. */
const arcPath = (r: number) =>
  `M ${CX} ${CY - r} A ${r} ${r} 0 0 0 ${CX - r} ${CY}`

/** Marker point at ~135° on the arc (upper-left). */
const marker = (r: number) => ({
  x: CX - r * 0.7071,
  y: CY - r * 0.7071,
})

export default function AboutVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="موجِ پرداختِ بورس‌پی — سریع، امن، تخصصی"
      >
        <defs>
          <radialGradient id="aboutGlowSky" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-sky)" stopOpacity="0.4" />
            <stop offset="70%" stopColor="var(--color-sky)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--color-sky)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aboutGlowIndigo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-indigo)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-indigo)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="aboutArc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-sky)" />
            <stop offset="100%" stopColor="var(--color-indigo)" />
          </linearGradient>
        </defs>

        {/* Depth glows */}
        <circle cx={CX} cy={CY} r={150} fill="url(#aboutGlowIndigo)" />
        <motion.circle
          cx={marker(220).x}
          cy={marker(220).y}
          r={120}
          fill="url(#aboutGlowSky)"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.3, ease }}
        />

        {/* Concentric pillar arcs */}
        {rings.map((ring) => {
          const m = marker(ring.r)
          return (
            <g key={ring.label}>
              <motion.path
                d={arcPath(ring.r)}
                fill="none"
                stroke="url(#aboutArc)"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeOpacity={0.6}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: ring.delay, ease }}
              />

              {/* Pillar marker dot + label sitting on the arc */}
              <motion.g
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: ring.delay + 0.7, ease }}
              >
                <circle cx={m.x} cy={m.y} r={4.5} fill="var(--color-sky)" />
                <circle cx={m.x} cy={m.y} r={9} fill="none" stroke="var(--color-sky)" strokeOpacity={0.35} strokeWidth={1} />
                <text
                  x={m.x - 16}
                  y={m.y - 2}
                  textAnchor="end"
                  className="font-display"
                  fontSize={16}
                  fontWeight={700}
                  fill="var(--color-paper)"
                >
                  {ring.label}
                </text>
                <text
                  x={m.x - 16}
                  y={m.y + 11}
                  textAnchor="end"
                  className="font-en-body"
                  fontSize={7.5}
                  letterSpacing="0.24em"
                  fill="var(--color-sky)"
                  style={{ textTransform: 'uppercase' }}
                >
                  {ring.sub}
                </text>
              </motion.g>
            </g>
          )
        })}

        {/* Travelling pulse along the widest arc — signals "live" */}
        <circle r={3} fill="var(--color-coral)">
          <animateMotion dur="3.2s" repeatCount="indefinite" path={arcPath(220)} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.2s" repeatCount="indefinite" />
        </circle>

        {/* Core node — بورس‌پی */}
        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <circle cx={CX} cy={CY} r={40} fill="var(--color-navy-1)" />
          <circle cx={CX} cy={CY} r={40} fill="none" stroke="var(--color-sky)" strokeOpacity={0.4} strokeWidth={1} />
          <circle cx={CX} cy={CY} r={40} fill="none" stroke="var(--color-sky)" strokeOpacity={0.12} strokeWidth={10}>
            <animate attributeName="r" values="40;52;40" dur="3s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.18;0;0.18" dur="3s" repeatCount="indefinite" />
          </circle>
          <text
            x={CX}
            y={CY + 5}
            textAnchor="middle"
            className="font-display"
            fontSize={16}
            fontWeight={700}
            fill="var(--color-paper)"
          >
            بورس‌پی
          </text>
          {/* live dot */}
          <circle cx={CX + 30} cy={CY - 26} r={3.2} fill="var(--color-emerald)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </motion.g>

        {/* Bottom caption */}
        <text
          x={W - 24}
          y={H - 14}
          textAnchor="end"
          className="font-en-body"
          fontSize={9}
          letterSpacing="0.24em"
          fill="var(--color-paper)"
          fillOpacity={0.45}
          style={{ textTransform: 'uppercase' }}
        >
          one core · three pillars
        </text>
      </svg>
    </div>
  )
}
