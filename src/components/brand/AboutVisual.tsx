import { motion } from 'motion/react'

/**
 * About hero visual — a vertical company-timeline.
 *
 * Concept: «از کجا شروع کردیم تا اینجا». Brand book §26-02 «چند مرحله»
 * pattern applied as the page hero — a vertical navy line with five
 * year-station dots running top-to-bottom, each labelled. The current
 * year sits at the bottom with a sky-coloured halo (the brand book's
 * destination dot), so the eye follows the company's journey from
 * its founding down to «اینجاییم».
 *
 * Distinct from every other hero visual on the site: no floating
 * cards, no badges — it's all line + dots + typography in one
 * editorial composition.
 */

interface Station {
  year: string
  label: string
  current?: boolean
}

const stations: Station[] = [
  { year: '۱۴۰۰', label: 'شروع از یک سؤال' },
  { year: '۱۴۰۱', label: 'نخستین سه بانک' },
  { year: '۱۴۰۲', label: 'گرفتنِ مجوزِ تخصصی' },
  { year: '۱۴۰۳', label: 'پنجاه صندوقِ نهادی' },
  { year: '۱۴۰۴', label: 'اینجاییم', current: true },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function AboutVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] py-4">
      {/* Vertical timeline line — navy with sky tint at the bottom */}
      <div
        aria-hidden
        className="absolute right-[27%] top-6 bottom-6 w-px"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-indigo) 0%, var(--color-indigo) 65%, var(--color-sky) 100%)',
          opacity: 0.55,
        }}
      />

      <ol className="relative space-y-6">
        {stations.map((s, i) => (
          <motion.li
            key={s.year}
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease }}
            className="relative flex items-center gap-5"
            style={{ paddingRight: '21%' }}
          >
            {/* Station dot — solid for past, sky-haloed for current */}
            <span
              aria-hidden
              className="absolute right-[27%] z-10 -translate-x-1/2 flex h-4 w-4 items-center justify-center"
              style={{ marginRight: '-0.5px' }}
            >
              {s.current ? (
                <>
                  <span className="absolute inset-0 rounded-full bg-sky opacity-30 animate-ping" />
                  <span className="relative h-3 w-3 rounded-full bg-sky" />
                </>
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-indigo" />
              )}
            </span>

            {/* Year label on the right of the line (RTL primary) */}
            <div
              className={`font-en-display text-[15px] font-bold tracking-[0.08em] ${
                s.current ? 'text-sky' : 'text-ink-3'
              }`}
              style={{
                unicodeBidi: 'isolate',
                position: 'absolute',
                right: '5%',
                width: '17%',
                textAlign: 'right',
              }}
            >
              {s.year}
            </div>

            {/* Description on the left of the line */}
            <div className="flex-1 pr-2">
              <div
                className={`font-display ${
                  s.current
                    ? 'text-[20px] font-bold text-ink'
                    : 'text-[15px] font-semibold text-ink-2'
                }`}
              >
                {s.label}
              </div>
              {s.current && (
                <div
                  className="mt-1 font-en-body text-[10px] tracking-[0.22em] uppercase text-sky"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  now · ۱۴۰۴
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ol>

      {/* Top label */}
      <div
        className="mb-5 flex justify-end pl-[30%] -mt-2 font-en-body text-[9.5px] tracking-[0.24em] uppercase text-ink-4"
        style={{ unicodeBidi: 'isolate' }}
      >
        company timeline
      </div>
    </div>
  )
}
