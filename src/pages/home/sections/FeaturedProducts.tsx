import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'
import type { ComponentProps } from 'react'

const MotionLink = motion(Link as React.ComponentType<ComponentProps<typeof Link>>)
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import FlourishLine from '@/components/brand/FlourishLine'
import {
  CornerArcsWithDots,
  BigNumberCorner,
} from '@/components/brand/BrandPatterns'
import { products } from '@/content/products'
import { cn } from '@/lib/cn'

/**
 * Featured Products — the prominent product showcase on the home
 * page. Sits *after* the Network section: where Network establishes
 * "this is the rail and these are the four products that ride on
 * it", Featured Products zooms in on each product as a full-bleed
 * card the visitor can step into.
 *
 * Layout: a 2×2 grid of large product cards. Each card has:
 *   - The product name in display size (matches /products tab name)
 *   - Latin · kicker subtitle
 *   - The one-liner copy
 *   - Audience + timing chips
 *   - A brand-book "hop" decoration in the top-right corner (origin
 *     dot → soft curve → halo dot)
 *   - A small CornerArcsWithDots pattern peeking from bottom-left
 *
 * Clicking a card navigates to /products#{slug}, which (thanks to
 * the new RootLayout hash-aware scroll behavior + ProductsIndex
 * scrollIntoView on the tabs) lands the visitor on the matching
 * product detail panel — *not* on the products page hero.
 */
const easeOut = [0.22, 1, 0.36, 1] as const

export default function FeaturedProducts() {
  return (
    <Section tone="none" spacing="normal">
      <Container className="relative">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>۰۴ · محصولات</Eyebrow>
            <Heading
              fa="چهار محصول روی همان یک ریل"
              en="Four products · one rail"
              level={2}
              className="mt-3"
            />
            <p className="mt-5 max-w-xl text-[15.5px] leading-[1.85] text-ink-2">
              هر کارت، در عینِ کوچک بودنش، یک پنجره به یک محصولِ کامل است.
              کلیک کنید تا واردِ صفحه‌ی همان محصول شوید.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

interface ProductCardProps {
  product: (typeof products)[number]
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const isB2C = product.role === 'b2c'

  return (
    <MotionLink
      ref={ref}
      to={`/products#${product.slug}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
      className={cn(
        'group relative isolate flex flex-col overflow-hidden rounded-2xl border border-hairline bg-paper p-8 transition-all duration-300',
        'hover:-translate-y-1 hover:border-indigo/35 hover:shadow-[0_36px_80px_-40px_rgba(10,14,46,0.5)]',
      )}
    >
      {/* B2C whisper dot */}
      {isB2C && (
        <span
          aria-hidden
          className="absolute top-5 left-5 z-10 h-2 w-2 rounded-full bg-coral"
        />
      )}

      {/* Brand-book corner-arcs-with-dots decoration in bottom-left,
          revealed on hover */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-10 -left-10 text-sky/30 transition-opacity duration-500',
          'opacity-60 group-hover:opacity-100 group-hover:text-indigo/40',
        )}
      >
        <CornerArcsWithDots
          anchor="bottom-left"
          count={3}
          size={180}
          strokeWidth={1}
          opacity={0.7}
          dotTone={isB2C ? 'coral' : 'sky'}
          duration={1.4}
          delay={0.2 + index * 0.08}
        />
      </div>

      {/* Brand-book hop in top-right corner — proper dot+curve+halo DNA */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-4 right-4"
      >
        <FlourishLine
          variant="hop"
          hopShape="low-arc"
          width={130}
          strokeWidth={1.2}
          originTone="indigo"
          destTone={isB2C ? 'coral' : 'sky'}
          pathOpacity={0.4}
          duration={1.3}
          delay={0.4 + index * 0.08}
        />
      </div>

      {/* Brand book §26-04 "Big Number Corner" — huge faint
          display-weight index in the top-left of the card */}
      <BigNumberCorner
        n={index + 1}
        position="top-left"
        size={88}
        opacity={0.07}
        tone="indigo"
      />

      {/* Top row: category pill + timing label (no inline index now,
          the big corner number handles that visual job) */}
      <div className="relative flex items-center justify-end">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2.5 py-0.5',
              'font-en-body text-[10px] font-semibold tracking-[0.16em] uppercase',
              isB2C ? 'bg-coral-soft text-coral' : 'bg-mist/60 text-indigo',
            )}
            style={{ unicodeBidi: 'isolate' }}
          >
            {isB2C ? 'B2C' : 'B2B'}
          </span>
          <span
            className="font-en-body text-[10px] tracking-[0.18em] uppercase text-ink-3"
            style={{ unicodeBidi: 'isolate' }}
          >
            {product.timing}
          </span>
        </div>
      </div>

      {/* Big name + Latin */}
      <div className="relative mt-10">
        <h3 className="font-display text-[44px] font-bold leading-none tracking-tight text-ink sm:text-[52px]">
          {product.name}
        </h3>
        <div
          className="mt-2 font-en-display italic text-[15px] text-ink-3"
          style={{ unicodeBidi: 'isolate' }}
        >
          {product.latin} · {product.kicker}
        </div>
      </div>

      {/* One-liner */}
      <p className="relative mt-6 flex-1 text-[15px] leading-[1.85] text-ink-2">
        {product.oneLiner}
      </p>

      {/* Footer */}
      <div className="relative mt-8 flex items-center justify-between border-t border-hairline-2 pt-5">
        <div className="text-[12.5px] text-ink-3">{product.audience}</div>
        <div className="flex items-center gap-1.5 text-[13.5px] font-medium text-accent transition-transform group-hover:-translate-x-1">
          <span>صفحه‌ی {product.name}</span>
          <svg
            width="14"
            height="14"
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
        </div>
      </div>
    </MotionLink>
  )
}
