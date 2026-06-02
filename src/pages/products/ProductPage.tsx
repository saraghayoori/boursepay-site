import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Pill from '@/components/ui/Pill'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ArcMotif from '@/components/brand/ArcMotif'
import { products, type Product } from '@/content/products'

interface Props {
  product: Product
}

/**
 * Shared template for all four product pages.
 *
 * Variety pattern (per Sara's "I want different things as I scroll"
 * feedback): light hero → painPoint editorial callout (full-width navy
 * strip) → description + highlights two-column → detail prose section →
 * other products grid. Each tier has a distinct surface and shape, so
 * scrolling feels like turning pages of a magazine, not flipping through
 * identical slides.
 *
 * B2C (Gift Card) gets only the whisper coral dot — no coral-soft
 * backgrounds or borders, per repeatedly-stated brand discipline.
 */
export default function ProductPage({ product }: Props) {
  const isB2C = product.role === 'b2c'
  const others = products.filter((p) => p.slug !== product.slug)

  return (
    <>
      <title>{product.name} · بورس‌پی</title>
      <meta name="description" content={product.oneLiner} />

      {/* HERO — light, brand arc decoration */}
      <section className="relative isolate overflow-hidden bg-cloud text-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[-160px] text-indigo/15"
        >
          <ArcMotif count={5} size={620} anchor="top-left" dot />
        </div>

        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            {isB2C && (
              <span
                aria-hidden
                className="absolute -top-2 right-0 h-2 w-2 rounded-full bg-coral"
              />
            )}

            <Pill tone={isB2C ? 'b2c' : 'b2b'} bare>
              {isB2C ? 'B2C' : 'B2B'} · {product.category}
            </Pill>

            <h1 className="mt-6 font-display font-bold leading-[1.02] tracking-tight text-[52px] text-ink sm:text-[72px] lg:text-[88px]">
              {product.name}
            </h1>
            <div
              className="mt-3 font-en-display italic text-[18px] text-ink-3"
              style={{ unicodeBidi: 'isolate' }}
            >
              {product.latin} · {product.kicker}
            </div>
            <p className="mt-7 max-w-2xl text-[18px] leading-[1.85] text-ink-2 sm:text-[19px]">
              {product.oneLiner}
            </p>

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
              <Button as="link" to="/products" size="lg" variant="secondary" bare>
                مرورِ همه‌ی محصولات
              </Button>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-hairline bg-paper p-7 backdrop-blur-sm">
              <Eyebrow tone="sky" bare>در یک نگاه</Eyebrow>
              <dl className="mt-5 space-y-4">
                <Row term="مخاطب" value={product.audience} />
                <Row term="زمانِ تسویه" value={product.timing} />
                <Row term="دسته" value={product.category} />
              </dl>
            </div>
          </aside>
        </Container>
      </section>

      {/* PAIN POINT — editorial dark strip */}
      {product.painPoint && (
        <section className="relative isolate overflow-hidden bg-navy-1 text-paper">
          <div className="pointer-events-none absolute -bottom-32 -right-24 text-sky/12">
            <ArcMotif count={4} size={460} anchor="bottom-right" dot={false} animate={false} />
          </div>
          <Container className="relative py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div
                className="font-en-body text-[10.5px] uppercase tracking-[0.22em] text-sky"
                style={{ unicodeBidi: 'isolate' }}
              >
                the problem we solve
              </div>
              <p className="mt-5 font-display text-[24px] font-medium leading-[1.6] text-paper sm:text-[32px]">
                «{product.painPoint}»
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* DESCRIPTION + HIGHLIGHTS */}
      <Section tone="paper">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow bare>محصول</Eyebrow>
            <Heading
              fa={`چرا ${product.name}؟`}
              en={`Why ${product.latin}?`}
              level={2}
              bare
              className="mt-3"
            />
            <p className="mt-6 text-[16.5px] leading-[1.95] text-ink-2">
              {product.description}
            </p>
            {product.detail && (
              <p className="mt-5 text-[15.5px] leading-[1.95] text-ink-2">
                {product.detail}
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            <ul className="space-y-3">
              {product.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-hairline bg-paper-2 p-5"
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4 10-10" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-[1.8] text-ink-2">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* OTHER PRODUCTS */}
      <Section tone="tint" spacing="normal">
        <Container>
          <Eyebrow bare>سایرِ محصولات</Eyebrow>
          <Heading fa="در همین خانواده" en="Same family" level={3} bare className="mt-3" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {others.map((p) => {
              const otherB2C = p.role === 'b2c'
              return (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="group relative rounded-xl border border-hairline bg-paper p-6 transition-all hover:shadow-[0_18px_50px_-30px_rgba(10,14,46,0.5)]"
                >
                  {otherB2C && (
                    <span
                      aria-hidden
                      className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-coral"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <Pill tone={otherB2C ? 'b2c' : 'b2b'} bare>
                      {otherB2C ? 'B2C' : 'B2B'}
                    </Pill>
                    <span className="text-[11px] text-ink-3">{p.category}</span>
                  </div>
                  <div className="mt-4 font-display text-[22px] font-bold text-ink">
                    {p.name}
                  </div>
                  <p className="mt-2 text-[13.5px] leading-[1.75] text-ink-3">{p.oneLiner}</p>
                </Link>
              )
            })}
          </div>
        </Container>
      </Section>
    </>
  )
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-hairline-2 pb-3 last:border-b-0 last:pb-0">
      <dt className="font-en-body text-[11px] uppercase tracking-[0.16em] text-ink-3">
        {term}
      </dt>
      <dd className="text-[14.5px] font-medium text-ink">{value}</dd>
    </div>
  )
}
