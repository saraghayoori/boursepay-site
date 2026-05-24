import type { ComponentProps } from 'react'

/**
 * Component overrides for MDX rendering. Each maps an MDX element to
 * brand-styled equivalents. Kept minimal — content should shine, not
 * the chrome around it.
 */
export const mdxComponents = {
  h1: (p: ComponentProps<'h1'>) => (
    <h1 {...p} className="mt-12 font-display text-[34px] font-bold text-ink" />
  ),
  h2: (p: ComponentProps<'h2'>) => (
    <h2 {...p} className="mt-12 font-display text-[26px] font-bold text-ink" />
  ),
  h3: (p: ComponentProps<'h3'>) => (
    <h3 {...p} className="mt-10 font-display text-[20px] font-bold text-ink" />
  ),
  p: (p: ComponentProps<'p'>) => (
    <p {...p} className="mt-5 text-[16.5px] leading-[1.95] text-ink-2" />
  ),
  ul: (p: ComponentProps<'ul'>) => (
    <ul {...p} className="mt-5 list-disc space-y-2 pr-6 text-[16px] leading-[1.9] text-ink-2 marker:text-accent" />
  ),
  ol: (p: ComponentProps<'ol'>) => (
    <ol {...p} className="mt-5 list-decimal space-y-2 pr-6 text-[16px] leading-[1.9] text-ink-2 marker:text-accent" />
  ),
  a: (p: ComponentProps<'a'>) => (
    <a {...p} className="text-accent underline underline-offset-4 hover:text-navy-2" />
  ),
  blockquote: (p: ComponentProps<'blockquote'>) => (
    <blockquote {...p} className="mt-8 border-r-4 border-accent bg-cloud px-6 py-4 text-[15.5px] leading-[1.9] text-ink-2" />
  ),
  code: (p: ComponentProps<'code'>) => (
    <code {...p} className="rounded bg-cloud px-1.5 py-0.5 font-mono text-[0.92em] text-navy-2" style={{ unicodeBidi: 'isolate' }} />
  ),
  hr: (p: ComponentProps<'hr'>) => <hr {...p} className="my-12 border-hairline" />,
}
