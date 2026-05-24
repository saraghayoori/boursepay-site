import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import { getPostBySlug, formatPostDate } from '@/lib/blog'
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

  return (
    <>
      <title>{post.title} · بلاگ بورس‌پی</title>
      <meta name="description" content={post.excerpt} />

      <Section tone="paper" spacing="loose">
        <Container size="narrow">
          <div className="mb-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[13.5px] text-ink-3 hover:text-ink"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
              <span>بازگشت به بلاگ</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-[12px] text-ink-3">
            <span
              className="font-en-body uppercase tracking-[0.16em]"
              style={{ unicodeBidi: 'isolate' }}
            >
              {formatPostDate(post.date)}
            </span>
            {post.tags?.map((t) => (
              <span key={t}>· {t}</span>
            ))}
          </div>

          <h1 className="mt-4 font-display text-[40px] font-bold leading-[1.1] text-ink sm:text-[54px]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-[18px] leading-[1.8] text-ink-2">
              {post.excerpt}
            </p>
          )}

          <hr className="my-12 border-hairline" />

          <article className="prose-boorspay">
            <MDXProvider components={mdxComponents}>
              <Content />
            </MDXProvider>
          </article>
        </Container>
      </Section>
    </>
  )
}
