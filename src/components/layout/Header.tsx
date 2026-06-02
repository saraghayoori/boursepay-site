import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Logo from '@/components/brand/Logo'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { products } from '@/content/products'
import { cn } from '@/lib/cn'

const links = [
  { to: '/', label: 'خانه' },
  { to: '/products', label: 'محصولات' },
  { to: '/blog', label: 'بلاگ' },
  { to: '/about', label: 'درباره' },
  { to: '/contact', label: 'تماس' },
] as const

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close every menu when the route changes.
  useEffect(() => {
    setOpen(false)
    setProductsOpen(false)
    setMobileProductsOpen(false)
  }, [location.pathname])

  // Close the desktop products dropdown when the user presses Escape.
  useEffect(() => {
    if (!productsOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [productsOpen])

  // Open on hover/focus with no delay; close with a tiny delay so users
  // can move their cursor down into the panel without it flickering shut.
  const openProducts = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setProductsOpen(true)
  }
  const closeProductsSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setProductsOpen(false), 140)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-500 ease-out',
        scrolled
          ? 'bg-paper/80 backdrop-blur-xl backdrop-saturate-150 border-b border-hairline-2 shadow-[0_1px_0_rgba(10,14,46,0.02)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className="flex items-center" aria-label="بورس‌پی">
          <Logo size={56} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) =>
            link.to === '/products' ? (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={openProducts}
                onMouseLeave={closeProductsSoon}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex items-center gap-1 rounded-md px-4 py-2 text-[14.5px] tracking-[-0.005em] transition-colors duration-200',
                      isActive ? 'text-ink' : 'text-ink-3 hover:text-ink',
                    )
                  }
                  onFocus={openProducts}
                  aria-haspopup="true"
                  aria-expanded={productsOpen}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={cn(
                          'transition-transform duration-300 ease-out',
                          productsOpen && 'rotate-180',
                        )}
                        aria-hidden
                      >
                        <path
                          d="M2 4l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-[3px] h-px rounded-full bg-accent"
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </>
                  )}
                </NavLink>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.99 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-full z-50 mt-3 w-[540px] origin-top rounded-2xl border border-hairline-2 bg-paper/95 p-3 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_24px_60px_-24px_rgba(10,14,46,0.28),0_8px_24px_-12px_rgba(10,14,46,0.12)]"
                      role="menu"
                    >
                      <div className="grid grid-cols-2 gap-1.5">
                        {products.map((p) => {
                          const isB2C = p.role === 'b2c'
                          return (
                            <Link
                              key={p.slug}
                              to={`/products#${p.slug}`}
                              role="menuitem"
                              className="group relative flex flex-col rounded-xl px-4 py-3.5 transition-colors hover:bg-cloud"
                              onClick={() => setProductsOpen(false)}
                            >
                              {isB2C && (
                                <span
                                  aria-hidden
                                  className="absolute top-3 left-3 h-1.5 w-1.5 rounded-full bg-coral"
                                />
                              )}
                              <div className="flex items-baseline justify-between gap-3">
                                <div className="font-display text-[16px] font-bold text-ink">
                                  {p.name}
                                </div>
                                <div
                                  className="font-en-body text-[10px] tracking-[0.16em] uppercase text-ink-3"
                                  style={{ unicodeBidi: 'isolate' }}
                                >
                                  {p.timing}
                                </div>
                              </div>
                              <div
                                className="mt-1 font-en-display italic text-[12.5px] text-ink-3"
                                style={{ unicodeBidi: 'isolate' }}
                              >
                                {p.latin} · {p.kicker}
                              </div>
                              <div className="mt-2 text-[12.5px] leading-[1.6] text-ink-2">
                                {p.oneLiner}
                              </div>
                            </Link>
                          )
                        })}
                      </div>

                      <Link
                        to="/products"
                        onClick={() => setProductsOpen(false)}
                        className="mt-2 flex items-center justify-between rounded-xl border border-hairline-2 bg-paper-2 px-4 py-3 text-[13px] text-ink-2 transition-colors hover:bg-cloud"
                      >
                        <span>مرور همه‌ی محصولات</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-md px-4 py-2 text-[14.5px] tracking-[-0.005em] transition-colors duration-200',
                    isActive ? 'text-ink' : 'text-ink-3 hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-[3px] h-px rounded-full bg-accent"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button as="link" to="/contact" size="md" className="hidden sm:inline-flex">
            درخواست دمو
          </Button>
          <button
            type="button"
            aria-label="منو"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-cloud"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <><path d="M6 6l12 12" /><path d="M18 6l-12 12" /></> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-hairline bg-paper">
          <Container className="flex flex-col py-3">
            {links.map((link) =>
              link.to === '/products' ? (
                <div key={link.to} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    className={cn(
                      'flex items-center justify-between rounded-md px-3 py-3 text-[15px]',
                      'text-ink-2 hover:bg-cloud/60',
                    )}
                    aria-expanded={mobileProductsOpen}
                  >
                    <span>{link.label}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={cn('transition-transform', mobileProductsOpen && 'rotate-180')}
                      aria-hidden
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {mobileProductsOpen && (
                    <ul className="mb-1 mt-1 flex flex-col gap-1 border-r-2 border-hairline pr-4 pl-3">
                      {products.map((p) => {
                        const isB2C = p.role === 'b2c'
                        return (
                          <li key={p.slug}>
                            <NavLink
                              to={`/products#${p.slug}`}
                              className={({ isActive }) =>
                                cn(
                                  'relative block rounded-md px-3 py-2.5 text-[14px]',
                                  isActive ? 'bg-cloud text-ink' : 'text-ink-2 hover:bg-cloud/60',
                                )
                              }
                            >
                              {isB2C && (
                                <span
                                  aria-hidden
                                  className="absolute top-3 right-1 h-1.5 w-1.5 rounded-full bg-coral"
                                />
                              )}
                              <span className="font-display font-bold">{p.name}</span>
                              <span
                                className="mr-2 font-en-display italic text-[12px] text-ink-3"
                                style={{ unicodeBidi: 'isolate' }}
                              >
                                {p.latin}
                              </span>
                            </NavLink>
                          </li>
                        )
                      })}
                      <li>
                        <NavLink
                          to="/products"
                          end
                          className={({ isActive }) =>
                            cn(
                              'block rounded-md px-3 py-2.5 text-[13px]',
                              isActive ? 'bg-cloud text-ink' : 'text-ink-3 hover:bg-cloud/60',
                            )
                          }
                        >
                          مرور همه‌ی محصولات
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-3 text-[15px]',
                      isActive ? 'bg-cloud text-ink' : 'text-ink-2 hover:bg-cloud/60',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </Container>
        </div>
      )}
    </header>
  )
}
