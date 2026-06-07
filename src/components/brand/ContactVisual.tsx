import { motion } from 'motion/react'

/**
 * Contact hero visual — a three-channel "convergence" diagram.
 *
 * Concept: «سه کانال، یک پاسخ». A central navy node («شما») sits
 * dead-centre. Three channel nodes — email, whatsapp, demo — orbit
 * around it at fixed angles, each in its own brand colour. Hairline
 * connectors run from each channel to the centre, and a small pulse
 * dot travels along each connector to indicate the channel is "live."
 *
 * Distinct from About (vertical timeline) and Blog (editorial cover):
 * this is a radial diagram — a tiny hub-and-spoke that visualises
 * "incoming connections."
 *
 * Pure SVG, no card decks, no floating chips.
 */

const ease = [0.22, 1, 0.36, 1] as const

interface Channel {
  /** Persian label inside the node */
  label: string
  /** Latin sub-label below the node */
  sub: string
  /** Angle in degrees from centre (0 = right, going counter-clockwise) */
  angle: number
  /** Brand colour for fill + connector */
  tone: 'indigo' | 'emerald' | 'coral'
  /** Single-character icon glyph */
  glyph: 'mail' | 'chat' | 'play'
  /** Pulse delay offset (seconds) so the three don't strobe together */
  delay: number
}

const channels: Channel[] = [
  { label: 'ایمیل', sub: 'EMAIL', angle: 135, tone: 'indigo', glyph: 'mail', delay: 0 },
  { label: 'واتساپ', sub: 'WHATSAPP', angle: 45, tone: 'emerald', glyph: 'chat', delay: 0.4 },
  { label: 'دمو', sub: 'DEMO', angle: 270, tone: 'coral', glyph: 'play', delay: 0.8 },
]

const toneColor = (t: Channel['tone']) =>
  t === 'indigo'
    ? 'var(--color-indigo)'
    : t === 'emerald'
    ? 'var(--color-emerald)'
    : 'var(--color-coral)'

function Glyph({ name }: { name: Channel['glyph'] }) {
  if (name === 'mail') {
    return (
      <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x={-7} y={-5} width={14} height={10} rx={1.5} />
        <path d="M -7 -4 L 0 1 L 7 -4" />
      </g>
    )
  }
  if (name === 'chat') {
    return (
      <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M -6 -4 L 6 -4 A 2 2 0 0 1 8 -2 L 8 3 A 2 2 0 0 1 6 5 L -3 5 L -7 8 L -7 -2 A 2 2 0 0 1 -5 -4 Z" />
      </g>
    )
  }
  // play
  return (
    <g fill="currentColor">
      <path d="M -4 -5 L 5 0 L -4 5 Z" />
    </g>
  )
}

export default function ContactVisual() {
  // Canvas: 360 × 320 with centre at (180, 160). Channel nodes sit on
  // a 110-px radius around the centre.
  const W = 360
  const H = 320
  const cx = W / 2
  const cy = H / 2
  const R = 110

  const points = channels.map((c) => {
    const rad = (c.angle * Math.PI) / 180
    return { ...c, x: cx + Math.cos(rad) * R, y: cy - Math.sin(rad) * R }
  })

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="کانال‌های ارتباطیِ بورس‌پی"
      >
        {/* Soft glow behind the centre node */}
        <defs>
          <radialGradient id="contactCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-sky)" stopOpacity="0.35" />
            <stop offset="65%" stopColor="var(--color-sky)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--color-sky)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.circle
          cx={cx}
          cy={cy}
          r={90}
          fill="url(#contactCenterGlow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        />

        {/* Connector lines + travelling pulse dots */}
        {points.map((p) => (
          <g key={`conn-${p.label}`}>
            <motion.line
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke={toneColor(p.tone)}
              strokeWidth={1.2}
              strokeOpacity={0.55}
              strokeLinecap="round"
              strokeDasharray="3 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.4 + p.delay * 0.5, ease }}
            />
            {/* Pulse dot travelling from channel node toward centre */}
            <motion.circle
              r={3}
              fill={toneColor(p.tone)}
              initial={{ opacity: 0 }}
              animate={{
                cx: [p.x, cx],
                cy: [p.y, cy],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1 + p.delay,
                times: [0, 0.1, 0.85, 1],
              }}
            />
          </g>
        ))}

        {/* Centre node — «شما» */}
        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
        >
          <rect
            x={cx - 44}
            y={cy - 28}
            width={88}
            height={56}
            rx={12}
            fill="var(--color-navy-1)"
          />
          <rect
            x={cx - 44}
            y={cy - 28}
            width={88}
            height={56}
            rx={12}
            fill="none"
            stroke="var(--color-sky)"
            strokeOpacity={0.3}
            strokeWidth={1}
          />
          <text
            x={cx}
            y={cy - 3}
            textAnchor="middle"
            className="font-display"
            fontSize={17}
            fontWeight={700}
            fill="var(--color-paper)"
          >
            تیمِ ما
          </text>
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            className="font-en-body"
            fontSize={8}
            letterSpacing="0.22em"
            fill="var(--color-sky)"
            style={{ textTransform: 'uppercase' }}
          >
            ready
          </text>
          {/* Tiny live indicator */}
          <circle cx={cx + 36} cy={cy - 20} r={3} fill="var(--color-emerald)">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
        </motion.g>

        {/* Channel nodes */}
        {points.map((p, i) => (
          <motion.g
            key={`ch-${p.label}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.9 + i * 0.12,
              ease,
            }}
          >
            <rect
              x={p.x - 36}
              y={p.y - 26}
              width={72}
              height={52}
              rx={10}
              fill="var(--color-paper)"
              stroke={toneColor(p.tone)}
              strokeOpacity={0.55}
              strokeWidth={1.1}
            />
            <g
              transform={`translate(${p.x}, ${p.y - 8})`}
              style={{ color: toneColor(p.tone) }}
            >
              <Glyph name={p.glyph} />
            </g>
            <text
              x={p.x}
              y={p.y + 14}
              textAnchor="middle"
              className="font-display"
              fontSize={11}
              fontWeight={700}
              fill="var(--color-ink)"
            >
              {p.label}
            </text>
            <text
              x={p.x}
              y={p.y + 24}
              textAnchor="middle"
              className="font-en-body"
              fontSize={7}
              letterSpacing="0.2em"
              fill="var(--color-ink-3)"
              style={{ textTransform: 'uppercase' }}
            >
              {p.sub}
            </text>
          </motion.g>
        ))}

        {/* Bottom caption */}
        <text
          x={W / 2}
          y={H - 10}
          textAnchor="middle"
          className="font-en-body"
          fontSize={9}
          letterSpacing="0.24em"
          fill="var(--color-ink-3)"
          style={{ textTransform: 'uppercase' }}
        >
          three channels · one team
        </text>
      </svg>
    </div>
  )
}
