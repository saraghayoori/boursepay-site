import { cn } from '@/lib/cn'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: number
  className?: string
}

/**
 * Boorspay primary logo.
 *
 * Uses the single official lockup PNG (`/logo.png`) — Sara's
 * mark plus the «بورس‌پی» Persian wordmark stacked underneath. The
 * same asset is rendered on light and dark surfaces; on dark we
 * give it a faint sky-tinted halo so it sits cleanly on navy
 * without needing a separate white-on-dark export.
 *
 * No additional wordmark text is rendered next to the image — the
 * lockup already contains the wordmark, so any extra HTML text
 * would duplicate it.
 */

// Prefix asset paths with Vite's BASE_URL so they resolve correctly
// when the site is served under a subpath (e.g. /boursepay-site/ on
// GitHub Pages). BASE_URL always ends with a slash.
const base = import.meta.env.BASE_URL
const logoSrc = `${base}logo.png`

export default function Logo({
  variant = 'light',
  size = 56,
  className,
}: LogoProps) {
  const dark = variant === 'dark'

  return (
    <div
      className={cn('inline-flex items-center', className)}
      aria-label="boursepayment · بورس‌پی"
    >
      <img
        src={logoSrc}
        alt="بورس‌پی"
        width={size}
        height={size}
        style={{
          display: 'block',
          objectFit: 'contain',
          ...(dark
            ? {
                // On dark backgrounds the navy wordmark would
                // disappear, so brighten the whole lockup and add a
                // soft sky-tinted glow to compensate. The brand mark
                // (blue arcs) stays recognisable; the wordmark
                // becomes a softer ghosted variant.
                filter:
                  'brightness(1.15) drop-shadow(0 0 12px rgba(111,143,206,0.35))',
              }
            : null),
        }}
        draggable={false}
      />
    </div>
  )
}
