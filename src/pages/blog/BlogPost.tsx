import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import ArcMotif from '@/components/brand/ArcMotif'
import OrnamentDots from '@/components/brand/OrnamentDots'
import { getPostBySlug, formatPostDate, blogPosts } from '@/lib/blog'
import { mdxComponents } from './mdxComponents'

export default function BlogPost() {
  const { slug = '' } = useParams<{ slug: string }>()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <Section tone="paper" spacing="loose">
        <Container size="narrow">
          <Eyebrow tone="ink">۴۰۴</Eyebrow>
          <h1 className="mt-4 font-display text-[40px] font-bold text-ink">
            این پست پیدا نشد.
          </h1>
          <p className="mt-5 text-ink-2">
            ممکن است آدرس عوض شده باشد.{' '}
            <Link to="/blog" className="text-accent underline underline-offset-4">
              بازگشت به بلاگ
            </Link>
          </p>
        </Container>
      </Section>
    )
  }

  const { Content } = post

  // Other posts for the "more reading" section
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <title>{post.title} · بلاگ بورس‌پی</title>
      <meta name="description" content={post.excerpt} />

      {/* HERO — light, with brand arc + dots */}
      <section className="relative isolate overflow-hidden bg-cloud text-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[-180px] text-indigo/30"
        >
          <ArcMotif count={5} size={620} anchor="top-left" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 right-6 hidden text-sky/40 md:block"
        >
          <OrnamentDots variant="trail" tone="sky" opacity={0.6} width={150} />
        </div>

        <Container size="narrow" className="relative py-20 sm:py-28">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
            <span>بازگشت به بلاگ</span>
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-[12px] text-ink-3">
            <span
              className="font-en-body uppercase tracking-[0.18em]"
              style={{ unicodeBidi: 'isolate' }}
            >
              {formatPostDate(post.date)}
            </span>
            {post.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full bg-paper px-2.5 py-0.5 border border-hairline-2"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-5 font-display text-[40px] font-bold leading-[1.08] tracking-tight text-ink sm:text-[58px]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-7 max-w-2xl text-[18px] leading-[1.85] text-ink-2">
              {post.excerpt}
            </p>
          )}

          {post.author && (
            <div className="mt-9 flex items-center gap-3 border-t border-hairline-2 pt-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo/12 font-display text-[13px] font-bold text-indigo">
                {post.author.charAt(0)}
              </div>
              <div className="text-[13px] text-ink-2">
                <div className="font-medium">{post.author}</div>
                <div
                  className="font-en-body text-[10.5px] uppercase tracking-[0.16em] text-ink-3"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  author
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ARTICLE BODY */}
      <Section tone="paper" spacing="normal">
        <Container size="narrow">
          <article className="prose-boorspay">
            <MDXProvider components={mdxComponents}>
              <Content />
            </MDXProvider>
          </article>
        </Container>
      </Section>

      {/* MORE READING */}
      {otherPosts.length > 0 && (
        <Section tone="tint" spacing="normal">
          <Container size="narrow">
            <Eyebrow>ادامه‌ی خواندن</Eyebrow>
            <h2 className="mt-3 font-display text-[24px] font-bold tracking-tight text-ink sm:text-[28px]">
              یادداشت‌های دیگر
            </h2>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group block h-full rounded-2xl border border-hairline bg-paper p-6 transition-all hover:border-indigo/30 hover:shadow-[0_24px_60px_-30px_rgba(10,14,46,0.35)]"
                  >
                    <div
                      className="font-en-body text-[10.5px] uppercase tracking-[0.18em] text-ink-3"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      {formatPostDate(p.date)}
                    </div>
                    <h3 className="mt-3 font-display text-[18px] font-bold leading-tight text-ink transition-colors group-hover:text-indigo">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-3">
                        {p.excerpt}
                      </p>
                    )}
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-accent transition-transform group-hover:-translate-x-1">
                      <span>ادامه</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  )
}
