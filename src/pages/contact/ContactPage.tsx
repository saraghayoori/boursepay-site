import { useState } from 'react'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ArcMotif from '@/components/brand/ArcMotif'
import OrnamentDots from '@/components/brand/OrnamentDots'
import FlourishLine from '@/components/brand/FlourishLine'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'

/**
 * Contact page.
 *
 * Variety map:
 *  1. Hero — light, two-column: copy on the right, "what to expect"
 *     check-list on the left. Different from the home Hero.
 *  2. Channels — three cards (email / whatsapp / sales) with hover
 *     accents, each a different brand color (accent / emerald / coral)
 *     so the row feels lively, not uniform.
 *  3. FAQ — accordion-style collapsibles. New shape on the page.
 *  4. Closing strip — dark navy CTA, mirrors the Footer's color
 *     scheme so the transition into the Footer feels intentional.
 */

interface FaqItem {
  q: string
  a: string
}

const faqs: FaqItem[] = [
  {
    q: 'حداقلِ حجمِ ماهانه‌ی تراکنش برای کار با بورس‌پی چقدر است؟',
    a: 'برای محصولاتِ B2B (تیام، همتا، چابک) سقفِ پایینی نمی‌گذاریم، اما عملاً برای صندوق‌ها و کارگزاری‌های نهادی منطقی‌تر هستیم. اگر یک حجمِ خاص در ذهن دارید، در گفت‌وگوی فنی صریح بگوییم آیا اقتصادِ آن برای دو طرف معقول است.',
  },
  {
    q: 'یکپارچه‌سازی با ریلِ چابک چقدر طول می‌کشد؟',
    a: 'برای یک تیمِ فنیِ معمولی، یکپارچه‌سازیِ پایه دو تا چهار هفته است. ما مستندات، sandbox و یک مهندسِ پشتیبان اختصاص می‌دهیم. اگر سامانه‌ی شما اعداد و امضای دیجیتالِ بانکی دارد، احتمالاً نزدیک به دو هفته خواهد بود.',
  },
  {
    q: 'آیا اطلاعات و پرداخت‌های ما رمزنگاری می‌شود؟',
    a: 'بله. سوییچِ چابک با مجوز سازمانِ بورس و اوراق بهادار کار می‌کند، روی پروتکل‌های امنِ بانکی سوار است، و داده‌های حساس در حالتِ استراحت و در عبور رمزنگاری می‌شوند.',
  },
  {
    q: 'اگر ابزارِ شما برای سناریوی ما مناسب نباشد، چه؟',
    a: 'به‌صراحت می‌گوییم. در گفت‌وگوی اولیه‌ی فنی، اگر معماری یا سناریوی شما با محصولِ ما هم‌خوانی ندارد، شفاف اعلام می‌کنیم. فروشِ بد، برای هیچ‌کس بُرد نیست.',
  },
  {
    q: 'پشتیبانیِ شما به چه صورت است؟',
    a: 'برای مشتریانِ نهادی، یک کانالِ مستقیمِ شِت با مهندسِ پشتیبان و یک SLA رسمی داریم. برای محصولِ B2C (کارتِ هدیه)، پاسخگوی ایمیل و واتساپ در ساعاتِ کاری هستیم.',
  },
]

export default function ContactPage() {
  const whatsApp = site.contact.whatsapp.replace(/\D/g, '')
  const whatsAppUrl = `https://wa.me/${whatsApp}`

  return (
    <>
      <title>تماس · بورس‌پی</title>
      <meta name="description" content="با تیمِ بورس‌پی گفت‌وگو کنید — درخواست دمو، فروش، یا سوال فنی." />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cloud text-ink">
        <div className="pointer-events-none absolute -top-32 right-[-180px] text-indigo/15">
          <ArcMotif count={5} size={620} anchor="top-right" />
        </div>

        {/* Constellation in the lower-right of the hero */}
        <div className="pointer-events-none absolute bottom-6 right-6 hidden text-sky/45 md:block">
          <OrnamentDots
            variant="constellation"
            tone="sky"
            opacity={0.55}
            width={150}
          />
        </div>

        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="sky">تماس</Eyebrow>
            <div className="relative mt-4 inline-block">
              <Heading
                fa="بیایید گفت‌وگو کنیم."
                en="Let's talk"
                level={1}
              />
              {/* Hand-drawn underline beneath the Persian heading */}
              <span className="absolute right-0 -bottom-1 text-coral/65">
                <FlourishLine
                  variant="underline"
                  width={320}
                  strokeWidth={1.8}
                  duration={1.4}
                  delay={0.5}
                />
              </span>
            </div>
            <p className="mt-7 max-w-xl text-[17.5px] leading-[1.9] text-ink-2">
              ساده‌ترین راهِ ارتباط با ما، یکی از کانال‌های پایین است.
              برای گفت‌وگوی فنی، عددی، فروش یا همکاری — هر سه با یک پاسخِ
              مشترک: ظرفِ یک روزِ کاری برمی‌گردیم.
            </p>
          </div>

          {/* What to expect — light card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-hairline bg-paper p-7">
              <Eyebrow tone="accent">پاسخی که از ما می‌گیرید</Eyebrow>
              <ul className="mt-5 space-y-4 text-[14px] text-ink-2">
                <Bullet>پاسخ از یک نفرِ مشخص، نه فرمِ خودکار</Bullet>
                <Bullet>اگر فنی نوشته‌اید، مهندسِ زمینه‌تان پاسخ می‌دهد</Bullet>
                <Bullet>پیشنهادِ روشن، با مرزِ مشخصِ «بله/خیر»</Bullet>
                <Bullet>هیچ ایمیلِ مارکتینگیِ ناخواسته بعدش نمی‌گیرید</Bullet>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CHANNELS */}
      <Section tone="paper" spacing="normal">
        <Container>
          <Eyebrow>کانال‌ها</Eyebrow>
          <Heading
            fa="کدام راه برای شما بهتر است؟"
            en="Pick a channel"
            level={2}
            className="mt-3"
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {/* Email */}
            <a
              href={`mailto:${site.contact.email}`}
              className="group rounded-2xl border border-hairline bg-paper-2 p-7 transition-all hover:border-accent/40 hover:shadow-[0_18px_50px_-30px_rgba(10,14,46,0.4)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </div>
              <div className="mt-5 font-display text-[20px] font-bold text-ink">
                ایمیل
              </div>
              <div
                className="mt-1 font-en-body text-[14.5px] text-ink-2 group-hover:text-accent"
                style={{ unicodeBidi: 'isolate' }}
              >
                {site.contact.email}
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-3">
                برای سوال‌های فنی، یکپارچه‌سازی، یا مستندات.
              </p>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-hairline bg-paper-2 p-7 transition-all hover:border-emerald/40 hover:shadow-[0_18px_50px_-30px_rgba(31,138,91,0.4)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div className="mt-5 font-display text-[20px] font-bold text-ink">
                واتساپ
              </div>
              <div
                className="mt-1 font-en-body text-[14.5px] text-ink-2 group-hover:text-emerald"
                style={{ unicodeBidi: 'isolate' }}
              >
                {site.contact.whatsapp}
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-3">
                پاسخِ سریع، در ساعاتِ کاری.
              </p>
            </a>

            {/* Sales */}
            <a
              href={`mailto:${site.contact.sales}?subject=${encodeURIComponent('درخواست دمو · بورس‌پی')}`}
              className="group rounded-2xl border border-hairline bg-paper-2 p-7 transition-all hover:border-coral/40 hover:shadow-[0_18px_50px_-30px_rgba(224,116,74,0.4)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10 text-coral">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h4l3-9 4 18 3-9h4" />
                </svg>
              </div>
              <div className="mt-5 font-display text-[20px] font-bold text-ink">
                درخواستِ دمو
              </div>
              <div
                className="mt-1 font-en-body text-[14.5px] text-ink-2 group-hover:text-coral"
                style={{ unicodeBidi: 'isolate' }}
              >
                {site.contact.sales}
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-3">
                با یک مهندسِ بورس‌پی، روی سناریوی واقعیِ شما.
              </p>
            </a>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="tint" spacing="normal">
        <Container size="narrow">
          <Eyebrow>سوال‌های رایج</Eyebrow>
          <Heading
            fa="پیش از تماس، شاید این‌ها به دردتان بخورد"
            en="Before you reach out"
            level={2}
            className="mt-3"
          />

          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <FaqRow key={i} item={f} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CLOSING — dark strip */}
      <section className="relative isolate overflow-hidden bg-navy-1 text-paper">
        <div className="pointer-events-none absolute -bottom-32 -left-32 text-sky/14">
          <ArcMotif count={5} size={520} anchor="bottom-left" dot animate={false} />
        </div>
        <Container className="relative py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="sky" className="justify-center">جمع‌بندی</Eyebrow>
            <h2 className="mt-4 font-display text-[28px] font-bold leading-[1.2] text-paper sm:text-[40px]">
              کوتاه‌ترین مسیر:{' '}
              <span className="text-sky">
                یک ایمیلِ پنج‌خطی به ما.
              </span>
            </h2>
            <p className="mt-6 text-[15.5px] leading-[1.9] text-paper/72">
              بنویسید چه ساخته‌اید، چه می‌سازید، و کجا فکر می‌کنید بورس‌پی ممکن
              است در آن دخیل باشد. ظرفِ یک روزِ کاری، یک نفر از تیم برمی‌گردد.
            </p>
            <div className="mt-9 flex justify-center">
              <Button
                as="a"
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent('گفت‌وگو · بورس‌پی')}`}
                size="lg"
                className="bg-paper text-navy-1 hover:bg-mist"
              >
                نوشتنِ ایمیل
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l4 4 10-10" />
        </svg>
      </span>
      <span className="text-[14px] leading-[1.7]">{children}</span>
    </li>
  )
}

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-hairline bg-paper">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-right transition-colors hover:bg-paper-2"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3">
          <span
            className="font-en-display text-[14px] font-bold text-accent/70"
            style={{ unicodeBidi: 'isolate' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[15.5px] font-medium leading-[1.55] text-ink">
            {item.q}
          </span>
        </div>
        <span
          className={cn(
            'shrink-0 text-ink-3 transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="border-t border-hairline-2 px-6 py-5 text-[14px] leading-[1.95] text-ink-2">
          {item.a}
        </div>
      )}
    </div>
  )
}
