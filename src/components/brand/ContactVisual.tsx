import { motion } from 'motion/react'
import ArcMotif from '@/components/brand/ArcMotif'

/**
 * Hero illustration for the Contact page.
 *
 * Composition:
 *   1. Soft warm ambient blob, blurred
 *   2. Brand arc motif from top-left corner
 *   3. Central message card (sky gradient) with a live "preparing
 *      reply" indicator and a sample inbound message
 *   4. Three floating channel chips at staggered positions
 *      (email/whatsapp/sales), each a different brand colour
 *   5. Floating timer card showing "ظرف ۱ روز کاری"
 *   6. Atmospheric dots
 *
 * The three channel chips visualize the three ways to reach the
 * team — same content as the Channels section below but in
 * floating-card form for the hero.
 */
export default function ContactVisual() {
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* 1 — ambient blob, warm */}
      <div
        aria-hidden
        className="absolute inset-[-12%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(55% 60% at 65% 40%, rgba(111,143,206,0.28), transparent 70%),' +
            'radial-gradient(50% 60% at 25% 70%, rgba(224,116,74,0.18), transparent 70%)',
        }}
      />

      {/* 2 — faint arc motif top-left */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-start justify-start text-indigo/18"
      >
        <ArcMotif count={5} size={460} anchor="top-left" dot={false} />
      </div>

      {/* 3 — main message card (centred) */}
      <motion.div
        initial={{ y: 0, rotate: -2 }}
        animate={{ y: [0, -10, 0], rotate: -2 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[24%] left-[10%] right-[10%] aspect-[1.5] rounded-3xl shadow-[0_30px_80px_-20px_rgba(42,45,126,0.4)]"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky via-blue to-indigo" />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-paper/0 via-paper/0 to-paper/15" />
        <div className="absolute inset-6 flex flex-col justify-between text-paper">
          <div className="flex items-start justify-between">
            <div
              className="font-en-body text-[9.5px] tracking-[0.24em] uppercase text-paper/80"
              style={{ unicodeBidi: 'isolate' }}
            >
              new message
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <motion.span
                  initial={{ opacity: 0.4, scale: 1 }}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.6, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald"
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              <span
                className="font-en-body text-[8.5px] tracking-[0.18em] uppercase text-paper/80"
                style={{ unicodeBidi: 'isolate' }}
              >
                live
              </span>
            </div>
          </div>

          <div>
            <div className="font-display text-[14px] font-semibold text-paper">
              «سلام، می‌خواهیم درباره‌ی تیام صحبت کنیم.»
            </div>
            <div
              className="mt-3 font-en-body text-[8.5px] tracking-[0.2em] uppercase text-paper/55"
              style={{ unicodeBidi: 'isolate' }}
            >
              from · سارا · صندوق راهبر
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4a — email chip (top-right) */}
      <motion.div
        initial={{ y: 0, rotate: 3 }}
        animate={{ y: [0, -10, 0], rotate: 3 }}
        transition={{ duration: 6.2, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[4%] right-[4%] rounded-xl border border-hairline bg-paper px-4 py-3 shadow-[0_18px_45px_-18px_rgba(10,14,46,0.3)]"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo/12 text-indigo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </span>
          <div>
            <div
              className="font-en-body text-[8px] tracking-[0.2em] uppercase text-ink-3"
              style={{ unicodeBidi: 'isolate' }}
            >
              email
            </div>
            <div className="font-display text-[11.5px] font-bold text-ink">
              hello@
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4b — whatsapp chip (bottom-right) */}
      <motion.div
        initial={{ y: 0, rotate: -3 }}
        animate={{ y: [0, -8, 0], rotate: -3 }}
        transition={{ duration: 6.5, delay: 1.0, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[8%] right-[8%] rounded-xl border border-emerald/30 bg-paper px-4 py-3 shadow-[0_18px_45px_-18px_rgba(31,138,91,0.35)]"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald/12 text-emerald">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </span>
          <div>
            <div
              className="font-en-body text-[8px] tracking-[0.2em] uppercase text-ink-3"
              style={{ unicodeBidi: 'isolate' }}
            >
              whatsapp
            </div>
            <div className="font-display text-[11.5px] font-bold text-ink">
              فوری
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4c — sales / demo chip (left mid) */}
      <motion.div
        initial={{ y: 0, rotate: 2 }}
        animate={{ y: [0, -12, 0], rotate: 2 }}
        transition={{ duration: 6.8, delay: 1.7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[42%] left-[-2%] rounded-xl border border-coral/30 bg-paper px-4 py-3 shadow-[0_18px_45px_-18px_rgba(224,116,74,0.35)]"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coral/14 text-coral">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h4l3-9 4 18 3-9h4" />
            </svg>
          </span>
          <div>
            <div
              className="font-en-body text-[8px] tracking-[0.2em] uppercase text-ink-3"
              style={{ unicodeBidi: 'isolate' }}
            >
              demo
            </div>
            <div className="font-display text-[11.5px] font-bold text-ink">
              ۳۰ دقیقه
            </div>
          </div>
        </div>
      </motion.div>

      {/* 5 — floating timer card (bottom-left) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.5, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[2%] left-[8%] rounded-2xl bg-navy-1 px-4 py-3 text-paper shadow-[0_22px_55px_-22px_rgba(10,14,46,0.55)]"
      >
        <div className="flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          <div>
            <div
              className="font-en-body text-[8.5px] tracking-[0.2em] uppercase text-sky"
              style={{ unicodeBidi: 'isolate' }}
            >
              response
            </div>
            <div className="font-display text-[12px] font-bold">
              ظرف ۱ روزِ کاری
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
        className="absolute top-[20%] left-[6%] h-3 w-3 rounded-full bg-sky"
      />
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[60%] right-[24%] h-2 w-2 rounded-full bg-coral"
      />
    </div>
  )
}
