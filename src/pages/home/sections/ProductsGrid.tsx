import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Pill from '@/components/ui/Pill'
import Section from '@/components/ui/Section'
import ArcMotif from '@/components/brand/ArcMotif'
import { products } from '@/content/products'
import { cn } from '@/lib/cn'

/**
 * ProductsGrid — carousel of equal-size product banners.
 *
 * Per Sara's redesign brief: she didn't want Chabok privileged with a
 * big banner while the others were small cards. All four products now
 * use the same full-width banner. A "محصول بعدی" button and a
 * `۰۱ … ۰۴` indicator row at the bottom let the visitor flip through
 * them.
 *
 * Animation: each banner slides in from one side and out the other,
 * driven by AnimatePresence keyed on the product slug. We track the
 * direction (`+1` forward, `-1` back) so the slide motion matches the
 * user's intent — clicking 03 from 01 slides forward, clicking 01
 * from 03 slides back. "محصول بعدی" always slides forward (wraps
 * 04 → 01 without feeling like reverse).
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

  const goTo = (next: number) => {
    setDirection(next > idx ? 1 : -1)
    setIdx(next)
  }
  const goNext = () => {
    setDirection(1)
    setIdx((i) => (i + 1) % products.length)
  }

  return (
    <Section tone="none" spacing="normal">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>۰۲ · محصولات</Eyebrow>
            <Heading
              fa="چهار محصول، یک ریل"
              en="Four products · one rail"
              level={2}
              className="mt-3"
            />
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

              <div className="relative grid items-end gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2">
                    <Pill
                      tone={isB2C ? 'b2c' : 'b2b'}
                      className={cn(
                        isB2C
                          ? 'bg-coral/20 text-coral-2'
                          : 'bg-sky/20 text-mist',
                      )}
                    >
                      {isB2C ? 'B2C' : 'B2B'} · {product.category}
                    </Pill>
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

              <div className="relative mt-10 flex items-center justify-between border-t border-paper/10 pt-6">
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
        </div>

        {/* Indicator row + Next button */}
        <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5 overflow-x-auto sm:gap-7">
            {products.map((p, i) => {
              const active = i === idx
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    'group flex shrink-0 items-center gap-2.5 py-1 transition-colors',
                    active ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
                  )}
                  aria-label={p.name}
                  aria-current={active}
                >
                  <span
                    className={cn(
                      'font-en-display text-[20px] font-bold transition-colors',
                      active ? 'text-indigo' : 'text-ink-3 group-hover:text-ink-2',
                    )}
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {`0${i + 1}`}
                  </span>
                  <span className="text-[13.5px] font-medium">{p.name}</span>
                  {active && (
                    <span className="ml-1 h-[2px] w-6 rounded-full bg-indigo" />
                  )}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="group flex items-center justify-end gap-2 text-[14px] font-medium text-accent transition-transform hover:-translate-x-1"
          >
            <span>محصول بعدی</span>
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
          </button>
        </div>
      </Container>
    </Section>
  )
}
