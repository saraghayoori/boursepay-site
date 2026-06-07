import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import {
  products,
  productsBySlug,
  type ProductSlug,
} from '@/content/products'
import { cn } from '@/lib/cn'

/**
 * FeaturedProducts — concise spotlight card that radially unfolds out
 * of the active product chip in the Network section above.
 *
 * Motion:
 *   - We compute the active chip's x-position (matches the Network
 *     SVG coords) and use it as the origin of a clip-path circle
 *     animation: circle(0% at X% 0%) → circle(150% at X% 0%). The
 *     card materialises radially out of that exact point, paired with
 *     a subtle scale + opacity to soften the unfold.
 *   - On selection change, the previous card collapses back into its
 *     own chip (exit with the same circle clip) before the new card
 *     unfolds from its chip. Net effect: visitor sees the card
 *     literally "open out of" the name they just clicked.
 *
 * Card content is intentionally minimal — pill + timing, name +
 * Latin, one-liner, CTA. Everything else is on /products.
 */
const easeOut = [0.22, 1, 0.36, 1] as const

interface FeaturedProductsProps {
  selectedSlug: ProductSlug
}

export default function FeaturedProducts({ selectedSlug }: FeaturedProductsProps) {
  const active = productsBySlug[selectedSlug]
  const activeIdx = products.findIndex((p) => p.slug === selectedSlug)
  const isB2C = active.role === 'b2c'

  // Chips in the Network SVG sit at x = 120 + ((i+0.5)/4) * (W-240) on
  // a viewBox of 1200. Translate that into a 0-100% position along the
  // container so the clip-path origin lines up under the chip.
  const chipFraction = (activeIdx + 0.5) / products.length // 0..1 (left-to-right)
  // In RTL the container's first child sits on the right, but
  // percentages in clip-path still read left-to-right, so we invert.
  const originXPercent = 100 - (10 + chipFraction * 80)

  return (
    <Section tone="none" spacing="tight">
      <Container className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            initial={{
              clipPath: `circle(0% at ${originXPercent}% 0%)`,
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              clipPath: `circle(150% at ${originXPercent}% 0%)`,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              clipPath: `circle(0% at ${originXPercent}% 0%)`,
              opacity: 0,
              scale: 0.97,
            }}
            transition={{ duration: 0.55, ease: easeOut }}
            style={{
              transformOrigin: `${originXPercent}% top`,
              willChange: 'clip-path, transform, opacity',
            }}
            className="mx-auto max-w-2xl"
          >
            <Link
              to={`/products#${active.slug}`}
              className={cn(
                'group relative block overflow-hidden rounded-2xl border bg-paper p-6 transition-all duration-300 sm:p-7',
                'border-hairline hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(10,14,46,0.45)]',
                isB2C ? 'hover:border-coral/45' : 'hover:border-indigo/45',
              )}
            >
              {/* B2C whisper dot */}
              {isB2C && (
                <span
                  aria-hidden
                  className="absolute top-4 left-4 h-1.5 w-1.5 rounded-full bg-coral"
                />
              )}

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2 py-0.5',
                      'font-en-body text-[10px] font-semibold tracking-[0.16em] uppercase',
                      isB2C
                        ? 'bg-coral-soft text-coral'
                        : 'bg-mist/60 text-indigo',
                    )}
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {isB2C ? 'B2C' : 'B2B'} · {active.category}
                  </span>
                  <span
                    className="font-en-body text-[10px] tracking-[0.18em] uppercase text-ink-3"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {active.timing}
                  </span>
                </div>
                <span
                  className="font-en-display text-[12px] font-bold tracking-[0.2em] text-ink-4"
                  style={{ unicodeBidi: 'isolate' }}
                  aria-hidden
                >
                  0{activeIdx + 1}
                </span>
              </div>

              <h3 className="mt-5 font-display text-[28px] font-bold leading-none tracking-tight text-ink sm:text-[36px]">
                {active.name}
              </h3>
              <div
                className="mt-1.5 font-en-display italic text-[13.5px] text-ink-3"
                style={{ unicodeBidi: 'isolate' }}
              >
                {active.latin} · {active.kicker}
              </div>

              <p className="mt-4 text-[14.5px] leading-[1.8] text-ink-2">
                {active.oneLiner}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-hairline-2 pt-4">
                <span
                  className="font-en-body text-[9.5px] tracking-[0.2em] uppercase text-ink-3"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  open full page
                </span>
                <span
                  className={cn(
                    'flex items-center gap-1.5 text-[13px] font-medium transition-transform group-hover:-translate-x-1',
                    isB2C ? 'text-coral' : 'text-indigo',
                  )}
                >
                  <span>صفحه‌ی {active.name}</span>
                  <svg
                    width="13"
                    height="13"
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
                </span>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  )
}
