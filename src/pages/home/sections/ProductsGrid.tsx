import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import ArcMotif from '@/components/brand/ArcMotif'
import { products } from '@/content/products'
import { cn } from '@/lib/cn'

/**
 * ProductsGrid — carousel of equal-size product banners.
 *
 * Per Sara's restored design: navigation lives *inside* the banner as
 * two chevron arrows pinned to the left and right edges. There is no
 * "0۱…0۴" indicator row or "محصول بعدی" button below — the only
 * controls are the two in-banner arrows.
 *
 * RTL nav semantics: clicking the LEFT arrow (chevron pointing left)
 * advances to the next product, since RTL reading flows right→left.
 * Clicking the RIGHT arrow (chevron pointing right) goes back.
 *
 * Animation: each banner slides in from one side and out the other,
 * driven by AnimatePresence keyed on the product slug. We track the
 * direction (`+1` forward, `-1` back) so the slide motion matches the
 * user's intent.
 *
 * Variety inside the banner is provided by a coral whisper dot on the
 * B2C product only — consistent with the rest of the site.
 */
const easeOut = [0.22, 1, 0.36, 1] as const

export default function ProductsGrid() {
  const [idx, setIdx] = useState(0)
  const [direction, setDirection] = useState(1)

  const product = products[idx]
  const isB2C = product.role === 'b2c'

  const goPrev = () => {
    setDirection(-1)
    setIdx((i) => (i - 1 + products.length) % products.length)
  }
  const goNext = () => {
    setDirection(1)
    setIdx((i) => (i + 1) % products.length)
  }

  return (
    <Section tone="none" spacing="normal">
      <Container>
        {/* Header — legacy styling (inline, intentionally not using
            the refined Eyebrow/Heading primitives) */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div
              className="font-en-body text-[11px] uppercase tracking-[0.18em] font-medium text-sky"
              style={{ unicodeBidi: 'isolate' }}
            >
              ۰۲ · محصولات
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              <h2 className="font-display font-bold text-ink text-[30px] sm:text-[40px] leading-[1.1] tracking-tight">
                چهار محصول، یک ریل
              </h2>
              <div
                className="font-en-display italic text-[14px] sm:text-[16px] text-ink-3"
                style={{ unicodeBidi: 'isolate' }}
              >
                Four products · one rail
              </div>
            </div>
            <p className="mt-5 max-w-xl text-[15.5px] leading-[1.85] text-ink-2">
              هر محصول، یک سناریوی پرداختِ بازارِ سرمایه را حل می‌کند. ورق بزنید.
            </p>
          </div>
          <Link
            to="/products"
            className="self-start whitespace-nowrap text-[14px] font-medium text-accent transition-transform hover:-translate-x-1 sm:self-end"
          >
            همه را یکجا ببینید →
          </Link>
        </div>

        {/* Carousel banner */}
        <div className="relative mt-12 overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="relative bg-navy-1 p-10 text-paper sm:p-14"
            >
              {/* B2C whisper dot */}
              {isB2C && (
                <span
                  aria-hidden
                  className="absolute top-6 left-6 h-2 w-2 rounded-full bg-coral"
                />
              )}

              {/* Brand arc decoration */}
              <div className="pointer-events-none absolute -top-24 left-[-120px] text-sky/22">
                <ArcMotif
                  count={5}
                  size={480}
                  anchor="top-left"
                  dot={false}
                  animate={false}
                />
              </div>

              {/* Subtle gradient depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background:
                    'radial-gradient(60% 80% at 80% 20%, rgba(111,143,206,0.18), transparent 60%)',
                }}
              />

              {/* Banner content — inset on the sides so the arrows have
                  breathing room and don't overlap the text */}
              <div className="relative grid items-end gap-10 px-12 sm:px-14 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5',
                        'text-[11px] font-en-body font-semibold tracking-wider uppercase',
                        isB2C
                          ? 'bg-coral/20 text-coral-2'
                          : 'bg-sky/20 text-mist',
                      )}
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      {isB2C ? 'B2C' : 'B2B'} · {product.category}
                    </span>
                    <span
                      className="font-en-body text-[10.5px] uppercase tracking-[0.18em] text-paper/55"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      {product.kicker}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-[48px] font-bold leading-[1.05] tracking-tight sm:text-[64px]">
                    {product.name}
                  </h3>
                  <div
                    className="mt-2 font-en-display italic text-[16px] text-paper/55"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {product.latin}
                  </div>
                  <p className="mt-5 max-w-xl text-[16px] leading-[1.85] text-paper/82 sm:text-[17px]">
                    {product.oneLiner}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <ul className="space-y-3 border-r border-paper/12 pr-6">
                    {product.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-[13.5px] text-paper/85"
                      >
                        <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-coral" />
                        <span className="leading-[1.7]">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative mt-10 flex items-center justify-between border-t border-paper/10 px-12 pt-6 sm:px-14">
                <span className="text-[13px] text-paper/55">
                  {product.audience}
                </span>
                <Link
                  to={`/products/${product.slug}`}
                  className="flex items-center gap-1.5 text-[14px] font-medium text-mist transition-transform hover:-translate-x-1"
                >
                  <span>صفحه‌ی {product.name}</span>
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
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* In-banner navigation arrows. Positioned absolutely so they
              stay pinned during the slide animation of the banner
              contents. RTL semantics: left chevron = forward, right
              chevron = back. Each arrow is a circular ghost button
              that lifts on hover. */}
          <button
            type="button"
            onClick={goNext}
            aria-label="محصولِ بعدی"
            className="group absolute left-4 top-1/2 z-20 -translate-y-1/2 sm:left-5"
          >
            <span
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full',
                'bg-paper/10 text-paper backdrop-blur-md',
                'border border-paper/15',
                'transition-all duration-300',
                'group-hover:bg-paper/22 group-hover:border-paper/30 group-hover:scale-[1.05]',
                'group-active:scale-95',
              )}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            onClick={goPrev}
            aria-label="محصولِ قبلی"
            className="group absolute right-4 top-1/2 z-20 -translate-y-1/2 sm:right-5"
          >
            <span
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full',
                'bg-paper/10 text-paper backdrop-blur-md',
                'border border-paper/15',
                'transition-all duration-300',
                'group-hover:bg-paper/22 group-hover:border-paper/30 group-hover:scale-[1.05]',
                'group-active:scale-95',
              )}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        </div>
      </Container>
    </Section>
  )
}
