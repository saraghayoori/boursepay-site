import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'

/**
 * Testimonials — short pull-quotes from named contacts at customer
 * institutions. Editorial, calm, on-brand: no star ratings, no logos
 * row, no "trusted by" puffery.
 *
 * Layout:
 *  - Section header on the right (RTL primary)
 *  - Three cards in a horizontal row on desktop. Each card has:
 *    · A large brand-serif opening quotation glyph
 *    · The quote body in Vazirmatn
 *    · Attribution row: name + role + organisation
 *  - On mobile the row stacks; the quotation glyph stays prominent.
 *
 * Cards scroll in with stagger, each lifts subtly on hover.
 */
interface Quote {
  text: string
  name: string
  role: string
  org: string
}

const quotes: Quote[] = [
  {
    text:
      'تقسیمِ سودِ ماهانه‌ی صندوقمان، از یک پروژه‌ی شب‌بیداری شده یک عملیاتِ خودکار. تیمِ عملیات حالا شب جمعه می‌خوابد.',
    name: 'مهدی رستمی',
    role: 'مدیر عملیات',
    org: 'صندوق سرمایه‌گذاری راهبر',
  },
  {
    text:
      'ساعتِ پایانیِ بازار، صفِ تسویه‌ی ما همیشه یک کابوس بود. همتا یک پنل ساده داد و کلِ این فشار قابلِ مدیریت شد.',
    name: 'سارا نظری',
    role: 'مدیر فناوری اطلاعات',
    org: 'کارگزاری آپادانا',
  },
  {
    text:
      'با چابک، اتصال به یک بانک دیگر دیگر یک پروژه‌ی شش‌ماهه نیست. یک تغییرِ پیکربندی است. این یعنی واقعاً API استاندارد.',
    name: 'علی شفیعی',
    role: 'معاون فناوری',
    org: 'یک بانک خصوصی',
  },
]

const easeOut = [0.22, 1, 0.36, 1] as const

export default function Testimonials() {
  return (
    <Section tone="none" spacing="normal">
      <Container className="relative">
        <div className="relative max-w-2xl">
          <Eyebrow>۰۵ · صدای مشتری</Eyebrow>
          <Heading
            fa="آن‌ها چه می‌گویند"
            en="In their own words"
            level={2}
            className="mt-3"
          />
          <p className="mt-5 max-w-xl text-[15.5px] leading-[1.85] text-ink-2">
            سه جمله از سه نفر — از سه طرفِ متفاوتِ بازار. بدون
            اغراق، بدون تعارف.
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <QuoteCard key={q.name} q={q} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function QuoteCard({ q, index }: { q: Quote; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: easeOut,
      }}
      className="group relative flex flex-col rounded-2xl border border-hairline bg-paper-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo/25 hover:shadow-[0_30px_80px_-40px_rgba(10,14,46,0.45)]"
    >
      {/* Giant opening quotation glyph */}
      <span
        aria-hidden
        className="font-en-display text-[80px] font-bold leading-none text-indigo/22"
        style={{ unicodeBidi: 'isolate' }}
      >
        “
      </span>

      <blockquote className="-mt-6 flex-1 text-[15.5px] leading-[1.95] text-ink-2">
        {q.text}
      </blockquote>

      <figcaption className="mt-7 flex flex-col gap-1 border-t border-hairline-2 pt-5">
        <span className="font-display text-[15px] font-bold text-ink">
          {q.name}
        </span>
        <span className="text-[12.5px] leading-[1.55] text-ink-3">
          {q.role} · {q.org}
        </span>
      </figcaption>

      {/* Tiny brand accent — a single coral dot at the top-left corner */}
      <span
        aria-hidden
        className="absolute top-5 left-5 h-1 w-1 rounded-full bg-coral opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.figure>
  )
}
