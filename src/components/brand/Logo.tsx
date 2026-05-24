import { cn } from '@/lib/cn'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: number
  /**
   * Legacy prop. Ignored on the light variant (the lockup PNG already
   * contains the wordmark). Honored on the dark variant if you want to
   * show the «boursepayment» tagline under the wordmark.
   */
  showTagline?: boolean
  className?: string
}

/**
 * Boorspay primary logo.
 *
 * Two surfaces, two strategies:
 *
 *  - LIGHT variant (header, light sections):
 *    Uses `/logo.png` — the official lockup Sara provided, which
 *    already contains the concentric-arc mark plus the «بورس‌پی»
 *    Persian wordmark stacked underneath. Because the lockup is
 *    self-contained, we render it as a single `<img>` with no extra
 *    HTML wordmark next to it.
 *
 *  - DARK variant (footer):
 *    The light lockup PNG has a navy wordmark that disappears on a
 *    dark background. Until Sara provides a dark-variant PNG, we
 *    render `/logo-dark.svg` (mark only, lighter palette) and place
 *    the «بورس‌پی» wordmark next to it as HTML text in paper-white.
 *
 * To swap in a real dark PNG later, set `markSrc.dark = '/logo-dark.png'`
 * and remove the `dark && <wordmark>` block below.
 */

const markSrc = {
  light: '/logo.png',
  dark: '/logo-dark.svg',
} as const

export default function Logo({
  variant = 'light',
  size = 56,
  showTagline = false,
  className,
}: LogoProps) {
  const dark = variant === 'dark'

  return (
    <div
      className={cn('inline-flex items-center gap-3', className)}
      aria-label="boursepayment · بورس‌پی"
    >
      <img
        src={markSrc[variant]}
        alt={dark ? '' : 'بورس‌پی'}
        width={size}
        height={size}
        style={{ display: 'block', objectFit: 'contain' }}
        draggable={false}
      />

      {dark && (
        <div className="leading-tight">
          <div
            className="font-display font-bold tracking-tight text-paper"
            style={{ fontSize: size * 0.46 }}
          >
            بورس‌پی
          </div>
          {showTagline && (
            <div
              className="font-en-body tracking-[0.18em] text-mist/85"
              style={{ fontSize: size * 0.18, marginTop: 2 }}
            >
              boursepayment
            </div>
          )}
        </div>
      )}
    </div>
  )
}
