import { cn } from '@/lib/cn'
import { Link, type LinkProps } from 'react-router-dom'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

/**
 * Brand button.
 *
 * Refined per brand book v3:
 * - Primary: indigo→navy gradient with a two-layer shadow (1px hairline
 *   highlight on top, soft drop on bottom). On hover the gradient
 *   shifts darker and the shadow deepens; the active state pushes down
 *   1px for tactile feedback. The arrow icon (if any) slides 2px on
 *   hover.
 * - Secondary: paper-2 surface with a hairline border. A subtle inner
 *   shadow on hover hints at "lift", not a heavy press.
 * - Ghost: cleanest. Just a colour change on hover with no surface.
 *
 * Letter-spacing is slightly tightened on the body text — the brand
 * uses Vazirmatn for Persian, which benefits from -0.005em tracking
 * at button sizes to avoid feeling loose.
 */
const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-md font-medium ' +
  'tracking-[-0.005em] ' +
  'transition-all duration-200 ease-out focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-paper disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    // gradient surface + dual shadow + crisp hairline highlight on top
    'text-accent-fg ' +
    'bg-[linear-gradient(180deg,var(--color-indigo)_0%,var(--color-navy-2)_100%)] ' +
    'hover:bg-[linear-gradient(180deg,var(--color-navy-2)_0%,var(--color-navy-1)_100%)] ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_0_rgba(10,14,46,0.04),0_10px_28px_-14px_rgba(10,14,46,0.55)] ' +
    'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_1px_0_rgba(10,14,46,0.06),0_14px_36px_-14px_rgba(10,14,46,0.7)] ' +
    'active:translate-y-px active:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_14px_-10px_rgba(10,14,46,0.5)]',
  secondary:
    'bg-paper-2 text-ink border border-hairline ' +
    'hover:bg-cloud hover:border-hairline ' +
    'shadow-[0_1px_0_rgba(10,14,46,0.02)] ' +
    'hover:shadow-[0_2px_8px_-4px_rgba(10,14,46,0.12)]',
  ghost:
    'bg-transparent text-ink hover:bg-ink/[0.04]',
}

const sizes: Record<Size, string> = {
  md: 'h-10 px-5 text-[14.5px]',
  lg: 'h-12 px-7 text-[15.5px]',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children?: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button'
}

type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a'
  href: string
}

type RouterLinkProps = CommonProps & Omit<LinkProps, 'children'> & {
  as: 'link'
  to: string
}

type Props = ButtonProps | AnchorProps | RouterLinkProps

export default function Button(props: Props) {
  const { variant = 'primary', size = 'md', className, children, as = 'button' } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if (as === 'a') {
    const { as: _a, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props as AnchorProps
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    )
  }

  if (as === 'link') {
    const { as: _a, variant: _v, size: _s, className: _c, children: _ch, to, ...rest } =
      props as RouterLinkProps
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { as: _a, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonProps
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
