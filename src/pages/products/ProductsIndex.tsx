import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Pill from '@/components/ui/Pill'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import {
  products,
  productsBySlug,
  type ProductSlug,
} from '@/content/products'
import { cn } from '@/lib/cn'

/**
 * Products index — the *only* product surface.
 *
 * There are no dedicated /products/{slug} subpages. Every product
 * lives inside its own tab on this single page: its pill, name,
 * one-liner, pain-point quote, description, optional detail
 * paragraph, highlights, audience, and CTAs.
 *
 * Tab state is synced with the URL hash, so:
 *   /products#chabok    → opens the چابک tab on load
 *   /products#tiam      → opens the تیام tab
 *   …etc.
 *
 * This means in-banner carousel links elsewhere on the site
 * (Header dropdown, home-page ProductsGrid banner footer) can
 * deep-link directly to a tab via `/products#${slug}`.
 *
 * The active-tab indicator is a 2px bar that physically slides
 * between tabs via motion `layoutId`.
 */
const easeOut = [0.22, 1, 0.36, 1] as const

const isProductSlug = (s: string): s is ProductSlug =>
  s === 'chabok' || s === 'tiam' || s === 'hamta' || s === 'gift-card'

export default function ProductsIndex() {
  const location = useLocation()
  const navigate = useNavigate()
  const tabsRef = useRef<HTMLDivElement>(null)

  // Initial tab from URL hash (#chabok, #tiam, ...) — default to first.
  const hashSlug = location.hash.replace(/^#/, '')
  const initial = isProductSlug(hashSlug) ? hashSlug : products[0].slug

  const [activeSlug, setActiveSlug] = useState<ProductSlug>(initial)
  /** Set after mount so we know subsequent activeSlug changes are
   *  user-initiated tab clicks, not the initial render. */
  const mounted = useRef(false)

  // Keep the hash in sync with the active tab without triggering a
  // navigation spinner. `replace: true` avoids polluting history with
  // every tab switch.
  useEffect(() => {
    const desiredHash = `#${activeSlug}`
    if (location.hash !== desiredHash) {
      navigate({ pathname: '/products', hash: desiredHash }, { replace: true })
    }
    // We intentionally don't depend on `location.hash` here — that
    // would cause a feedback loop with navigate(). We re-run only when
    // the user changes the tab.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug])

  // Listen for external hash changes (e.g. a Link from another page
  // landing here with a different #slug).
  useEffect(() => {
    const slug = location.hash.replace(/^#/, '')
    if (isProductSlug(slug) && slug !== activeSlug) {
      setActiveSlug(slug)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash])

  // When the page is opened with a hash already in the URL (e.g.
  // arriving from a Network product chip on the home page), skip
  // past the hero and scroll directly to the tabs section so the
  // visitor lands on the product description, not the page intro.
  useEffect(() => {
    if (!location.hash) return
    if (!tabsRef.current) return
    // Defer to next frame so layout is settled before measuring.
    const id = requestAnimationFrame(() => {
      tabsRef.current?.scrollIntoView({
        behavior: mounted.current ? 'smooth' : 'auto',
        block: 'start',
      })
      mounted.current = true
    })
    return () => cancelAnimationFrame(id)
  }, [location.hash])

  const active = productsBySlug[activeSlug]
  const isB2C = active.role === 'b2c'

  return (
    <>
      <title>محصولات · بورس‌پی</title>
      <meta name="description" content="چابک، تیام، همتا و کارتِ هدیه — چهار محصولِ بورس‌پی روی یک ریلِ مشترک." />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cloud text-ink">
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

      {/* TABBED PRODUCTS BROWSER — scroll target when arriving with hash */}
      <Section tone="paper" spacing="loose">
        <Container>
          <div ref={tabsRef} className="scroll-mt-24">
          {/* Tab strip — horizontal scroll on mobile, sliding underline
              indicator via motion layoutId */}
          <div
            role="tablist"
            aria-label="محصولات"
            className="relative flex items-stretch gap-1 overflow-x-auto border-b border-hairline -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {products.map((p, i) => {
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
                      {`0${i + 1}`}
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

          {/* Active product detail panel — contains everything that
              used to live on the per-product page */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.42, ease: easeOut }}
              className="relative mt-10 grid gap-12 rounded-2xl border border-hairline bg-paper-2 p-8 lg:grid-cols-12 sm:p-12"
            >
              {/* Primary column (RTL → right): name, copy, pain point,
                  description + detail, CTAs */}
              <div className="relative lg:col-span-7">
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

                <h2 className="mt-6 font-display text-[44px] font-bold leading-none tracking-tight text-ink sm:text-[60px]">
                  {active.name}
                </h2>
                <div
                  className="mt-2 font-en-display italic text-[17px] text-ink-3"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {active.latin} · {active.kicker}
                </div>

                <p className="mt-7 max-w-xl text-[17px] leading-[1.85] text-ink-2 sm:text-[18px]">
                  {active.oneLiner}
                </p>

                {/* Pain-point pull-quote — replaces the dark editorial
                    strip from the old per-product page */}
                {active.painPoint && (
                  <div className="mt-8 max-w-xl border-r-2 border-accent/45 bg-cloud/85 px-5 py-4">
                    <div
                      className="font-en-body text-[10px] uppercase tracking-[0.22em] text-accent/80"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      the problem we solve
                    </div>
                    <p className="mt-2 font-display text-[16.5px] font-medium leading-[1.65] text-ink sm:text-[18px]">
                      «{active.painPoint}»
                    </p>
                  </div>
                )}

                {/* Description heading + body */}
                <div className="mt-10">
                  <div
                    className="font-en-body text-[11px] font-medium tracking-[0.18em] uppercase text-ink-3"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    Why {active.latin}?
                  </div>
                  <h3 className="mt-2 font-display text-[22px] font-bold text-ink sm:text-[26px]">
                    چرا {active.name}؟
                  </h3>
                  <p className="mt-4 max-w-xl text-[15.5px] leading-[1.9] text-ink-2 sm:text-[16.5px]">
                    {active.description}
                  </p>
                  {active.detail && (
                    <p className="mt-4 max-w-xl text-[14.5px] leading-[1.9] text-ink-2 sm:text-[15.5px]">
                      {active.detail}
                    </p>
                  )}
                </div>

                {/* CTAs */}
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button
                    as="link"
                    to="/contact"
                    size="lg"
                    bare
                    className="bg-navy-1 text-paper hover:bg-navy-2"
                  >
                    {isB2C ? 'دریافتِ کارت هدیه' : 'گفت‌وگو با تیمِ فنی'}
                  </Button>
                  <Button as="a" href="mailto:hello@boursepayment.com" size="lg" variant="ghost" bare>
                    <span className="font-en-body" style={{ unicodeBidi: 'isolate' }}>
                      hello@boursepayment.com
                    </span>
                  </Button>
                </div>
              </div>

              {/* Secondary column (RTL → left): in-one-glance card +
                  highlights checklist */}
              <aside className="relative lg:col-span-5">
                <div className="rounded-2xl border border-hairline bg-paper p-6">
                  <div
                    className="font-en-body text-[11px] font-medium tracking-[0.2em] uppercase text-sky"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    at a glance
                  </div>
                  <div className="mt-2 font-display text-[16px] font-bold text-ink">
                    در یک نگاه
                  </div>
                  <dl className="mt-5 space-y-4">
                    <GlanceRow term="مخاطب" value={active.audience} />
                    <GlanceRow term="زمانِ تسویه" value={active.timing} />
                    <GlanceRow term="دسته" value={active.category} />
                  </dl>
                </div>

                <div className="mt-6">
                  <div
                    className="font-en-body text-[11px] font-medium tracking-[0.2em] uppercase text-ink-3"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    highlights
                  </div>
                  <div className="mt-2 font-display text-[16px] font-bold text-ink">
                    نکاتِ کلیدی
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {active.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 rounded-xl border border-hairline-2 bg-paper p-4 text-[14px] leading-[1.7] text-ink-2"
                      >
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
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
            </motion.div>
          </AnimatePresence>
          </div>
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
            {/* Top tier: three product chips, each links to its tab */}
            <div className="grid gap-4 sm:grid-cols-3">
              {products
                .filter((p) => p.slug !== 'chabok')
                .map((p) => {
                  const tileB2C = p.role === 'b2c'
                  return (
                    <Link
                      key={p.slug}
                      to={`/products#${p.slug}`}
                      className="group relative rounded-xl border border-hairline bg-paper p-5 transition-all hover:border-indigo/30 hover:shadow-[0_18px_50px_-30px_rgba(10,14,46,0.4)]"
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
                    </Link>
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

            {/* Bottom tier: Chabok foundation — links to chabok tab */}
            <Link
              to="/products#chabok"
              className="group relative block overflow-hidden rounded-2xl bg-navy-1 px-8 py-7 text-paper transition-colors hover:bg-navy-2"
            >
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

function GlanceRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-hairline-2 pb-3 last:border-b-0 last:pb-0">
      <dt
        className="font-en-body text-[11px] uppercase tracking-[0.16em] text-ink-3"
        style={{ unicodeBidi: 'isolate' }}
      >
        {term}
      </dt>
      <dd className="text-[14px] font-medium text-ink">{value}</dd>
    </div>
  )
}
