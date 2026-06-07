import { motion } from 'motion/react'

/**
 * Blog hero visual — an editorial "article cover" composition.
 *
 * Concept: every blog post starts with a number, a title, and tags.
 * The hero visual is exactly that — laid out like a magazine cover
 * with oversized typography: a huge italic display number, a
 * serif-italic eyebrow, a bold display title, a thin author rule,
 * and a row of tag pills floating below. No cards, no chips, no
 * floating dashboards — it's pure typography on a quiet canvas.
 *
 * Distinct from About (vertical timeline) and Contact (radial
 * channel diagram): this leans on the brand book §22-24 type system
 * to do the talking, mirroring what the visitor will see when they
 * actually open a post.
 */

const ease = [0.22, 1, 0.36, 1] as const

export default function BlogVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {/* Frame — a thin paper card with a faint dot-grid wash */}
      <div className="relative overflow-hidden rounded-2xl border border-hairline bg-paper p-7 shadow-[0_28px_70px_-32px_rgba(10,14,46,0.35)]">
        {/* Brand book §26-03 "dot grid" rhythmic background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(42,45,126,0.18) 1.2px, transparent 0)',
            backgroundSize: '14px 14px',
          }}
        />
        {/* Soft top-corner wash */}
        <div
          aria-hidden
          className="absolute -top-20 -left-10 h-48 w-48 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(111,143,206,0.45), transparent 65%)',
          }}
        />

        <div className="relative">
          {/* Top eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="flex items-center justify-between"
          >
            <div
              className="font-en-body text-[10px] font-semibold tracking-[0.24em] uppercase text-indigo"
              style={{ unicodeBidi: 'isolate' }}
            >
              field notes · ۱۸ اردیبهشت
            </div>
            <div
              className="font-en-body text-[9px] tracking-[0.22em] uppercase text-ink-4"
              style={{ unicodeBidi: 'isolate' }}
            >
              issue · ۰۱
            </div>
          </motion.div>

          {/* The huge italic number — DM Serif Display */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-8 font-en-display italic leading-none tracking-tight text-indigo"
            style={{
              fontSize: 'clamp(110px, 24vw, 168px)',
              unicodeBidi: 'isolate',
            }}
            aria-hidden
          >
            01
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="-mt-4 max-w-sm font-display text-[26px] font-bold leading-[1.15] tracking-tight text-ink"
          >
            داستانِ شروعِ بورس‌پی —{' '}
            <span className="text-indigo">چرا تخصصی، چرا حالا.</span>
          </motion.h2>

          {/* Author + meta strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55, ease }}
            className="mt-6 flex items-center gap-3 border-t border-hairline-2 pt-4 text-[12px] text-ink-3"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo/12 font-display text-[11px] font-bold text-indigo">
              س
            </div>
            <div className="flex flex-col">
              <span className="text-ink-2 font-medium">سارا قیوری</span>
              <span
                className="font-en-body text-[9.5px] tracking-[0.2em] uppercase text-ink-4"
                style={{ unicodeBidi: 'isolate' }}
              >
                co-founder
              </span>
            </div>
            <span className="ms-auto inline-flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span className="text-ink-3">۴ دقیقه</span>
            </span>
          </motion.div>

          {/* Tag pills */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease }}
            className="mt-5 flex flex-wrap gap-1.5"
          >
            {[
              { t: 'چابک', tone: 'indigo' as const },
              { t: 'تصمیمِ فنی', tone: 'sky' as const },
              { t: 'روایت', tone: 'coral' as const },
            ].map((tg) => (
              <span
                key={tg.t}
                className={
                  'rounded-full border px-2.5 py-0.5 font-en-body text-[10px] font-medium tracking-[0.05em] ' +
                  (tg.tone === 'indigo'
                    ? 'border-indigo/25 bg-indigo/8 text-indigo'
                    : tg.tone === 'sky'
                    ? 'border-sky/30 bg-sky/10 text-blue'
                    : 'border-coral/30 bg-coral-soft text-coral')
                }
                style={{ unicodeBidi: 'isolate' }}
              >
                {tg.t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Two thin stacked back-cards — peek of "more articles below" */}
      <div
        aria-hidden
        className="absolute -bottom-2 left-3 right-3 -z-10 h-4 rounded-2xl border border-hairline bg-paper-2"
      />
      <div
        aria-hidden
        className="absolute -bottom-4 left-6 right-6 -z-20 h-4 rounded-2xl border border-hairline bg-cloud"
      />

      {/* Tiny corner label */}
      <div
        className="mt-6 flex items-center justify-end gap-2 font-en-body text-[9.5px] tracking-[0.24em] uppercase text-ink-4"
        style={{ unicodeBidi: 'isolate' }}
      >
        <span className="h-px w-6 bg-ink-4/40" />
        <span>cover · current issue</span>
      </div>
    </div>
  )
}
