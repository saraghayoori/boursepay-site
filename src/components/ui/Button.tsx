import { cn } from '@/lib/cn'
import { Link, type LinkProps } from 'react-router-dom'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium ' +
  'transition-all duration-200 focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-paper disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-fg hover:bg-navy-2 active:translate-y-px ' +
    'shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(10,14,46,0.4)]',
  secondary:
    'bg-cloud text-ink border border-hairline hover:bg-mist',
  ghost:
    'bg-transparent text-ink hover:bg-cloud',
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
