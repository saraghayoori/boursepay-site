import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Pill from '@/components/ui/Pill'
import Section from '@/components/ui/Section'
import ArcMotif from '@/components/brand/ArcMotif'
import { products, productsBySlug } from '@/content/products'

/**
 * Products index — overview of the four-product family.
 *
 * Visual rhythm here mirrors the home page approach: hero → 2x2 grid of
 * detailed product cards → "architecture" diagram showing how the three
 * B2B products and the B2C product all sit on top of the Chabok rail.
 * The diagram is unique to this page — it doesn't appear anywhere else,
 * so visitors who land here get something more than just a card grid.
 */
export default function ProductsIndex() {
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

      {/* PRODUCTS GRID */}
      <Section tone="paper" spacing="loose">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((p) => {
              const isB2C = p.role === 'b2c'
              return (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-hairline bg-paper-2 p-10 transition-all duration-300 hover:border-indigo/40 hover:shadow-[0_30px_80px_-40px_rgba(10,14,46,0.5)]"
                >
                  {isB2C && (
                    <span
                      aria-hidden
                      className="absolute top-5 left-5 h-1.5 w-1.5 rounded-full bg-coral"
                    />
                  )}

                  <div className="flex items-start justify-between">
                    <Pill tone={isB2C ? 'b2c' : 'b2b'} bare>
                      {isB2C ? 'B2C' : 'B2B'} · {p.category}
                    </Pill>
                    <span
                      className="font-en-body text-[11px] font-medium tracking-[0.16em] uppercase text-ink-3"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      {p.timing}
                    </span>
                  </div>

                  <div className="mt-8">
                    <h2 className="font-display text-[44px] font-bold leading-none text-ink">
                      {p.name}
                    </h2>
                    <div
                      className="mt-2 font-en-display italic text-[16px] text-ink-3"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      {p.latin} · {p.kicker}
                    </div>
                  </div>

                  <p className="mt-6 flex-1 text-[15.5px] leading-[1.85] text-ink-2">
                    {p.oneLiner}
                  </p>

                  {p.painPoint && (
                    <div className="mt-6 rounded-lg border-r-2 border-accent/40 bg-cloud/80 px-4 py-3 text-[13px] leading-[1.7] text-ink-2">
                      {p.painPoint}
                    </div>
                  )}

                  <div className="mt-7 flex items-center justify-between border-t border-hairline-2 pt-6">
                    <span className="text-[12.5px] text-ink-3">{p.audience}</span>
                    <span className="flex items-center gap-1.5 text-[14px] font-medium text-accent transition-transform group-hover:-translate-x-1">
                      <span>صفحه‌ی محصول</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )
            })}
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
            {/* Top tier: three product chips */}
            <div className="grid gap-4 sm:grid-cols-3">
              {products
                .filter((p) => p.slug !== 'chabok')
                .map((p) => {
                  const isB2C = p.role === 'b2c'
                  return (
                    <div
                      key={p.slug}
                      className="relative rounded-xl border border-hairline bg-paper p-5"
                    >
                      {isB2C && (
                        <span
                          aria-hidden
                          className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-coral"
                        />
                      )}
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-3">
                        <Pill tone={isB2C ? 'b2c' : 'b2b'} bare>
                          {isB2C ? 'B2C' : 'B2B'}
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
