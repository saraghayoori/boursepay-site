import { useState } from 'react'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ContactVisual from '@/components/brand/ContactVisual'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'

/**
 * Contact page.
 *
 * Variety map:
 *  1. Hero — light, two-column: copy on the right, "what to expect"
 *     check-list on the left. Different from the home Hero.
 *  2. Channels — three cards (phone / email / sales) with hover
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
    a: 'برای مشتریانِ نهادی، یک مهندسِ پشتیبانِ مشخص و یک SLA رسمی داریم. در بقیه‌ی موارد، در ساعاتِ کاری پاسخگوی تلفن و ایمیل هستیم.',
  },
]

export default function ContactPage() {
  return (
    <>
      <title>تماس · بورس‌پی</title>
      <meta name="description" content="با تیمِ بورس‌پی در تماس باشید — تلفن و ایمیل." />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cloud text-ink">
        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="sky">تماس</Eyebrow>
            <Heading
              fa="بیایید گفت‌وگو کنیم."
              en="Let's talk"
              level={1}
              className="mt-4"
            />
            <p className="mt-7 max-w-xl text-[17.5px] leading-[1.9] text-ink-2">
              ساده‌ترین راهِ ارتباط با ما، تلفن یا ایمیل است.
              برای گفت‌وگوی فنی، عددی، فروش یا همکاری — پاسخ یکی است:
              ظرفِ یک روزِ کاری برمی‌گردیم.
            </p>

            {/* What to expect — moved below as a smaller chip row so the
                visual on the right has its own breathing room */}
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <Bullet>پاسخ از یک نفرِ مشخص، نه فرمِ خودکار</Bullet>
              <Bullet>اگر فنی نوشته‌اید، مهندسِ زمینه‌تان پاسخ می‌دهد</Bullet>
              <Bullet>پیشنهادِ روشن، با مرزِ مشخصِ «بله/خیر»</Bullet>
              <Bullet>هیچ ایمیلِ مارکتینگیِ ناخواسته نمی‌گیرید</Bullet>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ContactVisual />
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
            {/* Phone */}
            <a
              href={`tel:${site.contact.phone}`}
              className="group rounded-2xl border border-hairline bg-paper-2 p-7 transition-all hover:border-emerald/40 hover:shadow-[0_18px_50px_-30px_rgba(31,138,91,0.4)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="mt-5 font-display text-[20px] font-bold text-ink">
                تلفن
              </div>
              <div
                className="mt-1 font-en-body text-[14.5px] text-ink-2 group-hover:text-emerald"
                style={{ unicodeBidi: 'isolate' }}
              >
                {site.contact.phone}
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-3">
                در ساعاتِ کاری، مستقیم با تیمِ ما صحبت کنید.
              </p>
            </a>

            {/* Email — general */}
            <a
              href={`mailto:${site.contact.info}`}
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
                {site.contact.info}
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-3">
                برای سوال‌های فنی، یکپارچه‌سازی، یا مستندات.
              </p>
            </a>

            {/* Sales / Demo */}
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
                فروش و دمو
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
