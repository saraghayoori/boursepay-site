import { useEffect, useRef, useState } from 'react'
import Hero from './sections/Hero'
import TrustStrip from './sections/TrustStrip'
import HowItWorks from './sections/HowItWorks'
import Network from './sections/Network'
import Manifesto from './sections/Manifesto'
import Audience from './sections/Audience'
import Testimonials from './sections/Testimonials'
import CTA from './sections/CTA'
import { products, type ProductSlug } from '@/content/products'

/**
 * Scroll-driven page background — Mercury-style ambient shift that
 * descends from cloud → navy across the brand's cool-blue ramp.
 *
 * - First ~65% of the scroll: a gentle pulse between cloud and paper-2
 *   (the same hue with slightly different luminance) — the "lighting"
 *   move, not a re-paint.
 * - Last ~35%: the "sunset". The page itself dims through mist → sky
 *   → blue → navy-1. By the time the CTA section is in view, the page
 *   IS the dark surface — there is no separate dark section background
 *   and no gradient overlay creating a hard horizon line. The entire
 *   page is one motion-controlled wash from light to dark.
 *
 * Every section on this page is transparent (`tone="none"` or no bg
 * utility) so this single background drives the whole color scheme.
 * Cards inside sections keep their own `bg-paper-2` and act as content
 * islands floating on the shifting wash.
 *
 * Implementation: passive scroll listener + rAF coalescing, writes
 * directly to a ref'd div's `.style.backgroundColor` to avoid React
 * re-renders on every scroll frame. All seven stops are pulled from
 * the brand palette tokens defined in `src/styles/globals.css`.
 */
// Page background stays in the LIGHT cool-blue family for the entire
// document — the Mercury-style "lighting pulse". Going dark inside
// content sections would force text into muddy mid-blues during the
// transition and would also fight the CTA's readability. Instead the
// "dark moment" lives entirely inside the Footer, which has its own
// dark surface with a curved arc top edge that visually carries the
// reader from light page → dark footer (see `Footer.tsx`).
const STOPS = [0, 0.5, 1] as const
const COLORS = [
  [242, 245, 251], //   0% — cloud   `#F2F5FB`
  [250, 251, 254], //  50% — paper-2 `#FAFBFE`
  [232, 238, 248], // 100% — cool cloud — still light, but slightly cooler
] as const

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t)
}

function colorAt(p: number) {
  const clamped = Math.max(0, Math.min(1, p))
  for (let i = 1; i < STOPS.length; i++) {
    if (clamped <= STOPS[i]) {
      const span = STOPS[i] - STOPS[i - 1] || 1
      const t = (clamped - STOPS[i - 1]) / span
      const a = COLORS[i - 1]
      const b = COLORS[i]
      return `rgb(${lerp(a[0], b[0], t)}, ${lerp(a[1], b[1], t)}, ${lerp(a[2], b[2], t)})`
    }
  }
  const last = COLORS[COLORS.length - 1]
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`
}

export default function HomePage() {
  const wrapRef = useRef<HTMLDivElement>(null)
  // Shared selection state — the active product chip in Network is
  // also the one whose spotlight card is shown directly underneath
  // the chip (the spotlight lives inside Network itself, no extra
  // section + no extra scroll).
  const [selectedSlug, setSelectedSlug] = useState<ProductSlug>(
    products[0].slug,
  )

  const handleSelect = (slug: ProductSlug) => {
    setSelectedSlug(slug)
  }

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = wrapRef.current
      if (!el) return
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const p = window.scrollY / scrollable
      el.style.backgroundColor = colorAt(p)
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }
    update() // initial paint
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={wrapRef} style={{ backgroundColor: 'rgb(242, 245, 251)' }}>
      <title>بورس‌پی · ریل‌های پرداختِ بازار سرمایه</title>
      <meta name="description" content="پرداختِ سریع، امن، تخصصی برای صندوق‌ها، کارگزاری‌ها و بانک‌ها." />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Network selectedSlug={selectedSlug} onSelect={handleSelect} />
      <Manifesto />
      <Audience />
      <Testimonials />
      <CTA />
    </div>
  )
}
