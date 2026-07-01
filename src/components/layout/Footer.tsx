import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import Logo from '@/components/brand/Logo'
import Eyebrow from '@/components/ui/Eyebrow'
import { site } from '@/content/site'
import { products } from '@/content/products'

const yearFa = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date())

/**
 * Footer — dark surface that closes the page.
 *
 * Matches the canonical pattern of the reference sites Sara picked
 * (Mercury, Checkout, Stripe): light CTA above, hard horizontal break
 * into the dark footer below. The footer carries brand richness via
 * a subtle navy-2 → navy-1 diagonal gradient and one concentric-arc
 * decoration in the bottom-left corner — same arc motif used on the
 * brand-book cover. Nothing fancy, no curved edges, no gimmicks.
 */
export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-1 text-paper">
      {/* Layer 1 — diagonal depth gradient navy-2 → navy-1 */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, #1b1f66 0%, #0a0e2e 55%, #0a0e2e 100%)',
        }}
      />

      <Container className="relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo variant="dark" size={44} />
          <p className="mt-6 max-w-md text-[14.5px] leading-[1.85] text-paper/72">
            بورس‌پی · ریل‌های پرداختِ بازار سرمایه. تسویه‌ی سریع، تخصصی، با مجوز
            سازمان بورس.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-paper/60">
            <a
              href={`mailto:${site.contact.email}`}
              className="font-en-body transition-colors hover:text-sky"
              style={{ unicodeBidi: 'isolate' }}
            >
              {site.contact.email}
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <Eyebrow tone="sky">محصولات</Eyebrow>
          <ul className="mt-5 space-y-3 text-[14.5px]">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/products#${p.slug}`}
                  className="text-paper/85 transition-colors hover:text-sky"
                >
                  {p.name}{' '}
                  <span className="text-paper/40">·</span>{' '}
                  <span style={{ unicodeBidi: 'isolate' }}>{p.latin}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <Eyebrow tone="sky">شرکت</Eyebrow>
          <ul className="mt-5 space-y-3 text-[14.5px]">
            <li>
              <Link to="/about" className="text-paper/85 transition-colors hover:text-sky">
                درباره
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-paper/85 transition-colors hover:text-sky">
                تماس
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-paper/8">
        <Container className="flex flex-col items-start justify-between gap-2 py-5 text-[12px] text-paper/45 sm:flex-row sm:items-center">
          <div>© {yearFa} {site.name} — همه‌ی حقوق محفوظ است.</div>
          <div
            className="font-en-body uppercase tracking-[0.18em]"
            style={{ unicodeBidi: 'isolate' }}
          >
            Fast · Secure · Specialist
          </div>
        </Container>
      </div>
    </footer>
  )
}
