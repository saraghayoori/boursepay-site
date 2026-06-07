import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { BigNumberCorner } from '@/components/brand/BrandPatterns'
import {
  products,
  productsBySlug,
  type ProductSlug,
} from '@/content/products'
import { cn } from '@/lib/cn'

/**
 * FeaturedProducts — concise spotlight card that opens downward from
 * the matching product name in the Network section above.
 *
 * Behaviour:
 *   - No section header. The card *is* the section — it picks up
 *     visually where the Network's product chip leaves off.
 *   - Opens with a "drawer reveal": clip-path inset(0 0 100% 0) →
 *     inset(0 0 0% 0), combined with a small downward translate and
 *     opacity, so the card appears to drop out of the chip above.
 *   - The whole card is a Link to /products#slug.
 *
 * Content is intentionally minimal: pill + timing, big name +
 * Latin/kicker, one-liner, CTA strip. Pain point, audience and
 * highlights are reserved for the full /products page.
 */
const easeOut = [0.22, 1, 0.36, 1] as const

interface FeaturedProductsProps {
  selectedSlug: ProductSlug
}

export default function FeaturedProducts({ selectedSlug }: FeaturedProductsProps) {
  const active = productsBySlug[selectedSlug]
  const activeIdx = products.findIndex((p) => p.slug === selectedSlug)
  const isB2C = active.role === 'b2c'

  // Where along the row the active chip sits (0 → far-right in RTL,
  // 1 → far-left). Used to anchor the connector + transform-origin
  // so the card visually "opens" out of the active chip.
  const chipPosition = (activeIdx + 0.5) / products.length
  // SVG coords match the Network diagram: viewBox 1200 wide, chips
  // spaced from x=120 to x=W-120 (see Network.tsx). Translate that
  // into a percent for transform-origin.
  const originXPercent = 100 - (10 + chipPosition * 80)

  return (
    <Section tone="none" spacing="tight">
      <Container className="relative">
        {/* Connector — a thin vertical hairline that drops from the
            chip position above into the top edge of the card */}
        <div
          aria-hidden
          className="relative h-10 -mt-4"
        >
          <motion.div
            key={`connector-${active.slug}`}
            className={cn(
              'absolute top-0 h-full w-px',
              isB2C ? 'bg-coral/60' : 'bg-indigo/60',
            )}
            style={{ left: `${originXPercent}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.28, ease: easeOut }}
            // Origin top so it grows down out of the chip
            // (transform: scaleY around top)
          >
            <span className="block h-full w-full origin-top" />
          </motion.div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            initial={{
              clipPath: 'inset(0 0 100% 0)',
              opacity: 0,
              y: -12,
            }}
            animate={{
              clipPath: 'inset(0 0 0% 0)',
              opacity: 1,
              y: 0,
            }}
            exit={{
              clipPath: 'inset(0 0 100% 0)',
              opacity: 0,
              y: -8,
            }}
            transition={{ duration: 0.5, ease: easeOut }}
            style={{
              // Subtle: card visually unfolds out of the chip column
              transformOrigin: `${originXPercent}% top`,
            }}
          >
            <Link
              to={`/products#${active.slug}`}
              className={cn(
                'group relative block overflow-hidden rounded-3xl border bg-paper p-8 transition-all duration-300 sm:p-12',
                'border-hairline hover:-translate-y-1 hover:shadow-[0_40px_90px_-50px_rgba(10,14,46,0.5)]',
                isB2C ? 'hover:border-coral/40' : 'hover:border-indigo/40',
              )}
            >
              {/* Big faint index corner per brand book §26-04 */}
              <BigNumberCorner
                n={activeIdx + 1}
                position="top-left"
                size={112}
                opacity={0.06}
                tone={isB2C ? 'navy' : 'indigo'}
              />

              {/* B2C whisper dot */}
              {isB2C && (
                <span
                  aria-hidden
                  className="absolute top-6 left-6 z-10 h-2 w-2 rounded-full bg-coral"
                />
              )}

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5',
                      'font-en-body text-[10.5px] font-semibold tracking-[0.16em] uppercase',
                      isB2C
                        ? 'bg-coral-soft text-coral'
                        : 'bg-mist/60 text-indigo',
                    )}
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {isB2C ? 'B2C' : 'B2B'} · {active.category}
                  </span>
                  <span
                    className="font-en-body text-[10.5px] tracking-[0.18em] uppercase text-ink-3"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {active.timing}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-[48px] font-bold leading-none tracking-tight text-ink sm:text-[68px]">
                  {active.name}
                </h3>
                <div
                  className="mt-3 font-en-display italic text-[16px] text-ink-3 sm:text-[18px]"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {active.latin} · {active.kicker}
                </div>

                <p className="mt-6 max-w-2xl text-[16px] leading-[1.9] text-ink-2 sm:text-[18px]">
                  {active.oneLiner}
                </p>
              </div>

              {/* Footer CTA strip */}
              <div className="relative mt-10 flex items-center justify-between border-t border-hairline-2 pt-6">
                <span
                  className="font-en-body text-[10.5px] tracking-[0.22em] uppercase text-ink-3"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  open the full product page
                </span>
                <span
                  className={cn(
                    'flex items-center gap-1.5 text-[14.5px] font-medium transition-transform group-hover:-translate-x-1',
                    isB2C ? 'text-coral' : 'text-indigo',
                  )}
                >
                  <span>صفحه‌ی {active.name}</span>
                  <svg
                    width="14"
                    height="14"
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
