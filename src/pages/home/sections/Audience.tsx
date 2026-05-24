import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Pill from '@/components/ui/Pill'
import Section from '@/components/ui/Section'

/**
 * Audience — three real personas we sit at the table with.
 *
 * Per Sara's review pass: removed the "role" labels (مخاطبِ اصلی /
 * مخاطبِ دومی / شریکِ زیرساخت) — cards now lead directly with the
 * audience name. The card surface is a soft mist wash so the section
 * tone differs from the navy ProductsGrid banner and the dark Manifesto.
 */
interface AudienceCard {
  title: string
  latin: string
  body: string
  products: string[]
  scale: string
}

const audiences: AudienceCard[] = [
  {
    title: 'صندوق‌ها',
    latin: 'Investment Funds',
    body:
      'تیمِ عملیاتِ صندوق، هر ماه با تقسیمِ سود به هزاران سرمایه‌گذار درگیر است. تیام روی ریلِ چابک، این را در چهار ساعت حل می‌کند.',
    products: ['تیام', 'چابک'],
    scale: '۵۰+ صندوقِ فعال',
  },
  {
    title: 'کارگزاری‌ها',
    latin: 'Brokerage Firms',
    body:
      'تیم‌های تسویه و خزانه‌داری در کارگزاری‌های فعالِ بورس. کسانی که ساعتِ پایانیِ بازار، با فشارِ هزاران تراکنش روبرو هستند و نیاز به یک کنسولِ شفاف دارند.',
    products: ['همتا', 'چابک'],
    scale: '۱۰ کارگزاریِ فعال',
  },
  {
    title: 'بانک‌ها',
    latin: 'Banking Partners',
    body:
      'بانک‌هایی که زیرساختِ خامِ پرداخت را در اختیارِ ما گذاشته‌اند. آن‌ها لایه‌ی هسته‌ای را می‌دهند، ما لایه‌ی هوشمندِ تخصصیِ بازارِ سرمایه را روی آن می‌سازیم.',
    products: ['چابک'],
    scale: '۲۱ بانکِ متصل',
  },
]

export default function Audience() {
  return (
    <Section tone="none" spacing="normal">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>۰۳ · مخاطبین</Eyebrow>
          <Heading
            fa="مخاطبینِ بورس‌پی"
            en="Boorspay audiences"
            level={2}
            className="mt-3"
          />
          <p className="mt-5 max-w-xl text-[15.5px] leading-[1.85] text-ink-2">
            مخاطبِ پیش‌فرضِ ما نهادی است. لحن، استدلال و سرعتِ پاسخ‌گویی‌مان،
            برای گفت‌وگو با یک مدیرِ مالیِ نهاد طراحی شده — نه برای پنل‌های
            عمومیِ کاربر.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {audiences.map((a) => (
            <article
              key={a.title}
              className="relative flex flex-col rounded-2xl border border-hairline bg-mist/22 p-7"
            >
              <div>
                <h3 className="font-display text-[26px] font-bold text-ink">
                  {a.title}
                </h3>
                <div
                  className="mt-1 font-en-display italic text-[14px] text-ink-3"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {a.latin}
                </div>
              </div>

              <p className="mt-5 flex-1 text-[14px] leading-[1.85] text-ink-2">
                {a.body}
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-hairline-2 pt-5">
                <div className="flex gap-1.5">
                  {a.products.map((p) => (
                    <Pill key={p}>{p}</Pill>
                  ))}
                </div>
                <div className="text-[12px] text-ink-3">{a.scale}</div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
