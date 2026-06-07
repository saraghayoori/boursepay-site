import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import ArcMotif from '@/components/brand/ArcMotif'
import AboutVisual from '@/components/brand/AboutVisual'
import FlourishLine from '@/components/brand/FlourishLine'
import {
  CornerArcsWithDots,
  ParallelCurves,
} from '@/components/brand/BrandPatterns'

/**
 * About page.
 *
 * Variety map (top to bottom):
 *  1. Dark hero — strong brand statement, navy surface with arc.
 *  2. Numbered manifesto — three short stanzas, no boxes.
 *  3. Values 2x2 — cards with a custom corner mark.
 *  4. Timeline — vertical year/event list, intentionally different
 *     visual shape from anything above.
 *  5. Persona block — single editorial paragraph centered.
 *  6. Closing strip — a quote on tint background.
 */

const stanzas = [
  {
    n: '۰۱',
    t: 'تخصصِ بازارِ سرمایه را عمق می‌دانیم',
    b: 'نه گستره. در یک باریکه‌ی روشن می‌مانیم و عمیق‌تر از هر کسی در آن کار می‌کنیم. ما عمداً به بازارِ پرداختِ خرده‌فروشی، تجارتِ الکترونیک یا بازارهای دیگر نمی‌رویم — انتخاب‌مان است.',
  },
  {
    n: '۰۲',
    t: 'سرعت، استانداردِ پایه است',
    b: 'دیر تسویه شدن، یک «ویژگیِ نباشد» نیست؛ یک شکست است. ما تسویه‌ی سریع را به‌مثابه‌ی خدمت تعریف کرده‌ایم، نه ویژگیِ اضافه.',
  },
  {
    n: '۰۳',
    t: 'معماری گشوده، نه قفل‌بازی',
    b: 'API‌ها، مستندات، یکپارچه‌سازی — همه گشوده، استاندارد، و قابلِ مهاجرت. اعتمادِ مشتری زمانی واقعی است که هر لحظه بتواند برود.',
  },
]

const values = [
  {
    n: '۰۱',
    title: 'اعتمادِ به ارث‌رسیده',
    body:
      'اعتماد در بازارِ سرمایه با تبلیغ ساخته نمی‌شود. با مجوز، با سابقه، با پاسخگویی ساخته می‌شود — هر سه را داریم.',
  },
  {
    n: '۰۲',
    title: 'صراحت در گفت‌وگو',
    body:
      'اگر محصولِ ما برای سناریوی شما مناسب نیست، با صراحت می‌گوییم. فروشِ بد، برای هیچ‌کس بُرد نیست.',
  },
  {
    n: '۰۳',
    title: 'ساخت در آرامش',
    body:
      'بیش از حد سر و صدا نمی‌کنیم. کارمان را در سکوت می‌کنیم و عددها را به‌جای کلمات نمایش می‌دهیم.',
  },
  {
    n: '۰۴',
    title: 'مالکیتِ عملیاتی',
    body:
      'هر تراکنشی که از ریلِ ما عبور می‌کند، یک نفرِ مشخص در تیمِ ما مسئولِ آن است. مسئولیت، شخصی است.',
  },
]

const timeline = [
  {
    year: '۱۴۰۰',
    title: 'شروع از یک سوال',
    body:
      'اگر تسویه‌ی بازارِ سرمایه به‌جای روزها، در کوتاه‌ترین زمان انجام شود، اقتصادِ صندوق‌ها چه شکلی می‌شود؟',
  },
  {
    year: '۱۴۰۱',
    title: 'اولین اتصالاتِ بانکی',
    body:
      'سه بانکِ اول. اولین تسویه‌ی آزمایشی و سریع روی ریلِ بانکداریِ باز.',
  },
  {
    year: '۱۴۰۲',
    title: 'مجوزِ تخصصیِ سازمان بورس',
    body:
      'گرفتنِ مجوز رسمی برای ارائه‌ی خدماتِ پرداختِ تخصصیِ بازارِ سرمایه.',
  },
  {
    year: '۱۴۰۳',
    title: 'تیام و همتا',
    body:
      'دو محصولِ تخصصی روی ریلِ چابک. اولین صندوق‌ها و کارگزاری‌های فعالِ روی پنل.',
  },
  {
    year: '۱۴۰۴',
    title: 'کارتِ هدیه و توسعه‌ی B2C',
    body:
      'گشودنِ درگاهِ ورودِ نسلِ تازه به بازار — یک سهم به جای جعبه‌ی شکلات.',
  },
]

export default function AboutPage() {
  return (
    <>
      <title>درباره · بورس‌پی</title>
      <meta name="description" content="بورس‌پی · شرکتی که ریل‌های پرداختِ بازار سرمایه را تخصصی ساخت." />

      {/* HERO — dark, with companion AboutVisual on the left side */}
      <section className="relative isolate overflow-hidden bg-navy-1 text-paper">
        {/* Brand book §25: Arc motif on dark surfaces uses sky stroke
            at 25-45% — bump opacity to brand-spec minimum */}
        <div className="pointer-events-none absolute -bottom-32 right-[-180px] text-sky/35">
          <ArcMotif count={5} size={640} anchor="bottom-right" />
        </div>
        {/* Brand-book "corner arcs with dots" decoration top-right */}
        <div className="pointer-events-none absolute top-0 right-0 hidden text-sky/35 lg:block">
          <CornerArcsWithDots
            anchor="top-right"
            count={4}
            size={320}
            strokeWidth={1.1}
            opacity={0.5}
            dotTone="sky"
            duration={1.8}
          />
        </div>
        {/* Brand-book parallel-curves background in the bottom-left */}
        <div className="pointer-events-none absolute left-0 bottom-8 hidden text-sky/30 lg:block">
          <ParallelCurves
            width={340}
            count={4}
            opacity={0.4}
            dotTone="sky"
            duration={1.6}
            delay={0.5}
          />
        </div>

        <Container className="relative grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="sky">درباره‌ی ما</Eyebrow>
            <Heading
              fa={
                <>
                  پرداخت،<br />
                  <span className="text-sky">سریع و تخصصی</span>
                </>
              }
              en="Payment — fast and specialist"
              level={1}
              tone="paper"
              className="mt-4 max-w-3xl"
            />
            <p className="mt-8 max-w-2xl text-[17.5px] leading-[1.85] text-paper/78">
              بورس‌پی یک شرکتِ زیرساختِ پرداخت است که فقط برای بازارِ سرمایه ساخته
              شده. ما تسویه‌ی سریع را روی بازاری ممکن کردیم که سال‌ها با چک، مهر و
              انتظارِ بانک سر و کار داشت. شرکت‌ها از ما می‌پرسند که چرا فقط بازارِ
              سرمایه — جواب ساده است: چون این تنها کاری است که می‌خواهیم به‌خوبیِ
              تمام انجامش بدهیم.
            </p>

            {/* Brand-book "branch" connector — one origin (الان), three
                destinations (محصول، مجوز، تیم) — visualises «از یک
                اندیشه به سه بُعد می‌رسیم» */}
            <div className="mt-10 hidden text-sky/55 lg:block">
              <FlourishLine
                variant="branch"
                width={280}
                strokeWidth={1.3}
                originTone="indigo"
                destTone="sky"
                pathOpacity={0.55}
                duration={1.6}
                delay={0.8}
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <AboutVisual />
          </div>
        </Container>
      </section>

      {/* MANIFESTO — three numbered stanzas, no boxes */}
      <Section tone="paper" spacing="loose">
        <Container size="narrow">
          <Eyebrow>بیانیه</Eyebrow>
          <Heading
            fa="سه جمله که هر روز با خودمان تکرار می‌کنیم"
            en="Three sentences, every day"
            level={2}
            className="mt-3"
          />

          <div className="mt-14 space-y-12">
            {stanzas.map((s) => (
              <div key={s.n} className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-2">
                  <div
                    className="font-en-display text-[44px] font-bold leading-none text-indigo/30"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {s.n}
                  </div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-display text-[22px] font-bold leading-tight text-ink sm:text-[26px]">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.95] text-ink-2">
                    {s.b}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* VALUES — 2x2 cards */}
      <Section tone="tint" spacing="normal">
        <Container size="narrow">
          <Eyebrow>ارزش‌های پایه</Eyebrow>
          <Heading fa="چهار اصل" en="Four anchors" level={2} className="mt-3" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="relative rounded-2xl border border-hairline bg-paper p-7"
              >
                <div
                  className="absolute right-7 top-7 font-en-display text-[14px] font-bold text-accent/55"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {v.n}
                </div>
                <h3 className="font-display text-[22px] font-bold text-ink">
                  {v.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.85] text-ink-2">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* TIMELINE — vertical year/event list */}
      <Section tone="paper" spacing="normal">
        <Container size="narrow">
          <Eyebrow tone="accent">تاریخچه</Eyebrow>
          <Heading
            fa="مسیری که آمده‌ایم"
            en="The road so far"
            level={2}
            className="mt-3"
          />

          <ol className="mt-14 space-y-10 border-r-2 border-hairline pr-6">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span
                  aria-hidden
                  className="absolute right-[-31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-paper bg-indigo"
                />
                <div
                  className="font-en-body text-[11px] uppercase tracking-[0.2em] text-ink-3"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {t.year}
                </div>
                <h3 className="mt-2 font-display text-[22px] font-bold text-ink">
                  {t.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[14.5px] leading-[1.85] text-ink-2">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* PERSONA — single editorial block */}
      <section className="relative isolate overflow-hidden bg-navy-1 text-paper">
        <div className="pointer-events-none absolute -bottom-32 -left-32 text-sky/14">
          <ArcMotif count={4} size={520} anchor="bottom-left" dot animate={false} />
        </div>
        <Container size="narrow" className="relative py-24 sm:py-28">
          <Eyebrow tone="sky">شخصیتِ برند</Eyebrow>
          <Heading
            fa="۳۴ ساله · رسمیِ راحت"
            en="34 years old · formally relaxed"
            level={2}
            tone="paper"
            className="mt-3"
          />
          <p className="mt-8 text-[17px] leading-[1.95] text-paper/78">
            ما نه یک استارت‌آپِ سر و صداگو هستیم، نه یک شرکتِ بزرگ و کند. جایی
            میانِ این دو — جدی، آرام، دقیق. در گفت‌وگو با مشتری، شریک می‌نشینیم
            نه فروشنده. در کارِ روزانه، با اعتماد به نفسِ بی‌سر و صدا کارمان را
            انجام می‌دهیم. اگر شما بخواهید لحنِ ما را در یک کلمه توصیف کنید،
            احتمالاً می‌گویید: <span className="text-sky font-medium">حرفه‌ای</span>.
          </p>
        </Container>
      </section>
    </>
  )
}
