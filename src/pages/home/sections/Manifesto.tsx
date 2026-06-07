import { motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import ArcMotif from '@/components/brand/ArcMotif'
import { ParallelCurves } from '@/components/brand/BrandPatterns'

/**
 * Manifesto — a big editorial pull-quote that breaks the page rhythm.
 *
 * The home page tends to fall into a cards / grid / cards / grid pattern.
 * This section is intentionally NOT a grid: it's a single editorial
 * paragraph centered on the page, with a large opening quotation glyph
 * and a tiny attribution underneath. The visual weight comes from
 * typography, not from cards or boxes.
 *
 * Visually it sits between the products grid and the audience grid as
 * a "breath" — the page goes: counters → diagram → products → quote →
 * audience → CTA. Each transition is to a *different shape*.
 */
export default function Manifesto() {
  return (
    <Section tone="none" spacing="loose">
      <Container size="narrow">
        {/* Faint arc, far corner, no animation */}
        <div className="pointer-events-none absolute -bottom-20 right-[-100px] hidden text-indigo/8 sm:block">
          <ArcMotif count={4} size={420} anchor="bottom-right" dot={false} animate={false} />
        </div>

        {/* Brand-book parallel-curves rhythmic background (low opacity)
            — three parallel Q-curves with a dot at each midpoint.
            Floods the section with quiet motion without competing
            with the quote. */}
        <div className="pointer-events-none absolute right-0 top-8 hidden text-indigo/35 lg:block">
          <ParallelCurves
            width={360}
            count={3}
            strokeWidth={1}
            opacity={0.45}
            dotTone="indigo"
            duration={1.6}
          />
        </div>
        <div className="pointer-events-none absolute left-0 bottom-12 hidden text-sky/40 lg:block">
          <ParallelCurves
            width={300}
            count={3}
            strokeWidth={1}
            opacity={0.45}
            dotTone="sky"
            duration={1.6}
            delay={0.3}
          />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          {/* The giant opening quotation glyph, in the brand serif */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-en-display text-[120px] leading-[0.6] text-indigo/22 sm:text-[160px]"
            style={{ unicodeBidi: 'isolate' }}
            aria-hidden
          >
            “
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-[26px] font-medium leading-[1.7] tracking-tight text-ink sm:text-[34px]"
          >
            ما به این باور رسیدیم که پرداختِ بازارِ سرمایه{' '}
            <span className="text-indigo">یک حوزه‌ی مستقل</span> است.{' '}
            <span className="text-ink-2">
              نه شعبه‌ای از پرداختِ خرد، نه پسوندی برای بانکداریِ شرکتی.
            </span>{' '}
            ابزارهایش، مجوزهایش، و فرهنگِ ساخت‌اش — همه باید متفاوت باشد.
            بورس‌پی، شرکتی است که این تفاوت را جدی می‌گیرد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-3 text-ink-3"
          >
            <span className="h-px w-10 bg-hairline" />
            <span className="text-[13px]">تیمِ بنیان‌گذارِ بورس‌پی</span>
            <span className="h-px w-10 bg-hairline" />
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
