import { motion } from 'motion/react'

/**
 * Hero illustration for the Blog index page.
 *
 * Composition:
 *   1. Soft warm ambient blob
 *   2. Faint brand arcs from the top-right corner
 *   3. Main "featured note" card — a tilted serif quote card
 *      with title and a date line
 *   4. Stacked secondary note cards behind / beside the main one
 *      so the hero reads as "a stack of editorial notes"
 *   5. Floating bookmark / tag chip
 *   6. Atmospheric dots
 *
 * The "stack of notes" composition expresses the section's purpose
 * (یادداشت‌ها / Field notes) without using any custom illustration —
 * it's all card shapes, tilted at different angles, in the same
 * navy / paper / coral palette as the rest of the site.
 */
export default function BlogVisual() {
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* 1 — ambient blob */}
      <div
        aria-hidden
        className="absolute inset-[-12%] rounded-full opacity-65 blur-3xl"
        style={{
          background:
            'radial-gradient(55% 60% at 25% 40%, rgba(111,143,206,0.30), transparent 70%),' +
            'radial-gradient(50% 60% at 75% 70%, rgba(224,116,74,0.16), transparent 70%)',
        }}
      />

      {/* 3a — back stack card (tilted far) */}
      <motion.div
        initial={{ y: 0, rotate: -8 }}
        animate={{ y: [0, -6, 0], rotate: -8 }}
        transition={{ duration: 7.5, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[24%] left-[10%] right-[18%] aspect-[1.45] rounded-2xl bg-cloud border border-hairline shadow-[0_18px_50px_-22px_rgba(10,14,46,0.28)]"
      >
        <div className="absolute inset-5 flex flex-col justify-between">
          <div
            className="font-en-body text-[8.5px] tracking-[0.22em] uppercase text-ink-3"
            style={{ unicodeBidi: 'isolate' }}
          >
            ۲۶ مرداد ۱۴۰۴
          </div>
          <div className="text-ink-2 font-display text-[14px] font-bold leading-tight">
            تصمیمی پشتِ idempotency
          </div>
        </div>
      </motion.div>

      {/* 3b — middle stack card */}
      <motion.div
        initial={{ y: 0, rotate: -3 }}
        animate={{ y: [0, -10, 0], rotate: -3 }}
        transition={{ duration: 7, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[6%] right-[14%] aspect-[1.4] rounded-2xl bg-paper border border-hairline shadow-[0_22px_55px_-20px_rgba(10,14,46,0.32)]"
      >
        <div className="absolute inset-5 flex flex-col justify-between">
          <div
            className="font-en-body text-[8.5px] tracking-[0.22em] uppercase text-ink-3"
            style={{ unicodeBidi: 'isolate' }}
          >
            ۰۸ خرداد ۱۴۰۵
          </div>
          <div className="text-ink font-display text-[14.5px] font-bold leading-tight">
            داستانِ یک شبِ تقسیمِ سود
          </div>
        </div>
      </motion.div>

      {/* 3c — main featured card (front, navy) */}
      <motion.div
        initial={{ y: 0, rotate: 3 }}
        animate={{ y: [0, -14, 0], rotate: 3 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[16%] left-[4%] right-[10%] aspect-[1.35] rounded-2xl shadow-[0_30px_80px_-20px_rgba(10,14,46,0.45)]"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-2 via-navy-1 to-navy-1" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-paper/0 via-paper/0 to-paper/8" />
        <div className="absolute inset-6 flex flex-col justify-between text-paper">
          <div className="flex items-start justify-between">
            <div
              className="font-en-body text-[9px] tracking-[0.22em] uppercase text-sky"
              style={{ unicodeBidi: 'isolate' }}
            >
              featured · ۱۸ اردیبهشت
            </div>
            <span
              aria-hidden
              className="font-en-display text-[28px] font-bold leading-none text-paper/30"
              style={{ unicodeBidi: 'isolate' }}
            >
              “
            </span>
          </div>

          <div>
            <div className="font-display text-[18px] font-bold leading-snug">
              شروعِ بورس‌پی
            </div>
            <div className="mt-2 text-[11.5px] leading-[1.7] text-paper/72">
              چرا تخصصی، چرا سریع، و چرا حالا.
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-paper/55">
              <span
                className="font-en-body uppercase tracking-[0.18em]"
                style={{ unicodeBidi: 'isolate' }}
              >
                ادامه ↗
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 — floating bookmark / tag chip (coral) */}
      <motion.div
        initial={{ y: 0, rotate: -6 }}
        animate={{ y: [0, -10, 0], rotate: -6 }}
        transition={{ duration: 6.5, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] right-[2%] rounded-xl bg-gradient-to-br from-coral-2 to-coral px-3.5 py-2.5 text-paper shadow-[0_22px_50px_-18px_rgba(224,116,74,0.55)]"
      >
        <div className="flex items-center gap-2">
          <svg width="11" height="14" viewBox="0 0 12 16" fill="currentColor" className="text-paper">
            <path d="M2 1h8v14l-4-3-4 3z" />
          </svg>
          <div>
            <div
              className="font-en-body text-[8.5px] tracking-[0.2em] uppercase text-paper/85"
              style={{ unicodeBidi: 'isolate' }}
            >
              tag · چابک
            </div>
          </div>
        </div>
      </motion.div>

      {/* 5 — floating "reading minutes" chip (bottom-right) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.5, delay: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[6%] right-[2%] rounded-xl border border-hairline bg-paper px-3.5 py-2.5 shadow-[0_18px_45px_-18px_rgba(10,14,46,0.3)]"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo/12 text-indigo">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <div>
            <div
              className="font-en-body text-[8px] tracking-[0.2em] uppercase text-ink-3"
              style={{ unicodeBidi: 'isolate' }}
            >
              read
            </div>
            <div className="font-display text-[11.5px] font-bold text-ink">
              ۴ دقیقه
            </div>
          </div>
        </div>
      </motion.div>

      {/* 6 — atmospheric dots */}
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[38%] right-[16%] h-3 w-3 rounded-full bg-sky"
      />
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, delay: 0.7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[42%] left-[2%] h-2 w-2 rounded-full bg-coral"
      />
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5.5, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] left-[28%] h-2.5 w-2.5 rounded-full bg-emerald"
      />
    </div>
  )
}
