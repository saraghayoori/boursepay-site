import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { BigNumberCorner } from '@/components/brand/BrandPatterns'
import {
  products,
  productsBySlug,
  type ProductSlug,
} from '@/content/products'
import { cn } from '@/lib/cn'

/**
 * FeaturedProducts — spotlight card for the currently-selected
 * product from the Network section above.
 *
 * Behaviour:
 *   - Takes a `selectedSlug` prop (lifted to HomePage). Whichever
 *     product the visitor clicked in the Network section determines
 *     which card is shown.
 *   - The card swaps with an animated transition (fade + lift) when
 *     the selection changes.
 *   - The card itself is a React Router `Link` to /products#slug, so
 *     clicking the card takes the visitor to the full product page
 *     tab. Inner CTA reinforces this with a clear "صفحه‌ی X →" call.
 *
 * Layout:
 *   - A single big spotlight card (no 2×2 grid). Takes full width of
 *     the container.
 *   - Big number corner decoration with the product's index.
 *   - Persian name + Latin · kicker · one-liner on the right (RTL
 *     primary), B2B/B2C pill + timing badge + audience block on
 *     the left. CTA strip at the bottom.
 */
const easeOut = [0.22, 1, 0.36, 1] as const

interface FeaturedProductsProps {
  selectedSlug: ProductSlug
}

export default function FeaturedProducts({ selectedSlug }: FeaturedProductsProps) {
  const active = productsBySlug[selectedSlug]
  const activeIdx = products.findIndex((p) => p.slug === selectedSlug)
  const isB2C = active.role === 'b2c'

  return (
    <Section tone="none" spacing="normal">
      <Container className="relative">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>۰۴ · محصولِ انتخاب‌شده</Eyebrow>
            <Heading
              fa="کارتِ محصول"
              en="Spotlight card"
              level={2}
              className="mt-3"
            />
            <p className="mt-5 max-w-xl text-[15.5px] leading-[1.85] text-ink-2">
              نامِ هر محصول را در بخشِ شبکه‌ی بالا که می‌زنید، کارتِ کاملش
              همین‌جا باز می‌شود. روی کارت کلیک کنید تا واردِ صفحه‌ی همان
              محصول شوید.
            </p>
          </div>
        </div>

        {/* Spotlight card — swaps with AnimatePresence when slug changes */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.42, ease: easeOut }}
            className="mt-10"
          >
            <Link
              to={`/products#${active.slug}`}
              className={cn(
                'group relative block overflow-hidden rounded-3xl border bg-paper p-8 transition-all duration-300 sm:p-12',
                'border-hairline hover:-translate-y-1 hover:shadow-[0_44px_100px_-50px_rgba(10,14,46,0.55)]',
                isB2C ? 'hover:border-coral/40' : 'hover:border-indigo/40',
              )}
            >
              {/* Big faint index corner per brand book §26-04 */}
              <BigNumberCorner
                n={activeIdx + 1}
                position="top-left"
                size={120}
                opacity={0.07}
                tone={isB2C ? 'navy' : 'indigo'}
              />

              {/* B2C whisper dot */}
              {isB2C && (
                <span
                  aria-hidden
                  className="absolute top-6 left-6 z-10 h-2 w-2 rounded-full bg-coral"
                />
              )}

              <div className="relative grid items-start gap-10 lg:grid-cols-12">
                {/* Primary column (RTL → right): name, copy, CTA */}
                <div className="lg:col-span-7">
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

                  <p className="mt-7 max-w-xl text-[16px] leading-[1.9] text-ink-2 sm:text-[18px]">
                    {active.oneLiner}
                  </p>

                  {active.painPoint && (
                    <div className="mt-7 max-w-xl border-r-2 border-accent/45 bg-cloud/85 px-5 py-4">
                      <div
                        className="font-en-body text-[10px] uppercase tracking-[0.22em] text-accent/80"
                        style={{ unicodeBidi: 'isolate' }}
                      >
                        the problem we solve
                      </div>
                      <p className="mt-2 font-display text-[15.5px] font-medium leading-[1.7] text-ink sm:text-[17px]">
                        «{active.painPoint}»
                      </p>
                    </div>
                  )}
                </div>

                {/* Secondary column (RTL → left): audience + top 3 highlights */}
                <aside className="lg:col-span-5">
                  <div className="rounded-2xl border border-hairline bg-paper-2 p-6">
                    <div
                      className="font-en-body text-[10.5px] font-medium tracking-[0.2em] uppercase text-sky"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      audience
                    </div>
                    <div className="mt-2 font-display text-[15px] font-bold text-ink">
                      مخاطبِ این محصول
                    </div>
                    <p className="mt-3 text-[14px] leading-[1.75] text-ink-2">
                      {active.audience}
                    </p>
                  </div>

                  <div className="mt-5">
                    <div
                      className="font-en-body text-[10.5px] font-medium tracking-[0.2em] uppercase text-ink-3"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      highlights
                    </div>
                    <ul className="mt-3 space-y-2">
                      {active.highlights.slice(0, 3).map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-3 text-[13.5px] leading-[1.7] text-ink-2"
                        >
                          <span
                            className={cn(
                              'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                              isB2C
                                ? 'bg-coral/12 text-coral'
                                : 'bg-indigo/12 text-indigo',
                            )}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12l4 4 10-10" />
                            </svg>
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
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
