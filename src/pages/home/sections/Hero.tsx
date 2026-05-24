import { motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import ArcMotif from '@/components/brand/ArcMotif'
import HeroVisual from './HeroVisual'

const easeOut = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-ink">
      {/* Layer 1 — ambient cool blob, top-right (visual side) */}
      <div
        aria-hidden
        className="ambient-cool pointer-events-none absolute inset-y-0 left-[-15%] w-[70%] opacity-65 blur-3xl"
      />

      {/* Layer 2 — dot grid texture, masked so edges fade out */}
      <div
        aria-hidden
        className="dot-grid-soft dot-mask-radial pointer-events-none absolute inset-0"
      />

      {/* Layer 3 — faint brand arc, far corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-200px] hidden text-indigo/12 sm:block"
      >
        <ArcMotif count={5} size={620} anchor="top-right" dot={false} />
      </div>

      <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-10 lg:py-36">
        {/* Text column (RTL: appears on the right) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <Eyebrow tone="sky">
              ۰۱ · بورس‌پی ·{' '}
              <span style={{ unicodeBidi: 'isolate' }}>boursepayment</span>
            </Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
            className="mt-6 font-display text-[44px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[60px] lg:text-[74px]"
          >
            <span className="block">پرداختِ تخصصی،</span>
            <span className="block text-indigo">آنی و قطعی</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.16 }}
            className="mt-7 max-w-2xl text-[17px] leading-[1.85] text-ink-2 sm:text-[18.5px]"
          >
            بورس‌پی، ریلِ پرداختِ تخصصیِ بازارِ سرمایه است.{' '}
            <em className="not-italic font-medium text-indigo">
              ۲۱ بانک، مجوزِ سازمانِ بورس، تسویه‌ی{' '}
              <span style={{ unicodeBidi: 'isolate' }}>T+۰</span>.
            </em>{' '}
            پشتِ صندوق‌ها، کارگزاری‌ها و پلتفرم‌هایی که تخصصی فکر می‌کنند.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.24 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button
              as="link"
              to="/products"
              size="lg"
              className="bg-navy-1 text-paper hover:bg-navy-2"
            >
              چهار محصولِ ما
            </Button>
            <Button
              as="link"
              to="/contact"
              size="lg"
              variant="ghost"
              className="text-ink hover:bg-ink/5"
            >
              <span>گفت‌وگو با تیمِ فنی</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-180"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-hairline pt-8"
          >
            <Pillar value="آنی" proof="تسویه در زیرِ یک ثانیه" />
            <Pillar value="امن" proof="با مجوزِ سازمانِ بورس" />
            <Pillar value="تخصصی" proof="فقط بازارِ سرمایه" />
          </motion.div>
        </div>

        {/* Visual column (RTL: appears on the left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  )
}

function Pillar({ value, proof }: { value: string; proof: string }) {
  return (
    <div>
      <div className="font-display text-[30px] font-bold leading-none text-indigo">
        {value}
      </div>
      <div className="mt-3 text-[12.5px] leading-[1.55] text-ink-3">{proof}</div>
    </div>
  )
}
