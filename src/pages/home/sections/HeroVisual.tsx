import { motion } from 'motion/react'
import ArcMotif from '@/components/brand/ArcMotif'

/**
 * Hero illustration — the colorful "Drivewealth-style" layered composition.
 *
 * Layers, back to front:
 *  1. Soft warm ambient blob (coral + sky gradient, blurred)
 *  2. Faint Boorspay arc-motif as background signature
 *  3. Main "payment card" — tilted, gradient-filled, floating
 *  4. Floating fast-settlement badge (coral — the cheerful accent)
 *  5. Floating chart card with sparkline + percent (emerald — "up")
 *  6. Three floating accent dots for atmosphere
 *
 * All floating elements use staggered slow vertical bobs so the
 * composition feels alive without being distracting.
 */
export default function HeroVisual() {
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* 1 — ambient warm blob */}
      <div
        aria-hidden
        className="ambient-warm absolute inset-[-12%] rounded-full opacity-70 blur-3xl"
      />

      {/* 2 — faint arc motif signature */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center text-indigo/15"
      >
        <ArcMotif count={5} size={460} anchor="bottom-right" dot={false} />
      </div>

      {/* 3 — main payment card */}
      <motion.div
        initial={{ y: 0, rotate: -3 }}
        animate={{ y: [0, -10, 0], rotate: -3 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] left-[10%] right-[10%] aspect-[1.62] rounded-3xl shadow-[0_30px_80px_-20px_rgba(42,45,126,0.45)]"
      >
        {/* gradient fill */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo via-blue to-sky" />
        {/* glossy sheen */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-paper/0 via-paper/0 to-paper/15" />
        {/* card content */}
        <div className="absolute inset-6 flex flex-col justify-between text-paper">
          <div className="flex items-center justify-between">
            <div
              className="font-en-display italic text-[22px] font-bold tracking-tight"
              style={{ unicodeBidi: 'isolate' }}
            >
              boursepayment
            </div>
            <div className="h-7 w-10 rounded-md bg-gradient-to-br from-coral-2 to-coral shadow-inner" />
          </div>
          <div>
            <div
              className="font-en-body text-[9.5px] tracking-[0.22em] uppercase opacity-65"
              style={{ unicodeBidi: 'isolate' }}
            >
              capital markets rail
            </div>
            <div
              className="mt-1.5 font-en-body text-[16px] tracking-[0.18em] tabular-nums"
              style={{ unicodeBidi: 'isolate' }}
            >
              ●●●●  ●●●●  ●●●●
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 — floating fast-settlement badge */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[6%] right-[4%] rounded-2xl bg-coral px-4 py-3 text-paper shadow-[0_20px_50px_-15px_rgba(224,116,74,0.6)]"
      >
        <div
          className="font-en-body text-[9px] tracking-[0.22em] uppercase opacity-90"
          style={{ unicodeBidi: 'isolate' }}
        >
          settlement
        </div>
        <div
          className="mt-1 font-display text-[24px] leading-none font-bold"
          style={{ unicodeBidi: 'isolate' }}
        >
          FAST
        </div>
      </motion.div>

      {/* 5 — floating chart card */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6.5, delay: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[4%] left-[0%] rounded-2xl border border-hairline bg-paper p-4 shadow-[0_20px_60px_-20px_rgba(10,14,46,0.25)]"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-paper">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H9M17 7V15" />
            </svg>
          </div>
          <div className="font-display text-[18px] font-bold text-ink">+۲٫۴٪</div>
        </div>
        <div
          className="mt-2 font-en-body text-[9px] tracking-[0.2em] uppercase text-ink-3"
          style={{ unicodeBidi: 'isolate' }}
        >
          intraday
        </div>
        <svg viewBox="0 0 80 24" className="mt-2 h-5 w-20" fill="none">
          <path
            d="M0 18 L12 14 L24 16 L36 10 L48 12 L60 6 L80 2"
            stroke="var(--color-emerald)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* 6 — atmospheric floating dots */}
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[35%] right-[2%] h-3 w-3 rounded-full bg-sky"
      />
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[42%] right-[14%] h-2 w-2 rounded-full bg-coral"
      />
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5.5, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[58%] left-[18%] h-2.5 w-2.5 rounded-full bg-emerald"
      />
    </div>
  )
}
