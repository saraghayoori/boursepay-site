import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Eyebrow from '@/components/ui/Eyebrow'

/**
 * Trust strip — second "voice" of the page.
 *
 * Replaces the old flat 4-number row. Now the section has its own
 * eyebrow + a single line of editorial copy, then four counters that
 * animate up from zero when they enter the viewport. Each counter also
 * has a small supporting sub-label so it isn't just a number floating
 * in space. This is the visual equivalent of a "second breath" before
 * the products section, breaking up the page rhythm.
 */
interface Fact {
  /** Final numeric value the counter rolls to. Use null for static facts. */
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
}

const facts: Fact[] = [
  { value: 21, suffix: '+', label: 'بانکِ متصل', sub: 'banking partners' },
  {
    value: null,
    literal: 'سریع',
    label: 'سرعتِ تسویه',
    sub: 'fast finality',
  },
  { value: 99.9, suffix: '٪', label: 'پایداریِ سوییچ', sub: 'monthly uptime' },
  { value: 50, suffix: '+', label: 'صندوقِ فعال', sub: 'institutional clients' },
]

export default function TrustStrip() {
  return (
    <Section tone="none" spacing="tight">
      <Container>
        <div className="border-y border-hairline py-14">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow tone="sky">در نگاهِ عدد</Eyebrow>
              <h2 className="mt-3 font-display text-[26px] font-bold leading-tight text-ink sm:text-[30px]">
                دستاوردهای عینی بورس‌پی
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-8 md:grid-cols-4">
              {facts.map((f) => (
                <Counter key={f.label} fact={f} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/**
 * Single counter cell — animates from 0 → fact.value when in view.
 * Uses requestAnimationFrame to keep rendering smooth at 60fps.
 * Skips animation entirely for facts that don't have a numeric value
 * (e.g. "سریع") and just shows the literal.
 */
function Counter({ fact }: { fact: Fact }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState<string>(() =>
    fact.value === null ? fact.literal ?? '' : '0',
  )

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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased

      // Persian-localized number formatting. Decimals only for non-integers.
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
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <div className="font-display text-[36px] font-bold leading-none text-ink sm:text-[40px]">
        {fact.prefix}
        {display}
        {fact.suffix}
      </div>
      <div className="mt-3 text-[12.5px] leading-tight text-ink-2">
        {fact.label}
      </div>
      <div
        className="mt-1 font-en-body text-[10.5px] uppercase tracking-[0.18em] text-ink-3"
        style={{ unicodeBidi: 'isolate' }}
      >
        {fact.sub}
      </div>
    </motion.div>
  )
}
