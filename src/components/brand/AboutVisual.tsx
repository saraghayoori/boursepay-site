import { motion } from 'motion/react'
import ArcMotif from '@/components/brand/ArcMotif'

/**
 * Hero illustration for the About page.
 *
 * Composition (back to front):
 *   1. Soft mist + indigo ambient blob, blurred
 *   2. Faint brand arcs from the bottom-right corner
 *   3. Central "navy charter card" — a dark tilted card with the
 *      company name lockup and a sky underline, the editorial
 *      equivalent of a company seal
 *   4. Floating coral "license" badge — top-right, tilted slightly,
 *      proof-of-permit visual cue
 *   5. Floating mist "team" chip card — bottom-left, with a row of
 *      monogram avatars representing the team
 *   6. Three atmospheric dots
 *
 * Same DNA as the home HeroVisual but assembled differently —
 * different cards, different angles, different colour weights.
 */
export default function AboutVisual() {
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* 1 — ambient blob, cool */}
      <div
        aria-hidden
        className="absolute inset-[-12%] rounded-full opacity-65 blur-3xl"
        style={{
          background:
            'radial-gradient(55% 60% at 30% 35%, rgba(111,143,206,0.32), transparent 70%),' +
            'radial-gradient(50% 60% at 75% 65%, rgba(42,45,126,0.22), transparent 70%)',
        }}
      />

      {/* 2 — faint arc motif from the bottom-right corner */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-end justify-end text-indigo/22"
      >
        <ArcMotif count={5} size={440} anchor="bottom-right" dot={false} />
      </div>

      {/* 3 — main navy charter card */}
      <motion.div
        initial={{ y: 0, rotate: 2 }}
        animate={{ y: [0, -10, 0], rotate: 2 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[8%] right-[8%] aspect-[1.4] rounded-3xl shadow-[0_30px_80px_-20px_rgba(10,14,46,0.5)]"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-navy-2 via-navy-1 to-navy-1" />
        {/* glossy sheen */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-paper/0 via-paper/0 to-paper/10" />
        {/* card content */}
        <div className="absolute inset-7 flex flex-col justify-between text-paper">
          <div className="flex items-start justify-between">
            <div>
              <div
                className="font-en-body text-[9.5px] tracking-[0.24em] uppercase text-sky"
                style={{ unicodeBidi: 'isolate' }}
              >
                company · charter
              </div>
              <div className="mt-2 font-display text-[22px] font-bold leading-tight">
                بورس‌پی
              </div>
              <div className="mt-3 h-px w-12 bg-sky" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className="rounded-full border border-sky/30 px-2.5 py-0.5 font-en-body text-[9px] tracking-[0.18em] uppercase text-sky"
                style={{ unicodeBidi: 'isolate' }}
              >
                est ۱۴۰۰
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="space-y-1.5">
              <div className="text-[11px] leading-tight text-paper/70">
                مأموریت
              </div>
              <div className="font-display text-[13px] font-semibold leading-snug">
                ریلِ تخصصیِ بازارِ سرمایه
              </div>
            </div>
            <div
              className="font-en-body text-[8px] tracking-[0.22em] uppercase text-paper/45 text-right"
              style={{ unicodeBidi: 'isolate' }}
            >
              capital
              <br />
              markets
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 — floating license / permit badge */}
      <motion.div
        initial={{ y: 0, rotate: -4 }}
        animate={{ y: [0, -10, 0], rotate: -4 }}
        transition={{ duration: 6.2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[6%] right-[2%]"
      >
        <div className="relative rounded-2xl bg-gradient-to-br from-coral-2 to-coral px-4 py-3 text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_24px_50px_-18px_rgba(224,116,74,0.55)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-1.5 rounded-xl border border-paper/22"
          />
          <div className="relative">
            <div
              className="font-en-body text-[8.5px] tracking-[0.26em] uppercase text-paper/90"
              style={{ unicodeBidi: 'isolate' }}
            >
              license
            </div>
            <div className="mt-1 font-display text-[15px] font-bold leading-tight">
              مجوزِ تخصصی
            </div>
            <div
              className="mt-1.5 font-en-body text-[8.5px] tracking-[0.2em] uppercase text-paper/80"
              style={{ unicodeBidi: 'isolate' }}
            >
              sec ↗
            </div>
          </div>
        </div>
      </motion.div>

      {/* 5 — floating mist "team" chip card */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6.5, delay: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[6%] left-[0%] rounded-2xl border border-hairline bg-paper p-4 shadow-[0_22px_60px_-22px_rgba(10,14,46,0.3)]"
      >
        <div className="flex items-center -space-x-2 [direction:ltr]">
          {['A', 'M', 'S', 'R'].map((m, i) => {
            const tones = [
              'bg-indigo text-paper',
              'bg-sky text-navy-1',
              'bg-coral text-paper',
              'bg-emerald text-paper',
            ]
            return (
              <span
                key={m}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-paper font-display text-[10.5px] font-bold ${tones[i]}`}
              >
                {m}
              </span>
            )
          })}
        </div>
        <div
          className="mt-3 font-en-body text-[8.5px] tracking-[0.2em] uppercase text-ink-3"
          style={{ unicodeBidi: 'isolate' }}
        >
          founding team
        </div>
        <div className="font-display text-[13px] font-bold text-ink">
          ۴ نفر، یک ایده
        </div>
      </motion.div>

      {/* 6 — atmospheric floating dots */}
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[40%] right-[6%] h-3 w-3 rounded-full bg-sky"
      />
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[44%] right-[18%] h-2 w-2 rounded-full bg-coral"
      />
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5.5, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[52%] left-[14%] h-2.5 w-2.5 rounded-full bg-indigo"
      />
    </div>
  )
}
