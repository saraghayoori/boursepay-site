import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Eyebrow from '@/components/ui/Eyebrow'
import { BigNumberCorner } from '@/components/brand/BrandPatterns'

/**
 * Trust strip — the second "voice" of the page.
 *
 * Previously a thin row of plain text counters. Now each fact lives
 * on its own tile card with:
 *   - The animated number/literal in a big display weight
 *   - Persian label
 *   - Latin sub-label (small caps, wide tracking)
 *   - A delicate sparkline or icon glyph that reinforces the fact
 *   - Hover lift + accent corner mark
 *
 * Cards scroll in with a small stagger; counters still count up from
 * zero on first view, no animation on subsequent re-renders.
 */

interface Fact {
  /** Final numeric value the counter rolls to. Null for static facts. */
  value: number | null
  /** Suffix shown right after the number (٪، +، —). */
  suffix?: string
  /** Prefix shown before the number. */
  prefix?: string
  /** Literal label for static facts that aren't numeric. */
  literal?: string
  /** Persian label below the number. */
  label: string
  /** Latin sub-label below the Persian label. */
  sub: string
  /** Sparkline shape variant — affects the small inline chart drawn
   *  in the card's top-right corner. */
  spark: 'up' | 'wave' | 'dots' | 'pulse'
}

const facts: Fact[] = [
  {
    value: 21,
    suffix: '+',
    label: 'بانکِ متصل',
    sub: 'banking partners',
    spark: 'dots',
  },
  {
    value: null,
    literal: 'سریع',
    label: 'سرعتِ تسویه',
    sub: 'fast finality',
    spark: 'pulse',
  },
  {
    value: 99.9,
    suffix: '٪',
    label: 'پایداریِ سوییچ',
    sub: 'monthly uptime',
    spark: 'wave',
  },
  {
    value: 50,
    suffix: '+',
    label: 'صندوقِ فعال',
    sub: 'institutional clients',
    spark: 'up',
  },
]

const easeOut = [0.22, 1, 0.36, 1] as const

export default function TrustStrip() {
  return (
    <Section tone="none" spacing="normal">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <Eyebrow tone="sky">در نگاهِ عدد</Eyebrow>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-tight tracking-tight text-ink sm:text-[34px]">
            دستاوردهای عینی
            <span className="text-indigo"> بورس‌پی </span>
          </h2>
        </div>

        {/* Cards row */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <FactCard key={f.label} fact={f} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function FactCard({ fact, index }: { fact: Fact; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState<string>(() =>
    fact.value === null ? fact.literal ?? '' : '0',
  )

  // Count-up animation (rAF) on first view.
  useEffect(() => {
    if (fact.value === null) return
    if (!inView) return

    const target = fact.value
    const duration = 1400
    const start = performance.now()
    let raf = 0

    const tick = (t: number) => {
      const elapsed = t - start
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased
      const isFloat = target % 1 !== 0
      const formatted = isFloat
        ? current.toLocaleString('fa-IR', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })
        : Math.round(current).toLocaleString('fa-IR')
      setDisplay(formatted)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, fact.value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: easeOut }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-paper-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo/25 hover:shadow-[0_28px_60px_-30px_rgba(10,14,46,0.4)]"
    >
      {/* Brand book §26-04 — huge faint index number in the top-left
          corner of each tile, the rhythmic visual marker for the row */}
      <BigNumberCorner
        n={index + 1}
        position="top-left"
        size={72}
        opacity={0.07}
        tone="indigo"
      />

      {/* Top row — sparkline only (the big corner number replaces the
          old Latin 0X marker) */}
      <div className="flex items-center justify-end">
        <div
          className="h-6 w-14 text-sky transition-colors group-hover:text-indigo"
          aria-hidden
        >
          <Spark variant={fact.spark} />
        </div>
      </div>

      {/* Big number/literal */}
      <div className="mt-8 font-display text-[38px] font-bold leading-none tracking-tight text-ink sm:text-[44px]">
        {fact.prefix}
        {display}
        {fact.suffix}
      </div>

      {/* Persian label */}
      <div className="mt-3 text-[13.5px] leading-tight text-ink-2">
        {fact.label}
      </div>

      {/* Latin sub-label */}
      <div
        className="mt-1.5 font-en-body text-[10.5px] uppercase tracking-[0.2em] text-ink-3"
        style={{ unicodeBidi: 'isolate' }}
      >
        {fact.sub}
      </div>

      {/* Bottom hairline accent that grows in on hover */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-0 bg-indigo transition-all duration-500 group-hover:w-full"
      />
    </motion.div>
  )
}

/**
 * Tiny inline SVG sparkline. Four variants give each card a slightly
 * different visual signature without breaking the row's rhythm.
 * Stroke uses currentColor so the parent can theme it.
 */
function Spark({ variant }: { variant: Fact['spark'] }) {
  if (variant === 'up') {
    return (
      <svg viewBox="0 0 64 24" fill="none" className="h-full w-full">
        <path
          d="M2 20 L14 16 L26 18 L36 11 L46 13 L62 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="62" cy="4" r="2.2" fill="currentColor" />
      </svg>
    )
  }
  if (variant === 'wave') {
    return (
      <svg viewBox="0 0 64 24" fill="none" className="h-full w-full">
        <path
          d="M2 12 C 10 4, 18 20, 26 12 S 42 4, 50 12 T 62 12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>
    )
  }
  if (variant === 'dots') {
    return (
      <svg viewBox="0 0 64 24" fill="currentColor" className="h-full w-full">
        {Array.from({ length: 7 }).map((_, i) => (
          <circle
            key={i}
            cx={4 + i * 9.5}
            cy={12}
            r={i === 3 ? 3 : 2}
            opacity={i === 3 ? 1 : 0.55}
          />
        ))}
      </svg>
    )
  }
  // pulse
  return (
    <svg viewBox="0 0 64 24" fill="none" className="h-full w-full">
      <path
        d="M2 12 L18 12 L22 4 L28 20 L34 8 L40 16 L46 12 L62 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
