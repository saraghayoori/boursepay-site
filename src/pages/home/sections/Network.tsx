import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { products, type ProductSlug } from '@/content/products'

/**
 * Network — the home page's centrepiece visual + product selector.
 *
 * What it shows, in a single frame:
 *   - 21 bank dots arranged in a gentle arch across the top edge
 *   - Hairline lines flowing from each bank into the centre, where
 *     the «بورس‌پی» node sits inside a concentric-arc halo
 *   - From the centre, four lines branch out to the four product
 *     chips along the bottom edge. **Each chip is a selector** for
 *     the FeaturedProducts spotlight below — clicking a chip changes
 *     which product card is shown, and the line connecting that chip
 *     to the centre node brightens to indicate the active state.
 *
 * The whole composition lives in one inline SVG so the dots, lines,
 * halo and chips share a single coordinate space and animate
 * together when the section scrolls into view. Brand-book draw
 * easing (0.16, 1, 0.3, 1) keeps the formation slow and editorial.
 */
const BANK_COUNT = 21
const ease = [0.16, 1, 0.3, 1] as const

interface NetworkProps {
  /** Currently-selected product slug — drives the active-chip styling */
  selectedSlug: ProductSlug
  /** Called when the visitor clicks a product chip */
  onSelect: (slug: ProductSlug) => void
}

export default function Network({ selectedSlug, onSelect }: NetworkProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  const W = 1200
  const H = 600
  const centerX = W / 2
  const centerY = H * 0.58

  // 21 bank dots distributed along the top edge with a slight upward
  // arch so the row feels organic, not mechanical.
  const banks = Array.from({ length: BANK_COUNT }, (_, i) => {
    const t = i / (BANK_COUNT - 1)
    const x = 80 + t * (W - 160)
    const arch = Math.sin(t * Math.PI) * 14
    const y = 70 - arch
    return { x, y }
  })

  // 4 product chips along the bottom edge
  const productPoints = products.map((_, i) => {
    const t = (i + 0.5) / products.length
    return { x: 120 + t * (W - 240), y: H - 80 }
  })

  return (
    <Section tone="none" spacing="normal">
      <Container className="relative">
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
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-[1.85] text-ink-2">
            هر تراکنشی که از مشتری‌های ما عبور می‌کند، از یکی از این بانک‌ها
            وارد می‌شود، از قلبِ بورس‌پی می‌گذرد، و در یکی از این چهار محصول
            می‌نشیند. روی نامِ هر محصول کلیک کنید تا کارتِ کاملِ آن در پایین
            باز شود.
          </p>
        </div>

        {/* Desktop diagram */}
        <div className="relative mt-14 hidden md:block">
          <div
            aria-hidden
            className="ambient-cool pointer-events-none absolute inset-0 opacity-50 blur-3xl"
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

            {/* Halo behind centre */}
            <motion.circle
              cx={centerX}
              cy={centerY}
              r={150}
              fill="url(#centerGlow)"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.6, ease }}
            />

            {/* Concentric arcs — brand motif */}
            {[180, 130, 90].map((r, i) => (
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
                y2={centerY - 30}
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

            {/* Bank dots — pulsing halo + solid centre */}
            {banks.map((b, i) => (
              <g key={`bank-dot-${i}`}>
                <motion.circle
                  cx={b.x}
                  cy={b.y}
                  r={5}
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
                  r={2.5}
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

            {/* Centre → product lines — highlight when product is
                hovered OR is the currently-selected spotlight */}
            {productPoints.map((p, i) => {
              const isActive = products[i].slug === selectedSlug
              const isHover = hoverIdx === i
              const highlight = isActive || isHover
              return (
                <motion.line
                  key={`product-line-${i}`}
                  x1={centerX}
                  y1={centerY + 30}
                  x2={p.x}
                  y2={p.y - 25}
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
                x={centerX - 78}
                y={centerY - 30}
                width={156}
                height={60}
                rx={14}
                fill="var(--color-navy-1)"
              />
              <rect
                x={centerX - 78}
                y={centerY - 30}
                width={156}
                height={60}
                rx={14}
                fill="none"
                stroke="var(--color-sky)"
                strokeOpacity={0.25}
                strokeWidth={1}
              />
              <text
                x={centerX}
                y={centerY - 4}
                textAnchor="middle"
                className="font-display"
                fontSize={20}
                fontWeight={700}
                fill="var(--color-paper)"
              >
                بورس‌پی
              </text>
              <text
                x={centerX}
                y={centerY + 17}
                textAnchor="middle"
                className="font-en-body"
                fontSize={9}
                letterSpacing="0.22em"
                fill="var(--color-sky)"
                style={{ textTransform: 'uppercase' }}
              >
                payment rail
              </text>
            </motion.g>

            {/* Product chips — selectors for the spotlight below */}
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
                    transform: highlight ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
                    outline: 'none',
                  }}
                >
                  {/* Soft glow under active/hovered chip */}
                  {highlight && (
                    <rect
                      x={p.x - 60}
                      y={p.y - 20}
                      width={120}
                      height={48}
                      rx={12}
                      fill={accentColor}
                      opacity={isActive ? 0.22 : 0.16}
                      filter="blur(10px)"
                    />
                  )}
                  <rect
                    x={p.x - 56}
                    y={p.y - 22}
                    width={112}
                    height={44}
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
                      cx={p.x - 46}
                      cy={p.y - 12}
                      r={2.2}
                      fill="var(--color-coral)"
                    />
                  )}
                  <text
                    x={p.x}
                    y={p.y - 1}
                    textAnchor="middle"
                    className="font-display"
                    fontSize={16}
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
                    y={p.y + 14}
                    textAnchor="middle"
                    className="font-en-body"
                    fontSize={8}
                    letterSpacing="0.18em"
                    fill={
                      isActive ? 'var(--color-paper)' : 'var(--color-ink-3)'
                    }
                    fillOpacity={isActive ? 0.8 : 1}
                    style={{ textTransform: 'uppercase' }}
                  >
                    {product.latin}
                  </text>

                  {/* "Selected" / "Click to view" hint below the chip */}
                  {(isActive || isHover) && (
                    <motion.text
                      x={p.x}
                      y={p.y + 38}
                      textAnchor="middle"
                      className="font-en-body"
                      fontSize={8}
                      letterSpacing="0.22em"
                      fill={accentColor}
                      style={{ textTransform: 'uppercase' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isActive ? '◉ active' : 'view ↓'}
                    </motion.text>
                  )}
                </motion.g>
              )
            })}

            <text
              x={W / 2}
              y={120}
              textAnchor="middle"
              className="font-en-body"
              fontSize={9}
              letterSpacing="0.24em"
              fill="var(--color-ink-3)"
              style={{ textTransform: 'uppercase' }}
            >
              21 banking partners
            </text>

            <text
              x={W / 2}
              y={H - 25}
              textAnchor="middle"
              className="font-en-body"
              fontSize={9}
              letterSpacing="0.24em"
              fill="var(--color-ink-3)"
              style={{ textTransform: 'uppercase' }}
            >
              4 product surfaces · click to reveal
            </text>
          </svg>
        </div>

        {/* Mobile fallback — same data, simpler layout */}
        <div className="mt-12 md:hidden">
          <div className="rounded-2xl border border-hairline bg-paper p-6">
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
                    className="h-2 w-2 rounded-full bg-sky"
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center text-ink-3">
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                <path
                  d="M7 1v14M2 11l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-5 relative rounded-xl bg-navy-1 px-6 py-5 text-center text-paper">
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-sky/20" />
              <div className="relative font-display text-[20px] font-bold">
                بورس‌پی
              </div>
              <div
                className="relative mt-1 font-en-body text-[9px] uppercase tracking-[0.22em] text-sky"
                style={{ unicodeBidi: 'isolate' }}
              >
                payment rail
              </div>
            </div>

            <div className="mt-6 flex justify-center text-ink-3">
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                <path
                  d="M7 1v14M2 11l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-5 text-center">
              <div
                className="font-en-body text-[9.5px] uppercase tracking-[0.22em] text-ink-3"
                style={{ unicodeBidi: 'isolate' }}
              >
                4 product surfaces — tap to reveal
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {products.map((p) => {
                  const isB2C = p.role === 'b2c'
                  const isActive = p.slug === selectedSlug
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => onSelect(p.slug)}
                      aria-pressed={isActive}
                      className={[
                        'group relative rounded-lg border px-3 py-2.5 text-center transition-all',
                        isActive
                          ? isB2C
                            ? 'border-coral bg-coral text-paper shadow-[0_10px_30px_-15px_rgba(224,116,74,0.5)]'
                            : 'border-indigo bg-indigo text-paper shadow-[0_10px_30px_-15px_rgba(42,45,126,0.5)]'
                          : 'border-hairline bg-paper-2 hover:border-indigo/40 hover:bg-paper hover:shadow-[0_10px_30px_-15px_rgba(10,14,46,0.3)]',
                      ].join(' ')}
                    >
                      {isB2C && !isActive && (
                        <span
                          aria-hidden
                          className="absolute top-1.5 left-1.5 h-1 w-1 rounded-full bg-coral"
                        />
                      )}
                      <div
                        className={[
                          'font-display text-[14px] font-bold',
                          isActive ? 'text-paper' : 'text-ink',
                        ].join(' ')}
                      >
                        {p.name}
                      </div>
                      <div
                        className={[
                          'mt-0.5 font-en-body text-[9px] tracking-[0.18em]',
                          isActive ? 'text-paper/80' : 'text-ink-3',
                        ].join(' ')}
                        style={{ unicodeBidi: 'isolate', textTransform: 'uppercase' }}
                      >
                        {p.latin}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
