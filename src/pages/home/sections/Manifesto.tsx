import { motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import ArcMotif from '@/components/brand/ArcMotif'
import OrnamentCurve from '@/components/brand/OrnamentCurve'
import OrnamentDots from '@/components/brand/OrnamentDots'

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

        {/* Top-center ornament arc — bridges the products section
            to the manifesto, draws in as the quote enters view */}
        <div className="pointer-events-none absolute left-1/2 top-6 hidden -translate-x-1/2 text-indigo/30 sm:block">
          <OrnamentCurve
            variant="arch"
            width={200}
            strokeWidth={1.1}
            dotTone="coral"
            duration={1.6}
            delay={0.2}
          />
        </div>

        {/* Constellation of dots on the right side, atmospheric */}
        <div className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 text-sky/55 md:block">
          <OrnamentDots
            variant="constellation"
            tone="sky"
            opacity={0.55}
            width={140}
          />
        </div>

        {/* Trail of dots on the left side, suggesting motion into the quote */}
        <div className="pointer-events-none absolute left-2 bottom-12 hidden md:block">
          <OrnamentDots
            variant="trail"
            tone="indigo"
            opacity={0.45}
            width={160}
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
