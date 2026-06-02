import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Pill from '@/components/ui/Pill'
import Section from '@/components/ui/Section'
import ArcMotif from '@/components/brand/ArcMotif'
import { products, productsBySlug } from '@/content/products'
import { cn } from '@/lib/cn'

/**
 * Products index — overview of the four-product family.
 *
 * Per Sara's restored design: instead of a 2×2 card grid, the four
 * products live behind a horizontal tab strip. The active-tab indicator
 * is a single 2px bar that uses motion's `layoutId` so it physically
 * slides from one tab to the next when you click. Below the tabs sits
 * the detailed view of the selected product — pill, heading, copy,
 * highlights, pain point, audience and a link to the product page.
 *
 * The architecture diagram (Chabok-as-foundation) stays at the bottom
 * unchanged.
 */
const easeOut = [0.22, 1, 0.36, 1] as const

export default function ProductsIndex() {
  const [activeSlug, setActiveSlug] = useState(products[0].slug)
  const active = productsBySlug[activeSlug]
  const isB2C = active.role === 'b2c'

  return (
    <>
      <title>محصولات · بورس‌پی</title>
      <meta name="description" content="چابک، تیام، همتا و کارتِ هدیه — چهار محصولِ بورس‌پی روی یک ریلِ مشترک." />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cloud text-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[-200px] text-indigo/14"
        >
          <ArcMotif count={5} size={680} anchor="top-left" />
        </div>
        <Container className="relative py-24 sm:py-32">
          <Eyebrow tone="sky" bare>۰۴ · معماری محصول</Eyebrow>
          <Heading
            fa="یک ریل، چهار سناریو"
            en="One rail · four scenarios"
            level={1}
            bare
            className="mt-4 max-w-3xl"
          />
          <p className="mt-7 max-w-2xl text-[17px] leading-[1.85] text-ink-2">
            ما یک شرکت با چهار محصولِ پراکنده نیستیم. ما یک ریل ساختیم —
            <strong className="font-semibold text-indigo"> چابک </strong>
            — و سه محصولِ تخصصیِ بازارِ سرمایه و یک تجربه‌ی B2C را روی آن
            نشاندیم. هر محصول، پاسخی به یک سناریوی واقعی است که در عمل با آن
            روبرو شده‌ایم.
          </p>
        </Container>
      </section>

      {/* TABBED PRODUCTS BROWSER */}
      <Section tone="paper" spacing="loose">
        <Container>
          {/* Tab strip — horizontal scroll on mobile, sliding underline
              indicator via motion layoutId */}
          <div
            role="tablist"
            aria-label="محصولات"
            className="relative flex items-stretch gap-1 overflow-x-auto border-b border-hairline -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {products.map((p) => {
              const isActive = p.slug === activeSlug
              const tabIsB2C = p.role === 'b2c'
              return (
                <button
                  key={p.slug}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveSlug(p.slug)}
                  className={cn(
                    'group relative flex shrink-0 flex-col items-start gap-1 px-5 py-4 transition-colors duration-200 sm:px-7 sm:py-5',
                    isActive ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
                  )}
                >
                  {tabIsB2C && (
                    <span
                      aria-hidden
                      className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-coral"
                    />
                  )}
                  <span className="flex items-baseline gap-2">
                    <span
                      className={cn(
                        'font-en-display text-[12px] font-bold tracking-wider transition-colors',
                        isActive ? 'text-indigo' : 'text-ink-4',
                      )}
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      {`0${products.indexOf(p) + 1}`}
                    </span>
                    <span className="font-display text-[18px] font-bold sm:text-[20px]">
                      {p.name}
                    </span>
                  </span>
                  <span
                    className="font-en-display italic text-[12px] text-ink-3"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {p.latin}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="products-tab-bar"
                      className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-indigo"
                      transition={{ duration: 0.42, ease: easeOut }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Active product detail panel */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="relative mt-10 grid gap-10 rounded-2xl border border-hairline bg-paper-2 p-10 lg:grid-cols-12 sm:p-12"
            >
              {/* Left column (RTL → right): meta + name + description */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <Pill tone={isB2C ? 'b2c' : 'b2b'} bare>
                    {isB2C ? 'B2C' : 'B2B'} · {active.category}
                  </Pill>
                  <span
                    className="font-en-body text-[11px] font-medium tracking-[0.16em] uppercase text-ink-3"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {active.timing}
                  </span>
                </div>

                <h2 className="mt-6 font-display text-[44px] font-bold leading-none text-ink sm:text-[56px]">
                  {active.name}
                </h2>
                <div
                  className="mt-2 font-en-display italic text-[16px] text-ink-3"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {active.latin} · {active.kicker}
                </div>

                <p className="mt-6 max-w-xl text-[16px] leading-[1.9] text-ink-2">
                  {active.description}
                </p>

                {active.painPoint && (
                  <div className="mt-6 max-w-xl rounded-lg border-r-2 border-accent/40 bg-cloud/80 px-4 py-3 text-[13.5px] leading-[1.7] text-ink-2">
                    {active.painPoint}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between border-t border-hairline-2 pt-6">
                  <span className="text-[12.5px] text-ink-3">
                    {active.audience}
                  </span>
                  <Link
                    to={`/products/${active.slug}`}
                    className="flex items-center gap-1.5 text-[14px] font-medium text-accent transition-transform hover:-translate-x-1"
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
                  </Link>
                </div>
              </div>

              {/* Right column (RTL → left): highlights list */}
              <div className="lg:col-span-5">
                <div
                  className="font-en-body text-[11px] font-medium tracking-[0.18em] uppercase text-ink-3"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  highlights
                </div>
                <ul className="mt-4 space-y-3">
                  {active.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 rounded-xl border border-hairline-2 bg-paper p-4 text-[14px] leading-[1.7] text-ink-2"
                    >
                      <span className="mt-1.5 h-1 w-3 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>

      {/* ARCHITECTURE DIAGRAM */}
      <Section tone="tint" spacing="normal">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow tone="accent" bare>معماری</Eyebrow>
            <Heading
              fa="چابک، در زیر؛ سه محصول، در رو"
              en="Chabok below · three products above"
              level={2}
              bare
              className="mt-3"
            />
            <p className="mt-5 max-w-xl text-[15.5px] leading-[1.85] text-ink-2">
              این تصویر، تمامِ معماریِ بورس‌پی است. هرگاه چابک قوی‌تر شود،
              هر سه محصولِ بالاتر هم قوی‌تر می‌شوند.
            </p>
          </div>

          <div className="mt-12 grid gap-4">
            {/* Top tier: three product chips */}
            <div className="grid gap-4 sm:grid-cols-3">
              {products
                .filter((p) => p.slug !== 'chabok')
                .map((p) => {
                  const tileB2C = p.role === 'b2c'
                  return (
                    <div
                      key={p.slug}
                      className="relative rounded-xl border border-hairline bg-paper p-5"
                    >
                      {tileB2C && (
                        <span
                          aria-hidden
                          className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-coral"
                        />
                      )}
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-3">
                        <Pill tone={tileB2C ? 'b2c' : 'b2b'} bare>
                          {tileB2C ? 'B2C' : 'B2B'}
                        </Pill>
                      </div>
                      <div className="mt-4 font-display text-[20px] font-bold text-ink">
                        {p.name}
                      </div>
                      <div
                        className="font-en-display italic text-[12.5px] text-ink-3"
                        style={{ unicodeBidi: 'isolate' }}
                      >
                        {p.latin}
                      </div>
                    </div>
                  )
                })}
            </div>

            {/* Vertical "rests on" arrows */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex justify-center text-ink-3">
                  <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                    <path
                      d="M7 1v18M2 14l5 6 5-6"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ))}
            </div>

            {/* Bottom tier: Chabok foundation */}
            <Link
              to="/products/chabok"
              className="group relative block overflow-hidden rounded-2xl bg-navy-1 px-8 py-7 text-paper transition-colors hover:bg-navy-2"
            >
              <div className="pointer-events-none absolute -bottom-12 -left-12 text-sky/20">
                <ArcMotif count={4} size={220} anchor="bottom-left" dot={false} animate={false} />
              </div>
              <div className="relative flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <div
                    className="font-en-body text-[10.5px] uppercase tracking-[0.2em] text-sky"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    foundation · the switch
                  </div>
                  <div className="mt-2 font-display text-[28px] font-bold text-paper">
                    {productsBySlug.chabok.name}
                  </div>
                  <p className="mt-1 text-[13.5px] leading-[1.7] text-paper/70">
                    {productsBySlug.chabok.oneLiner}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-[13.5px] font-medium text-mist transition-transform group-hover:-translate-x-1">
                  <span>درباره‌ی چابک</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
