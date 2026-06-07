import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView } from 'motion/react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import {
  products,
  productsBySlug,
  type ProductSlug,
} from '@/content/products'
import { cn } from '@/lib/cn'

/**
 * Network — the home page's product gateway. Everything fits in a
 * single viewport: short header, compact diagram, and the active
 * product's spotlight card that opens directly under its own chip.
 *
 * Diagram:
 *   - 21 bank dots in a gentle arch across the top edge
 *   - Hairline lines flowing down to a centre «بورس‌پی» node
 *   - 4 product chips along the bottom edge — each acts as a
 *     selector for the spotlight that sits IMMEDIATELY below
 *
 * Spotlight:
 *   - Lives inside this same section, positioned absolutely
 *     beneath the active chip so the card visually drops out of
 *     the chip the visitor clicked
 *   - A short hairline connector links the chip to the card top
 *   - The card itself is a Link to /products#{slug} — visitor
 *     clicks the card to open the full product page
 *
 * No separate "Featured Products" section below — no extra scroll
 * required to see the result of a click.
 */
const BANK_COUNT = 21
const ease = [0.16, 1, 0.3, 1] as const
const easeOut = [0.22, 1, 0.36, 1] as const

interface NetworkProps {
  selectedSlug: ProductSlug
  onSelect: (slug: ProductSlug) => void
}

export default function Network({ selectedSlug, onSelect }: NetworkProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  // Compact diagram canvas — shorter than before so the diagram +
  // spotlight card together fit one viewport.
  const W = 1200
  const H = 460
  const centerX = W / 2
  const centerY = H * 0.55

  // 21 bank dots distributed along the top edge with a slight arch
  const banks = Array.from({ length: BANK_COUNT }, (_, i) => {
    const t = i / (BANK_COUNT - 1)
    const x = 80 + t * (W - 160)
    const arch = Math.sin(t * Math.PI) * 10
    const y = 50 - arch
    return { x, y }
  })

  // 4 product chips along the bottom edge
  const productPoints = products.map((_, i) => {
    const t = (i + 0.5) / products.length
    return { x: 120 + t * (W - 240), y: H - 60 }
  })

  // Chip x position as percent of the SVG width — used to position
  // the HTML spotlight card directly under the active chip.
  const activeIdx = products.findIndex((p) => p.slug === selectedSlug)
  const chipFractionLTR = (activeIdx + 0.5) / products.length
  // The SVG renders left-to-right; HTML `left` is also left-to-right.
  // No flip needed — chip at fraction 0.125 sits at left:12.5%.
  const chipLeftPercent = 10 + chipFractionLTR * 80

  return (
    <Section tone="none" spacing="tight">
      <Container className="relative">
        {/* Compact header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex">
            <Eyebrow>۰۳ · شبکه</Eyebrow>
          </div>
          <Heading
            fa="یک ریل، بیست‌ویک بانک، چهار محصول"
            en="One rail · 21 banks · 4 products"
            level={2}
            align="center"
            className="mt-3"
          />
        </div>

        {/* Desktop: diagram + inline spotlight directly under the
            active chip */}
        <div className="relative mt-10 hidden md:block">
          <div
            aria-hidden
            className="ambient-cool pointer-events-none absolute inset-0 opacity-40 blur-3xl"
          />

          <svg
            ref={ref}
            viewBox={`0 0 ${W} ${H}`}
            className="relative h-auto w-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="نمایش شبکه‌ی پرداختِ بورس‌پی"
          >
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-sky)" stopOpacity="0.35" />
                <stop offset="60%" stopColor="var(--color-sky)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--color-sky)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lineFade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-sky)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--color-indigo)" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="productLine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-indigo)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--color-indigo)" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="productLineHover" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-indigo)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="var(--color-coral)" stopOpacity="0.65" />
              </linearGradient>
            </defs>

            {/* Halo behind centre node */}
            <motion.circle
              cx={centerX}
              cy={centerY}
              r={120}
              fill="url(#centerGlow)"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.6, ease }}
            />

            {/* Concentric arcs around centre node */}
            {[150, 110, 75].map((r, i) => (
              <motion.circle
                key={r}
                cx={centerX}
                cy={centerY}
                r={r}
                fill="none"
                stroke="var(--color-sky)"
                strokeWidth={1}
                strokeOpacity={0.18 + i * 0.06}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2.2, delay: 0.4 + i * 0.18, ease }}
              />
            ))}

            {/* Bank → centre lines */}
            {banks.map((b, i) => (
              <motion.line
                key={`bank-line-${i}`}
                x1={b.x}
                y1={b.y}
                x2={centerX}
                y2={centerY - 26}
                stroke="url(#lineFade)"
                strokeWidth={0.7}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  duration: 1.6,
                  delay: 0.2 + (i / BANK_COUNT) * 0.4,
                  ease,
                }}
              />
            ))}

            {/* Bank dots — halo + solid centre, with subtle pulse */}
            {banks.map((b, i) => (
              <g key={`bank-dot-${i}`}>
                <motion.circle
                  cx={b.x}
                  cy={b.y}
                  r={4}
                  fill="var(--color-sky)"
                  fillOpacity={0.18}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: [1, 1.6, 1] } : {}}
                  transition={
                    inView
                      ? {
                          opacity: {
                            duration: 0.5,
                            delay: (i / BANK_COUNT) * 0.6,
                            ease,
                          },
                          scale: {
                            duration: 2.6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 1.5 + (i % 5) * 0.3,
                          },
                        }
                      : {}
                  }
                />
                <motion.circle
                  cx={b.x}
                  cy={b.y}
                  r={2.2}
                  fill="var(--color-sky)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + (i / BANK_COUNT) * 0.6,
                    ease,
                  }}
                />
              </g>
            ))}

            {/* Centre → product lines */}
            {productPoints.map((p, i) => {
              const isActive = products[i].slug === selectedSlug
              const isHover = hoverIdx === i
              const highlight = isActive || isHover
              return (
                <motion.line
                  key={`product-line-${i}`}
                  x1={centerX}
                  y1={centerY + 26}
                  x2={p.x}
                  y2={p.y - 22}
                  stroke={
                    highlight ? 'url(#productLineHover)' : 'url(#productLine)'
                  }
                  strokeWidth={highlight ? 1.8 : 1.1}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.4, delay: 1.6 + i * 0.1, ease }}
                  style={{ transition: 'stroke-width 0.25s ease' }}
                />
              )
            })}

            {/* Centre Boorspay node */}
            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.9, ease }}
            >
              <rect
                x={centerX - 72}
                y={centerY - 26}
                width={144}
                height={52}
                rx={12}
                fill="var(--color-navy-1)"
              />
              <rect
                x={centerX - 72}
                y={centerY - 26}
                width={144}
                height={52}
                rx={12}
                fill="none"
                stroke="var(--color-sky)"
                strokeOpacity={0.25}
                strokeWidth={1}
              />
              <text
                x={centerX}
                y={centerY - 3}
                textAnchor="middle"
                className="font-display"
                fontSize={18}
                fontWeight={700}
                fill="var(--color-paper)"
              >
                بورس‌پی
              </text>
              <text
                x={centerX}
                y={centerY + 14}
                textAnchor="middle"
                className="font-en-body"
                fontSize={8}
                letterSpacing="0.22em"
                fill="var(--color-sky)"
                style={{ textTransform: 'uppercase' }}
              >
                payment rail
              </text>
            </motion.g>

            {/* Product chips — selectors */}
            {productPoints.map((p, i) => {
              const product = products[i]
              const isB2C = product.role === 'b2c'
              const isActive = product.slug === selectedSlug
              const isHover = hoverIdx === i
              const highlight = isActive || isHover
              const accentColor = isB2C
                ? 'var(--color-coral)'
                : 'var(--color-indigo)'
              return (
                <motion.g
                  key={`product-node-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 2 + i * 0.12, ease }}
                  role="button"
                  tabIndex={0}
                  aria-label={`نمایش کارتِ ${product.name}`}
                  aria-pressed={isActive}
                  onClick={() => onSelect(product.slug)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelect(product.slug)
                    }
                  }}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                  onFocus={() => setHoverIdx(i)}
                  onBlur={() => setHoverIdx(null)}
                  style={{
                    cursor: 'pointer',
                    transform: highlight ? 'translateY(-3px)' : 'translateY(0)',
                    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
                    outline: 'none',
                  }}
                >
                  {/* Soft glow under active chip */}
                  {highlight && (
                    <rect
                      x={p.x - 54}
                      y={p.y - 18}
                      width={108}
                      height={42}
                      rx={11}
                      fill={accentColor}
                      opacity={isActive ? 0.22 : 0.16}
                      filter="blur(8px)"
                    />
                  )}
                  <rect
                    x={p.x - 50}
                    y={p.y - 20}
                    width={100}
                    height={40}
                    rx={10}
                    fill={isActive ? accentColor : 'var(--color-paper)'}
                    stroke={accentColor}
                    strokeOpacity={
                      isActive ? 1 : highlight ? 0.85 : isB2C ? 0.45 : 0.3
                    }
                    strokeWidth={isActive ? 1.6 : highlight ? 1.4 : 1}
                    style={{
                      transition: 'all 0.25s ease',
                    }}
                  />
                  {isB2C && !isActive && (
                    <circle
                      cx={p.x - 42}
                      cy={p.y - 10}
                      r={2}
                      fill="var(--color-coral)"
                    />
                  )}
                  <text
                    x={p.x}
                    y={p.y - 1}
                    textAnchor="middle"
                    className="font-display"
                    fontSize={15}
                    fontWeight={700}
                    fill={
                      isActive
                        ? 'var(--color-paper)'
                        : highlight
                        ? accentColor
                        : 'var(--color-ink)'
                    }
                    style={{ transition: 'fill 0.25s ease' }}
                  >
                    {product.name}
                  </text>
                  <text
                    x={p.x}
                    y={p.y + 13}
                    textAnchor="middle"
                    className="font-en-body"
                    fontSize={7.5}
                    letterSpacing="0.18em"
                    fill={
                      isActive ? 'var(--color-paper)' : 'var(--color-ink-3)'
                    }
                    fillOpacity={isActive ? 0.8 : 1}
                    style={{ textTransform: 'uppercase' }}
                  >
                    {product.latin}
                  </text>
                </motion.g>
              )
            })}
          </svg>

          {/* SPOTLIGHT — positioned absolutely under the active chip.
              The chip sits at left:chipLeftPercent% of the same
              container the SVG fills, so this card lines up under it. */}
          <div className="relative mt-2 min-h-[200px]">
            <AnimatePresence mode="wait" initial={false}>
              <SpotlightCard
                key={selectedSlug}
                slug={selectedSlug}
                chipLeftPercent={chipLeftPercent}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile fallback — stacked layout with the active card
            sitting right under the chip row */}
        <div className="mt-8 md:hidden">
          <div className="rounded-2xl border border-hairline bg-paper p-5">
            <div className="text-center">
              <div
                className="font-en-body text-[9.5px] uppercase tracking-[0.22em] text-ink-3"
                style={{ unicodeBidi: 'isolate' }}
              >
                21 banking partners
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {Array.from({ length: BANK_COUNT }).map((_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-sky"
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-center text-ink-3">
              <svg width="12" height="14" viewBox="0 0 14 20" fill="none">
                <path
                  d="M7 1v14M2 11l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-4 mx-auto max-w-[180px] relative rounded-xl bg-navy-1 px-5 py-4 text-center text-paper">
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-sky/20" />
              <div className="relative font-display text-[18px] font-bold">
                بورس‌پی
              </div>
              <div
                className="relative mt-1 font-en-body text-[8.5px] uppercase tracking-[0.22em] text-sky"
                style={{ unicodeBidi: 'isolate' }}
              >
                payment rail
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {products.map((p) => {
                const isB2C = p.role === 'b2c'
                const isActive = p.slug === selectedSlug
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => onSelect(p.slug)}
                    aria-pressed={isActive}
                    className={cn(
                      'group relative rounded-lg border px-2.5 py-2 text-center transition-all',
                      isActive
                        ? isB2C
                          ? 'border-coral bg-coral text-paper'
                          : 'border-indigo bg-indigo text-paper'
                        : 'border-hairline bg-paper-2 hover:border-indigo/40',
                    )}
                  >
                    {isB2C && !isActive && (
                      <span
                        aria-hidden
                        className="absolute top-1.5 left-1.5 h-1 w-1 rounded-full bg-coral"
                      />
                    )}
                    <div
                      className={cn(
                        'font-display text-[13px] font-bold',
                        isActive ? 'text-paper' : 'text-ink',
                      )}
                    >
                      {p.name}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Mobile spotlight — directly under the chips, no extra
                section/scroll */}
            <div className="mt-4">
              <AnimatePresence mode="wait" initial={false}>
                <MobileSpotlightCard
                  key={selectedSlug}
                  slug={selectedSlug}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ---------------------------------------------------------------------
// Desktop spotlight — absolute-positioned under the active chip
// ---------------------------------------------------------------------

interface SpotlightProps {
  slug: ProductSlug
  chipLeftPercent: number
}

function SpotlightCard({ slug, chipLeftPercent }: SpotlightProps) {
  const product = productsBySlug[slug]
  const isB2C = product.role === 'b2c'
  const idx = products.findIndex((p) => p.slug === slug)

  // Card width in pixels (must be smaller than what the chip x-pos
  // can accommodate). Sits horizontally centred under the chip via
  // translateX(-50%).
  const cardWidth = 340

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.32, ease: easeOut }}
      className="absolute top-0"
      style={{
        left: `${chipLeftPercent}%`,
        width: cardWidth,
        transform: 'translateX(-50%)',
        // Clamp so the card never overflows the container edges
        maxWidth: 'calc(100vw - 32px)',
      }}
    >
      {/* Connector — thin vertical hairline from chip down to card */}
      <div
        aria-hidden
        className="mx-auto -mt-3 mb-1 h-3 w-px origin-top"
        style={{
          background: isB2C
            ? 'var(--color-coral)'
            : 'var(--color-indigo)',
          opacity: 0.7,
        }}
      />

      <Link
        to={`/products#${slug}`}
        className={cn(
          'group relative block overflow-hidden rounded-xl border bg-paper p-5 transition-all duration-300',
          'border-hairline hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(10,14,46,0.45)]',
          isB2C ? 'hover:border-coral/45' : 'hover:border-indigo/45',
        )}
      >
        {isB2C && (
          <span
            aria-hidden
            className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-coral"
          />
        )}

        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5',
              'font-en-body text-[9.5px] font-semibold tracking-[0.16em] uppercase',
              isB2C ? 'bg-coral-soft text-coral' : 'bg-mist/60 text-indigo',
            )}
            style={{ unicodeBidi: 'isolate' }}
          >
            {isB2C ? 'B2C' : 'B2B'}
          </span>
          <span
            className="font-en-display text-[10.5px] font-bold tracking-[0.2em] text-ink-4"
            style={{ unicodeBidi: 'isolate' }}
            aria-hidden
          >
            0{idx + 1}
          </span>
        </div>

        <h3 className="mt-3 font-display text-[22px] font-bold leading-none tracking-tight text-ink">
          {product.name}
        </h3>
        <div
          className="mt-1 font-en-display italic text-[12px] text-ink-3"
          style={{ unicodeBidi: 'isolate' }}
        >
          {product.latin}
        </div>

        <p className="mt-3 text-[13px] leading-[1.7] text-ink-2">
          {product.oneLiner}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-hairline-2 pt-3">
          <span
            className="font-en-body text-[9px] tracking-[0.22em] uppercase text-ink-3"
            style={{ unicodeBidi: 'isolate' }}
          >
            full page
          </span>
          <span
            className={cn(
              'flex items-center gap-1 text-[12.5px] font-medium transition-transform group-hover:-translate-x-1',
              isB2C ? 'text-coral' : 'text-indigo',
            )}
          >
            <span>صفحه‌ی {product.name}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rotate-180"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ---------------------------------------------------------------------
// Mobile spotlight — full-width inline card
// ---------------------------------------------------------------------

function MobileSpotlightCard({ slug }: { slug: ProductSlug }) {
  const product = productsBySlug[slug]
  const isB2C = product.role === 'b2c'

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: easeOut }}
    >
      <Link
        to={`/products#${slug}`}
        className={cn(
          'group block rounded-xl border bg-paper p-4',
          'border-hairline',
          isB2C ? 'hover:border-coral/45' : 'hover:border-indigo/45',
        )}
      >
        <div className="font-display text-[18px] font-bold text-ink">
          {product.name}
        </div>
        <div
          className="font-en-display italic text-[11px] text-ink-3"
          style={{ unicodeBidi: 'isolate' }}
        >
          {product.latin}
        </div>
        <p className="mt-2 text-[12.5px] leading-[1.7] text-ink-2">
          {product.oneLiner}
        </p>
        <div
          className={cn(
            'mt-3 inline-flex items-center gap-1 text-[12px] font-medium',
            isB2C ? 'text-coral' : 'text-indigo',
          )}
        >
          <span>صفحه‌ی {product.name} ↗</span>
        </div>
      </Link>
    </motion.div>
  )
}
