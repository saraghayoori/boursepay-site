import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import { blogPosts, formatPostDate } from '@/lib/blog'

export default function BlogIndex() {
  return (
    <>
      <title>بلاگ · بورس‌پی</title>
      <meta name="description" content="یادداشت‌ها، تصمیم‌های فنی و داستان‌های پشتِ بورس‌پی." />

      <Section tone="paper" spacing="loose">
        <Container size="narrow">
          <Eyebrow>بلاگ</Eyebrow>
          <Heading
            fa="یادداشت‌ها"
            en="Field notes"
            level={1}
            className="mt-4"
          />
          <p className="mt-7 text-[16.5px] leading-[1.85] text-ink-2">
            تصمیم‌های فنی، روایت‌های مشتری‌ها و آنچه از ساختنِ ریل‌های پرداختِ
            بازار سرمایه می‌آموزیم.
          </p>

          {blogPosts.length === 0 ? (
            <p className="mt-16 text-ink-3">هنوز پستی منتشر نشده.</p>
          ) : (
            <ul className="mt-16 space-y-12 border-t border-hairline pt-12">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className="group block">
                    <div className="flex items-center gap-3 text-[12px] text-ink-3">
                      <span
                        className="font-en-body uppercase tracking-[0.16em]"
                        style={{ unicodeBidi: 'isolate' }}
                      >
                        {formatPostDate(post.date)}
                      </span>
                      {post.tags?.slice(0, 2).map((t) => (
                        <span key={t}>· {t}</span>
                      ))}
                    </div>
                    <h2 className="mt-3 font-display text-[28px] font-bold leading-tight text-ink transition-colors group-hover:text-accent sm:text-[34px]">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 max-w-2xl text-[15.5px] leading-[1.85] text-ink-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent transition-transform group-hover:-translate-x-1">
                      <span>ادامه</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </>
  )
}
