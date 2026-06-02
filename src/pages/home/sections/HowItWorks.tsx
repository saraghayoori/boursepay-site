import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import OrnamentDots from '@/components/brand/OrnamentDots'
import OrnamentCurve from '@/components/brand/OrnamentCurve'

/**
 * "How it works" — a three-step editorial diagram.
 *
 * Visual rhythm of the page goes: Hero (text + visual) → TrustStrip
 * (numbers) → HowItWorks (diagram). The diagram introduces *motion* as
 * its primary device — each step is a numbered card and the SVG arc
 * between them draws in when scrolled into view. The arc is the brand
 * motif applied to the page flow itself, not just to a decorative
 * corner.
 *
 * On mobile the steps stack vertically and the connecting arcs are
 * replaced with subtle vertical down-arrows. Desktop layout is a
 * 3-column horizontal flow with two arc connectors (mirrored RTL so
 * the visual reading direction matches the Persian copy).
 */

interface Step {
  num: string
  title: string
  latin: string
  body: string
}

const steps: Step[] = [
  {
    num: '۰۱',
    title: 'درخواست',
    latin: 'Request',
    body:
      'سامانه‌ی شما — صندوق، کارگزاری یا اپلیکیشن — یک فراخوانِ ساده‌ی API به بورس‌پی می‌فرستد. هیچ فایلِ اکسلی، هیچ امضای دستی‌ای.',
  },
  {
    num: '۰۲',
    title: 'مسیریابی',
    latin: 'Switching',
    body:
      'چابک، با استفاده از اتصالاتِ بانکداریِ باز، بهترین بانکِ مقصد را انتخاب می‌کند. تراکنش‌ها idempotent اجرا می‌شوند — یعنی نه دوبار، نه نصفه.',
  },
  {
    num: '۰۳',
    title: 'تسویه',
    latin: 'Settlement',
    body:
      'پولِ گیرنده در کوتاه‌ترین زمان قابلِ برداشت است. سامانه‌ی شما webhook را دریافت می‌کند، گزارشِ مالیاتی آماده می‌شود.',
  },
]

export default function HowItWorks() {
  return (
    <Section tone="none" spacing="normal">
      <Container className="relative">
        {/* Orbit ornament on the far-left, beside the section header */}
        <div className="pointer-events-none absolute -left-2 top-2 hidden text-indigo/35 lg:block">
          <OrnamentDots variant="orbit" tone="indigo" opacity={0.5} width={110} />
        </div>

        {/* Quarter-arc rising on the right edge, brand-book echo */}
        <div className="pointer-events-none absolute right-0 top-0 hidden text-sky/40 lg:block">
          <OrnamentCurve
            variant="rise"
            width={120}
            strokeWidth={1}
            dotTone="sky"
            duration={2.1}
            delay={0.3}
          />
        </div>

        <div className="relative max-w-2xl">
          <Eyebrow>۰۲ · ساختار</Eyebrow>
          <Heading
            fa="سه گام، سریع و قطعی"
            en="Three steps · fast and final"
            level={2}
            className="mt-3"
          />
          <p className="mt-5 max-w-xl text-[15.5px] leading-[1.85] text-ink-2">
            بینِ لحظه‌ای که سرمایه‌گذار «تأیید» می‌زند تا لحظه‌ای که پولش
            قابلِ برداشت است، یک سفرِ سه‌مرحله‌ای روی ریلِ ما اتفاق می‌افتد.
          </p>
        </div>

        {/* Desktop: 3-column with two connecting arcs */}
        <div className="relative mt-16 hidden md:block">
          <ConnectorArc side="right" />
          <ConnectorArc side="left" />

          <div className="relative grid grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <StepCard key={s.num} step={s} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack with down arrows */}
        <div className="mt-12 flex flex-col gap-4 md:hidden">
          {steps.map((s, i) => (
            <div key={s.num}>
              <StepCard step={s} index={i} />
              {i < steps.length - 1 && (
                <div className="flex justify-center py-4 text-ink-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14" />
                    <path d="M5 12l7 7 7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative rounded-2xl border border-hairline bg-paper p-7 shadow-[0_18px_50px_-40px_rgba(10,14,46,0.4)]"
    >
      <div className="flex items-baseline justify-between">
        <div
          className="font-en-display text-[44px] font-bold leading-none text-indigo/85"
          style={{ unicodeBidi: 'isolate' }}
        >
          {step.num}
        </div>
        <div
          className="font-en-body text-[10px] uppercase tracking-[0.18em] text-ink-3"
          style={{ unicodeBidi: 'isolate' }}
        >
          {step.latin}
        </div>
      </div>
      <h3 className="mt-7 font-display text-[24px] font-bold text-ink">
        {step.title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.85] text-ink-2">{step.body}</p>
    </motion.div>
  )
}

/**
 * One of the two arc connectors between step cards.
 * Sits absolutely above the grid; the arc is drawn in with a stroke-dash
 * animation triggered by useInView. Designed to be invisible until the
 * step row appears, then to "wire up" the steps as you scroll.
 */
function ConnectorArc({ side }: { side: 'left' | 'right' }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  // Position: arc between col-1 and col-2 (right side in RTL) OR
  // between col-2 and col-3 (left side in RTL). Because the grid is
  // 3 equal columns with gap, we anchor to those columns by percentage.
  const positionStyle =
    side === 'right'
      ? { right: 'calc(33.333% - 28px)', width: '120px' }
      : { left: 'calc(33.333% - 28px)', width: '120px' }

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 60"
      fill="none"
      style={{ ...positionStyle, position: 'absolute', top: '-12px' }}
      className="pointer-events-none z-0"
      aria-hidden
    >
      <motion.path
        d="M 2 50 Q 60 0 118 50"
        stroke="var(--color-sky)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.55 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
      <motion.circle
        cx="60"
        cy="14"
        r="3"
        fill="var(--color-coral)"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.5 }}
      />
    </svg>
  )
}
