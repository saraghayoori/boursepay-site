import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide'
}

export default function Container({
  size = 'default',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-10',
        size === 'default' && 'max-w-[1200px]',
        size === 'narrow' && 'max-w-[860px]',
        size === 'wide' && 'max-w-[1400px]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
