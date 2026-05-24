import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import ArcMotif from '@/components/brand/ArcMotif'

/**
 * Closing CTA — light page-level CTA above the dark footer.
 *
 * Per Sara's note about wanting variety not background changes, this
 * section keeps the light palette but adds a two-column layout: the
 * headline + buttons live on the right (RTL primary), and a small
 * "what happens after you book" mini-card sits on the left so the
 * visitor knows exactly what comes next. This treatment is different
 * from any other section above it.
 */
export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden text-ink">
      <div className="pointer-events-none absolute -bottom-32 -left-32 text-indigo/14">
        <ArcMotif count={5} size={620} anchor="bottom-left" dot />
      </div>

      <Container className="relative py-24 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Primary column (RTL = right) */}
          <div className="lg:col-span-7">
            <Eyebrow tone="sky">گفت‌وگوی بعدی</Eyebrow>
            <h2 className="mt-4 font-display text-[36px] font-bold leading-[1.1] text-ink sm:text-[52px]">
              یک گفت‌وگوی ۳۰ دقیقه‌ای —{' '}
              <span className="text-indigo">با تیمِ فنیِ ما، نه فروش.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.95] text-ink-2 sm:text-[17px]">
              سناریوی شما را — صندوق، کارگزاری، یکپارچه‌سازیِ بانکی یا تجربه‌ی
              کاربری — می‌نشینیم بررسی می‌کنیم. اگر ابزارِ ما برای کارِ شما مناسب
              نباشد، با صراحت می‌گوییم.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                as="link"
                to="/contact"
                size="lg"
                className="bg-navy-1 text-paper hover:bg-navy-2"
              >
                درخواستِ گفت‌وگو
              </Button>
              <Button
                as="a"
                href="mailto:hello@boursepayment.com"
                size="lg"
                variant="ghost"
                className="text-ink hover:bg-ink/5"
              >
                <span className="font-en-body" style={{ unicodeBidi: 'isolate' }}>
                  hello@boursepayment.com
                </span>
              </Button>
            </div>
          </div>

          {/* Secondary column — "what happens next" mini-card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-hairline bg-paper p-7 shadow-[0_18px_60px_-30px_rgba(10,14,46,0.35)]">
              <div
                className="font-en-body text-[10.5px] uppercase tracking-[0.2em] text-ink-3"
                style={{ unicodeBidi: 'isolate' }}
              >
                what happens next
              </div>
              <h3 className="mt-3 font-display text-[19px] font-bold text-ink">
                پس از تماس، چه می‌شود
              </h3>
              <ol className="mt-5 space-y-4 text-[13.5px] leading-[1.7] text-ink-2">
                <NextStep n="۱" t="پاسخ در ۱ روزِ کاری" b="ایمیلِ مستقیمِ یک عضو از تیم — نه فرمِ خودکار." />
                <NextStep n="۲" t="یک جلسه‌ی فنیِ کوتاه" b="۳۰ دقیقه، روی Google Meet، با مهندسِ زمینه‌ی شما." />
                <NextStep n="۳" t="پیشنهادِ مشخص" b="اگر مناسب باشد، طرحِ یکپارچه‌سازی روی میز قرار می‌گیرد." />
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function NextStep({ n, t, b }: { n: string; t: string; b: string }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-en-display text-[12px] font-bold text-accent">
        {n}
      </span>
      <div>
        <div className="font-medium text-ink">{t}</div>
        <div className="mt-0.5 text-[12.5px] text-ink-3">{b}</div>
      </div>
    </li>
  )
}
